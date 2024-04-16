import {MainContainer} from '../../style/gridStyled'
import CenterListHeaderGrid from '../../components/grid/CenterListHeaderGrid';
import AlarmTwoBtn from '../../components/button/AlarmTwoBtn';
import styled from 'styled-components';
import { Platform } from 'react-native';

function AlarmMainScreen(props) {


    const UIComponent = 
    Platform.OS === 'ios' ?
    CenterListHeaderGrid : AndroidStyled;

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