import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";

function MemberBtn({children, onPress, colorProp}) {

    const handlePress = () => {
        console.log('MainBtn pressed');
        onPress()
    }
    return (
        <StyledPressable   
            onPress={handlePress}
            colorProp={children==='예약취소' ? true : false}
            >
            <StyledText colorProp={children==='예약취소' ? true : false}>
                {children}
            </StyledText>
        </StyledPressable>
    );
}

export default MemberBtn;


const StyledPressable = styled.Pressable`
    padding: 20px 52px;
    border-radius: 90px;
    justify-content: center;
    align-items: center;
    background-color: ${({ colorProp }) => (colorProp ? COLORS.gray_100 : COLORS.sub)};
    margin-top: 40px;
    margin-bottom: 30px;
`

const StyledText = styled.Text`
font-size: 16px;
font-weight: 600;
     color: ${({ colorProp }) => (colorProp ? COLORS.gray_400 : COLORS.white)};
`
