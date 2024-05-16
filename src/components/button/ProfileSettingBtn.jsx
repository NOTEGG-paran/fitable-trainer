import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";

function ProfileSettingBtn({children, onPress, isActive,openDateSelectModal,isEditMode}) {
    const handlePress = () => {
        if(isActive){
            console.log('s나ㅡㄹ릭')
            onPress();
        }
    }

    return (
        <BasicMainBtnContainer>
        <BasicMainBtnNextBtn onPress={handlePress} isActive={isActive} disabled={!isActive}>
            <BasicMainBtnNextBtnNextText isActive={isActive}>{children}</BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
        {
            isEditMode && (
            <DeleteBtnContainer onPress={openDateSelectModal}>
                <DeleteBtnText>프로필 삭제</DeleteBtnText>
            </DeleteBtnContainer>
            )
        }
        </BasicMainBtnContainer>
    );
}

export default ProfileSettingBtn;

const BasicMainBtnContainer = styled.View`
    background-color: ${COLORS.white};
    margin-bottom: 20px;
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
const DeleteBtnContainer = styled.TouchableOpacity`
display: flex;
padding: 20px;
align-items: center;
justify-content: center;
`

const DeleteBtnText = styled.Text`
color: ${COLORS.gray_300};
font-size: 16px;
font-weight: 500;
line-height: 22px;
letter-spacing: -0.4px;
`