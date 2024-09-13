import React from 'react';
import { COLORS } from '../../constants/color';
import styled from 'styled-components/native';
import { formatCommaNumber } from '../../utils/CustomUtils';

function PaymentPrice({ priceTextChange, price }) {
  const handleTextChange = (text) => {
    if (text === '') {
      priceTextChange('');
    } else {
      priceTextChange(text.replace(/,/g, '')); // 콤마 제거 후 전달
    }
  };

  return (
    <InputContainer>
      <InfoTitleText>결제금액(원)</InfoTitleText>
      <SelectBox
        placeholder={'0'}
        keyboardType="numeric"
        // value={formatCommaNumber(price)}
        value={price}
        onChangeText={handleTextChange}
        returnKeyType='done'
        maxLength={10}
      />
    </InputContainer>
  );
}

export default PaymentPrice;

const InputContainer = styled.View`
  margin-top: 20px;
`;

const InfoTitleText = styled.Text`
  color: ${COLORS.gray_400};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 8px;
`;

const SelectBox = styled.TextInput`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${COLORS.gray_100};
  border-radius: 13px;
  padding: 15px 16px;
  background-color: ${COLORS.gray_100};
`;
