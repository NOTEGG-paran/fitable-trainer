/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: AlarmMainScreen.js
 * 3. **설명**:
 *    - 알림 페이지의 메인 화면 컴포넌트.
 *    - 플랫폼(iOS, Android)에 따라 UI 스타일을 다르게 적용.
 *    - 헤더와 두 개의 주요 버튼으로 구성된 레이아웃 제공.
 *    - CenterListHeaderGrid 재사용 컴포넌트
 */
import {MainContainer} from '../../style/gridStyled'
import CenterListHeaderGrid from '../../components/grid/CenterListHeaderGrid';
import AlarmTwoBtn from '../../components/button/AlarmTwoBtn';
import styled from 'styled-components';
import { Platform } from 'react-native';

function AlarmMainScreen(props) {


    const UIComponent = 
    Platform.OS === 'ios' ?
    IosStyled : AndroidStyled;

    return (
    <MainContainer>
        <UIComponent>
        <CenterListHeaderGrid />
        </UIComponent>
        <AlarmTwoBtn />
    </MainContainer>
    );
}

export default AlarmMainScreen;


const AndroidStyled = styled.View`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`

const IosStyled = styled.View`

`
