import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import DetailLessonCommonGrid from '../../components/grid/DetailLessonCommonGrid';
import { useState } from 'react';

function AlarmLessonDetailScreen(props) {

    const route = useRoute();
    const { lessonDetail, routerType } = route.params;
    //추가개발시 주석 해제
    // const { lessonDetailData, routerType,lessonId } = route.params;
    // const [lessonDetail,setLessonDetail] = useState(lessonDetailData)
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    console.log('수업 디테일',lessonDetail,routerType)
    return (
        <MainContainer>
             <GobackGrid onPress={goBack}/>
             <DetailLessonCommonGrid lessonDetail={lessonDetail}routerType={routerType}
            //  lessonId={lessonId}setLessonDetail={setLessonDetail}
             />
        </MainContainer>
    );
}

export default AlarmLessonDetailScreen;