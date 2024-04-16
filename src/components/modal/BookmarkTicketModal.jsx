import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Modal, ScrollView,Keyboard,TouchableWithoutFeedback,KeyboardAvoidingView, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
function BookmarkTicketModal({modalVisible, closeModal,type,bookmarkTickets,
    selectedTicket, setSelectedTicket,addTicket,selectTicketId, setSelectTicketId,openBookmarkTicketModal}) {
    
    // console.log('bookmarkTickets',bookmarkTickets)
    // console.log('typetypetypetypetypetypetype',type)

    const selectTicket = (ticket) => {
        console.log('ticket@#!@#!@#!@#!@#!@#!@#',selectedTicket)
        setSelectedTicket(ticket);
    }

    const applyTicket = () => {
        if (!selectedTicket) {
            alert('티켓을 선택해주세요.');
            return;
        }
        // 선택한 값들 저장
        setSelectTicketId(prevIds => [...prevIds, selectedTicket]); 
                closeModal();
                addTicket();
    }


    const reload = require('../../assets/img/reload.png')

    const resetBtn = () => {  
      openBookmarkTicketModal();
    }


    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <ModalContainer>
        <ModalContent>
         
        <ModalHeaderContainer>
          <ModalHdButton onPress={resetBtn}>
            <ModalIcons source={reload} />
          </ModalHdButton>
            <ModalTitle>즐겨찾는 이용권</ModalTitle>

          <ModalHdButton onPress={closeModal}>
            <ModalIcons source={require('../../assets/img/close.png')} />
           </ModalHdButton>

        </ModalHeaderContainer>
        <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
           >
            {
                bookmarkTickets?.length > 0 ? (
                  bookmarkTickets?.map((item,index) => {
                    const isSelected = selectedTicket && selectedTicket.id === item.id;
                    return(
                        <TicketContainer key={item.id} onPress={() => selectTicket(item)}
                        style={{ backgroundColor: isSelected ? COLORS.gray_100 : '#fff' }}
                        >
                            <TicketText>
                                {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                            </TicketText>
                        </TicketContainer>
                    )
                }
                )
            ):(
                <NoListContainer>
                    <NoListText>즐겨찾는 이용권이 없습니다</NoListText>
                </NoListContainer>
               )
            }
      </ScrollView>
      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn onPress={applyTicket}>
            <BasicMainBtnNextBtnNextText>적용하기</BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
        </BasicMainBtnContainer>

          </ModalContent>
        </ModalContainer>
      </Modal>
      </TouchableWithoutFeedback>
      
    );
}

export default BookmarkTicketModal;



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
flex:  0.84;
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


const TicketContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 12px 16px;
`;

const NoListContainer = styled.View``
const NoListText = styled.Text`
font-size: 20px;
font-weight: 500;
line-height: 22px;
letter-spacing: -0.35px;
color: ${COLORS.gray_400};
text-align: center;
margin-top: 140px;
`

const TicketText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22px;
letter-spacing: -0.35px;
color: ${COLORS.gray_400};
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
