import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { formatPhoneNumber } from '../../utils/CustomUtils';
import FastImage from 'react-native-fast-image';
function MyProfileHeaderGrid({name, phone, onPress}) {

 const rightIcon = require('../../assets/img/rightIcon.png')

    return (
        <>
        <UserHeaderContainer>
            <UserHeaderLeftContainer onPress={onPress}>
            <MyNameText>{name} 강사</MyNameText>
            <RigthIcon source={rightIcon}/>
            </UserHeaderLeftContainer>
        </UserHeaderContainer>
        
        <UserPhoneNumberText>{formatPhoneNumber(phone)}</UserPhoneNumberText>
  </>
    );
}

export default MyProfileHeaderGrid;

const UserHeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const UserHeaderLeftContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`


const RigthIcon = styled(FastImage)`
    width: 20px;
    height: 20px;
    margin-left: 2px;
`

const MyNameText = styled.Text`
    font-size: 20px;
color: ${COLORS.sub};
font-weight: 700;
line-height: 30px;
`

const UserPhoneNumberText = styled.Text`
    font-size: 16px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_300};
margin-bottom: 20px;
`

