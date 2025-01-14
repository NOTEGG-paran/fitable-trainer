import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import DatePicker from 'react-native-date-picker'
import { Alert ,Platform,TouchableWithoutFeedback,TouchableOpacity,Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
function MemberDateSelectCard({setFormData,index,formData}) {

    const [showStartModal, setShowStartModal] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);
  
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(null);

    const openStartPicker = () => {
      setShowStartModal(true);
    };
  
    const openEndPicker = () => {
      setShowEndModal(true);
    };


    const handleConfirm = (selectedDate) => {
      setShowEndModal(false);
      if (startDate && selectedDate < startDate) {
        Alert.alert('종료 날짜는 시작 날짜보다 이를 수 없습니다.');
      } else {
        setEndDate(selectedDate);
        setFormData((prevData) => ({
          ...prevData,
          tickets: prevData.tickets.map((ticket, idx) =>
            idx === index
              ? {
                  ...ticket,
                  endDate: `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`,
                }
              : ticket
          ),
        }));
      }
    };

    const handleStartDateConfirm = (date) => {
      setShowStartModal(false)
      if (endDate && date > endDate) {
          Alert.alert('시작 날짜는 종료 날짜보다 늦을 수 없습니다.');
        } else {
      setStartDate(date)
      setFormData((prevData) => ({
          ...prevData,
          tickets: prevData.tickets.map((ticket, idx) =>
            idx === index
              ? {
                  ...ticket,
                  startDate: `${date.getFullYear()}-${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
                }
              : ticket
          ),
        }));
      }
    }

    
    const selectStartDate = `${startDate.getFullYear()}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate.getDate().toString().padStart(2, '0')}`;
    const selectEndDate = `${endDate?.getFullYear()}.${(endDate?.getMonth() + 1).toString().padStart(2, '0')}.${endDate?.getDate().toString().padStart(2, '0')}`;
    const rightIcon = require('../../assets/img/caretdownblack.png');

    console.log('startDate',startDate,selectStartDate)

    return (
        <>
        <Container>
        <LabelText>운동 시작일</LabelText>
        <SelectBoxGrid>
        <SelectBox onPress={openStartPicker}>
            <SelectInnerBox>
                     <SelectBoxDateText>{selectStartDate}</SelectBoxDateText>
                     <Modal
        isVisible={showStartModal}
        onBackdropPress={() => {}}  // 모달 외부 클릭 시 아무 동작도 하지 않도록 설정
        onBackButtonPress={() => {}}  // 백 버튼 눌렀을 때 닫히지 않도록 설정
        propagateSwipe={true}
      >
           <TouchableWithoutFeedback onPress={() => {}}>
            <ModalContentsBox>
            <DatePicker
                        // modal
                        locale="ko-KR"
                        open={showStartModal}
                        date={date}
                        mode="date"
                        title={null}
                        onDateChange={setDate}
                        textColor="#000000" // 텍스트 색상 변경
                        fadeToColor="white" // 배경색 변경
                        style={{ backgroundColor: COLORS.gray_200 }}
                        // confirmText="확인"
                        // cancelText="취소"
                        // onConfirm={(date) => {
                        //     setShowStartModal(false)
                        //     if (endDate && date > endDate) {
                        //         Alert.alert('시작 날짜는 종료 날짜보다 늦을 수 없습니다.');
                        //       } else {
                        //     setStartDate(date)
                        //     setFormData((prevData) => ({
                        //         ...prevData,
                        //         tickets: prevData.tickets.map((ticket, idx) =>
                        //           idx === index
                        //             ? {
                        //                 ...ticket,
                        //                 startDate: `${date.getFullYear()}-${(date.getMonth() + 1)
                        //                   .toString()
                        //                   .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
                        //               }
                        //             : ticket
                        //         ),
                        //       }));
                        //     }
                        // }}
                        // onCancel={() => {
                        //     setShowStartModal(false)
                        // }}

                      />
                                  <BtnContainer>
                <SelectModalBtn onPress={()=> setShowStartModal(false)}>
                <CancelBtnText>취소</CancelBtnText>
              </SelectModalBtn>

              <SelectModalBtn onPress={() => handleStartDateConfirm(date)}>
               <ConfirmBtnText>확인</ConfirmBtnText>
              </SelectModalBtn>
              </BtnContainer>

                      </ModalContentsBox>
                     </TouchableWithoutFeedback>
                      </Modal>
            </SelectInnerBox>
            <RigthIcon 
              resizeMode='contain'
            source={rightIcon}/>
         </SelectBox>
            
                        <DividerText>~</DividerText>


         <SelectBox onPress={openEndPicker}>
            <SelectInnerBox>
                {
                endDate&&endDate ? 
                    (<SelectBoxDateText>{selectEndDate}</SelectBoxDateText>) :
                    (<SelectBoxDateText>운동 종료일</SelectBoxDateText>)
                }
      
        <Modal
        isVisible={showEndModal}
        onBackdropPress={() => {}}  // 모달 외부 클릭 시 아무 동작도 하지 않도록 설정
        onBackButtonPress={() => {}}  // 백 버튼 눌렀을 때 닫히지 않도록 설정
        propagateSwipe={true}
      >
           <TouchableWithoutFeedback onPress={() => {}}>
            <ModalContentsBox>
            <DatePicker
                        // modal
                        locale="ko-KR"
                        open={showEndModal}
                        date={date}
                        mode="date"
                        title={null}
                        onDateChange={setDate}
                        textColor="#000000" // 텍스트 색상 변경
                        fadeToColor="white" // 배경색 변경
                        style={{ backgroundColor: COLORS.gray_200 }}
                        // confirmText="확인"
                        // cancelText="취소"
                        // onConfirm={(date) => {
                        //     setShowEndModal(false)
                        //     setEndDate(date)
                        //     if (startDate && date < startDate) {
                        //         Alert.alert('종료 날짜는 시작 날짜보다 이를 수 없습니다.');
                        //       } else {
                        //     setFormData((prevData) => ({
                        //         ...prevData,
                        //         tickets: prevData.tickets.map((ticket, idx) =>
                        //           idx === index
                        //             ? {
                        //                 ...ticket,
                        //                 endDate: `${date.getFullYear()}-${(date.getMonth() + 1)
                        //                   .toString()
                        //                   .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
                        //               }
                        //             : ticket
                        //         ),
                        //       }));
                        //     }
                        // }}
                        // onCancel={() => {
                        //     setShowEndModal(false)
                        // }}
                      />
                <BtnContainer>
                <SelectModalBtn onPress={()=> setShowEndModal(false)}>
                <CancelBtnText>취소</CancelBtnText>
              </SelectModalBtn>

              <SelectModalBtn onPress={() => handleConfirm(date)}>
               <ConfirmBtnText>확인</ConfirmBtnText>
              </SelectModalBtn>
              </BtnContainer>

                      </ModalContentsBox>
                     </TouchableWithoutFeedback>
                </Modal>
            </SelectInnerBox>
            <RigthIcon  
             resizeMode='contain' source={rightIcon}/>
         </SelectBox>
         </SelectBoxGrid>
    </Container>

    <Container>
        <LabelText>중지권</LabelText>
        <SelectBoxGrid> 

          <CountTextInputContainer>
             <CountTextInput
             placeholder="0"
             keyboardType='numeric'
             onChangeText={(text) => {
               setFormData((prevData) => {
                 let tickets = [...prevData.tickets];
                 tickets[index].stopTicketDay = text;
                 return {...prevData, tickets};
                });
              }}
              />
             <DayLabel isActive={!!formData.tickets[index].stopTicketDay}>일</DayLabel>
              </CountTextInputContainer>          

              <CountTextInputContainer>


            <CountTextInput
            placeholder="0"
            keyboardType='numeric'
            onChangeText={(text) => {
              setFormData((prevData) => {
                let tickets = [...prevData.tickets];
                tickets[index].stopTicketTime = text;
                return {...prevData, tickets};
              });
            }}
            />
             <DayLabel isActive={!!formData.tickets[index].stopTicketTime}>회</DayLabel>
            </CountTextInputContainer>
         </SelectBoxGrid>
    </Container>

    </>
    );
}

export default MemberDateSelectCard;


const Container = styled.View`
margin-top: 10px;
margin-bottom: 20px;
`

const SelectBoxGrid = styled.View`
display: flex;
flex-direction: row;
align-items: center; 
justify-content: space-between;
width: 100%;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    background-color: ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    width: 46%;
`
const CountTextInputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    text-align: right;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    /* padding: 15px 16px; */
    padding: ${Platform.OS === 'ios' ? '15px 16px' : '4px 16px'};
    background-color: ${COLORS.gray_100};
    width: 48%;
`;

const CountTextInput = styled.TextInput`
    text-align: right;
    flex:1;
    width: 100%;
`

const DayLabel = styled.Text`
    /* margin-left: 10px; */
    font-size: 16px;
    color: ${(props) => props.isActive ? COLORS.sub : COLORS.gray_300};
`;

const DividerText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 600;
line-height: 28px;
/* margin: 0 8px; */
`

const SelectInnerBox = styled.View`
flex-direction: row;
align-items: center;
`

const SelectBoxDateText = styled.Text`
font-size: 14px;
color: ${COLORS.sub};
font-weight: 400;
line-height: 22.40px;
`

const LabelText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_400};
margin-bottom: 12px;
`

const RigthIcon = styled(FastImage)`
width: 14px;
height: 14px;
`


const ModalContentsBox = styled.View`
background-color: ${COLORS.gray_200};
/* background-color: white; */
justify-content: center;
align-items: center;
border-radius: 13px;
`

const BtnContainer = styled.View`
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
`

const ConfirmBtnText = styled.Text`
  color:${COLORS.sky};
  font-size: 20px;
  font-weight: 500;
`
const CancelBtnText = styled.Text`
color:${COLORS.red};
font-size: 20px;
font-weight: 500;
`

const SelectModalBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* border: 1px solid ${COLORS.gray_100}; */
    /* background-color: ${COLORS.gray_100}; */
    border-radius: 13px;
    padding: 15px 16px;
    width: 42%;
`