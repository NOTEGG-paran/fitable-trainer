/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: FindPassword.js
 * 3. **설명**:
 *    - 사용자의 휴대폰 인증을 통해 비밀번호 재설정을 위한 화면.
 *    - 이름과 연락처를 입력받아 인증번호를 요청하고, 입력된 인증번호를 확인.
 *
 * 4. **주요 로직**:
 *    - **휴대폰 인증 요청**:
 *      - `getCertificationNumber` API를 호출하여 인증번호를 요청.
 *      - 요청 성공 시 인증번호 입력 필드를 표시하고, 3분(180초) 타이머 시작.
 *    - **인증번호 확인**:
 *      - `checkCertificationNumberTrainer` API를 호출하여 인증번호 확인.
 *      - 인증 성공 시 휴대폰 번호를 저장하고, 비밀번호 재설정 화면으로 이동.
 *    - **재전송 및 타이머 관리**:
 *      - 인증번호 만료 시 재전송 버튼 활성화.
 *      - 타이머는 1초 단위로 감소하며 0초가 되면 멈춤.
 *    - **유효성 검사**:
 *      - 이름과 휴대폰 번호 입력값을 확인하여 버튼 활성화 여부 결정.
 *      - 인증번호는 6자리 입력으로 제한.
 *
 * 5. **주요 기능**:
 *    - **인증번호 요청 및 확인**:
 *      - 사용자가 입력한 정보를 기반으로 인증번호를 발송 및 확인.
 *    - **타이머 및 재전송 기능**:
 *      - 인증번호의 유효시간을 관리하며, 만료 시 재전송 기능 제공.
 *    - **에러 처리**:
 *      - 인증번호 입력 오류, 만료, 서버 오류 등 다양한 상황에 따른 알림 처리.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - `myPhoneState`를 사용해 인증 성공 후 휴대폰 번호를 전역 상태로 저장.
 *    - **CustomUtils 및 API 활용**:
 *      - `formatTime` 유틸리티로 타이머 포맷팅.
 *      - `getCertificationNumber`와 `checkCertificationNumberTrainer` API 호출로 인증 처리.
 *    - **Styled-Components 사용**:
 *      - 입력 필드와 버튼 등 UI 요소의 스타일 정의.
 *    - **실시간 유효성 검사**:
 *      - 입력값에 따라 버튼 활성화 상태를 동적으로 변경.
 */

import styled from 'styled-components/native';
import {COLORS} from '../../constants/color';
import GobackGrid from '../../components/grid/GobackGrid';
import MainLongTextGrid from '../../components/grid/MainLongTextGrid';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled';
import {EctInput} from '../../components/input/EctInput';
import CertifiactionBtn from '../../components/button/CertificationBtn';
import { useState,useRef } from 'react';
import { formatTime } from '../../utils/CustomUtils';
import { getCertificationNumber,checkCertificationNumberTrainer } from '../../api/certificationApi';
import { myPhoneState } from '../../store/atom';
import { useSetRecoilState } from 'recoil';
import {Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

function FindPassword(props) {

    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }
    const setMyPhone = useSetRecoilState(myPhoneState);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [number, setNumber] = useState('');

    const [secondsLeft, setSecondsLeft] = useState(180);
    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [stepBtn, setStepBtn] = useState(0);

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const inputRef = useRef();
    const handleNameTextChange = (text) => {
        console.log('이름',text)
        setName(text);
    }

    const handlePhoneTextChange = (text) => {
        console.log('폰',text)
        setPhone(text);
    }

    const handleCertiNumberTextChange = (text) => {
        console.log('번호',text)
        setNumber(text);
    }

    let interval; 
     // 인증번호 받아오기 & 재인증
     const getCertification = async (phone) => {
        try {
            const response = await getCertificationNumber(phone);
            console.log('res',response)
            if (response.id) {
                setShowCertificationInput(true);
                setStepBtn(1);
                setSecondsLeft(180);
            interval = setInterval(() => {
                setSecondsLeft(prevSeconds => {
                    if (prevSeconds <= 1) {
                        clearInterval(interval); 
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
            } else {
                Alert.alert('인증 실패', '인증번호를 받아오는 데 실패했습니다');
            }
        } catch (error) {
            console.error('getCertification error:', error);
            Alert.alert('에러', '인증번호를 받아오는 데 문제가 발생했습니다');
        }
    }

    // 인증번호 확인
    const checkCerityNumber = async (name, phone, number) => {
        console.log('인증번호 확인', name, phone, number)
        if(number.length!==6){
            Alert.alert('인증번호 오류', '인증번호를 입력해주세요', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
        }
        try{
            const response = await checkCertificationNumberTrainer({name,phone, number});
            if(response){
            // console.log('인증번호 확인', response)
            clearInterval(interval); 
            setMyPhone(phone);
            Alert.alert('인증번호 확인', '인증번호를 확인하였습니다.',[{text: '확인', onPress: () => navigation.navigate('NewPassword')}]);
            }
        }catch(error){
            console.log('인증번호 확인 error', error.code)
        if(error.code === 10106){
            Alert.alert('인증번호 오류', '정확한 인증번호로 다시 입력해주시길 바랍니다', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
         }else if(error.code === 10107){
            Alert.alert('인증번호 오류', '인증번호가 만료되었습니다. 인증번호를 재전송해주세요', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
         }else if(error.code === 10109){
            Alert.alert('변경 실패', '회원 정보를 올바르게 입력해주세요.', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
        }else{
            Alert.alert('인증번호 오류', '인증번호를 확인하는데 실패했습니다.', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
        }
    }
}

    const nextBtn = (phone) => {
        const phoneRegex = /^010\d{8}$/;
        if(!phoneRegex.test(phone)){
            Alert.alert('휴대폰번호 오류', '올바른 휴대폰번호로 11자리를 입력해주세요', [
                {text: '확인', onPress: () => console.log('OK Pressed')},
              ]);
            return;
        }else{
            getCertification(phone);
        }
    }

    const isCertiActive = name.length > 1  && phone.length === 11;
    // focus={isFocused}
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MainContainer>

            <GobackGrid onPress={goBack}/>
            <TextContainer>
            <MainLongTextGrid>휴대폰번호 인증으로</MainLongTextGrid>
            <MainLongTextGrid>비밀번호를 다시 설정합니다</MainLongTextGrid>
            </TextContainer>

        
            <EctInput 
            text='이름'
            placeholder="이름을 입력해주세요"
            onChangeText={handleNameTextChange}
            />
            <EctInput 
             isFocused={isFocused}
             text='연락처'
             maxLength={11}
             placeholder="-없이 번호를 입력해주세요"
             onChangeText={handlePhoneTextChange}
            />

            {
                     showCertificationInput && 
                     (
                        <>
                        <CertificationIputBox>
                          <EctInput 
                           text='인증번호'
                           placeholder="6자리를 입력해주세요"
                           onChangeText={handleCertiNumberTextChange}
                           maxLength={6}
                           keyboardType="numeric"
                           ref={inputRef}
                           onFocus={handleFocus}
                           onBlur={handleBlur}
                           />
                            <CertificationTimer>0{formatTime(secondsLeft)}</CertificationTimer>
                        </CertificationIputBox>

                        <ResendBtn onPress={()=>getCertification(phone)}>
                            <ResendText>인증번호 재전송</ResendText>
                        </ResendBtn>
                        </>
                            )
                }



            {
                stepBtn === 0 ? 
                (
                    <CertifiactionBtn
                    onPress={()=>nextBtn(phone)} 
                    isActive={isCertiActive}>인증번호 받기</CertifiactionBtn>
                    ):(
                    <CertifiactionBtn
                    onPress={()=>checkCerityNumber(name,phone,number)}
                    isActive={isCertiActive}>다음</CertifiactionBtn> 
                )
            }
        </MainContainer>
        </TouchableWithoutFeedback>
    );
}

export default FindPassword;



const TextContainer = styled.View`
    margin-bottom: 50px;
    margin-top: 44px;
`

const CertificationIputBox = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`;

const ResendBtn = styled.TouchableOpacity`
align-self: flex-end;
`

const ResendText = styled.Text`
color: ${COLORS.gray_300};
font-size: 12px;
font-weight: 500;
text-decoration: underline;
line-height: 19.20px;
text-decoration-color: ${COLORS.gray_300};
`

const CertificationTimer = styled.Text`
position: absolute;
right: 20px;
bottom: 22px;
color: #FF7A00;
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
`;
