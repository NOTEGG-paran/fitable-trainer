/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: SplashScreen.js
 * 3. **설명**:
 *    - 앱 시작 시 표시되는 스플래시 화면 컴포넌트.
 *    - 앱 로딩 중 사용자에게 표시되는 화면으로, 로고 이미지를 포함.
 *
 */

import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { COLORS } from '../../constants/color';
function SplashScreen(props) {
    return (
        <SplashScreenView>
            <SplashImage 
            source={require('../../assets/img/splash_trainer.png')}
            resizeMode={FastImage.resizeMode.contain}
            />
        </SplashScreenView>
    );
}

export default SplashScreen;

const SplashScreenView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.white};
`;

const SplashImage = styled(FastImage)`
    width: 100%;
    height: 100%;
`;