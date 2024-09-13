import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { COLORS } from "../../constants/color";
function CheckRadioBtn({isChecked, setIsChecked, children}) {

    return (
        <CheckBoxWrapper onPress={() => setIsChecked(!isChecked)}>
        <CheckBoxContainer 
        isChecked={isChecked}
        >
            {isChecked && <CheckedCircle isChecked={isChecked}/>}
        </CheckBoxContainer>
        <CheckText isChecked={isChecked}>{children}</CheckText>
        </CheckBoxWrapper>
    );
}

export default CheckRadioBtn;

const CheckBoxWrapper = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const CheckBoxContainer = styled.View`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid ${props => props.isChecked ? COLORS.sub : COLORS.gray_300};
    justify-content: center;
    align-items: center;
    background-color: ${props => props.isChecked ? COLORS.sub : COLORS.white};
`;

const CheckedCircle = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${props => props.isChecked ? COLORS.white : COLORS.sub};
`;

const CheckText = styled.Text`
   font-size: 14px;
font-weight: 400;
line-height: 22.40px;
    color: ${props => props.isChecked ? COLORS.sub : COLORS.gray_300};
    margin-left: 6px;
`;
