import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import { COLORS } from '../../constants/color';
import { styled } from 'styled-components/native';
import CenterAddGrayBtn from '../../components/button/CenterAddGrayBtn';
import { useRecoilState } from 'recoil';
import { centerListState,centerIdState } from '../../store/atom';
import CenterListDeleteCard from '../../components/card/CenterListDeleteCard';

function CenterSettingScreen(props) {
    const navigation = useNavigation();
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const goBack = () => {
        navigation.goBack();
    }

    const goSearchScreen = () => {
        navigation.navigate('MyCenterSearch');
    }
    // console.log('22',centerList)
    return (
        <MainContainer>
            <GobackGrid onPress={goBack}>연동센터 설정</GobackGrid>
            <TitleText>연동 중인 센터</TitleText>
            <CenterListDeleteCard centerId={centerId}setCenterId={setCenterId}centerList={centerList} setCenterList={setCenterList} goSearchScreen={goSearchScreen}/>
            {/* <CenterAddGrayBtn onPress={goSearchScreen}>회원 선택</CenterAddGrayBtn> */}
        </MainContainer>
    );
}

export default CenterSettingScreen;

const TitleText = styled.Text`
font-size: 20px;
font-weight: 600;
line-height: 28px;
color: ${COLORS.sub};
margin-bottom:26px;
margin-top: 44px;
`