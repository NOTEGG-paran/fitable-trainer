import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import DetailLessonCommonGrid from '../../components/grid/DetailLessonCommonGrid';
import { useState } from 'react';

function AlarmLessonDetailScreen(props) {

    const route = useRoute();
    const { lessonDetailData, routerType,lessonId } = route.params;
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    const [lessonDetail,setLessonDetail] = useState(lessonDetailData)

    console.log('수업 디테일',lessonDetail,routerType)
    return (
        <MainContainer>
             <GobackGrid onPress={goBack}/>
             <DetailLessonCommonGrid lessonDetail={lessonDetail}routerType={routerType}lessonId={lessonId}setLessonDetail={setLessonDetail}/>
        </MainContainer>
    );
}

export default AlarmLessonDetailScreen;