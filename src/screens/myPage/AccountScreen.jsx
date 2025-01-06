/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: AccountScreen.js
 * 3. **설명**:
 *    - 사용자 계정 정보를 관리 및 수정할 수 있는 화면.
 *    - 이름 변경 및 비밀번호 변경을 지원하며, 비밀번호 유효성을 검증.
 *
 * 4. **주요 로직**:
 *    - **이름 변경**:
 *      - 사용자가 입력한 이름을 서버에 업데이트.
 *      - 이름은 10자 이하로 제한되며, 비어 있을 경우 기존 이름 유지.
 *    - **비밀번호 변경**:
 *      - `validatePassword`를 호출하여 비밀번호 유효성을 검증.
 *      - 입력된 비밀번호와 비밀번호 확인이 일치할 때만 변경 요청 처리.
 *    - **서버 요청**:
 *      - `updateMyInfo` API 호출로 변경된 정보를 서버에 업데이트.
 *      - 성공 시 사용자 상태를 업데이트하고 알림 표시.
 *    - **유효성 검사**:
 *      - 이름, 비밀번호 입력값의 유효성을 확인하여 버튼 활성화.
 *      - 비밀번호는 영어 소문자, 숫자, 특수문자를 포함한 8~16자로 제한.
 *
 * 5. **주요 기능**:
 *    - **이름 변경**:
 *      - 사용자가 새로운 이름을 입력하고 변경할 수 있도록 지원.
 *    - **비밀번호 변경**:
 *      - 기존 비밀번호를 입력하지 않아도 새로운 비밀번호를 설정 가능.
 *    - **휴대폰 번호 변경 이동**:
 *      - 버튼 클릭 시 휴대폰 번호 변경 화면으로 이동.
 *    - **에러 처리**:
 *      - 비밀번호 형식 오류 및 불일치에 대한 에러 메시지 표시.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - `myinfoState`를 사용해 사용자 정보를 상태로 관리 및 업데이트.
 *    - **API 호출**:
 *      - `updateMyInfo` API를 통해 서버에 변경 요청 전송.
 *    - **Styled-Components 사용**:
 *      - UI 요소의 스타일을 선언적으로 정의.
 *    - **실시간 유효성 검사**:
 *      - 입력값에 따라 버튼 활성화 상태를 동적으로 변경.
 *    - **터치 외 영역 키보드 닫기**:
 *      - `TouchableWithoutFeedback`으로 입력 외 영역 터치 시 키보드 닫기 처리.
 */

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState,useRef } from 'react';
import {MainContainer} from '../../style/gridStyled'
import { COLORS } from '../../constants/color';
import GobackGrid from '../../components/grid/GobackGrid';
import {InfoEditInput} from '../../components/input/InfoEditInput';
import styled from 'styled-components/native';
import CertifiactionBtn from '../../components/button/CertificationBtn';
import {updateMyInfo} from '../../api/mypageApi'
import { validatePassword } from '../../utils/CustomUtils';
import { Alert,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ErrorText } from '../../style/gridStyled';
import { useRecoilState } from 'recoil';
import { myinfoState } from '../../store/atom';

function AccountScreen(props) {

    const navigation = useNavigation();

    const [myInfo, setMyInfo] = useRecoilState(myinfoState);

    const [name, setName] = useState(myInfo.name);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const passwordInputRef = useRef(null);
    const passwordCheckInputRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false);

  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleNameTextChange = (text) => {
        console.log('이름 입력 값 확인',text)
        setName(text);
    }

    const handlePasswordTextChange = (text) => {
        console.log('비밀번호 입력 값 확인',text)
        setPassword(text);
    }

    const handlePasswordCheckTextChange = (text) => {
        console.log('비밀번호 확인 입력 값 확인',text)
        setPasswordCheck(text);
    }

        // 비밀번호 검증
    const validatePasswordInput = (password) => {
    const isValid = validatePassword(password);
    setPasswordError(isValid && password.length > 1 ? '' : '영어 소문자, 숫자, 특수문자 포함 8자리~16자리로 설정해주세요');
  };


  // 비밀번호 변경

  const infoChangeBtn = async (name, password) => {
    const updatedName = name.length > 0 ? name : myInfo.name;
    const requestBody = {
        name: updatedName
    };

    if (password) {
        requestBody.password = password;
    }

    try {
        const response = await updateMyInfo(requestBody);
        console.log('응답확인', response);
        if (response) {
            setMyInfo({...myInfo, name: updatedName});
            Alert.alert('변경 완료', '변경되었습니다', [{text: '확인', onPress: () => navigation.goBack()}]);
        }
    } catch (error) {
        if (error.code === 10106) {
            console.error('이error:', error.code === 10106, error);
            Alert.alert('오류', '다시 한번 확인해주세요!', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
        }
    }
}



    const goBack = () => {
        navigation.goBack();
    }

    const goChangeNumberScreen = () => {
        navigation.navigate("ChangePhoneNumber");
    }

    const isSamePassword = password === passwordCheck;
 
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MainContainer>
            <GobackGrid onPress={goBack}>계정 관리</GobackGrid>
            <GridMargin />
            <InfoEditInput 
            title="이름" 
            placeholder="10자까지 입력해주세요" 
            maxLength={10}
            value={name}
            onChangeText={handleNameTextChange}
            isFocused={isFocused}
            />


            <InfoEditInput 
            ref={passwordInputRef}
            maxLength={16}
            title="비밀번호 변경" 
            placeholder="영어 소문자, 숫자, 특수문자 포함 8자리~16자리" 
            value={password}
            onChangeText={handlePasswordTextChange}
            onBlur={()=>validatePasswordInput(password)}
            hasError={!!passwordError} 
            onSubmitEditing={() => passwordCheckInputRef.current.focus()}
            />
            {
                   passwordError &&  
                   <ErrorTextContainer  key={passwordError}>
                   <ErrorText>{passwordError}</ErrorText> 
                   </ErrorTextContainer>
            }
            <InfoEditInput 
            ref={passwordCheckInputRef}
            maxLength={16}
            title="비밀번호 확인" 
            placeholder="다시 입력해주세요"
            value={passwordCheck}
            onChangeText={handlePasswordCheckTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            hasError={!isSamePassword && passwordCheck.length > 7} 
            />
             {
                   !isSamePassword && passwordCheck.length > 7 &&
                   <ErrorTextContainer>
                   <ErrorText>비밀번호가 일치하지 않습니다</ErrorText> 
                   </ErrorTextContainer>
            }

            <EditNumberBtn onPress={goChangeNumberScreen}>
                <EditNumberBtnText>휴대폰번호 변경</EditNumberBtnText>
            </EditNumberBtn>

            <CertifiactionBtn 
    onPress={() => {
        if (isSamePassword) { // 비밀번호가 일치할 때만 호출
            infoChangeBtn(name, password);
        } else {
            Alert.alert('비밀번호 불일치', '비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        }
    }}
    isActive={
        name.length > 0 &&
        password.length > 7 &&
        passwordCheck.length > 7 &&
        isSamePassword // 비밀번호가 일치하는지 확인
    }
>확인</CertifiactionBtn>
        </MainContainer>
        </TouchableWithoutFeedback>
    );
}

export default AccountScreen;

const EditNumberBtn = styled.TouchableOpacity`
align-self: flex-start;
margin-top: 23px;
`

const EditNumberBtnText = styled.Text`
color: ${COLORS.gray_300};
font-size: 12px;
font-weight: 500;
text-decoration: underline;
line-height: 19.20px;
text-decoration-color: ${COLORS.gray_300};
`

const ErrorTextContainer = styled.View`
    width: 100%;
    margin-top: 3px;
    /* margin-bottom: 12px; */
`;

const GridMargin = styled.View`
    margin-top: 24px;
`;