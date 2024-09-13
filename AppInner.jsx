import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';
import {useRecoilState} from 'recoil';
import {isLoginState} from './src/store/atom';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from './src/screens/splash/SplashScreen';
import {autoLoginApi} from './src/api/authApi';
import { Text, TextInput } from 'react-native';
import {checkAccessTokenValidity} from './src/utils/CustomUtils';
import {refreshTokenFn} from './src/api/customAxios';
// 전역 텍스트 설정
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
function AppInner() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        const refreshToken = await EncryptedStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('자동 로그인 오류:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  console.log('isLoggedIn:', isLoggedIn);
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppScreens /> : <Auth />}
    </NavigationContainer>
  );
}

export default AppInner;
