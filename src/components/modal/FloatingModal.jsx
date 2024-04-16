import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Image,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
function FloatingModal({isOpen,closeModal}) {

    const navigation = useNavigation();

    const personal = require('../../assets/img/personone.png');
    const group = require('../../assets/img/persongroup.png');

    const goClassScreen = (type) =>{
        console.log('111',type)
        navigation.navigate('CreateClass',{type:type})
    }

   

    return (
        <ModalBackground
        onPress={closeModal}
        activeOpacity={1}
        >
            <FloatingButtonContainer isOpen={isOpen}>

            <FloatingBtnBox>
                <FloatingContentsContainer>
                <FloatingBtnText>1:1 수업</FloatingBtnText>
                <FloatingButtonTouchable onPress={()=>goClassScreen('PERSONAL')}>
                    <FastImage 
                    style={{width: 30, height: 30}}
                    source={personal} />
                </FloatingButtonTouchable>
                </FloatingContentsContainer>
            </FloatingBtnBox>

            <FloatingBtnBox>
            <FloatingContentsContainer>
                <FloatingBtnText>그룹 수업</FloatingBtnText>
                <FloatingButtonTouchable onPress={()=>goClassScreen('GROUP')}>
                    <FastImage 
                    style={{width: 30, height: 30}}
                    source={group} />
                </FloatingButtonTouchable>
            </FloatingContentsContainer>
            </FloatingBtnBox>

            </FloatingButtonContainer>

          
        </ModalBackground>
    );
}

export default FloatingModal;

const ModalBackground = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 5;
`;
const FloatingBtnBox = styled.View`
   margin-bottom: 20px;
  z-index: 15;
  /* background-color: red; */
`;

const FloatingButtonContainer = styled.View`
    position: absolute;
    /* bottom: 80px; */
    bottom: ${props => (props.isOpen ? '160px' : '160px')};
    right: 0;
    margin: 20px;
    z-index: 15;
`;

const FloatingButtonTouchable = styled.TouchableOpacity`
  width: 60px;
  height: 60px;

  border-radius: 30px;
  background-color: ${COLORS.gray_100};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloatingBtnText = styled.Text`
color: ${COLORS.white};
 font-size: 16px;
 font-weight: 700;
    line-height: 22.40px;
    margin-right: 13px;
`

const FloatingContentsContainer = styled.View`
/* width: 140px; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`