import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Modal, ScrollView,} from 'react-native';
import FastImage from 'react-native-fast-image';
function AgreementModal({modalVisible, closeModal}) {
    return (
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <ModalContainer>
          <ModalContent>
           <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
           >
          <ModalCloseButton onPress={closeModal}>
            <ModalCloseBox source={require('../../assets/img/close.png')} />
           </ModalCloseButton>
            <ModalTitle>이용약관 동의 내용</ModalTitle>
            <ModalSubTitle>제1장 총직</ModalSubTitle>
            <ModalDesTitle>제1조(목적)</ModalDesTitle>
            <ModalText>이 약관은 회원(이하 "회원"이라고 합니다)이 주식회사 플레이스토어(이하 "회사"라고 합니다)가 제공하는 서비스(이하 "서비스"라고 합니다)를 이용함에 있어 회사와 회원의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</ModalText>
            <ModalDesTitle>제2조(용어의 정의)</ModalDesTitle>
            <ModalText>1. 이 약관은 서비스를 신청한 회원에게 회사가 승낙함으로써 효력이 발생합니다.\n2. 회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지합니다.\n3. 회사는 필요한 경우 관련법령을 위배하지 않는 범위 내에서 이 약관을 변경할 수 있습니다.\n4. 회사가 약관을 변경할 경우에는 적용일자 및 변경사유를 명시하여 현행약관과 함께 서비스 화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리하게 약관 내용을 변경하는 경우에는 그 적용일자 30일 이전부터 적용일자 전일까지 공지하고, 회원의 권리 또는 의무에 관한 중요한 규정의 변경은 적용일자 30일 이전부터 공지합니다.\n5. 회사가 전항에 따라 회원에게 통지하면서 공지 또는 통지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 않으면 승인한 것으로 본다는 뜻을 명확하게 공지 또는 통지하였음에도 회원이 명시적으로 거부의사를 표시하지 아니한 경우 회원이 개정약관에 동의한 것으로 봅니다.\n6. 회원이 개정약관의 적용에 동의하지 않는 경우 회사는 개정약관의 내용</ModalText>
           </ScrollView>
          </ModalContent>
        </ModalContainer>
      </Modal>
    );
}

export default AgreementModal;



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
flex: .92;
`;

const ModalTitle = styled.Text`
    margin-top: 100px;
    margin-bottom: 43px;
  font-size: 28px;
font-weight: 500;
line-height: 37.80px;
color: ${COLORS.sub};

`;

const ModalSubTitle = styled.Text`
  font-size: 20px;
font-weight: 600;
line-height: 30px;
color: ${COLORS.sub};
margin-bottom: 8px;
`;

const ModalDesTitle = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.sub};
margin-bottom: 8px;
`;

const ModalText = styled.Text`
  font-size: 14px;
font-weight: 400;
line-height: 22.40px;
margin-bottom: 30px;
`;

const ModalCloseButton = styled.TouchableOpacity`
`;

const ModalCloseBox = styled(FastImage)`
    position: absolute;
    right: 15px;
    top: 15px;
`