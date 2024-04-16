import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 

function NoListCard({children}) {
    return (
        <Container>
            <NoListText>{children}</NoListText>
        </Container>
    );
}

export default NoListCard;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.white};
`;

const NoListText = styled.Text`
 font-size: 16px;
color: ${COLORS.gray_400};
font-weight: 500;
line-height: 22.40px;
`;

