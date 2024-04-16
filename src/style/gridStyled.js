import styled from 'styled-components/native';
import {COLORS} from '../constants/color';

export const LoginContainer = styled.View`
    flex:1;
    background-color: ${COLORS.white};
`;

export const MainContainer = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.white};
`

export const SelectContainer = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.gray_100};
`;

export const ErrorText = styled.Text`
    color: #E11616;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.80px;
    padding-left: 12px;
`;

export const GridLine = styled.View`
     width: 100%;
    height: 1px;
    background-color: ${COLORS.gray_200};
    margin-bottom: 18px;
    margin-top: 15px;
`

export const GridLineOne = styled.View`
     width: 100%;
    height: 1px;
    background-color: ${COLORS.gray_100};
    margin-bottom: 18px;
    margin-top: 15px;
`

export const GridLineGrayOne = styled.View`
     width: 100%;
    height: 1px;
    background-color: ${COLORS.gray_100};
    margin-bottom: 30px;
    margin-top: 30px;
`