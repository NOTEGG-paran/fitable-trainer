import React, { useEffect, useRef } from 'react';
import { Image, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import FastImage from 'react-native-fast-image';

function FloatingBtn({ onPress, isOpen }) {
  const floatingIcon = require('../../assets/img/floating_plus.png');
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(rotateValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
    }
  }, [isOpen]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg']
  });

  return (
    <FloatingButtonContainer isOpen={isOpen}>
      <FloatingButtonTouchable onPress={onPress} style={{ transform: [{ rotate }] }}>
        <FastImage source={floatingIcon} 
        style={{width: 28, height: 28}}
        resizeMode='contain'
        />
      </FloatingButtonTouchable>
    </FloatingButtonContainer>
  );
}

export default FloatingBtn;


const FloatingButtonContainer = styled.View`
  position: absolute;
  /* bottom: 40px; */
  bottom: ${props => (props.isOpen ? '120px' : '40px')};
  right: 20px;
  z-index: 15;
`;

const FloatingButtonTouchable = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${COLORS.main};
  justify-content: center;
  align-items: center;
  box-shadow: 2px 3px 5px rgba(94.56, 94.56, 94.56, 0.15);
`;


