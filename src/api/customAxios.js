import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let isRefreshing = false;
let failedQueue = [];

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

export const refreshTokenFn = async (retryCount = 3) => {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.log('No refreshToken found');
      throw new Error('No refreshToken found');
    }

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
      Alert.alert('세션이 만료되었습니다', '다시 로그인해주세요');
      throw error;
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
  console.log(`Request with token: ${token}`);
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

customAxios.interceptors.response.use(
  (response) => {
    console.log('Response data:', response.data);
    return response;
  },
  async (error) => {
    console.log('Response error:', error.response?.status, error.response?.data);
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && error.response.data?.code === 10100) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers['Authorization'] = `${token}`;
            return customAxios(originalRequest);
          }).catch(err => Promise.reject(err));
        }

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
            await EncryptedStorage.removeItem('accessToken');
            await EncryptedStorage.removeItem('refreshToken');
            Alert.alert('세션이 만료되었습니다.', '다시 로그인해주세요');
          } finally {
            isRefreshing = false;
          }
        });
      }
    }

    return Promise.reject(error);
  }
);


export default customAxios;