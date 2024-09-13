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