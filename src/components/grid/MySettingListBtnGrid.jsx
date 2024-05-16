import React, { useState } from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/color';
import ToggleBtn from '../toggle/ToggleBtn';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import { getVersion } from 'react-native-device-info';
import {getAppVersionCheck} from '../../api/version';
import { useEffect } from 'react';
let version = getVersion();
console.log('version',version)

function MySettingListBtnGrid({children, text, onPress,isOnPushAlarm}) {

    const [curVersion, setCurVersion] = useState('')

    useEffect(()=>{
        getCurVersion()
    },[])

    const getCurVersion = async() => {
        const appVersion = await getAppVersionCheck();
        if(appVersion){
            setCurVersion(appVersion.trainerAppVersionForAndroid);
        }
    }

    const rightIcon = require('../../assets/img/rightIcon.png')
    return (
        <>
        {
            text === 'toggle' ? 
            <SettingList>
                    <SettingListText>{children}</SettingListText>
                    <ToggleBtn isOnPushAlarm={isOnPushAlarm}/>
                </SettingList>
            :
            text === 'version' ? 
            <SettingList>
                    <SettingListText>{children}</SettingListText>
                    {/* <VersionText>{version}</VersionText> */}
                    <VersionText>{curVersion && curVersion}</VersionText>
                </SettingList>
            :
            <SettingListBtn onPress={onPress}>
                <SettingListText>{children}</SettingListText>
                <SettingListRightIcon source={rightIcon}/>  
            </SettingListBtn>
        }
        </>
    );
}

export default MySettingListBtnGrid;

const SettingListBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
`

const SettingList = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
`
    
const SettingListText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`
    
const SettingListRightIcon = styled(FastImage)`
    width: 20px;
    height: 20px;
`

const VersionText = styled.Text`
color: ${COLORS.gray_400};
font-size: 16px;
font-family: Pretendard;
font-weight: 400;
line-height: 22.40px;
`