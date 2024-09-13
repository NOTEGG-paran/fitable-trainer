import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshTokenFn} from './customAxios';
import EncryptedStorage from 'react-native-encrypted-storage';

const multipartAxios = axios.create({
  baseURL: `${Config.API_URL}`,
  timeout: 20000,
});

multipartAxios.interceptors.request.use(async (config) => {
  const token = await EncryptedStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  config.headers['Content-Type'] = 'multipart/form-data';
  return config;
});

multipartAxios.interceptors.response.use(null, async (error) => {
  const originalRequest = error.config;
  if (error && error.response && error.response.status === 401 && error.response.data && error.response.data.code === 10100) {
    if (!originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshTokenFn();
      originalRequest.headers.Authorization = `${newAccessToken}`;
      return multipartAxios(originalRequest);
    }
  }
  return Promise.reject(error);
});

export default multipartAxios;