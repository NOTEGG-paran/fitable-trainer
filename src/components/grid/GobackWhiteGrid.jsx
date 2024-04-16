import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import FastImage from 'react-native-fast-image';
function GobackWhiteGrid({children, onPress}) {
    
const whiteArrow = require('../../assets/img/back_white.png');
    return (
        <GobackTouchable onPress={onPress}>
            <FastImage source={whiteArrow}    
             style={{width: 24, height: 20}}
             resizeMode='contain'
             />
            <TitleText>{children}</TitleText>
        </GobackTouchable>
    );
}

export default GobackWhiteGrid;

const GobackTouchable = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
margin-bottom: 44px;
`;

const TitleText = styled.Text`
color: ${COLORS.white};
font-size: 20px;
font-weight: 600;
margin-left: 12px;
`
