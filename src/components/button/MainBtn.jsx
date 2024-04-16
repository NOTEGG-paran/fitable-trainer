// UI-MainBtn
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";


function MainBtn({children, onPress, colorProp,disabled}) {



    const handlePress = () => {
        console.log('MainBtn pressed');
        onPress()
    }

    return (
            <StyledPressable
                onPress={handlePress}
                colorProp={colorProp}
                disabled={!colorProp || disabled} 
            >
                <StyledText
                colorProp={colorProp}
                >{children}</StyledText>
            </StyledPressable>
    );
}

export default MainBtn;




const StyledPressable = styled.Pressable`
    width: 100%;
    height: 60px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color: ${({ colorProp }) => (colorProp ? COLORS.sub : COLORS.gray_200)};
    margin-top: 49px;
    margin-bottom: 23px;
`

const StyledText = styled.Text`
     color: ${({ colorProp }) => (colorProp ? COLORS.white : COLORS.gray_300)};
`
