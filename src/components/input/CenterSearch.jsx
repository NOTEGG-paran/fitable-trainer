import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import { TextInput, Image } from "react-native";
import { useRef } from 'react';
import FastImage from 'react-native-fast-image';
function CenterSearch({onFocus, onBlur, onChangeText, onSubmitEditing}) {

    const search = require('../../assets/img/searchicon.png');
    const inputRef = useRef(null);

    const focusTextInput = () => {
        inputRef.current.focus();
    };
    return (
        <SearchContainer onPress={focusTextInput} activeOpacity={1}>
        <ImageIcon source={search}/>
        <TextInput
         ref={inputRef}
        style={{marginLeft: 10, fontSize: 16, color: COLORS.sub}}
        placeholder="센터 검색"
        placeholderTextColor={COLORS.gray_300}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="done"
        />
        </SearchContainer>
    );
}

export default CenterSearch;


const SearchContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    background-color: ${COLORS.gray_100};
    height: 50px;
    border-radius: 13px;
    margin-bottom: 16px;
    margin-top: 44px;
`

const ImageIcon = styled(FastImage)`
    margin-left: 16px;
    width: 20px;
    height: 20px;
`