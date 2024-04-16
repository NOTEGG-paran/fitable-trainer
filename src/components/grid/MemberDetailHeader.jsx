import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import GobackWhiteGrid from '../../components/grid/GobackWhiteGrid';
import { useNavigation } from '@react-navigation/native';
import {formatPhoneNumber} from '../../utils/CustomUtils';
import {Linking} from 'react-native';
import Communications from 'react-native-communications';
import FastImage from 'react-native-fast-image';
function MemberDetailHeader({detailData, isPotential}) {

    const navigation = useNavigation();


    const goBack = () => {
        if(isPotential){
            navigation.goBack()
        }else{
            navigation.navigate('Schedule')
        }
    }

    const dialCall = (number) => {
        let phoneNumber = `tel:${number}`;
        Linking.openURL(phoneNumber);
      };

      const sendMessage = (number) => {
        Communications.text(number);
    };

    const sendMsg = require('../../assets/img/emailIcon.png');
    const call = require('../../assets/img/phoneIcon.png');
    // console.log('detailData',detailData.member.generation)
    return (
        <HeaderContainer>
        <GobackWhiteGrid onPress={goBack}>회원 정보</GobackWhiteGrid>
        <MainHeaderContainer>
            <MainLeftHeaderContainer>
                   <MainHeaderTitleText>{detailData?.member?.name ? detailData.member.name :'알수 없음'}</MainHeaderTitleText>
                 <LeftInfoContainer>
                   <MainHeaderPhoneTitleText>{formatPhoneNumber(detailData?.member?.phone)}</MainHeaderPhoneTitleText>
                   {detailData?.member?.generation !== null && 
                   <MainHeaderPhoneTitleText>• {detailData?.member?.generation}대</MainHeaderPhoneTitleText>}
                 </LeftInfoContainer>
            </MainLeftHeaderContainer>
            
            <RightInfoContainer>
                <IconWrapper onPress={() => sendMessage(detailData?.member?.phone)}>
                    <InfoIcon source={sendMsg}/>
                </IconWrapper>
                <IconWrapper onPress={() => dialCall(detailData?.member?.phone)}>
                    <InfoIcon source={call}/>
                </IconWrapper>
            </RightInfoContainer>
        </MainHeaderContainer>
    </HeaderContainer>
    );
}

export default MemberDetailHeader;


const HeaderContainer = styled.View`
    width: 100%;
    height: 160px;
    background-color: ${COLORS.sub};
    padding: 0 20px;
`;

const MainHeaderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const MainLeftHeaderContainer = styled.View`
    flex-direction: column;
`

const LeftInfoContainer = styled.View`
    flex-direction: row;
`

const MainHeaderTitleText = styled.Text`
    font-size: 24px;
    font-weight: 700;
    line-height: 32.40px;
    color: ${COLORS.white};
`;

const MainHeaderPhoneTitleText = styled.Text`
    font-size: 14px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.gray_200};
`;

const RightInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;


const IconWrapper = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    background-color: ${COLORS.box};
    justify-content: center;
    align-items: center;
    margin-left: 13px;
`;

const InfoIcon = styled(FastImage)`
    width: 32px;
    height: 32px;
`;
