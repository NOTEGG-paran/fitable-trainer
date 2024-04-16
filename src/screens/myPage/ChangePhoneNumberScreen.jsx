import { useNavigation } from '@react-navigation/native';
import { styled } from 'styled-components/native';
import { useState, useRef } from 'react';
import { TextInput ,Alert,TouchableWithoutFeedback, Keyboard } from 'react-native';
import {MainContainer} from '../../style/gridStyled'
import { COLORS } from '../../constants/color';
import GobackGrid from '../../components/grid/GobackGrid';
import { useRecoilState } from 'recoil';
import { formatTime,validatePhone } from '../../utils/CustomUtils';
import {getCertificationNumber,checkCertificationNumberTrainer,changePhone} from '../../api/certificationApi';
import { myinfoState } from '../../store/atom';
import CertifiactionBtn from '../../components/button/CertificationBtn';

function ChangePhoneNumberScreen(props) {

    const navigation = useNavigation();

    const [myInfo, setMyInfo] = useRecoilState(myinfoState);
    console.log('myInfo',myInfo.name)
    const [phone, setPhone] = useState('');
    const [number, setNumber] = useState('');

    const [secondsLeft, setSecondsLeft] = useState(180);
    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [stepBtn, setStepBtn] = useState(0);

    const goBack = () => {
        navigation.goBack();
    }

    const phoneTextChange = (text) => {
        setPhone(text);
    }

    const certificationTextChange = (text) => {
        setNumber(text);
    }


    const phoneInputRef = useRef(null);
    const certificationInputRef = useRef(null);

    const focusOnPhoneInput = () => {
        phoneInputRef.current.focus();
    };
    const focusOnCertificationInput = () => {
        certificationInputRef.current.focus();
    };

        // 휴대폰번호 변경
        const changePhoneNum = async (name, phone, number) => {
            console.log('휴대폰번호 변경 값 확인',name,phone,number)
            try{
                const response = await checkCertificationNumberTrainer({name,phone, number});
                if(response){
                    console.log('re',response)
                    changePhoneNumInnerFc(phone)
                }
            }catch(error){
                if(error.code === 10106){
                    console.error('이잉 error:', error.code === 10106,error);
                    Alert.alert('인증번호 오류', '정확한 인증번호로 입력해주세요', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
                }
            }
            
        }
    
        // 번호 변경 내부 함수
        const changePhoneNumInnerFc = async (phone) => {
            console.log('휴대폰번호 변경 값 확인3123123',phone)
            try{
                const response = await changePhone(phone);
                if(response){
                    setMyInfo({...myInfo, phone: phone});
                    Alert.alert('변경 완료', '휴대폰번호가 변경되었습니다', [
                        {text: '확인', onPress: () => navigation.navigate('MypageMain')},
                        ]);
                }else{
                    Alert.alert('인증 실패', '인증 번호를 확인해주세요.');
                }
            }catch(error){
                console.error('changePhoneNum error:', error);
                Alert.alert('에러', '휴대폰번호 변경에 실패했습니다.');
            }
        }
    
        // 인증번호 받아오기 & 재인증
        const getCertification = async (phone) => {
            try {
                const response = await getCertificationNumber(phone);
                if (response.id) {
                    setShowCertificationInput(true);
                    setStepBtn(1);
                    setSecondsLeft(180);
                const interval = setInterval(() => {
                    setSecondsLeft(prevSeconds => {
                        if (prevSeconds <= 1) {
                            clearInterval(interval); 
                            return 0;
                        }
                        return prevSeconds - 1;
                    });
                }, 1000);
                } else {
                    Alert.alert('인증 실패', '인증 번호를 받아오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('getCertification error:', error);
                Alert.alert('에러', '인증 번호를 받아오는데 문제가 발생했습니다.');
            }
        }
        console.log('@#!@#!@#',myInfo.phone, phone)
        const nextBtn = (phone) => {

            if(myInfo.phone === phone){
                Alert.alert('휴대폰번호 오류', '현재 이용 중인 휴대폰번호입니다', [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                    ]);
            }else if(phone.length !== 11){
                Alert.alert('휴대폰번호 오류', '입력하신 휴대폰번호가 올바른지\n 다시 한 번 확인해주세요', [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                  ]);
            }else if(!validatePhone(phone)){
                Alert.alert('휴대폰번호 오류', '입력하신 휴대폰번호가 올바른지\n 다시 한 번 확인해주세요', [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                  ]);
            }else{
                getCertification(phone);
            }
        }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MainContainer>
            <GobackGrid onPress={goBack}>휴대폰번호 변경</GobackGrid>
            <TextContainer>
            <GuideText>새로운 휴대폰번호</GuideText>
        </TextContainer> 
        <PasswordIputBox 
        activeOpacity={1}
        onPress={focusOnPhoneInput}>
            <TextInput
                ref={phoneInputRef}
                style={{marginLeft: 10, fontSize: 14}}
                placeholder="변경할 휴대폰번호 11자리를 - 없이 입력해주세요"
                placeholderTextColor={COLORS.gray_300}
                onChangeText={phoneTextChange}
                maxLength={11}
                keyboardType="number-pad"
                />
        </PasswordIputBox>

        {
            showCertificationInput && (
                <>
                <CertificationTextContainer>
                <GuideText>인증번호</GuideText>
     </CertificationTextContainer> 
     <CertificationIputBox 
     activeOpacity={1}
     onPress={focusOnCertificationInput}>
        <TextInput
            ref={certificationInputRef}
            style={{marginLeft: 10, fontSize: 14}}
            placeholder="인증번호 6자리를 입력해주세요"
            placeholderTextColor={COLORS.gray_300}
            onChangeText={certificationTextChange}
            maxLength={6}
            keyboardType="number-pad"
            // secureTextEntry={true}
            />
             <CertificationTimer>
            0{formatTime(secondsLeft)}
            </CertificationTimer>
        </CertificationIputBox>
        <ResendBtn onPress={()=>getCertification(phone)}>
            <ResendText>
                인증번호 재전송
            </ResendText>
        </ResendBtn>
            </>
            )
        }
             
                {
                    stepBtn === 0 ? (
                    <CertifiactionBtn 
                    isActive={phone.length === 11}
                    onPress={()=>nextBtn(phone)}>다음</CertifiactionBtn>
                    ) : (
                    <CertifiactionBtn 
                    isActive={number.length === 6}
                    onPress={()=>changePhoneNum(myInfo.name, phone, number)}>다음</CertifiactionBtn>
                    )
                }
        </MainContainer>
        </TouchableWithoutFeedback>
    );
}

export default ChangePhoneNumberScreen;



const TextContainer = styled.View`
    margin-top: 44px;
    margin-bottom: 8px;
`

const CertificationTextContainer = styled.View`
    margin-top: 23px;
    margin-bottom: 8px;
`

const GuideText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const PasswordIputBox = styled.TouchableOpacity`
flex-direction: row;
border: 1px solid ${COLORS.gray_200}; 
border-radius: 13px;
height: 52px;
align-items: center;
`

const CertificationIputBox = styled.TouchableOpacity`
flex-direction: row;
border: 1px solid ${COLORS.gray_200}; 
border-radius: 13px;
height: 52px;
align-items: center;
`;

const CertificationTimer = styled.Text`
    position: absolute;
    right: 10px;
    color: #FF7A00;
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
`;


const ResendBtn = styled.TouchableOpacity`
    margin-top: 8px;
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