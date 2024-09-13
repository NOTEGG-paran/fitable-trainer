import React, { useState } from 'react';
import CheckRadioBtn from '../button/CheckRadioBtn';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import ReceiptBasicNumber from '../input/ReceiptBasicNumber';
import ReceiptNoneTitle from '../input/ReceiptNoneTitle';

function ReciptSubCheckBoxGrid({resetOnCashReceiptTypeChange,cashReceiptNumber,authCode, cashReceiptNumberTextChange,authCodeTextChange,cashReceiptType, setCashReceiptType}) {

    const handlePersonal = () => {
        resetOnCashReceiptTypeChange()
        setCashReceiptType('PERSONAL');
    }

    const handleBusiness = () => {
        resetOnCashReceiptTypeChange()
        setCashReceiptType('BUSINESS');
    }
    

    return (
        <BoxContainer>
        <InfoTitleText>발행 유형</InfoTitleText>
    <CheckRadiobtnWrapper>
        <CheckRadioBtnContainer>
           <CheckRadioBtn 
               isChecked={cashReceiptType === 'PERSONAL'} 
               setIsChecked={handlePersonal}
               >개인 소득공제</CheckRadioBtn>
         </CheckRadioBtnContainer>

           <CheckRadioBtn 
               isChecked={cashReceiptType === 'BUSINESS'} 
               setIsChecked={handleBusiness}
               >사업자지출증빙</CheckRadioBtn>
            </CheckRadiobtnWrapper>

                 <ReceiptNoneTitle
                placeholder={cashReceiptType === 'PERSONAL'? '숫자 11자리 입력해주세요':'숫자 10자리 입력해주세요'}
                value={cashReceiptNumber}
                onChangeText={cashReceiptNumberTextChange}
                maxLength={cashReceiptType === 'PERSONAL'? 11:10}
                />
                <ReceiptBasicNumber 
                 title='승인번호(선택)'
                 placeholder='숫자 8자리 입력해주세요'
                 value={authCode}
                 onChangeText={authCodeTextChange}
                 maxLength={8}
                 />
        

        </BoxContainer>
    );
}

export default ReciptSubCheckBoxGrid;

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