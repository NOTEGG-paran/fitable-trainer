import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';
import {useRecoilState} from 'recoil';
import {isLoginState} from './src/store/atom';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import {autoLoginApi} from './src/api/authApi';
function AppInner() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const checkLoginStatus = async () => {
    console.log('5분마다 감지')
    try {
      // 최초 로그인시 로컬 스토리지에 저장된 로그인 상태 확인
      const isLoginAsync = await AsyncStorage.getItem('isLogin');
      // 토큰 갱신 api
      const result = await autoLoginApi();
      setIsLoggedIn(result && isLoginAsync === 'true'); 

    } catch (error) {
      console.error('Auto login error11:', error);
     
    } finally {
      setIsLoading(false);
    }
  };
  // 5분마다 로그인 상태를 감지
  checkLoginStatus();
  const interval = setInterval(checkLoginStatus, 5 * 60 * 1000); // 5분마다 감지
  console.log('interval',interval)
  return () => clearInterval(interval);
}, [setIsLoggedIn]);


console.log('isLoggedInisLoggedIn',isLoggedIn)
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* <Auth /> */}
      { isLoggedIn ? <AppScreens /> : <Auth />}
    </NavigationContainer>
  );
}

export default AppInner;
