/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: AlarmLessonDetailScreen.js
 * 3. **설명**:
 *    - 알림에서 클릭한 수업의 상세 정보를 표시하는 화면.
 *    - 수업 상세 데이터를 기반으로 정보와 상태를 관리하며, 상세 화면 컴포넌트를 포함.
 *
 *
 */


import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
//추가개발
import DetailLessonCommonGrid from '../../components/grid/DetailLessonCommonGridadd';
import { useState } from 'react';

function AlarmLessonDetailScreen(props) {

    const route = useRoute();
    // const { lessonDetail, routerType } = route.params;
    //추가개발시 주석 해제
    const { lessonDetailData, routerType,lessonId } = route.params;
    const [lessonDetail,setLessonDetail] = useState(lessonDetailData)
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    console.log('수업 디테일',lessonDetail,routerType)
    return (
        <MainContainer>
             <GobackGrid onPress={goBack}/>
             <DetailLessonCommonGrid lessonDetail={lessonDetail}routerType={routerType}
             // 추가개발 수업
             lessonId={lessonId}setLessonDetail={setLessonDetail}
             />
        </MainContainer>
    );
}

export default AlarmLessonDetailScreen;