import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import AlarmDetailConsultGrid from '../../components/grid/AlarmDetailConsultGrid';

function AlarmConsultDetailScreen(props) {

    const route = useRoute();
    const { consultDetail} = route.params;
    const navigation = useNavigation();

    // console.log('상담 디테일',consultDetail)

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <MainContainer>
            <GobackGrid onPress={goBack}/>
            <AlarmDetailConsultGrid consultDetail={consultDetail}/>
        </MainContainer>
    );
}

export default AlarmConsultDetailScreen;