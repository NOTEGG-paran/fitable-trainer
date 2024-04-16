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