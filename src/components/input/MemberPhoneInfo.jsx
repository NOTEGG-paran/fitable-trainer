import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";


function MemberPhoneInfo({phone, setPhone,type}) {
    const [first, setFirst] = useState(type && phone ? phone.substr(0,3) : '');
    const [second, setSecond] = useState(type && phone ? phone.substr(3,4) : '');
    const [third, setThird] = useState(type && phone ? phone.substr(7) : '');

    useEffect(() => {
        setPhone(first + second + third);
    }, [first, second, third]);

    const firstRef = useRef();
    const secondRef = useRef();
    const thirdRef = useRef();


    return (
        <>
        <InfoTitleText>휴대전화</InfoTitleText>
        <PhoneInputContainer>
            <PhoneInputText 
                ref={firstRef}
                // style={{borderWidth: 1, borderColor: 'black', width: 50, marginRight: 10}}
                value={first}
                onChangeText={(text) => {
                    setFirst(text);
                    if (text.length === 3) {
                        secondRef.current.focus();
                    }
                }}
                placeholder={'010'}
                maxLength={3}
                keyboardType="number-pad"
            />

            <LineText>-</LineText>

            <PhoneInputText 
                ref={secondRef}
                // style={{borderWidth: 1, borderColor: 'black', width: 50, marginRight: 10}}
                value={second}
                onChangeText={(text) => {
                    setSecond(text);
                    if (text.length === 4) {
                        thirdRef.current.focus();
                    }
                }}
                onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && second.length === 0) {
                        firstRef.current.focus();
                    }
                }}
                placeholder={'0000'}
                maxLength={4}
                keyboardType="number-pad"
            />

            <LineText>-</LineText>

            <PhoneInputText 
                ref={thirdRef}
                // style={{borderWidth: 1, borderColor: 'black', width: 50}}
                value={third}
                onChangeText={setThird}
                onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && third.length === 0) {
                        secondRef.current.focus();
                    }
                }}
                placeholder={'0000'}
                maxLength={4}
                keyboardType="number-pad"
            />
        </PhoneInputContainer>
        </>
    );
}

export default MemberPhoneInfo;


const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-weight: 500;
 line-height: 22.40px;
 margin-bottom: 8px;
 margin-top: 26px;
`;

const PhoneInputContainer = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`

const PhoneInputText = styled.TextInput`
 padding: 16px;
 width: 30%;
  border-radius: 13px;
  border: 1px solid ${COLORS.gray_200};
`

const LineText = styled.Text`
color: ${COLORS.gray_200};
`