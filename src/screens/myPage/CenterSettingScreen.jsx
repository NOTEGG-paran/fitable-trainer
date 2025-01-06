/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: CenterSettingScreen.js
 * 3. **설명**:
 *    - 연동된 센터 목록을 관리하는 화면.
 *    - 사용자가 연동된 센터를 확인하고 삭제하거나, 새로운 센터를 추가할 수 있는 기능 제공.
 *
 * 4. **주요 로직**:
 *    - **센터 목록 관리**:
 *      - Recoil 상태(`centerListState`, `centerIdState`)를 사용해 연동된 센터 목록 및 선택된 센터 ID 관리.
 *    - **센터 삭제**:
 *      - `CenterListDeleteCard` 컴포넌트를 통해 특정 센터를 삭제.
 *    - **센터 추가 화면 이동**:
 *      - 'MyCenterSearch' 화면으로 이동해 새로운 센터를 검색 및 추가 가능.
 *
 * 5. **주요 기능**:
 *    - **연동된 센터 목록 표시**:
 *      - 연동된 센터 목록을 확인하고 삭제할 수 있는 UI 제공.
 *    - **센터 추가**:
 *      - 버튼을 통해 새로운 센터를 추가할 수 있도록 다른 화면으로 이동.
 *    - **Recoil 상태 관리**:
 *      - 연동 센터 목록 및 현재 선택된 센터를 Recoil 상태로 관리.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - `centerListState`, `centerIdState`를 사용해 센터 데이터 관리.
 *    - **Navigation 사용**:
 *      - React Navigation을 통해 'MyCenterSearch' 화면으로 이동.
 *    - **Styled-Components 사용**:
 *      - 화면의 제목 및 스타일링 정의.
 *    - **컴포넌트 재사용**:
 *      - `CenterListDeleteCard`를 활용해 센터 삭제 기능 구현.
 */

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