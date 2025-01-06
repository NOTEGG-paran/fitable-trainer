/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: DetailLessonCommonGridadd입니다.js
 * 3. **설명**:
 *    - 추가개발용입니다. 현 컴포넌트로 사용중임
 */
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import {getLessonReservationMembers,getLessonMemberDetail} from '../../api/lessonApi';
import FastImage from 'react-native-fast-image';
import { useState } from 'react';
import LoadingModal from '../modal/LoadingModal';
import LessonAlertModal from '../modal/LessonAlertModal';
import LessonsStatusModal from '../modal/LessonsStatusModal';
import {postLessonAttendance,cancelLessonReservation,postLessonAbsent,getLessonDetail} from '../../api/lessonApi';
function DetailLessonCommonGrid({lessonDetail,routerType,lessonId,setLessonDetail}) {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const [memberLessonId, setMemberLessonId] = useState('')
    const [memberName, setMemberName] = useState('')
    const [statusType, setStatusType] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [showAlertModal, setShowAlertModal] =useState(false);
    
// console.log('lessonDetaillessonDetaillessonDetaillessonDetail',lessonDetail)

// 수업 예약취소 cancel
const cancelReservationBtn = async id => {
    try {
      const response = await cancelLessonReservation(id);
      if (response) {
        refreshLessonDetails(lessonId)
        // Alert.alert('예약 취소', '예약이 취소되었습니다', [
        //   {text: '확인', onPress: async() => refreshLessonDetails(lessonId)
        //     // navigation.navigate('Schedule')
        //   },
        // ]);
      } else {
        return;
      }
    } catch (error) {
      console.log('예약취소 에러', error);
    }
  };

// 수업 출석처리 Attendance
  const postLessonAttendanceBtn = async id => {
    try {
      const response = await postLessonAttendance(id);
      if (response) {
        refreshLessonDetails(lessonId)
        // Alert.alert('출석', '출석처리로 변경되었습니다', [
        //   {text: '확인', onPress: () => refreshLessonDetails(lessonId)
        // },
        // ]);
      } else {
        return;
      }
    } catch (error) {
      console.log('출석처리 에러', error);
    }
  };

  //Absence
  const postLessonAbsentBtn = async id => {
    try {
      const response = await postLessonAbsent(id);
      if (response) {
        refreshLessonDetails(lessonId)
        // Alert.alert('결석', '결석처리로 변경되었습니다', [
        //   {text: '확인', onPress: () => refreshLessonDetails(lessonId)
        // },
        // ]);
      } else {
        return;
      }
    } catch (error) {
      console.log('결석처리 에러', error);
    }
  };

  const refreshLessonDetails = async (lessonId) => {
    console.log('lessonId',lessonId)
    try {
        const result = await getLessonDetail(lessonId);
        if (result) {
            setLessonDetail(result)
            resetState();
        }
    } catch (error) {
        console.error('Failed to refresh lesson details', error);
    }
};

const resetState = () => {
    setMemberLessonId('');
    setMemberName('');
    setStatusType('');
    setModalVisible(false);
    setShowAlertModal(false);
};
  
    const selectMemberScreen = async(id) => {
        setIsLoading(true)
            try{
                const response = await getLessonReservationMembers(id);
                // console.log('회원 선택 응답',response)
                navigation.navigate('MemberSelect',{
                    selectData: response.content,
                    lessonId: id,
                    nextPage: 1, 
                    hasMore: response.content.length === 10,
                })
            }catch{
                console.log('5err', error)
            }finally{
                setIsLoading(false)
            }
    }

    const showSliderModal = (id,name) => {
            console.log('idididididid',id,name)
            setModalVisible(true);
            setMemberLessonId(id)  
            setMemberName(name)
        
        //     try{
        //         const response = await getLessonMemberDetail(id);
        //         console.log('무슨데이터 일까용!!',response)
        //         navigation.navigate('ClassMemberDetail',{
        //             detailData: response,
        //             screenType: 'class',
        //         })
        //     }catch(error){
        //         console.log('error 뜸 ㅠ3123123ㅠ', error)
        // }

    }


    const alertCloseModal = () => {
        setShowAlertModal(false)
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    const personal = require('../../assets/img/activeperson.png');
    const group = require('../../assets/img/activegroup.png');
    const addbtn = require('../../assets/img/pluscircle.png');

    return (
        <>
        <InfoGroup>
            <DetailHeaderContainer>
                <DateTitle>{lessonDetail?.date}</DateTitle>
                {
                    lessonDetail?.type === 'PERSONAL' ? (<IconImg source={personal}/>) : 
                    lessonDetail?.type === 'GROUP' ? (<IconImg source={group}/>) : null
                }
            </DetailHeaderContainer>

                <DetailContentContainer>
                    <DetailContent>
                    <DetailContentTitle>수업명</DetailContentTitle>
                    <DetailContentText>{lessonDetail?.name ? lessonDetail.name : '-'}</DetailContentText>
                    </DetailContent>

                    <DetailContent>
                    <DetailContentTitle>시간</DetailContentTitle>
                    <DetailContentText>{lessonDetail?.startTime} ~ {lessonDetail?.endTime} </DetailContentText>
                    </DetailContent>

                    {
                        lessonDetail.location ? (
                            <DetailContent>
                            <DetailContentTitle>장소</DetailContentTitle>
                            <DetailContentText>{lessonDetail?.location}</DetailContentText>
                            </DetailContent> 
                        ): null
                    }
                       

                </DetailContentContainer>

         <ReservationInfoContainer>
            <ReservationInfo>참가회원</ReservationInfo>
            {
                lessonDetail?.reservationInfo.max && (<ReservationInfo>({lessonDetail?.reservationInfo.current} / {lessonDetail.reservationInfo.max})</ReservationInfo>)
            }
        </ReservationInfoContainer>  
        <ScrollContainer
       bounces={false}
       showsVerticalScrollIndicator={false}   
       showsHorizontalScrollIndicator={false}
       overScrollMode="never">
        {
        lessonDetail.members && lessonDetail.members.map(member => (
            // <MembersListContaniner key={member.id} onPress={()=>memberDetailScreen(member.id)}>
                <MembersListContaniner key={member.id}>
            {
                member.name === null ? (
                    <>
                <MemberNameContainer onPress={()=>showSliderModal(member.id,member.name)}>
                    <MemberName>알 수 없음</MemberName>
                </MemberNameContainer>

                {
                        member.status === 'ATTENDANCE' ?  
                        <MemberStatusContainer 
                        onPress={()=>showSliderModal(member.id,member.name)}
                        isStatus={member.status === 'ATTENDANCE' ? true: false}>
                        <StatusText>출석</StatusText> 
                        </MemberStatusContainer>
                        :
                        member.status === 'ABSENT' ?  
                        <MemberStatusContainer 
                        onPress={()=>showSliderModal(member.id,member.name)}
                        isStatus={member.status === 'ATTENDANCE' ? true: false}>
                        <StatusText>결석</StatusText> 
                        </MemberStatusContainer>
                        : null
                    }
                </>
                ):(
                <>
                <MemberNameContainer onPress={()=>showSliderModal(member.id,member.name)}>
                    <MemberName>{member.name}</MemberName>
                </MemberNameContainer>
                    {
                        member.status === 'ATTENDANCE' ?  
                        <MemberStatusContainer 
                        onPress={()=>showSliderModal(member.id,member.name)}
                        isStatus={member.status === 'ATTENDANCE' ? true: false}>
                        <StatusText>출석</StatusText> 
                        </MemberStatusContainer>
                        :
                        member.status === 'ABSENT' ?  
                        <MemberStatusContainer 
                        onPress={()=>showSliderModal(member.id,member.name)}
                        isStatus={member.status === 'ATTENDANCE' ? true: false}>
                        <StatusText>결석</StatusText> 
                        </MemberStatusContainer>
                        : null
                    }
               
                </>
                )
            }
            </MembersListContaniner>
        ))
        
        }
            <AddBtnContainer 
             disabled={isLoading}
            onPress={()=>selectMemberScreen(lessonDetail.id)}>
                <AddbtnBox>
                    <AddbtnIcon source={addbtn}/>
                    <AddBtnText>회원 선택</AddBtnText>
                </AddbtnBox>
            </AddBtnContainer>
        </ScrollContainer>
        {
            isLoading && (
                <LoadingModal />
            )
        }
    </InfoGroup>
    {
       showAlertModal && (
            <LessonAlertModal 
                modalVisible={showAlertModal}
                closeModal={alertCloseModal}
                startTime={lessonDetail.startTime}
                endTime={lessonDetail.endTime}
                memberName={memberName}
                statusType={statusType}
                memberLessonId={memberLessonId}
                cancel={cancelReservationBtn}
                attendance={postLessonAttendanceBtn}
                absent={postLessonAbsentBtn}
            />
        )
      }
    {
        <LessonsStatusModal
        setShowAlertModal={setShowAlertModal}
        modalVisible={modalVisible}
        closeModal={closeModal}
        setStatusType={setStatusType}
        />
    }

    </>
    );
}

export default DetailLessonCommonGrid;


const InfoGroup = styled.View`
    flex:1;
    
`;

const DetailHeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 57px;
    margin-top: 44px;
`

const DateTitle = styled.Text`
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    color: ${COLORS.sub};
`;


const IconImg = styled(FastImage)`
    width: 48px;
    height: 48px;
`;

const DetailContentContainer = styled.View``

const DetailContent = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`

const DetailContentTitle = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 600;
line-height: 22.40px;
`

const DetailContentText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_400};
font-weight: 400;
line-height: 22.40px;
`

const ReservationInfo = styled.Text`
color: ${COLORS.sub};
font-size: 16px;
font-weight: 600;
line-height: 22.40px;
margin-bottom: 20px;
`;

const MembersListContaniner = styled.View`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const MemberNameContainer = styled.TouchableOpacity`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 12px;
width: 70%;
`

const MemberStatusContainer = styled.TouchableOpacity`
    background-color: ${props => props.isStatus ? COLORS.sky : COLORS.red};
    border-radius: 13px;
    padding: 14px 16px;
    margin-bottom: 12px;
    width: 24%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StatusText = styled.Text`
    color: ${COLORS.white};
    font-size: 16px;
    font-weight: 600;
    line-height: 22.40px;
`

const MemberName = styled.Text`
    font-size: 16px;
    color: ${COLORS.sub};
    font-weight: 500;
    line-height: 22.40px;
`;

const AddBtnContainer = styled.TouchableOpacity`
background-color: ${COLORS.white};
border : 1px solid ${COLORS.gray_200};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 22px;
`;

const AddbtnBox = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`

const AddbtnIcon = styled(FastImage)`
    margin-right: 8px;
    width: 20px;
    height: 20px;
`

const AddBtnText = styled.Text`
font-size: 14px;
color: ${COLORS.sub};
font-weight: 400;
line-height: 22.40px;
`

const ReservationInfoContainer = styled.View`
display: flex;
flex-direction: row;
`

const ScrollContainer = styled.ScrollView`
flex:1;
`

