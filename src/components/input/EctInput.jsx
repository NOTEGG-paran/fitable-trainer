
import React from 'react';
import { COLORS } from "../../constants/color";
import { styled } from "styled-components/native";
import { TextInput,Platform,Dimensions } from "react-native";

export const EctInput = React.forwardRef(({placeholder, 
    text,onChangeText,value,onBlur, 
    onFocus,hasError,maxLength,isFocused,
    onSubmitEditing,secureTextEntry}, ref) => {

    return (
        <AuthTextInputContainer hasError={hasError} isFocused={isFocused}>
            <AuthText>{text}</AuthText>
            <AuthTextInput 
            ref={ref}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            maxLength={text==='연락처'? maxLength: text ==="인증번호" ? 6:null}
            keyboardType={text==='연락처' || text==='인증번호'? 'numeric':'default'}
            returnKeyType={text==='연락처'? 'done':'next'}
            onSubmitEditing={onSubmitEditing}
            />
        </AuthTextInputContainer>
    );
})




const { height } = Dimensions.get('window');
const AuthTextInputContainer = styled.View`
    /* display: ${props => props.isFocused && Platform.OS ==='android' ? 'none' : ''}; */
    display: ${(props) => (props.isFocused && ((Platform.OS === 'android') || (Platform.OS === 'ios' && height <= 680))) ? 'none' : 'flex'};
    width: 100%;
    height: 70px;
    background-color: ${COLORS.gray_100};
    border-radius: 15px;
    margin-bottom: 13px;
    padding:${Platform.OS === 'ios' ? '20px 20px 0px 20px;' : '25px 20px 0 20px'};
    color: ${COLORS.white};
    border-width: ${props => props.hasError ? '1px' : '0px'};
   border-color: ${props => props.hasError ? 'red' : 'transparent'};
    ${props => props.isPasswordInput && `
   
    `}
`;

const AuthText = styled.Text`
    position: absolute;
    top: 15px;
    left: ${Platform.OS === 'ios' ? '20px' : '25px'};
    color: ${COLORS.gray_300};
    font-size: 12px;
    font-weight: 500;
    
`;

const AuthTextInput = styled(TextInput).attrs(() => ({
    placeholderTextColor: COLORS.gray_300,
}))`
    flex: 1;
    color: ${COLORS.sub};
    font-size: 14px;
    font-weight: 500;
    line-height: 22.40px;
`;

