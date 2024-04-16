import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function MainLongTextGrid({children}) {
    return (
        <LongText>
            {children}
        </LongText>
    );
}

export default MainLongTextGrid;

const LongText = styled.Text`
color: ${COLORS.sub};
font-size: 28px;
font-family: 'Pretendard-Regular';
font-weight: 400;
line-height: 37.80px;
`;