import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import { TextInput, Platform ,Dimensions} from "react-native";
import { useRef } from 'react';
import FastImage from 'react-native-fast-image';
function MemberSearch({onChange,searchText}) {
    const windowWidth = Dimensions.get('window').width;
    const search = require('../../assets/img/searchicon.png');
    const inputRef = useRef(null);

    const handlePress = () => {
      // TextInput에 포커스를 줌
      inputRef.current.focus();
    };
    return (
        <SearchContainer onPress={handlePress}>
         <ImageIcon source={search}/>
             <TextInput
                ref={inputRef} 
                style={{
                    marginLeft: 10, 
                    fontSize: Platform.OS === 'android' && windowWidth <= 360 ? 14 : 16,
                    color: COLORS.sub
                }}
                 value={searchText}
                 placeholder="회원 이름 또는 전화번호 뒷자리 4자리"
                 placeholderTextColor={COLORS.gray_300}
                 returnKeyType="done"
                 onChangeText={onChange}
              />
        </SearchContainer>
    );
}

export default MemberSearch;


const SearchContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    background-color: ${COLORS.gray_100};
    height: 50px;
    border-radius: 13px;
    margin-bottom: 16px;
`

const ImageIcon = styled(FastImage)`
    margin-left: 16px;
    width: 20px;
    height: 20px;
`