
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

const baseURL = Config.API_URL;
console.log('baseURL123',baseURL)
export const loginApi = async (phone, password, fcmToken) => {
    try {
        const response = await axios.post(`${baseURL}/api/trainers/v1/login`, { phone, password, fcmToken });
        const { accessToken, refreshToken } = response.data;
        console.log('accessToken',accessToken)
        console.log('refreshToken',refreshToken)
        if (accessToken && refreshToken) {
            await AsyncStorage.setItem("accessToken", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);
            await AsyncStorage.setItem("isLogin", "true"); // 문자열로 저장
        } else {
            throw new Error('Missing tokens'); // 응답에서 토큰이 빠져 있으면 에러를 throw
        }

        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error; // 호출한 컴포넌트에서 에러를 처리할 수 있도록 함
    }
};


export const autoLoginApi = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refreshToken found");
        }

        const response = await axios.post(`${baseURL}/api/trainers/v1/token`, { refreshToken });
        const { accessToken, newRefreshToken } = response.data;

        // 새로운 액세스 토큰과 리프레시 토큰 저장
            await AsyncStorage.setItem("accessToken", accessToken);
        if (newRefreshToken) {
            await AsyncStorage.setItem("refreshToken", newRefreshToken);
        }

        return true;
    } catch (refreshError) {
        console.error('Auto login failed:', refreshError);
        console.log('Auto login failed:@@', refreshError);
        return false;
    }
}
