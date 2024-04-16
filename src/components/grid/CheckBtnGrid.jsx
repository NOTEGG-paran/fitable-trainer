import React, { useState } from 'react';
import CheckRadioBtn from '../button/CheckRadioBtn';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';

function CheckBtnGrid({selectedCheckBox, setSelectedCheckBox,resetClassData,setIsActive}) {

    // console.log('체크박스 선택',selectedCheckBox)

    const handleSingle = () => {
        setSelectedCheckBox('SINGLE');
        // setClassDate 초기화
        resetClassData();
        setIsActive(false);
    }

    const handleMultiple = () => {
        setSelectedCheckBox('MULTIPLE');
        // setClassDate 초기화
        resetClassData();
        setIsActive(false);
    }
    

    return (
    <CheckRadiobtnWrapper>
        <CheckRadioBtnContainer>
           <CheckRadioBtn 
               isChecked={selectedCheckBox === 'SINGLE'} 
               setIsChecked={handleSingle}
               >일회성</CheckRadioBtn>
         </CheckRadioBtnContainer>

           <CheckRadioBtn 
               isChecked={selectedCheckBox === 'MULTIPLE'} 
               setIsChecked={handleMultiple}
           >반복</CheckRadioBtn>
    </CheckRadiobtnWrapper>
    );
}

export default CheckBtnGrid;

const CheckRadiobtnWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 30px;
`

const CheckRadioBtnContainer = styled.View`
    margin-right: 20px;
`