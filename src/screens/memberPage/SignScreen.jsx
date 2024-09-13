import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState, useResetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import {contractState} from '../../store/atom';
import {MainContainer} from '../../style/gridStyled';

import {useRoute} from '@react-navigation/native';

import SignatureScreen from 'react-native-signature-canvas';

global.Buffer = global.Buffer || require('buffer').Buffer;

const style = `
.m-signature-pad--footer {display: none; margin: 0px;} 
.m-signature-pad {box-shadow:none; border:none; background-color: #F6F6F6; height: }
.m-signature-pad:before, .m-signature-pad:after {box-shadow:none;} 
.m-signature-pad--body {border:none;}
body,html {
  background-color: #ddd;
  width: 100%; height: 100%;
}
`;

const removeImage = require('../../assets/img/eraser-1.png');

function SignScreen(props) {
  const navigation = useNavigation();

  const ref = useRef();

  const route = useRoute();

  const {currentView} = route.params;

  const [isSignEnd, setIsSignEnd] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const [contract, setContract] = useRecoilState(contractState);

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleOK = async signature => {


    setContract(prev => {
      return {
        ...prev,
        [currentView]: {
          uri: signature,
          file: signature,
        },
      };
    });
    navigation.goBack();
  };

  const onSignRegisterButton = async () => {
    await ref.current.readSignature();
  };

  useEffect(() => {
    console.log('contract onChange');
  }, [contract]);

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>서명하기</GobackGrid>
      <GridMargin/>
      <View style={{flex: 1}}>
        <View style={{height: 270}}>
          <SignatureScreen
            onOK={handleOK}
            onEnd={() => setIsSignEnd(true)}
            ref={ref}
            webStyle={style}
          />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            marginTop: 16,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
            }}
            title="Clear"
            onPress={handleClear}>
            <RemoveIcon source={removeImage} />
            <RemoveText>모두 지우기</RemoveText>
          </TouchableOpacity>
        </View>
      </View>
         {/* </GridMargin> */}
      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          isActive={isSignEnd}
          onPress={() => onSignRegisterButton()}>
          <BasicMainBtnNextBtnNextText isActive={isSignEnd}>
            서명등록
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default SignScreen;

const BasicMainBtnContainer = styled.View`
  position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
  height: 80px;
  background-color: ${COLORS.white};
`;

const GridMargin = styled.View`
  margin-top: 44px;
`

const BasicMainBtnNextBtn = styled.TouchableOpacity`
  background-color: ${props => (props.isActive ? COLORS.sub : COLORS.gray_100)};

  border-radius: 90px;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  width: 100%;
`;

const BasicMainBtnNextBtnNextText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  color: ${COLORS.white};
`;

const RemoveIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

const RemoveText = styled.Text`
  color: ${COLORS.sub};
  font-size: 14px;
  font-weight: 500;
  line-height: 21.4px;
`;
