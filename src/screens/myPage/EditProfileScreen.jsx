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
import TrainerProfileGrid from '../../components/grid/TrainerProfileGrid';
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
      
            {/* <TrainerProfileGrid /> */}
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