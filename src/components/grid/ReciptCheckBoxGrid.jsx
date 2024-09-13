import React, { useState } from 'react';
import CheckRadioBtn from '../button/CheckRadioBtn';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';

function ReciptCheckBoxGrid({setSelectedCheckBox,selectedCheckBox,resetOnIsPublishCashReceiptChange}) {

    // console.log('체크박스 선택',selectedCheckBox)

    const handleSingle = () => {
        resetOnIsPublishCashReceiptChange()
        setSelectedCheckBox(false);
    }

    const handleMultiple = () => {
        resetOnIsPublishCashReceiptChange()
        setSelectedCheckBox(true);
    }
    

    return (
        <BoxContainer>
        <InfoTitleText>현금영수증 발행 여부</InfoTitleText>
    <CheckRadiobtnWrapper>
        <CheckRadioBtnContainer>
           <CheckRadioBtn 
               isChecked={selectedCheckBox === false} 
               setIsChecked={handleSingle}
               >미발행</CheckRadioBtn>
         </CheckRadioBtnContainer>

           <CheckRadioBtn 
               isChecked={selectedCheckBox === true} 
               setIsChecked={handleMultiple}
               >발행</CheckRadioBtn>
    </CheckRadiobtnWrapper>
        </BoxContainer>
    );
}

export default ReciptCheckBoxGrid;

const BoxContainer = styled.View`
    margin-top: 20px;
`


const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-weight: 500;
 line-height: 22px;
 margin-bottom: 8px;
`;

const CheckRadiobtnWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 8px;
`

const CheckRadioBtnContainer = styled.View`
    margin-right: 20px;
`