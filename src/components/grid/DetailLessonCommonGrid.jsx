/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: DetailLessonCommonGrid.js
 * 3. **설명**:
 *    - 수업 상세 정보를 표시하고, 참가 회원 목록을 보여주는 그리드 컴포넌트.
 *    - 회원 상세 정보 및 회원 선택 기능 제공.
 *    - 추가개발용은 DetailLessonCommonGridadd입니다. 이걸로 되어있으니 참고
 *
 * 4. **주요 로직**:
 *    - **수업 상세 정보 표시**:
 *      - 수업명, 시간, 장소 등의 정보를 `lessonDetail` 객체로 렌더링.
 *    - **참가 회원 정보**:
 *      - 참가 회원 목록을 렌더링하고, 회원 클릭 시 상세 정보로 이동.
 *    - **회원 선택 기능**:
 *      - "회원 선택" 버튼 클릭 시 회원 목록을 API에서 받아오고, 선택 화면으로 이동.
 *    - **로딩 처리**:
 *      - API 호출 중 로딩 상태를 `isLoading` 상태로 관리.
 *
 * 5. **주요 기능**:
 *    - **수업 상세 정보 렌더링**:
 *      - `lessonDetail` 데이터를 기반으로 수업명, 시간, 장소, 참가 회원 정보 표시.
 *    - **회원 상세 보기**:
 *      - 참가 회원 클릭 시 `memberDetailScreen`을 호출하여 회원 상세 화면으로 이동.
 *    - **회원 선택**:
 *      - "회원 선택" 버튼 클릭 시 `selectMemberScreen`을 호출하여 회원 선택 화면으로 이동.
 *    - **로딩 모달 표시**:
 *      - `LoadingModal` 컴포넌트를 통해 API 호출 중 로딩 상태를 사용자에게 알림.
 *
 * 6. **주요 상태 및 로직**:
 *    - **상태**:
 *      - `isLoading`: API 호출 중 로딩 상태.
 *    - **로직**:
 *      - `selectMemberScreen`: 특정 수업 ID로 참가 가능 회원 목록을 API에서 받아옴.
 *      - `memberDetailScreen`: 특정 회원 ID로 회원 상세 정보를 API에서 받아옴.
 *
 */


import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import {getLessonReservationMembers,getLessonMemberDetail} from '../../api/lessonApi';
import FastImage from 'react-native-fast-image';
import { useState } from 'react';
import LoadingModal from '../modal/LoadingModal';
function DetailLessonCommonGrid({lessonDetail,routerType}) {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    // console.log('routerTyperouterType',routerType,lessonDetail)

// console.log('lessonDetaillessonDetaillessonDetaillessonDetail',lessonDetail)

    const selectMemberScreen = async(id) => {
        console.log('lssoid',id)
        setIsLoading(true)
            try{
                const response = await getLessonReservationMembers(id,0,10);
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

    const memberDetailScreen = async(id) => {

            try{
                const response = await getLessonMemberDetail(id);
                navigation.navigate('ClassMemberDetail',{
                    detailData: response,
                    screenType: 'class',
                })
            }catch(error){
                console.log('error 뜸 ㅠ3123123ㅠ', error)
        }

    }

    const personal = require('../../assets/img/activeperson.png');
    const group = require('../../assets/img/activegroup.png');
    const addbtn = require('../../assets/img/pluscircle.png');


    return (
        <InfoGroup>
            <DetailHeaderContainer>
                <DateTitle>{lessonDetail.date}</DateTitle>
                {
                    lessonDetail.type === 'PERSONAL' ? (<IconImg source={personal}/>) : 
                    lessonDetail.type === 'GROUP' ? (<IconImg source={group}/>) : null
                }
            </DetailHeaderContainer>

                <DetailContentContainer>
                    <DetailContent>
                    <DetailContentTitle>수업명</DetailContentTitle>
                    <DetailContentText>{lessonDetail.name}</DetailContentText>
                    </DetailContent>

                    <DetailContent>
                    <DetailContentTitle>시간</DetailContentTitle>
                    <DetailContentText>{lessonDetail.startTime} ~ {lessonDetail.endTime} </DetailContentText>
                    </DetailContent>

                    {
                        lessonDetail.location ? (
                            <DetailContent>
                            <DetailContentTitle>장소</DetailContentTitle>
                            <DetailContentText>{lessonDetail.location}</DetailContentText>
                            </DetailContent> 
                        ): null
                    }
                       

                </DetailContentContainer>

         <ReservationInfoContainer>
            <ReservationInfo>참가회원</ReservationInfo>
            {
                lessonDetail.reservationInfo.max && (<ReservationInfo>({lessonDetail.reservationInfo.current} / {lessonDetail.reservationInfo.max})</ReservationInfo>)
            }
        </ReservationInfoContainer>  
        <ScrollContainer
       bounces={false}
       showsVerticalScrollIndicator={false}   
       showsHorizontalScrollIndicator={false}
       overScrollMode="never">
        {lessonDetail.members && lessonDetail.members.map(member => (
            <MembersListContaniner key={member.id} onPress={()=>memberDetailScreen(member.id)}>
            {
                member.name === null ? (<MemberName>알 수 없음</MemberName>):(<MemberName>{member.name}</MemberName>)
            }
            </MembersListContaniner>
        ))}
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
    );
}

export default DetailLessonCommonGrid;


const InfoGroup = styled.View`
    flex:1;
`;

const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.50);
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

const MembersListContaniner = styled.TouchableOpacity`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 12px;
`;

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

