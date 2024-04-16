import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import ImagePicker from 'react-native-image-crop-picker';
import React,{ useState,useRef } from 'react';
import { Alert,TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import ProfileInput from '../input/ProfileInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CenterAddGrayBtn from '../button/CenterAddGrayBtn';
import CenterListSlideModal from '../modal/CenterListSlideModal';
import { useRecoilState } from 'recoil';
import { centerListState,profileState } from '../../store/atom';
import ProfileSelectDateCard from '../card/ProfileSelectDateCard';
import TimeSelectCard from '../card/TimeSelectCard';
import {deleteTrainersProfileInfo,setTrainersProfileInfo,updateTrainersProfileInfo,getTrainersProfileInfo} from '../../api/mypageApi';
import DeleteProfileModal from '../modal/DeleteProfileModal';
import { useNavigation } from '@react-navigation/native';
import ProfileSettingBtn from '../button/ProfileSettingBtn';
import FastImage from 'react-native-fast-image';

function TrainerInfoListGrid({profileInfo,isEditMode,setIsEditMode, setProfileInfo, setIsExistProfile}) {

    const navigation = useNavigation();
    // const [isClicking, setIsClicking] = useState(false);
    const isClicking = useRef(false);
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [selectedCenter, setSelectedCenter] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteProfileModal, setDeleteProfileModal] = useState(false);

    const [selectedImages, setSelectedImages] = useState([]); 
    const [updateSelectedImages, setUpdateSelectedImages] = useState(profileInfo?.images|| []);
    const [updateSelectImages, setUpdateSelectImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);
    
    const [trainerProfile, setTrainerProfile] = useRecoilState(profileState);
    
    const openImagePicker = () => {
    ImagePicker.openPicker({
        multiple: true, 
        maxFiles:isEditMode ? 10-updateSelectedImages.length:10 - selectedImages.length, 
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
        compressImageMaxWidth: 750,
        compressImageMaxHeight: 750,
      })
      .then(newImages => {
      //   setSelectedImages(images.map(image => image.path));
      const newPaths = newImages.map(image => ({ id:null, path: image.path }));
      if(isEditMode){
            setUpdateSelectedImages([...updateSelectedImages, ...newPaths].reverse());
            setUpdateSelectImages([...updateSelectImages, ...newImages].reverse());
        }else{
            setSelectedImages([...selectedImages, ...newImages.map(image => image.path)].reverse());
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

    const deleteImage = (indexToDelete) => {
        setSelectedImages(currentImages =>
            currentImages.filter((_, index) => index !== indexToDelete)
        );
    };


    //t수정삭제
    const updateDeleteImage = (indexToDelete, id) => {
        setUpdateSelectedImages(currentImages =>
            currentImages.filter((_, index) => index !== indexToDelete)
        );
        setUpdateSelectImages(currentImages =>
            currentImages.filter((_, index) => index !== indexToDelete)
            )
        if(id){
            console.log('dkid있는경구')
            setDeleteImages([...deleteImages, updateSelectedImages[indexToDelete].id]);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const showCenterListBtn = () => {
        setModalVisible(true);  
    };

    const openDateSelectModal = () => {
        setDeleteProfileModal(true);
    }

    // 프로필 설정 및 수정
    const registerProfileSetting = async () => {
        if (isClicking.current) {
            return;
        }
        isClicking.current = true;
        try{

            // let combinedTimeSettings = (selectedCenter[0]?.timeSettings || []).concat(selectedCenter[1]?.timeSettings || []);
            let combinedTimeSettings = [];
                selectedCenter.forEach(center => {
                if(center?.timeSettings) {
                    combinedTimeSettings = combinedTimeSettings.concat(center.timeSettings);
                }
            });
            const formData = new FormData();
            const requestDto = {
                    description: trainerProfile.description,
                    career: trainerProfile.career,
                    qualifications: trainerProfile.qualifications,
                    centerProfiles: combinedTimeSettings,
            };
            selectedImages.forEach((image, index) => {
                formData.append('images', {
                    uri: image,
                    type: 'image/jpeg',
                    name: `image${index}.jpg`
                });
            });
            formData.append("requestDto", JSON.stringify(requestDto));
            console.log('formData111123',formData)
            // postSettingProfileApi(formData);
            const response = await setTrainersProfileInfo(formData);
            if(response){

              Alert.alert("알림","프로필이 설정되었습니다\n 곧 알림이 도착합니다.",
                [{ text: "확인", onPress: () => {
                    getProfileInfo()
                } }]);
            }
    }
    catch(error){
        console.log('error',error)
    }
    finally{
        isClicking.current = false;
        navigation.navigate('MyProfile')
    }
}

    const registerProfileUpdate = async () => {
        if (isClicking.current) {
            return;
        }
        isClicking.current = true;
            try{
                console.log('에디터 모드임')
                // let combinedTimeSettings = (selectedCenter[0]?.timeSettings || []).concat(selectedCenter[1]?.timeSettings || []);
                let combinedTimeSettings = [];
                selectedCenter.forEach(center => {
                if(center?.timeSettings) {combinedTimeSettings = combinedTimeSettings.concat(center.timeSettings)}});
                const formData = new FormData();
                const requestDto = {
                    deleteImages:deleteImages,
                    description: trainerProfile.description,
                    career: trainerProfile.career,
                    qualifications: trainerProfile.qualifications,
                    centerProfiles: combinedTimeSettings,
                };
            const newPath = updateSelectImages.map(image => image.path);
            newPath.forEach((path, id) => {
                formData.append('images', {
                    uri: path,
                    type: 'image/jpeg',
                    name: `image${id}.jpg`
                });
            });
            formData.append('requestDto', JSON.stringify(requestDto));
            console.log('formData111123',formData)
            const response = await updateTrainersProfileInfo(formData);
            if(response){
                console.log('response',response);
                Alert.alert("알림","프로필이 수정되었습니다\n 곧 알림이 도착합니다.",
                [{ text: "확인", onPress: () => {
                    getProfileInfo()
                    setIsEditMode(false)
                } }]);
              }
            } catch(error){
                console.log('error',error)
            }
            finally{
                isClicking.current = false;
                navigation.navigate('MyProfile')
            }
    }

    // 다시호출
    const getProfileInfo = async () => {
        try{
            const response = await getTrainersProfileInfo();
            if(response){
                setProfileInfo(response);
                setIsExistProfile(response.isExistProfile);
                console.log('response',response.isExistProfile);
            }
        }catch(error){
            console.log('getProfileInfo',error)
        }finally{
            console.log('finally')
        }
    }

    const getProfileDeleteInfo = async () => {
        try{
            const response = await getTrainersProfileInfo();
            if(response){
                // setProfileInfo(response);
                setIsExistProfile(false);
                // console.log('response',response.isExistProfile);
            }
        }catch(error){
            console.log('getProfileInfo',error)
        }finally{
            console.log('finally')
        }
    }

    // 프로필 삭제용
    const deleteProfile = async () => {
        try{
            const response = await deleteTrainersProfileInfo();
            if(response){
                console.log('response',response);
                Alert.alert("알림","프로필이 삭제되었습니다",
                [{ text: "확인", onPress: () => {
                    setSelectedImages([])
                    setSelectedCenter([])
                    setUpdateSelectImages([])
                    setTrainerProfile([])
                    setUpdateSelectedImages([])
                    setDeleteImages([])
                    getProfileDeleteInfo()
                } }]);
            }
        }catch(error){
            console.log('getProfileInfo',error)
        }finally{
            console.log('finally')
            setDeleteProfileModal(false);
            setIsEditMode(false)
            navigation.navigate('MyProfile')
        }
    }

    
    const addCenterListBtn = (id, name) => {
        // 이미 선택된 센터인지 확인
        const isAlreadySelected = selectedCenter.some(center => center.id === id);
    
        if (isAlreadySelected) {
            // 이미 선택된 경우 경고 메시지 표시
            Alert.alert("알림", "이미 선택한 센터입니다.\n다른 센터를 선택해주세요.");
        } else {
            // 새로운 센터와 초기 시간 설정 추가
            const newCenter = {
                id, 
                name,
                timeSettings: [{
                    centerId: id,
                    type: "평일",
                    startTime: "01:00",
                    endTime: "01:00"
                }]
            };
            setSelectedCenter(prevCenters => [...prevCenters, newCenter]);
            setModalVisible(false);
        }
    };

    const handleAddTimeCard = (centerId) => {
        const newTimeSetting = {
            centerId: centerId,
            type: "평일",
            startTime: "01:00",
            endTime: "01:00"
        };
    
        const updatedCenters = selectedCenter.map(center => {
            if (center.id === centerId) {
                // 이미 시간 추가가 되었는지 확인
                if (center.timeCardAdded) {
                    Alert.alert("알림", "시간은 한 번만 추가할 수 있습니다.");
                    return center;
                } else {
                    return {
                        ...center,
                        timeSettings: [...center.timeSettings, newTimeSetting],
                        timeCardAdded: true
                    };
                }
            }
            return center;
        });
    
        setSelectedCenter(updatedCenters);
    };

    const changeType = (centerId, type, index) => {
        console.log('centerId, type, index',centerId, type, index)
        const updatedCenters = selectedCenter.map(center => {
            if (center.id === centerId) {
                return {
                    ...center,
                    timeSettings: center.timeSettings.map((timeSetting, i) => 
                        i === index ? { ...timeSetting, type } : timeSetting
                    ),
                };
            }
            return center;
        });
    
        setSelectedCenter(updatedCenters);
    };
    


    const changeTime = (centerId, newTime, timeType, index) => {
        const updatedCenters = selectedCenter.map(center => {
          if (center.id === centerId) {
            return {
              ...center,
              timeSettings: center.timeSettings.map((timeSetting, i) =>
                i === index
                  ? { ...timeSetting, [timeType]: newTime }
                  : timeSetting
              ),
            };
          }
          return center;
        });
      
        setSelectedCenter(updatedCenters);
    };
    
    const isEditModefn = isEditMode ? registerProfileUpdate:registerProfileSetting;
    // const timeSettingState = 
    // selectedCenter[0]?.timeSettings[0]?.startTime !== selectedCenter[0]?.timeSettings[0]?.endTime &&
    // selectedCenter[0]?.timeSettings[0]?.startTime < selectedCenter[0]?.timeSettings[0]?.endTime
    let timeSettingState = true;
    for (const center of selectedCenter) {
        if (center?.timeSettings) {
            for (const timeSetting of center.timeSettings) {
                const isValid = timeSetting.startTime !== timeSetting.endTime && 
                                timeSetting.startTime < timeSetting.endTime;
                // 하나라도 유효하지 않은 시간 설정이 있다면, timeSettingState를 false로 설정하고 반복을 중단합니다.
                if (!isValid) {
                    timeSettingState = false;
                    break;
                }
            }
            if (!timeSettingState) break; // 상위 반복도 중단합니다.
        }
    }

    console.log('selectedCenter',selectedCenter)
    const isActivefn = 
    (trainerProfile?.career?.length !==0 && trainerProfile?.career?.length !==undefined)
    && 
    (trainerProfile?.qualifications?.length !==0 && trainerProfile?.qualifications?.length !==undefined) &&
    (trainerProfile?.description?.length !==0 && trainerProfile?.description?.length !==undefined)
    && 
    timeSettingState && selectedCenter.length > 0

    const clockIcon = require('../../assets/img/clockIcon.png');
  
    return (
        <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            bounces={false}
            extraScrollHeight={80} 
            >
       
            <ProfileTitleText>프로필 사진 등록</ProfileTitleText>
            <ProfileSubTitleText>최대 10장까지 등록 가능합니다</ProfileSubTitleText>  
            <ProfileImgContainer>
  {
    updateSelectedImages?.length === 10 ||
  updateSelectImages?.length === 10 ||
  selectedImages?.length === 10 ? null :
    <ProfileAddBtn onPress={openImagePicker}>
      <ProfileAddImg source={require('../../assets/img/plus_l.png')} />
    </ProfileAddBtn>
  }

  {isEditMode ? (
   updateSelectedImages&& updateSelectedImages?.map((image, index) => (
      <SelectImgContainer key={index}>
        <DeleteBtn key={index} onPress={() => updateDeleteImage(index,image.id)}>
          <DeleteImg source={require('../../assets/img/delete.png')} />
        </DeleteBtn>
        <SelectedImage source={{ uri: image.path }} />
      </SelectImgContainer>
    ))
  ) : (
    selectedImages&&selectedImages?.length > 0 && (
      <>
        {selectedImages&&selectedImages?.map((image, index) => (
          <SelectImgContainer key={index}>
            <DeleteBtn key={index} onPress={() => deleteImage(index)}>
              <DeleteImg source={require('../../assets/img/delete.png')} />
            </DeleteBtn>
            <SelectedImage source={{ uri: image }} />
          </SelectImgContainer>
        ))}
      </>
    )
  )}
</ProfileImgContainer>
            <ProfileInput
                title="소개"
                isEditMode={isEditMode}
                placeholder={isEditMode? profileInfo.description:
                    Platform.OS === 'ios' ? '글자는 10자 이상 150자 이하로 작성 가능합니다' : '10자 이상 150자 이하로 작성 가능합니다'
                }
                // placeholder="300자 이하로 작성 가능합니다"
                maxLength={150}
                value={trainerProfile.description}
                onChangeText={text => setTrainerProfile(prevState => ({
                    ...prevState,
                    description: text
                }))}
                />

            
                <ProfileInput
                title="경력사항"
                placeholder={isEditMode? profileInfo.career:'300자 이하로 작성 가능합니다'}
                // placeholder="300자 이하로 작성 가능합니다"
                maxLength={300}
                value={trainerProfile.career}
                 onChangeText={text => setTrainerProfile(prevState => ({
                     ...prevState,
                 career: text
                 }))}
                />

                <ProfileInput
                title="자격사항"
                placeholder={isEditMode? profileInfo.qualifications:'300자 이하로 작성 가능합니다'}
                // placeholder="300자 이하로 작성 가능합니다"
                maxLength={300}
                value={trainerProfile.qualifications}
                 onChangeText={text => setTrainerProfile(prevState => ({
                     ...prevState,
                     qualifications: text
                 }))}
                />
            <CenterListContaniner>
                {
                    selectedCenter.length === 0 &&<ProfileCneterTitleText>센터별 설정</ProfileCneterTitleText>
                }
             <AddCenterListContaniner>
               {
                   selectedCenter && selectedCenter.map((center, index) => (
                        <ListContaniner  key={center.id}>
                        <ProfileCneterTitleText>연동센터{index+1}</ProfileCneterTitleText>
                        <CenterTitleBoxContainer>
                        <CenterTitleText key={center.id}>{center.name}</CenterTitleText>
                        </CenterTitleBoxContainer>

                        <ProfileCneterTitleText>근무 가능 시간</ProfileCneterTitleText>

                        <ProfileSelectDateCard
                           timeSettingId={center.id}
                            timeSettings={center?.timeSettings[0]}
                            changeType={changeType}
                            index={0}
                        />
                        <TimeSelectCard 
                          onTimeChange={(newTime, timeType) => {
                            changeTime(center.id, newTime, timeType, 0);
                        }}
                        startPickerTime={center.timeSettings[0]?.startTime}
                        endPickerTime={center.timeSettings[0]?.endTime} 
                        imgIcon={clockIcon} 
                        text='profile'/>
                        {
                            center.timeCardAdded && (
                                <React.Fragment>
                                    <ProfileSelectDateCard
                                     timeSettingId={center.id}
                                     timeSettings={center?.timeSettings[1]?.type}
                                     changeType={changeType}
                                     index={1}
                                    />
                                    <TimeSelectCard 
                                     onTimeChange={(newTime, timeType) => {
                                        changeTime(center.id, newTime, timeType, 1);
                                    }}
                                    startPickerTime={center.timeSettings[1]?.startTime}
                                    endPickerTime={center.timeSettings[1]?.endTime} 
                                    imgIcon={clockIcon}
                                    text='profile' />
                                </React.Fragment>
                            )
                        }
                        {
                            center.timeCardAdded === true ? null:
                        <CenterAddGrayBtn onPress={()=>handleAddTimeCard(center.id)}>시간 추가</CenterAddGrayBtn>
                        }
                        </ListContaniner>
                    ))
                }
                </AddCenterListContaniner>
                
                <CenterAddGrayBtn onPress={showCenterListBtn}>센터 추가</CenterAddGrayBtn>
            </CenterListContaniner>

        </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>


            <ProfileSettingBtn
            isActive={isActivefn} 
            onPress={() => {
                if (!isClicking.current) {
                    isEditModefn();
                }
            }}
            openDateSelectModal={openDateSelectModal}
            isEditMode={isEditMode}
            >승인 요청</ProfileSettingBtn>

       

            {
                deleteProfileModal && (
                    <DeleteProfileModal
                    onPress={deleteProfile}
                    setDeleteProfileModal={setDeleteProfileModal}
                    />
                )
            }
            {
            <CenterListSlideModal 
            modalVisible={modalVisible}
            closeModal={closeModal}
            centerList={centerList}
            text='센터 추가'
            onPress={addCenterListBtn}
            />
            }
            </>
    );
}

export default TrainerInfoListGrid;


const ProfileTitleText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height: 22.4px;
letter-spacing: -0.35px;
margin-top: 44px;
`;

const ProfileCneterTitleText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height: 22.4px;
letter-spacing: -0.35px;
margin-bottom: 8px;
`;

const ProfileSubTitleText = styled.Text`
color: ${COLORS.gray_300};
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 22.4px;
letter-spacing: -0.35px;
`;

const ProfileImgContainer = styled.View`
    margin-top: 16px;
    flex-direction: row;
    flex-wrap: wrap;
`

const ProfileAddBtn = styled.TouchableOpacity`
/* width: 80px;
height: 80px; */
width: 74px;
height: 74px;
border-radius: 10px;
border: 1px solid ${COLORS.gray_200};
background-color: ${COLORS.white};
justify-content: center;
align-items: center;
margin-right: 10px;
`;

const ProfileAddImg = styled(FastImage)`
width: 24px;
height: 24px;
`
const SelectImgContainer = styled.View`
 position: relative;
    /* margin-right: 10px; */
    /* margin-bottom: 10px; */
`

const SelectedImage = styled(FastImage)`
  /* width: 80px;
  height: 80px; */
  width: 74px;
  height: 74px;
    /* width: 96px;
  height: 96px; */
  margin-right: 10px;
    margin-bottom: 10px;
  border-radius: 10px;
`;

const DeleteBtn = styled.TouchableOpacity`
 position: absolute;
    top: 4px;
    right: 12px;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: ${COLORS.sub};
    border-radius: 50px;
`
const DeleteImg = styled(FastImage)`
width: 12px;
height: 12px;
`

const CenterInfoContaniner = styled.View`
    margin-top: 40px;
`

const CenterListContaniner = styled.View`
    margin-top: 40px;
    margin-bottom: 108px;
`

// 연동센터 추가 리스트
const AddCenterListContaniner = styled.View`
/* margin-bottom: 20px; */
`

const ListContaniner = styled.View`
border-bottom-width: 1px;
border-bottom-color: ${COLORS.gray_200};
margin-bottom: 30px;
`

const CenterTitleBoxContainer = styled.View`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 18px;
margin-bottom: 30px;
`

const CenterTitleText = styled.Text`
color: ${COLORS.sub};
font-size: 16px;
font-weight: 500;
line-height: 22.4px;
letter-spacing: -0.4px;
`

const BtnContainer = styled.View`
display: flex;
flex-direction: column;
margin-top: 40px;
background: red;
`

const DeleteBtnContainer = styled.TouchableOpacity`
margin-top: 84px;
/* background-color: red; */
display: flex;
padding: 20px;
align-items: center;
justify-content: center;
`

const DeleteBtnText = styled.Text`
color: ${COLORS.gray_300};
font-size: 16px;
font-weight: 500;
line-height: 22px;
letter-spacing: -0.4px;
`