import React from 'react';
import {COLORS} from '../../constants/color';
import styled from 'styled-components/native';



function ReceiptNoneTitle({placeholder,value,onChangeText,maxLength}) {

    return (
        <InputContainer>
                    <SelectBox
                    keyboardType="numeric"
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    returnKeyType='done'
                    >  
             </SelectBox>
        </InputContainer>
    );
}

export default ReceiptNoneTitle;

const InputContainer = styled.View`
    margin-top: 2px;
`

const SelectBox = styled.TextInput`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
`