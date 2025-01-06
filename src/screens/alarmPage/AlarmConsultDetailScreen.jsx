/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: AlarmConsultDetailScreen.js
 * 3. **설명**:
 *    - 상담 알림 상세 정보를 표시하는 화면.
 *    - 이전 화면으로 돌아가기 버튼 및 상담 상세 내용을 표시하는 컴포넌트를 포함.
 *
 * 4. **주요 로직**:
 *    - **네비게이션 및 라우팅**:
 *      - `useRoute`를 통해 이전 화면에서 전달된 `consultDetail` 데이터를 수신.
 *      - `useNavigation`을 사용하여 이전 화면으로 이동 가능.
 *    - **상담 상세 데이터 표시**:
 *      - `AlarmDetailConsultGrid` 컴포넌트를 활용하여 상담 상세 데이터를 화면에 표시.
 *
 * 5. **주요 기능**:
 *    - **뒤로가기 버튼**:
 *      - `GobackGrid` 컴포넌트를 통해 이전 화면으로 이동.
 *    - **상담 상세 정보 표시**:
 *      - `consultDetail` 데이터를 `AlarmDetailConsultGrid`에 전달하여 상세 내용을 렌더링.
 *
 */

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