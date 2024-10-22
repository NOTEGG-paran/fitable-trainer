import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';
import {useRecoilState} from 'recoil';
import {isLoginState} from './src/store/atom';
import {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from './src/screens/splash/SplashScreen';
import {deletefcmToken} from './src/api/mypageApi';
import { Text, TextInput } from 'react-native';
import customAxios from './src/api/customAxios';
// 전역 텍스트 설정
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
function AppInner() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    await deletefcmToken()
    setIsLoggedIn(false); // Recoil 상태 업데이트 (로그아웃)
  };

  const initializeApp = async () => {
    try {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      const refreshToken = await EncryptedStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

    } catch (error) {
      console.error('초기화 중 오류 발생:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeApp();
    // customAxios에 로그아웃 함수 전달
    customAxios.setLogoutHandler(handleLogout);
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
