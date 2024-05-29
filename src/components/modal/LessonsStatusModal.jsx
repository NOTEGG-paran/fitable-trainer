import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Modal,Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

function LessonsStatusModal({modalVisible, closeModal,setShowAlertModal,showAlertModal,setStatusType}) {


    const openLessonModal = (type) => {
        console.log('dfadsf',setShowAlertModal,showAlertModal)
        setShowAlertModal(true)
        setStatusType(type)
        closeModal()
    }


    return (
        <>
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
        >
        <ModalContainer>
          <ModalContent>
            <ModalHeaderContainer>
           {/* <ModalTitle>asdfasdf</ModalTitle> */}
          <ModalCloseButton onPress={closeModal}>
            <ModalCloseBox source={require('../../assets/img/close.png')} />
           </ModalCloseButton>
           </ModalHeaderContainer>
           <ListContainer>


        <CenterListContaniner onPress={()=>openLessonModal('ATTENDANCE')}>
          <ModalSubTitle isColor={'sky'}>출석처리</ModalSubTitle>
        </CenterListContaniner>

        <CenterListContaniner onPress={()=>openLessonModal('ABSENT')}>
          <ModalSubTitle isColor={'red'}>결석처리</ModalSubTitle>
        </CenterListContaniner>

        <CenterListContaniner onPress={()=>openLessonModal('')}>
          <ModalSubTitle>예약취소</ModalSubTitle>
        </CenterListContaniner>


           </ListContainer>
          </ModalContent>
        </ModalContainer>
      </Modal>
            </>
    );
}

export default LessonsStatusModal;

const windowHeight = Dimensions.get('window').height;
const dynamicFlex = windowHeight <= 667 ? 0.5 : 0.4;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
`;

const ModalContent = styled.View`
background-color: ${COLORS.white};
width: 100%;
padding: 20px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
flex: ${dynamicFlex};
`;


const ModalSubTitle = styled.Text`
font-size: 16px;
font-weight: 600;
line-height: 22.40px;
color: ${prop => prop.isColor === 'sky' ? COLORS.sky : prop.isColor === 'red' ? COLORS.red : COLORS.sub};
`;

const ModalCloseButton = styled.TouchableOpacity`
  padding: 20px;
`;

const ModalHeaderContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: flex-end;
margin-bottom: 8px;
`

const ModalCloseBox = styled(FastImage)`
    width: 28px;
    height: 28px;
`

const CenterListContaniner = styled.TouchableOpacity`
margin-bottom: 22px;
justify-content: center;
align-items: center;
border: 1px solid ${COLORS.gray_100};
padding: 16px 20px;
border-radius: 50px;
background-color: ${COLORS.gray_100};
`
const ListContainer = styled.View`
flex: 1;
/* margin-top: 20px; */
margin-bottom: 10px;
`