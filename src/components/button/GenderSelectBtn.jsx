import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import { COLORS } from "../../constants/color";

function GenderSelectBtn({selectedGender, setSelectedGender}) {


    const selectGender = (gender) => {
      setSelectedGender(gender);
    }

    return (
        <>
         <InfoTitleText>성별</InfoTitleText>
         <ButtonContainer>
            <GenderButton 
            selected={selectedGender === 'MALE'}
            onPress={() => selectGender('MALE')}>
             <GenderText gender='MALE' selected={selectedGender}>남성</GenderText>
            </GenderButton>
            <GenderButton 
            selected={selectedGender === 'FEMALE'}
            onPress={() => selectGender('FEMALE')}>
              <GenderText gender='FEMALE' selected={selectedGender}>여성</GenderText>
            </GenderButton>
        </ButtonContainer>
        </>
    );
}

export default GenderSelectBtn;


const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-weight: 500;
 line-height: 22.40px;
 margin-bottom: 8px;
 margin-top: 26px;
`;


const ButtonContainer = styled.View`
  flex-direction: row;
`;

const GenderButton = styled.TouchableOpacity`
  padding: 16px 36px;
  margin-right: 8px;
  border-radius: 13px;
  background-color: ${props => props.selected ? COLORS.sub : COLORS.gray_100};
`;

const GenderText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22px;
letter-spacing: -0.4px;
color: ${props => props.selected === props.gender ? COLORS.main : COLORS.gray_300};
`