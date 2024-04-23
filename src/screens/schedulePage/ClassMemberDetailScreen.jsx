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

  const cancelReservationBtn = async id => {
    try {
      const response = await cancelLessonReservation(id);
      if (response) {
        Alert.alert('예약 취소', '예약이 취소되었습니다', [
          {text: '확인', onPress: () => navigation.navigate('Schedule')},
        ]);
      } else {
        return;
      }
    } catch (error) {
      console.log('예약취소 에러', error);
    }
  };

  const postLessonAttendanceBtn = async id => {
    try {
      const response = await postLessonAttendance(id);
      if (response) {
        Alert.alert('출석', '출석으로 변경되었습니다', [
          {text: '확인', onPress: () => navigation.navigate('Schedule')},
        ]);
      } else {
        return;
      }
    } catch (error) {
      console.log('출석처리 에러', error);
    }
  };

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
      </ScrollView>
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
  background-color: ${COLORS.white};
  padding: 20px;
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
