import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Modal, ScrollView,Keyboard,TouchableWithoutFeedback,Dimensions, Platform } from 'react-native';
import { useState, useRef } from 'react';
import {MemberTypeBtn,MemberTicketBtn} from '../button/MemberDetailBtnContents';
import {getMemberManage} from '../../api/memberApi';
import { useRecoilState } from 'recoil';
import {totalElementsState} from '../../store/atom';
import FastImage from 'react-native-fast-image';
function MemberDetailSearchModal({modalVisible, closeModal,ticket,setTicket,member,setMember,setUserList,type,centerId,leftTime, setLeftTime,saveCloseModal}) {
  

// 기기 높이값 가져오기
  const windowHeight = Dimensions.get('window').height;
  console.log('sjvd;',windowHeight)

  const IsSmallDevice = windowHeight < 700 ? true : false;

  const [totalElements, setTotalElements] = useRecoilState(totalElementsState);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
    const reload = require('../../assets/img/reload.png')

    const handleInputText = (text) => {
      setLeftTime(text);
    }

    const resetBtn = () => {
        setTicket('ALL');
        setMember('ALL');
        setLeftTime('')
    }

    const getFilterMemberManage = async () => {
      console.log('le각각의 값들',leftTime, ticket, member,centerId,type)
        try {
            const response = await getMemberManage({ centerId,type,member, ticket, leftTime });
            setUserList(response.content);
            setTotalElements(prevState => ({
              ...prevState,
              [type]: response.totalElements
            }));
            saveCloseModal();
        } catch (error) {
            console.error(error);
        }
    }

    // console.log('totalElements',totalElements)
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
 
        <ModalContainer>
        <ModalContent focus={isFocused}>
          {/* <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
           > */}
        <ModalHeaderContainer>
          <ModalHdButton onPress={resetBtn}>
            <ModalIcons source={reload} />
          </ModalHdButton>
            <ModalTitle>상세조건</ModalTitle>

          <ModalHdButton onPress={closeModal}>
            <ModalIcons source={require('../../assets/img/close.png')} />
           </ModalHdButton>

        </ModalHeaderContainer>
 
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
      
          <ModalMemberContainer isFocused={isFocused}>
            <ModalSubTitle>회원</ModalSubTitle>
            <MemberTypeBtn     
              member={member} setMember={setMember}
              />
            </ModalMemberContainer>
            
            <ModalSubTitle>수강권</ModalSubTitle>
            <MemberTicketBtn
              ticket={ticket} setTicket={setTicket}
            />
          <InpurBoxContainer IsSmallDevice={IsSmallDevice}>
            <ModalSubTitle>잔여횟수</ModalSubTitle>
            <TextInputBox 
            placeholder="필터링할 잔여 횟수"
            keyboardType="numeric"
            onChangeText={handleInputText}
            value={leftTime}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />
            </InpurBoxContainer>

      </ScrollView>

      {/* </ScrollView> */}
      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn onPress={getFilterMemberManage}>
            <BasicMainBtnNextBtnNextText>적용하기</BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
        </BasicMainBtnContainer>

          </ModalContent>
        </ModalContainer>
      </Modal>
      </TouchableWithoutFeedback>
      
    );
}

export default MemberDetailSearchModal;



const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, .8);
`;

const ModalContent = styled.View`
background-color: ${COLORS.white};
width: 100%;
padding: 20px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
/* flex: .64; */
flex: ${props => props.focus ? 0.84 : 0.64}
`;

const ModalMemberContainer = styled.View`
display: ${props => props.isFocused && Platform.OS ==='android' ? 'none' : ''};
`;

const ModalHeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top:20px;
    margin-bottom: 44px;
`

const ModalTitle = styled.Text`
font-size: 16px;
font-weight: 600;
line-height: 22px;
letter-spacing: -0.4px;
color:#000;
`;

const ModalSubTitle = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22px;
letter-spacing: -0.35px;
color: ${COLORS.gray_400};
`;


const TextInputBox = styled.TextInput`
    width: 100%;
    height: 40px;
    border: 1px solid ${COLORS.gray_300};
    border-radius: 10px;
    padding-left: 10px;
    margin-bottom: 20px;
    margin-top: 8px;
    text-align: right;
    padding-right: 8px;

`;

const ModalHdButton = styled.TouchableOpacity`
`;

const ModalIcons = styled(FastImage)`
width: 26px;
height: 26px;
`

const BasicMainBtnContainer = styled.View`
    position: absolute;
    bottom: 0px;
    left: 20px;
    right: 20px;
    height: 80px;
    background-color: ${COLORS.white};
    /* align-items: center; */
    /* justify-content: center;     */
`

const InpurBoxContainer = styled.View`
    margin-bottom: ${props => props.IsSmallDevice ? '180px' : '0px'};
`;

const BasicMainBtnNextBtn = styled.TouchableOpacity`
    background-color: ${COLORS.sub};
    border-radius: 90px;
    align-items: center;
    justify-content: center;
    padding: 14px 0;
    width: 100%;
`;

const BasicMainBtnNextBtnNextText = styled.Text`
font-size: 16px;
font-weight: 600;
line-height: 22.40px;
color: ${COLORS.white};
`
