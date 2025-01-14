/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: ClassMemberDetailScreen.js
 * 3. **설명**:
 *    - 특정 수업 멤버의 상세 정보를 확인할 수 있는 화면.
 *    - 상담 내역, 보유 이용권, 이용 센터 등 다양한 정보를 제공.
 *    - 사용자의 요청에 따라 계약서 작성, 이용권 등록, 결제 링크 전송 등 추가 액션 수행 가능.
 *
 * 4. **주요 로직**:
 *    - **멤버 상세 정보 로드**:
 *      - `route.params`에서 전달된 데이터를 기반으로 멤버의 상세 정보를 렌더링.
 *    - **내 정보 가져오기**:
 *      - `getMyInfo` API를 호출해 현재 로그인한 사용자의 정보를 가져오고 상태 업데이트.
 *    - **상담 상세 화면 이동**:
 *      - 사용자가 상담 내역을 선택하면 `getConsultDetail` API 호출 후 상담 상세 화면으로 이동.
 *    - **이용권 등록 및 계약서 작성**:
 *      - 이용권 등록, 계약서 작성 등의 요청에 따라 관련 화면으로 이동.
 *
 * 5. **주요 기능**:
 *    - **상세 정보 표시**:
 *      - 이용 센터, 메모, 상담 신청 내역, 보유 이용권 정보를 화면에 표시.
 *    - **상담 내역 관리**:
 *      - 상담 내역을 선택해 상세 정보를 확인 가능.
 *    - **추가 액션**:
 *      - 이용권 등록, 계약서 작성, 결제 링크 전송 등의 추가 기능 지원.
 *    - **API 호출 및 상태 관리**:
 *      - `getMyInfo`, `getConsultDetail` 등을 호출해 데이터를 가져오고 상태 업데이트.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - `contractState`, `centerListState`, `myinfoState`를 사용해 상태를 효율적으로 관리.
 *    - **Styled-Components 사용**:
 *      - 화면 구성 요소의 스타일을 선언적으로 정의.
 *    - **반응형 디자인 고려**:
 *      - 플랫폼 및 화면 너비에 따라 UI 요소의 크기를 동적으로 조정.
 *    - **ScrollView와 FastImage 활용**:
 *      - 긴 내용을 스크롤로 표시하며, 이미지를 최적화된 방식으로 렌더링.
 */


import styled from 'styled-components/native';
import {COLORS} from '../../constants/color';
import {GridLineOne} from '../../style/gridStyled';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import MemberDetailHeader from '../../components/grid/MemberDetailHeader';
import {ScrollView, Alert, Platform, Dimensions } from 'react-native';
import MemberBtn from '../../components/button/MemberBtn';
import {
  cancelLessonReservation,
  postLessonAttendance,
} from '../../api/lessonApi';
import {getConsultDetail} from '../../api/alarmApi';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {centerListState, contractState, myinfoState} from '../../store/atom';
import {useEffect, useState} from 'react';
import {getMyInfo} from '../../api/mypageApi';
import FastImage from 'react-native-fast-image';
function ClassMemberDetailScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const windowWidth = Dimensions.get('window').width;

  const resetList = useResetRecoilState(contractState);

  const setContract = useSetRecoilState(contractState);

  const center = useRecoilValue(centerListState);

  const [myInfo, setMyInfo] = useRecoilState(myinfoState);
  const [shouldFetch, setShouldFetch] = useState(true);
  const getMyInfoData = async () => {
    if (shouldFetch) {
      const response = await getMyInfo();
      setMyInfo(response);
      setShouldFetch(false);
    }
  };

  useEffect(() => {
    getMyInfoData();
  }, [myInfo]);

//   console.log('ceenter', myInfo);

  const {detailData, screenType, memberId, isPotential} = route.params;

  console.log('나 넘어왔엉!', detailData, screenType, memberId, isPotential);
//추가개발시 제거
  // const cancelReservationBtn = async id => {
  //   try {
  //     const response = await cancelLessonReservation(id);
  //     if (response) {
  //       Alert.alert('예약 취소', '예약이 취소되었습니다', [
  //         {text: '확인', onPress: () => navigation.navigate('Schedule')},
  //       ]);
  //     } else {
  //       return;
  //     }
  //   } catch (error) {
  //     console.log('예약취소 에러', error);
  //   }
  // };
//추가개발시 제거
  // const postLessonAttendanceBtn = async id => {
  //   try {
  //     const response = await postLessonAttendance(id);
  //     if (response) {
  //       Alert.alert('출석', '출석으로 변경되었습니다', [
  //         {text: '확인', onPress: () => navigation.navigate('Schedule')},
  //       ]);
  //     } else {
  //       return;
  //     }
  //   } catch (error) {
  //     console.log('출석처리 에러', error);
  //   }
  // };

  const detailConsultScreen = async(id) => {
    // console.log('상세 id확인 path',id)
    try{
        const response = await getConsultDetail(id);
        if(response){
            navigation.navigate('ConsultDetail', {consultDetail: response});
        }
    }catch(error){
        console.log('error 뜸 ㅠㅠ@@',error)
    }
}

  console.log('detailData@@@@#!@#@#', detailData.consultings);

  const paymentlink = require('../../assets/img/paymentlink.png');
  const contract = require('../../assets/img/contractfiles.png');
  const nextIcon = require('../../assets/img/rightIcon.png');
  const ticketIcon = require('../../assets/img/ticketIcon.png');
  return (
    <Container>
      <MemberDetailHeader detailData={detailData} isPotential={isPotential}/>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <ContentsContainer>
          <UseCenterContainer>
            <TitleText>이용 센터</TitleText>
            {detailData?.availableCenters?.length !== 0 ? (
              <SubContentText>
                {detailData?.availableCenters.join(', ')}
              </SubContentText>
            ) : (
              <SubContentText>-</SubContentText>
            )}
          </UseCenterContainer>

          <GridLineOne />

          <MemoContainer>
            <TitleText>메모</TitleText>
            {detailData?.memos?.length === 0 ? (
              <SubContentText>-</SubContentText>
            ) : null}
            {detailData?.memos.map((memo, index) => (
              <MemoInnerBox key={index}>
                <HeaderBox>
                  <MemoTitleLabel>
                    <MemoTitleText>{memo?.centerName}</MemoTitleText>
                  </MemoTitleLabel>

                  <MemoDateText>{memo?.createdAt}</MemoDateText>
                </HeaderBox>
                <MemoSubContentBox>
                  <SubContentText>{memo?.context}</SubContentText>
                </MemoSubContentBox>
              </MemoInnerBox>
            ))}
          </MemoContainer>

          {screenType === 'memberDetail' && (
            <>
              <GridLineOne />
              <ConsultContainer>
                <ConsultTitleText>상담 신청 내역</ConsultTitleText>
                {detailData.consultings.length === 0 ? (
                  <SubContentText>-</SubContentText>
                ) : null}
                {detailData.consultings.map((consult, index) => (
                  <ConsultListContaniner 
                  onPress={()=>detailConsultScreen(consult.id)}
                  key={index}>
                    <TrainerName>
                      {consult.trainerName === null
                        ? '센터 상담'
                        : `${consult.trainerName} 상담 신청`}
                    </TrainerName>
                    <ConsultDateText>{consult.createdAt}</ConsultDateText>
                  </ConsultListContaniner>
                ))}
              </ConsultContainer>
            </>
          )}
        </ContentsContainer>

        <TicketContainer>
          <TitleText>보유 이용권</TitleText>
          {detailData.tickets.length > 0 ? (
            detailData.tickets.map((ticket, index) => (
              <TicketInfo key={index} isExpired={ticket.status === 'EXPIRED'}>
                <HeaderBox>
                <TicketInfoTitle isExpired={ticket.status === 'EXPIRED'}>
                    {ticket.status === 'EXPIRED'
                        ? ticket.name.length > 18
                            ? ticket.name.substring(0, 18) + '...'
                            : ticket.name
                        : Platform.OS === 'android' && windowWidth <= 360
                           ? ticket.name.length > 12
                                ? ticket.name.substring(0, 12) + '...'
                                : ticket.name
                            : ticket.name.length > 16
                                ? ticket.name.substring(0, 16) + '...'
                                : ticket.name}
                </TicketInfoTitle>
                  {ticket.status === 'EXPIRED' ? null : (
                    <TicketStatus>잔여 {ticket.left}</TicketStatus>
                  )}
                </HeaderBox>
                <TicketDateText isExpired={ticket.status === 'EXPIRED'}>
                  {ticket.startDate} ~ {ticket.endDate}
                </TicketDateText>
              </TicketInfo>
            ))
          ) : (
            <TicketInfo isExpired={'EXPIRED'}>
              <TicketInfoTitle>미보유</TicketInfoTitle>
            </TicketInfo>
          )}
        </TicketContainer>

        {/* 추가개발시 주석처리 할 것 */}
        {/* {screenType !== 'memberDetail' && (
          <BtnContainer>
            {detailData?.isAvailableCancel && (
              <MemberBtn
                onPress={() => cancelReservationBtn(detailData.id)}
                colorProp>
                예약취소
              </MemberBtn>
            )}
            {detailData?.isAvailableAttendance && (
              <MemberBtn
                onPress={() => postLessonAttendanceBtn(detailData.id)}
                colorProp>
                출석처리
              </MemberBtn>
            )}
          </BtnContainer>
        )} */}


      </ScrollView>
      {screenType === 'memberDetail' && (
          <PayAndContractContainer>
            {detailData.ticket && (
              <PayAndContractBox
                onPress={() =>
                  navigation.navigate('RegisterMember', {
                    memberInfo: detailData.member,
                    type: 'ticket',
                  })
                }>
                <PayAndContractLeftBox>
                  <LeftIcon 
                  isMargin={true}
                  resizeMode='contain'
                  style={{width: 26, height: 26}}
                  source={ticketIcon} />
                  <PayAndContractText>이용권 등록</PayAndContractText>
                </PayAndContractLeftBox>
                <BtnNextIcon source={nextIcon} />
              </PayAndContractBox>
            )}
            {detailData.contract && (
              <PayAndContractBox
                onPress={() => {
                  resetList();
                  setContract(prev => {
                    return {
                      ...prev,
                      ['trainerName']: myInfo.name,
                      ['centerName']: center[0].name,
                      ['memberName']: detailData.member.name,
                    };
                  });

                  navigation.navigate('Contract', {memberId});
                }}>
                <PayAndContractLeftBox>
                  <LeftIcon 
                  resizeMode='contain'
                  source={contract} />
                  <PayAndContractText>계약서</PayAndContractText>
                </PayAndContractLeftBox>
                <BtnNextIcon source={nextIcon} />
              </PayAndContractBox>
            )}
            {detailData.sendPaymentLink && (
              <PayAndContractBox
                onPress={() =>
                  navigation.navigate('PaymentLink', {
                    memberInfo: detailData.member,
                    type: 'paylink',
                  })
                }>
                <PayAndContractLeftBox>
                  <LeftIcon 
                  resizeMode='contain'
                  source={paymentlink} />
                  <PayAndContractText>결제링크 전송</PayAndContractText>
                </PayAndContractLeftBox>
                <BtnNextIcon source={nextIcon} />
              </PayAndContractBox>
            )}
          </PayAndContractContainer>
        )}
    </Container>
  );
}

export default ClassMemberDetailScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const ContentsContainer = styled.View`
  padding: 0 20px;
`;

const UseCenterContainer = styled.View`
  flex-direction: column;
  margin-top: 30px;
`;

const TitleText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  color: ${COLORS.sub};
`;

const SubContentText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  color: ${COLORS.gray_400};
  margin-top: 5px;
`;
const MemoSubContentBox = styled.View`
  margin-bottom: 20px;
  margin-left: 6px;
`;

const TicketContainer = styled.View`
  background-color: ${COLORS.gray_100};
  padding: 30px 20px;
`;

const MemoContainer = styled.View`
  flex-direction: column;
  margin-bottom: 19px;
`;

const MemoInnerBox = styled.View`
  margin-top: 17px;
`;

const HeaderBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MemoDateText = styled.Text`
  font-size: 14px;
  color: ${COLORS.gray_300};
  font-weight: 400;
  line-height: 22.4px;
`;

const MemoTitleLabel = styled.View`
  padding: 7px 11px;
  background-color: ${COLORS.white};
  border-radius: 80px;
  border: 1px solid ${COLORS.gray_400};
  margin-bottom: 5px;
`;

const MemoTitleText = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${COLORS.gray_400};
`;

const TicketInfo = styled.View`
  margin-top: 10px;
  border: 1px solid
    ${props => (props.isExpired ? COLORS.gray_200 : COLORS.white)};
  background-color: ${props =>
    props.isExpired ? COLORS.gray_200 : COLORS.white};
  padding: 18px 16px;
  border-radius: 13px;
  width: 100%;
`;

const TicketInfoTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  color: ${props => (props.isExpired ? COLORS.gray_300 : COLORS.gray_400)};
`;

const TicketDateText = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${props => (props.isExpired ? COLORS.gray_300 : COLORS.gray_400)};
  font-weight: 500;
  line-height: 19.2px;
`;

const TicketStatus = styled.Text`
  font-size: 14px;
  color: ${COLORS.gray_400};
  font-weight: 400;
  line-height: 22.4px;
`;

const BtnContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
`;

const ConsultContainer = styled.View`
  margin-bottom: 20px;
`;
const ConsultTitleText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  color: ${COLORS.sub};
  margin-bottom: 16px;
`;

const ConsultListContaniner = styled.TouchableOpacity`
  background-color: ${COLORS.gray_100};
  border-radius: 13px;
  padding: 14px 16px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TrainerName = styled.Text`
  font-size: 16px;
  color: ${COLORS.sub};
  font-weight: 500;
  line-height: 22.4px;
`;

const ConsultDateText = styled.Text`
  color: ${COLORS.gray_400};
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
`;

const PayAndContractContainer = styled.View`
  display: flex;
  flex-direction: column;
  /* background-color: ${COLORS.white}; */
  padding: 10px 20px;
`;

const PayAndContractBox = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLORS.white};
  margin-bottom: 12px;
  border-radius: 15px;
  padding: 20px 20px 20px 16px;
  border: 1px solid ${COLORS.gray_200};
`;

const PayAndContractLeftBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: red; */

`;

const PayAndContractText = styled.Text`
  color: ${COLORS.sub};
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.4px;
`;

const LeftIcon = styled(FastImage)`
  width: 20px;
  height: 20px;
  /* margin-right: 12px; */
  margin-right: ${props => (props.isMargin ? '8px' : '12px')};
`;

const BtnNextIcon = styled(FastImage)`
  width: 22px;
  height:22px;
`;
