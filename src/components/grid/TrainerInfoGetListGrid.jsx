import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { ScrollView } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
function TrainerInfoGetListGrid({profileInfo}) {
    console.log('1',profileInfo.centerProfiles)
    // console.log('12',profileInfo.centerProfiles[0].details)

    const clockIcon = require('../../assets/img/clockIcon.png');

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        contentContainerStyle={{paddingBottom: 100}}
        
        >
          <ProfileTitleText>프로필 사진 등록</ProfileTitleText>
          <ProfileImgContainer>
            {
            profileInfo?.images?.map((image,index) => (        
            <SelectImgContainer key={index}>
                            <SelectedImage source={{ uri: image.path }} />
            </SelectImgContainer>
            ))
            }
            </ProfileImgContainer>


          <ProfileTitleText>소개</ProfileTitleText> 
            <ProfileContentDesContainer>
                <ProfileContentText>{profileInfo?.description}</ProfileContentText>
            </ProfileContentDesContainer>


          <ProfileTitleText>경력사항</ProfileTitleText>
            <ProfileContentContainer>
                <ProfileContentText>{profileInfo?.career}</ProfileContentText>
            </ProfileContentContainer>
          
          <ProfileTitleText>자격사항</ProfileTitleText>  
            <ProfileContentContainer>
                <ProfileContentText>{profileInfo?.qualifications}</ProfileContentText> 
            </ProfileContentContainer>

            {
             profileInfo?.centerProfiles.map((center,index) => (
                    <React.Fragment key={index}>
                        <ProfileContentText>연동센터{index+1}</ProfileContentText>
                    <ProfileCenterContainer key={index}>
                        <ProfileCenterTitleText>{center.centerName}</ProfileCenterTitleText>
                    </ProfileCenterContainer>

                    
                    {
    center.details.length > 0 ?
    <ProfileDateContainer>
        <ProfileDateTitleContainer>
            <ProfileDateTitleText>근무 가능 시간</ProfileDateTitleText>
        </ProfileDateTitleContainer>
        <ProfileDateDetailContainer>
        {
            center.details.map((detail,index) => (
                <ProfileDateBox key={index}>
                    <ClockIconImg source={clockIcon}/>
                    <ProfileDateText>{detail.type} {detail.startTime} ~ {detail.endTime}</ProfileDateText>
                </ProfileDateBox>
            ))
        }
        </ProfileDateDetailContainer>
    </ProfileDateContainer> : null
}
        
        </React.Fragment>
    ))

}

        </ScrollView>
    );
}

export default TrainerInfoGetListGrid;

const ProfileTitleText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height: 22.4px;
letter-spacing: -0.35px;
margin-bottom: 8px;
margin-top: 44px;
`;

const ProfileImgContainer = styled.View`
    margin-top: 8px;
    margin-bottom: 30px;
    flex-direction: row;
    flex-wrap: wrap;
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
  margin-right: 10px;
    margin-bottom: 10px;
  border-radius: 10px;
`;

const ProfileContentDesContainer = styled.View`
width: 100%;
border-radius: 13px;
border: 1px solid ${COLORS.gray_200};
background: ${COLORS.white};
padding: 16px 16px 80px 16px;
margin-bottom: 20px;
`

const ProfileContentContainer = styled.View`
width: 100%;
border-radius: 13px;
border: 1px solid ${COLORS.gray_200};
background: ${COLORS.white};
padding: 16px;
margin-bottom: 20px;
`

const ProfileContentText = styled.Text`
color: #797979;
font-size: 14px;
font-weight: 400;
line-height: 22.4px;
letter-spacing: -0.35px;
margin-top: 20px;
`

const ProfileCenterContainer = styled.View`
width: 100%;
border-radius: 13px;
border: 1px solid ${COLORS.white};
background: ${COLORS.gray_100};
padding: 16px;
margin-top: 8px;
margin-bottom: 30px;
`

const ProfileCenterTitleText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height:22.4px;
letter-spacing: -0.4px;
color: ${COLORS.sub};
`

const ProfileDateContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-bottom: 40px;
border-bottom-width: 1px;
border-bottom-color: ${COLORS.gray_100};
margin-bottom: 40px;
/* background: red; */
`

const ProfileDateDetailContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const ProfileDateTitleContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const ProfileDateTitleText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 22.4px;
letter-spacing: -0.35px;
`


const ProfileDateText = styled.Text`
color: ${COLORS.sub};
font-size: 14px;
font-weight: 400;
line-height: 22.4px;
letter-spacing: -0.35px;
`

const ClockIconImg = styled.Image`
    margin-right: 8px;
    width: 20px;
    height: 20px;
`

const ProfileDateBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`