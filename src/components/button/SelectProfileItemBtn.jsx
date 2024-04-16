import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import FastImage from 'react-native-fast-image';

function SelectProfileItemBtn({children, onPress}) {

    const addbtn = require('../../assets/img/plus_s.png');

    return (
    <>
    <InfoTitleText>종목</InfoTitleText>
    <AddBtnContainer onPress={onPress}>
        <AddbtnBox>
            <AddBtnText>{children}</AddBtnText>
            <AddbtnIcon source={addbtn} />
        </AddbtnBox>
    </AddBtnContainer>
    </>
    );
}

export default SelectProfileItemBtn;



const AddBtnContainer = styled.TouchableOpacity`
background-color: ${COLORS.white};
border : 1px solid ${COLORS.gray_200};
border-radius: 13px;
padding: 14px 16px;
/* margin-bottom: 22px; */
`;

const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-family: Pretendard;
 font-weight: 500;
 line-height: 22.40px;
 margin-bottom: 8px;
 margin-top: 40px;
`;


const AddbtnBox = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`

const AddbtnIcon = styled(FastImage)`
    margin-right: 8px;
    width: 22px;
    height: 22px;
`

const AddBtnText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_300};
font-weight: 400;
line-height: 22.40px;
`