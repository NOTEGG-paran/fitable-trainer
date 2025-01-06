/**
 * 1. **프로젝트명**: 핏에이블 강사앱
 * 2. **파일명**: MypageMainScreen.js
 * 3. **설명**:
 *    - 마이페이지 메인 화면으로, 사용자 계정 정보와 설정 메뉴를 제공.
 *    - 로그아웃 및 앱 설정 관련 옵션 포함.
 *
 * 4. **주요 로직**:
 *    - **사용자 정보 로드**:
 *      - `getMyInfo` API를 호출해 사용자 정보를 가져와 Recoil 상태에 저장.
 *      - `useFocusEffect`를 활용해 화면 진입 시 데이터 갱신.
 *    - **로그아웃 기능**:
 *      - `deletefcmToken` 호출 후, `EncryptedStorage`에서 토큰 삭제.
 *      - Recoil 상태를 활용해 로그인 상태 업데이트.
 *    - **알림 설정**:
 *      - `isOnPushAlarm` 값을 활용해 알림 설정 상태를 표시.
 *    - **탭 네비게이션**:
 *      - 각 버튼 클릭 시 관련 화면으로 이동:
 *        - 계정 관리, 연동 센터 설정, 프로필 관리, 이용약관.
 *
 * 5. **주요 기능**:
 *    - **로그아웃**:
 *      - 사용자에게 확인 팝업 제공 후 로그아웃 수행.
 *    - **계정 관리**:
 *      - 사용자 이름, 전화번호, 알림 설정 상태를 표시.
 *    - **앱 버전 표시**:
 *      - "앱 버전" 버튼을 통해 앱 버전 관련 정보 제공.
 *    - **조건부 렌더링**:
 *      - 사용자 정보를 로드한 후에만 UI 업데이트.
 *    - **UI 컴포넌트 재사용**:
 *      - `MySettingListBtnGrid` 컴포넌트로 버튼 및 옵션 레이아웃 구성.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - 사용자 정보(`myinfoState`) 및 로그인 상태(`isLoginState`) 관리.
 *    - **API 호출**:
 *      - `getMyInfo` 및 `deletefcmToken`을 활용해 사용자 정보와 FCM 토큰 삭제 처리.
 */

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';
import {MainContainer, GridLine} from '../../style/gridStyled'
import { useRecoilState } from 'recoil';
import { getMyInfo,deletefcmToken } from '../../api/mypageApi';
import { myinfoState ,isLoginState } from '../../store/atom';
import MyProfileHeaderGrid from '../../components/grid/MyProfileHeaderGrid';
import MySettingListBtnGrid from '../../components/grid/MySettingListBtnGrid';
import { useFocusEffect } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Alert } from 'react-native';
function MypageMainScreen(props) {

    const navigation = useNavigation();

    const [myInfo, setMyInfo] = useRecoilState(myinfoState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
    const [shouldFetch, setShouldFetch] = useState(true);
    const getMyInfoData = async () => {
        if (shouldFetch) {
            const response = await getMyInfo();
            setMyInfo(response);
            setShouldFetch(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getMyInfoData();
        }, []));



    const {name, phone, isOnPushAlarm} = myInfo
    // console.log('호출', name, phone, isOnPushAlarm)

    // console.log('마이페이지 메121',myInfo)
    const goMyAccountScreen = () => {
        navigation.navigate('Account');
    }

    const goMyCenterSettingScreen = () => {
        navigation.navigate('CenterSetting');
    }

    const goMyProfileScreen = () => {
        navigation.navigate('MyProfile');
    }

    const goMyTermsScreen = () => {
        navigation.navigate('Terms');
    }


    const logoutBtn = async () => {
        Alert.alert(
          "로그아웃",
          "로그아웃 하시겠습니까?",
          [
            {
              text: "예",
              onPress: async () => {
                try {
                  await deletefcmToken()
                  await EncryptedStorage.removeItem("accessToken");
                  await EncryptedStorage.removeItem("refreshToken");
                  setIsLoggedIn(false);
                } catch (error) {
                  console.error("로그아웃 오류", error);
                }
              },
            },
            {
              text: "아니요",
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      };


    return (
        <MainContainer>
            <MyProfileHeaderGrid name={name} phone={phone} onPress={goMyAccountScreen}/>
                
            <GridLine/>

            <MySettingListBtnGrid onPress={goMyCenterSettingScreen}>연동센터 설정</MySettingListBtnGrid>
            <MySettingListBtnGrid onPress={goMyProfileScreen}>프로필 관리</MySettingListBtnGrid>

            <GridLine/>

            <MySettingListBtnGrid text='toggle' isOnPushAlarm={isOnPushAlarm}>알림</MySettingListBtnGrid>
            <MySettingListBtnGrid onPress={goMyTermsScreen}>이용약관 및 정책</MySettingListBtnGrid>
            <MySettingListBtnGrid text='version'>앱 버전</MySettingListBtnGrid>
            <GridLine/>
            <LogoutBtn onPress={logoutBtn}>
                <LogoutText>로그아웃</LogoutText>
            </LogoutBtn>
        </MainContainer>
    );
}

export default MypageMainScreen;


const LogoutBtn = styled.TouchableOpacity`
 
`

const LogoutText = styled.Text`
   font-size: 14px;
font-weight: 400;
text-decoration: underline;
line-height: 22.40px;
color: ${COLORS.gray_400};
`