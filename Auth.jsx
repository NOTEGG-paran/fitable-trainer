/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: Auth.jsx
 * 3. **설명**:
 *    - 애플리케이션의 인증 관련 네비게이션 스택을 구성하는 파일.
 *    - 로그인, 비밀번호 찾기 및 재설정 화면을 포함.
 *
 * 4. **주요 로직**:
 *    - **네비게이션 스택 구성**:
 *      - `LoginPage`: 로그인 화면.
 *      - `FindPassword`: 비밀번호 찾기 화면.
 *      - `NewPassword`: 새 비밀번호 설정 화면.
 *    - **공통 헤더 스타일 적용**:
 *      - 모든 화면에 일관된 스타일을 적용하여 UI 통일성 유지.
 *
 * 5. **주요 기능**:
 *    - **로그인**:
 *      - `LoginPage`: 사용자 로그인 기능 제공.
 *    - **비밀번호 찾기**:
 *      - `FindPassword`: 비밀번호를 분실한 사용자가 재설정 요청.
 *    - **새 비밀번호 설정**:
 *      - `NewPassword`: 인증 후 새로운 비밀번호를 설정하는 화면.
 *
 */


import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { COLORS } from './src/constants/color';
import LoginPage from './src/screens/authLoginPage/LoginPage';
import FindPassword from './src/screens/authLoginPage/FindPassword';
import NewPassword from './src/screens/authLoginPage/NewPassword';

const Stack = createNativeStackNavigator();


function Auth(props) {
    return (
        <Stack.Navigator
            screenOptions={{
              title: '',
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.white,
                borderBottomWidth: 0,
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              shadowColor: 'transparent',
              elevation: 0, 
          }}>
             <Stack.Screen
            name="SignIn"
            component={LoginPage}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="FindPassword"
            component={FindPassword}
          />
          {/* 이건 로그인 후 비밀번호 설정할 때 */}
            <Stack.Screen
            name="NewPassword"
            component={NewPassword}
          />
          </Stack.Navigator>
    );
}

export default Auth;