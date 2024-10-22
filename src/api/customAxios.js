import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let isRefreshing = false;
let failedQueue = [];
let logoutHandler = null;
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};
export const refreshTokenFn = async (retryCount = 3) => {
  const refreshToken = await EncryptedStorage.getItem('refreshToken');
  if (!refreshToken) {
    console.log('No refreshToken found');
    throw new Error('No refreshToken found');
  }

  try {


    console.log(`refreshTokenFn - 현재 리프레시 토큰: ${refreshToken}`);
    
    const response = await axios.post(`${Config.API_URL}/api/trainers/v1/token`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    console.log('refreshTokenFn - 새로 발급된 액세스 토큰:', accessToken);
    console.log('refreshTokenFn - 새로 발급된 리프레시 토큰:', newRefreshToken);

    await EncryptedStorage.setItem('accessToken', accessToken);
    if (newRefreshToken) {
      await EncryptedStorage.setItem('refreshToken', newRefreshToken);
      console.log('refreshTokenFn - 갱신된 리프레시 토큰:', newRefreshToken);
    }

    return accessToken;
  } catch (error) {
    console.log(`토큰 갱신 실패. 재시도 남은 횟수: ${retryCount}, 에러: ${error.message}`);
    if (retryCount > 0) {
      return refreshTokenFn(retryCount - 1);
    } else {
      console.log('토큰 갱신 실패, 모든 시도 종료');
      await EncryptedStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
      Alert.alert(
        '세션이 만료되었습니다.',
        '다시 로그인해주세요.',
        [
          {
            text: '확인',
            onPress: () => {
              if (logoutHandler) {
                logoutHandler(); // 로그아웃 처리
              }
            },
          },
        ],
        { cancelable: false }
      );

      throw new Error('토큰 갱신에 실패했습니다.');
    }
  }
};
const customAxios = axios.create({
  baseURL: `${Config.API_URL}`,
  timeout: 20000,
  headers: {
    'content-type': 'application/json',
  },
});

// customAxios 인터셉터에 로그 추가
customAxios.interceptors.request.use(async (config) => {
  const token = await EncryptedStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && error.response.data && error.response.data.code === 10100) {
      if (!originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers['Authorization'] = `${token}`;
            return customAxios(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            const newAccessToken = await refreshTokenFn();
            originalRequest.headers['Authorization'] = `${newAccessToken}`;
            processQueue(null, newAccessToken);
            resolve(customAxios(originalRequest));
          } catch (err) {
            processQueue(err, null);
            reject(err);
             // 여기서 로그아웃 처리 및 Alert 창 호출 (중복 방지)
             if (!isRefreshing) { // isRefreshing이 해제되기 전에 Alert 호출 방지
              Alert.alert(
                '세션이 만료되었습니다.',
                '다시 로그인해주세요.',
                [
                  {
                    text: '확인',
                    onPress: () => {
                      if (logoutHandler) {
                        logoutHandler(); // 로그아웃 처리
                      }
                    },
                  },
                ],
                { cancelable: false }
              );
            }
          } finally {
            isRefreshing = false; // 갱신 완료 후 플래그 해제
          }
        });
      }
    }

    return Promise.reject(error);
  }
);
customAxios.setLogoutHandler = setLogoutHandler;

export default customAxios;