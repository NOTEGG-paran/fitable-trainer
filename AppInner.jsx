/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: AppInner.jsx
 * 3. **설명**:
 *    - 애플리케이션의 핵심 진입점으로 인증 상태에 따라 화면을 결정.
 *    - 전역 상태 관리 및 사용자 로그인 상태를 확인하고 적절한 화면을 렌더링.
 *
 * 4. **주요 로직**:
 *    - **앱 초기화**:
 *      - 로컬 저장소에서 `accessToken`과 `refreshToken`을 가져와 로그인 상태 결정.
 *    - **로그아웃 처리**:
 *      - Recoil의 `isLoginState`를 업데이트하여 사용자 로그아웃 처리.
 *    - **전역 텍스트 설정**:
 *      - 모든 `Text`와 `TextInput` 컴포넌트에서 폰트 크기 자동 조정 비활성화.
 *    - **Axios 핸들러 설정**:
 *      - `customAxios`에 로그아웃 핸들러를 등록하여 API 요청 실패 시 자동 로그아웃 처리.
 *
 * 5. **주요 기능**:
 *    - **앱 초기화**:
 *      - `initializeApp`: 저장된 토큰 정보를 기반으로 로그인 상태를 결정.
 *    - **로그아웃**:
 *      - `handleLogout`: `isLoginState` 상태를 `false`로 업데이트하여 로그아웃 처리.
 *    - **화면 렌더링**:
 *      - `isLoggedIn` 상태에 따라 인증 화면(`Auth`) 또는 메인 화면(`AppScreens`)을 렌더링.
 *    - **전역 설정**:
 *      - `Text.defaultProps.allowFontScaling = false`: 텍스트 크기 고정.
 *      - `TextInput.defaultProps.allowFontScaling = false`: 입력 필드 텍스트 크기 고정.
 *
 * 6. **주요 상태 및 로직**:
 *    - **상태**:
 *      - `isLoggedIn`: 사용자의 로그인 상태를 나타내는 Recoil 상태.
 *      - `isLoading`: 초기화 진행 상태를 나타내는 로컬 상태.
 *    - **로직**:
 *      - `initializeApp`: 토큰 확인 후 로그인 여부 결정.
 *      - `handleLogout`: 로그아웃 처리 및 상태 초기화.
 *
 * 7. **코드 주요 포인트**:
 *    - **로컬 저장소 사용**:
 *      - `EncryptedStorage`: 민감한 정보를 안전하게 저장 및 가져오기 위해 사용.
 *    - **Recoil 상태 관리**:
 *      - `useRecoilState`를 사용하여 로그인 상태 관리.
 *    - **Axios 확장**:
 *      - `customAxios.setLogoutHandler`로 API 요청 실패 시 로그아웃 로직 연동.
 */


import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';
import {useRecoilState} from 'recoil';
import {isLoginState} from './src/store/atom';
import {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from './src/screens/splash/SplashScreen';
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
    // await deletefcmToken()
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
