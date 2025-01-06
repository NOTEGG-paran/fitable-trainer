/**
 * 1. **프로젝트명**: 핏에이블 강사앱
 * 2. **파일명**: TermsScreen.js
 * 3. **설명**:
 *    - 이용약관 및 개인정보처리방침 화면으로, 관련 문서를 열람할 수 있는 링크 제공.
 *    - Android와 iOS의 동작 방식 차이에 따라 링크를 처리.
 *
 * 4. **주요 로직**:
 *    - **링크 열기**:
 *      - `Linking.canOpenURL`로 URL 유효성을 검사 후 브라우저로 열기.
 *      - Android에서는 `navigation.navigate`를 통해 WebView 화면으로 이동.
 *
 */


import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import { useState } from 'react';
import { Linking } from 'react-native';
import GobackGrid from '../../components/grid/GobackGrid';
import MySettingListBtnGrid from '../../components/grid/MySettingListBtnGrid';
import styled from 'styled-components/native';
import AgreementModal from '../../components/modal/AgreementModal';

function TermsScreen(props) {
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    }

   
      const handleItemPress = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        });
      };
    
    const handleAndroidLink = (url) => {
        navigation.navigate('TermWebView', {uri: url})
    }

const isAndroidLink = Platform.OS === 'android' ? handleAndroidLink : handleItemPress;


    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
      };

      const closeModal = () => {
        setModalVisible(false);
      };

    return (
        <>
        <MainContainer>
            <GobackGrid onPress={goBack}>이용약관 및 정책</GobackGrid>
            <GridContainer>
            <MySettingListBtnGrid onPress={()=>isAndroidLink('https://fitable.notion.site/Terms-of-use-151276937bf842ad9eabc522978f9148')}>이용약관 동의</MySettingListBtnGrid>
            <MySettingListBtnGrid onPress={()=>isAndroidLink('https://fitable.notion.site/Privacy-Policy-fcfd2a7bbea3444fa49730fb12879755')}>개인정보수집 및 이용에 대한 안내</MySettingListBtnGrid>
            </GridContainer>
        </MainContainer>
        {/* {
            <AgreementModal 
            modalVisible={modalVisible}
            closeModal={closeModal}
            />
        } */}
        </>
    );
}

export default TermsScreen;

const GridContainer = styled.View`
    margin-top: 44px;
`;