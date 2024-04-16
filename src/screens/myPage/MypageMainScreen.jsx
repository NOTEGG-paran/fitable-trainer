import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';
import {MainContainer, GridLine} from '../../style/gridStyled'
import { useRecoilState } from 'recoil';
import { getMyInfo } from '../../api/mypageApi';
import { myinfoState ,isLoginState } from '../../store/atom';
import MyProfileHeaderGrid from '../../components/grid/MyProfileHeaderGrid';
import MySettingListBtnGrid from '../../components/grid/MySettingListBtnGrid';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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


    const logoutBtn = () => {
        AsyncStorage.removeItem('accessToken');
        AsyncStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
    }


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
            {/* <MySettingListBtnGrid onPress={logoutBtn}>임시 로그 아웃</MySettingListBtnGrid> */}
        </MainContainer>
    );
}

export default MypageMainScreen;