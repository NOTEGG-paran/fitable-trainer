import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import DetailLessonCommonGrid from '../../components/grid/DetailLessonCommonGrid';


function AlarmLessonDetailScreen(props) {

    const route = useRoute();
    const { lessonDetail, routerType } = route.params;
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    console.log('수업 디테일',lessonDetail,routerType)
    return (
        <MainContainer>
             <GobackGrid onPress={goBack}/>
             <DetailLessonCommonGrid lessonDetail={lessonDetail}routerType={routerType}/>
        </MainContainer>
    );
}

export default AlarmLessonDetailScreen;