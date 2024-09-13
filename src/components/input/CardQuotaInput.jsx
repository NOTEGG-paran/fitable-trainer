import React, { useState } from 'react';
import { Alert } from 'react-native';
import { COLORS } from '../../constants/color';
import styled from 'styled-components/native';

function CardQuotaInput({ title, placeholder, value, maxLength, onChangeText }) {
    const [inputValue, setInputValue] = useState(value);

    const handleChangeText = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setInputValue(numericText);
        onChangeText(numericText);
    };

    const handleEndEditing = () => {
        if (inputValue === '') {
            // 입력 값이 비어 있을 경우 기본값으로 설정
            setInputValue('');
            onChangeText('');
            return;
        }

        const num = parseInt(inputValue, 10);
        if (num < 1 || num > 24 || isNaN(num)) {
            Alert.alert(
                '입력 오류',
                '1에서 24 사이의 값을 입력해주세요',
                [{ text: '확인' }]
            );
            setInputValue('1'); // 기본값으로 설정하거나 적절한 값으로 설정
            onChangeText('1'); // 기본값으로 다시 설정
        }
    };

    return (
        <InputContainer>
            <InfoTitleText>{title}</InfoTitleText>
            <SelectBox
                placeholder={placeholder}
                keyboardType="numeric"
                value={inputValue}
                onChangeText={handleChangeText}
                onEndEditing={handleEndEditing}
                returnKeyType="done"
                maxLength={maxLength}
            />
        </InputContainer>
    );
}

export default CardQuotaInput;

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
    width: 100%;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
`;
