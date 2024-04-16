import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";

function BasicMainBtn({children, onPress, isActive}) {
    const handlePress = () => {
        if(isActive){
            onPress();
        }
    }

    return (
        <BasicMainBtnContainer>
        <BasicMainBtnNextBtn onPress={handlePress} isActive={isActive}>
            <BasicMainBtnNextBtnNextText isActive={isActive}>{children}</BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
        </BasicMainBtnContainer>
    );
}

export default BasicMainBtn;

const BasicMainBtnContainer = styled.View`
    position: absolute;
    bottom: 0px;
    left: 20px;
    right: 20px;
    height: 80px;
    background-color: ${COLORS.white};
    /* align-items: center; */
    /* justify-content: center;     */
`

const BasicMainBtnNextBtn = styled.TouchableOpacity`
    background-color: ${props => props.isActive ? COLORS.sub : COLORS.gray_100};
    border-radius: 90px;
    align-items: center;
    justify-content: center;
    padding: 14px 0;
    width: 100%;
`;

const BasicMainBtnNextBtnNextText = styled.Text`
font-size: 16px;
font-weight: 600;
line-height: 22.40px;
color: ${props => props.isActive ? COLORS.white : COLORS.gray_300};
`
