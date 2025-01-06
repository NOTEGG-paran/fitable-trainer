/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: LoginPage.js
 * 3. **설명**:
 *    - 사용자 로그인 화면을 구현한 컴포넌트.
 *    - 휴대폰 번호와 비밀번호 입력을 통해 사용자 인증 처리.
 *
 * 4. **주요 로직**:
 *    - **로그인 처리**:
 *      - `loginApi`를 호출하여 사용자 인증 수행.
 *      - 인증 성공 시 AsyncStorage에 저장된 로그인 상태를 Recoil 상태로 업데이트.
 *      - 유효하지 않은 입력 또는 인증 실패 시 Alert를 통해 사용자에게 피드백 제공.
 *    - **유효성 검사**:
 *      - 휴대폰 번호는 11자리 이상, 비밀번호는 8자리 이상 입력하도록 유효성 검사 수행.
 *    - **비밀번호 찾기 화면 이동**:
 *      - 사용자가 비밀번호 찾기를 누르면 `FindPassword` 화면으로 이동.
 *
 * 5. **주요 기능**:
 *    - **로그인 기능**:
 *      - 사용자 입력값 유효성 검사 및 로그인 API 호출.
 *      - 로그인 성공 시 상태 동기화 및 홈 화면으로 이동 가능.
 *    - **비밀번호 찾기**:
 *      - 비밀번호를 잊은 사용자가 관련 화면으로 이동할 수 있도록 지원.
 *    - **에러 처리**:
 *      - 네트워크 오류 및 서버 응답 코드에 따라 사용자 피드백 제공.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - `isLoginState`와 `fcmTokenState`를 사용해 로그인 및 푸쉬 알림 토큰 관리.
 *    - **AsyncStorage 활용**:
 *      - 로그인 상태를 로컬에 저장하여 세션 유지.
 *    - **Styled-Components 사용**:
 *      - 컴포넌트의 스타일을 선언적으로 정의.
 *    - **FastImage 사용**:
 *      - 최적화된 이미지 렌더링으로 앱 성능 개선.
 */

import styled from 'styled-components/native';
import {COLORS} from '../../constants/color';
import { LoginContainer } from '../../style/gridStyled';
import MainBtn from '../../components/button/MainBtn';
import {AuthInput} from '../../components/input/AuthInput';
import { useState,useRef } from 'react';
import {loginApi} from '../../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { isLoginState,fcmTokenState } from '../../store/atom';
import FastImage from 'react-native-fast-image';
import { Alert,TouchableWithoutFeedback, Keyboard } from 'react-native';

// ST_A_1000
function LoginPage(props) {

    const navigation = useNavigation();
    const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
    
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef();
  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

   
    // console.log('fcmToken',fcmToken)
    const findPasswordScreen = () => {
        console.log('password찾기로')
        navigation.navigate('FindPassword');
    }

    const handleLogin = async () => {
        const isValidInput = phone.length > 10 && password.length > 7;
    
        if (!isValidInput) {
            Alert.alert('입력 오류', '전화번호 또는 비밀번호 형식이 잘못되었습니다.', [{ text: '확인' }]);
            return; 
        }
    
        try {
            const response = await loginApi(phone, password, fcmToken);
            if(response){
            const loginState = await AsyncStorage.getItem('isLogin');
            console.log('loginSt123ate',loginState)
            setIsLoggedIn(loginState);
            }
        } catch (error) {
            // 에러 처리
            console.log('Error during login:', error.response ? error.response.data : error);
            if (error.response) {
                if (error.response.data.code === 10202) {
                    Alert.alert('로그인 실패', '올바른 비밀번호를 입력해주세요.', [{ text: '확인' }]);
                } else if (error.response.data.code === 20000) {
                    Alert.alert('로그인 실패', '권한이 없는 계정입니다.', [{ text: '확인' }]);
                } else {
                    // 다른 서버 오류에 대한 일반적인 처리
                    Alert.alert('로그인 실패', '알 수 없는 오류가 발생했습니다.', [{ text: '확인' }]);
                }
            } else {
                // 응답 없는 기타 오류에 대한 처리
                Alert.alert('로그인 실패', '네트워크 오류가 발생했습니다. 다시 시도해주세요.', [{ text: '확인' }]);
            }
        }
    };
    


    const isInputValid = phone.length > 10  && password.length > 7;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     
        <LoginContainer>
        <LoginScreenView focus={isFocused}>
            <TitleLogo source={require('../../assets/img/t_logo.png')}/>
            <AuthInput
             value={phone}
             onChangeText={setPhone}
             placeholder="휴대폰번호"
             maxLength={11}
             ref={inputRef}
             onFocus={handleFocus}
             onBlur={handleBlur}
            />

              <AuthInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호"
              onSubmitEditing={handleLogin}
              maxLength={16}
              ref={inputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <MainBtn
             onPress={handleLogin}
             colorProp={isInputValid}
            >로그인</MainBtn>

            <FindPasswordContainer
                onPress={()=>findPasswordScreen()}
            >
                <FindPassword>비밀번호 찾기</FindPassword>
            </FindPasswordContainer>
            </LoginScreenView>
        </LoginContainer>

        </TouchableWithoutFeedback>
    );
}

export default LoginPage;

const TitleLogo = styled(FastImage)`
    margin-bottom: 50px;
    width: 180px;
    height: 34px;
`
const LoginScreenView = styled.View`
    flex: ${props => props.focus ? 0.88 : 1};
    background-color: ${COLORS.white};
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
`
const FindPasswordContainer = styled.TouchableOpacity`
    align-items: center;
    margin-top: 20px;
    margin-bottom: 80px;
`

const FindPassword = styled.Text`
    color: ${COLORS.gray_400};
    font-size: 14px;
    font-family: Pretendard;
    font-weight: 400;
    line-height: 22.40px;
`