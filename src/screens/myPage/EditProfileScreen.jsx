/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: EditProfileScreen.js
 * 3. **설명**:
 *    - 트레이너의 프로필 정보를 조회하거나 수정할 수 있는 화면.
 *    - 프로필이 존재하지 않을 경우 새로운 프로필 생성 화면을 표시.
 *
 * 4. **주요 로직**:
 *    - **프로필 정보 조회**:
 *      - `getTrainersProfileInfo` API를 호출하여 프로필 데이터를 가져옴.
 *      - 프로필이 존재하는지(`isExistProfile`) 여부를 확인하여 UI 분기 처리.
 *    - **수정 모드 전환**:
 *      - 수정 버튼 클릭 시 `isEditMode`를 활성화하여 수정 가능한 UI 표시.
 *    - **UI 상태에 따른 컴포넌트 렌더링**:
 *      - 프로필이 존재하고 수정 모드가 아닌 경우 `TrainerInfoGetListGrid` 표시.
 *      - 수정 모드이거나 프로필이 없는 경우 `TrainerInfoListGrid` 표시.
 *    - **로딩 처리**:
 *      - 데이터를 가져오는 동안 로딩 인디케이터를 표시.
 *
 * 5. **주요 기능**:
 *    - **프로필 조회**:
 *      - 트레이너의 프로필 데이터를 조회하여 화면에 표시.
 *    - **프로필 수정**:
 *      - 수정 버튼 클릭 후 프로필 데이터를 수정할 수 있는 UI 제공.
 *    - **UI 분기 처리**:
 *      - 프로필이 존재하지 않을 경우 새로운 프로필 생성 화면 표시.
 *    - **로딩 상태 처리**:
 *      - 데이터 로드 중 로딩 스피너 표시.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - `profileState`를 사용해 프로필 데이터를 전역 상태로 관리.
 *    - **API 호출**:
 *      - `getTrainersProfileInfo` API를 통해 프로필 데이터를 서버에서 가져옴.
 *    - **조건부 렌더링**:
 *      - `isExistProfile` 및 `isEditMode` 상태에 따라 다른 UI를 렌더링.
 *    - **useFocusEffect 사용**:
 *      - 화면이 포커스될 때마다 프로필 데이터를 다시 로드.
 */

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState ,useCallback} from 'react';
import {MainContainer, GridLine} from '../../style/gridStyled'
import { Text } from 'react-native';
import GobackGrid from '../../components/grid/GobackGrid';
import ImagePicker from 'react-native-image-crop-picker';
import {getTrainersProfileInfo} from '../../api/mypageApi';
import TrainerInfoListGrid from '../../components/grid/TrainerInfoListGrid';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import TrainerInfoGetListGrid from '../../components/grid/TrainerInfoGetListGrid';
import { useFocusEffect } from '@react-navigation/native';
import { Alert,ActivityIndicator, View  } from 'react-native';
import { useRecoilState } from 'recoil';
import { profileState } from '../../store/atom';

function EditProfileScreen(props) {
    const [selectedImages, setSelectedImages] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [profileInfo, setProfileInfo] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isExistProfile, setIsExistProfile] = useState(false);
    const [trainerProfile, setTrainerProfile] = useRecoilState(profileState);



    const getProfileInfo = async () => {
        try{
            const response = await getTrainersProfileInfo();
            if(response){
                setProfileInfo(response);
                setIsExistProfile(response.isExistProfile);
                setTrainerProfile(response);
                console.log('response',response.isExistProfile);
            }else{
                console.log('ddd')
            }
        }catch(error){
            console.log('getProfileInfo++error',error)
            Alert.alert('프로필 정보를 불러오는데 실패했습니다.', '', [{ text: '확인', onPress: () => console.log('실패') }]);
        }finally{
            console.log('finally')
            setLoading(false);
        }
    }


    useFocusEffect(
        useCallback(() => {
            getProfileInfo();
        },[]));
    // {
    // "career": null, 
    // "centerProfiles": null, 
    // "description": null, 
    // "images": null, 
    // "isExistProfile": false, 
    // "lessonItems": null, 
    // "qualifications": null
    // }
    console.log('profileInfoisEditMode',profileInfo,isEditMode,isExistProfile)
        console.log('trainerProfile',trainerProfile)
    const goBack = () => {
        navigation.goBack();
    }


    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:COLORS.white }}>
            <ActivityIndicator size="large" color={COLORS.sub} />
          </View>
        );
      }


    return (
        <MainContainer>
            <HeaderGrid>
            <GobackGrid onPress={goBack}>프로필 관리</GobackGrid>
            {
                isExistProfile && !isEditMode &&
            <EditContainerBtn onPress={() => setIsEditMode(true)}>
                <EditBtnText>수정</EditBtnText>
            </EditContainerBtn>
            }
            </HeaderGrid>
      
            {
                !isEditMode && isExistProfile ?
                <TrainerInfoGetListGrid profileInfo={profileInfo}/> :
                <TrainerInfoListGrid 
                isExistProfile={isExistProfile}
                setProfileInfo={setProfileInfo}
                setIsExistProfile={setIsExistProfile}
                profileInfo={profileInfo} isEditMode={isEditMode} setIsEditMode={setIsEditMode}/> 
            }
        </MainContainer>
    );
}

export default EditProfileScreen;

const HeaderGrid = styled.View`
    flex-direction: row;
    justify-content: space-between;
`


const EditContainerBtn = styled.TouchableOpacity`
padding: 0 0 10px 30px;
`

const EditBtnText = styled.Text``