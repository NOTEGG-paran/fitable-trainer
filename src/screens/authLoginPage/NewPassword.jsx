/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: NewPassword.js
 * 3. **설명**:
 *    - 사용자 비밀번호 재설정을 위한 화면.
 *    - 새로운 비밀번호를 입력받고 확인 과정을 통해 유효성을 검증.
 *
 * 4. **주요 로직**:
 *    - **비밀번호 입력 및 검증**:
 *      - `validatePassword`를 호출하여 비밀번호 형식을 검증.
 *      - 비밀번호와 비밀번호 확인 값이 일치하는지 확인.
 *    - **비밀번호 변경 요청**:
 *      - API 호출(`changePassword`)로 비밀번호 변경을 서버에 요청.
 *      - 요청 성공 시 새로운 액세스 토큰과 리프레시 토큰을 저장하고 로그인 상태 갱신.
 *    - **에러 처리**:
 *      - 비밀번호 형식 오류, 비밀번호 불일치, 서버 오류에 따른 사용자 알림 처리.
 *
 * 5. **주요 기능**:
 *    - **비밀번호 재설정**:
 *      - 사용자가 새 비밀번호를 입력하고 변경할 수 있도록 지원.
 *    - **실시간 유효성 검사**:
 *      - 입력된 비밀번호의 형식 및 일치 여부를 즉시 사용자에게 피드백.
 *    - **에러 메시지 표시**:
 *      - 비밀번호 형식 및 불일치 시 화면에 에러 메시지 표시.
 *    - **비밀번호 변경 API 호출**:
 *      - 서버와 통신하여 비밀번호 변경을 처리.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - `myPhoneState`와 `isLoginState`를 사용해 사용자 상태 관리.
 *    - **EncryptedStorage 활용**:
 *      - 변경된 액세스 토큰과 리프레시 토큰을 안전하게 저장.
 *    - **Styled-Components 사용**:
 *      - 화면의 스타일을 선언적으로 정의.
 *    - **에러 메시지 처리**:
 *      - 에러 메시지를 동적으로 렌더링하여 사용자 피드백 제공.
 */

import styled from 'styled-components/native';
import {COLORS} from '../../constants/color';
import GobackGrid from '../../components/grid/GobackGrid';
import MainLongTextGrid from '../../components/grid/MainLongTextGrid';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled';
import {EctInput} from '../../components/input/EctInput';
import CertifiactionBtn from '../../components/button/CertificationBtn';
import { useState } from 'react';
import { ErrorText } from '../../style/gridStyled';
import { validatePassword } from '../../utils/CustomUtils';
import { changePassword } from '../../api/certificationApi';
import { useRecoilState } from 'recoil';
import { myPhoneState, isLoginState } from '../../store/atom';
import {Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
function NewPassword(props) {

    const navigation = useNavigation();
    const [myPhone, setMyPhone] = useRecoilState(myPhoneState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);

    const goBack = () => {
        navigation.goBack();
    }

    console.log('isLoggedIn',isLoggedIn)

     // 비밀번호 상태관리
     const [password, setPassword] = useState('');
     const [passwordCheck, setPasswordCheck] = useState('');
     const [passwordError, setPasswordError] = useState('');
 
     // 비밀번호 입력
     const handlePassword = (text) => {
         setPassword(text);
     }
  
     // 비밀번호 확인 입력
     const handlePasswordCheck = (text) => {
         setPasswordCheck(text);
     }
 
     // 비밀번호 검증
   const validatePasswordInput = () => {
     const isValid = validatePassword(password);
     setPasswordError(isValid && password.length > 1 ? '' : '형식에 맞게 설정해주세요');
   };


   // 비밀번호 변경
    const changePasswordBtn = async (phone, password) => {
        console.log('비밀번호 변경 값 확인',phone,password)
        if(!isSamePassword){
            Alert.alert('비밀번호를 확인해주세요')
            return;
        }

     try {
          const response = await changePassword({phone,password});
          if (response) {
                console.log('비밀번호 변경 성공',response)
                const { accessToken, refreshToken } = response;
                await EncryptedStorage.setItem("accessToken", accessToken);
                await EncryptedStorage.setItem("refreshToken", refreshToken);
                setIsLoggedIn(true);
          } 
     } catch (error) {
          console.log('Error during changePassword@@:', error.response);
          if(error.response){
            Alert.alert('비밀번호 변경 실패하였습니다.', '', [{ text: '확인', onPress: () => console.log('실패') }]);
          }
     }
    }
 
   
 
   const isSamePassword = password === passwordCheck;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MainContainer>
             <GobackGrid 
                onPress={goBack}
            />
            <TextContainer>
            <MainLongTextGrid>사용하실 새 비밀번호를</MainLongTextGrid>
            <MainLongTextGrid>입력해주세요</MainLongTextGrid>
            </TextContainer>

         
            <EctInput 
            text='비밀번호'
            placeholder="영어 소문자, 숫자, 특수문자 포함 8자리~16자리"
            value={password}
            onChangeText={handlePassword}
            onBlur={validatePasswordInput}
            secureTextEntry={true}
            hasError={!!passwordError} 
            />
             {
                   passwordError &&  
                   <ErrorTextContainer  key={passwordError}>
                   <ErrorText>{passwordError}</ErrorText> 
                   </ErrorTextContainer>
            }

            
            <EctInput 
             text='비밀번호 확인'
             placeholder="다시 입력해주세요"
             value={passwordCheck}
             secureTextEntry={true}
            onChangeText={handlePasswordCheck}
            onSubmitEditing={()=>changePasswordBtn(myPhone, password)}
            hasError={!isSamePassword && passwordCheck.length > 7} 
            />
            {
                   !isSamePassword && passwordCheck.length > 7 &&
                   <ErrorTextContainer>
                   <ErrorText>비밀번호가 일치하지 않습니다</ErrorText> 
                   </ErrorTextContainer>
            }

            <CertifiactionBtn
                onPress={()=>changePasswordBtn(myPhone, password)}
                isActive={password.length > 7 && isSamePassword}>다음</CertifiactionBtn>
        </MainContainer>
        </TouchableWithoutFeedback>
    );
}

export default NewPassword;



const TextContainer = styled.View`
    margin-bottom: 50px;
    margin-top: 44px;
`

const ErrorTextContainer = styled.View`
    width: 100%;
    margin-bottom: 12px;
`;