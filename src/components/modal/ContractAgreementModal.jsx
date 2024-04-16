import {Keyboard, Modal, TouchableWithoutFeedback, View} from 'react-native';
import {styled} from 'styled-components/native';
import {COLORS} from '../../constants/color';

import WebView from 'react-native-webview';

function ContractAgreementModal({title, detailData, modalVisible, closeModal}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}>
        <ModalContainer>
          <ModalContent>
            <ModalHeaderContainer>
              <ModalHdButton onPress={closeModal}>
                <ModalIcons source={require('../../assets/img/close.png')} />
              </ModalHdButton>
            </ModalHeaderContainer>
            <View
              style={{
                flex: 1,
              }}>
              <ModalTitle>{title}</ModalTitle>

              <WebView
                source={{
                  html: htmlSource(detailData),
                }}
              />
            </View>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </TouchableWithoutFeedback>
  );
}

export default ContractAgreementModal;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ModalContent = styled.View`
  background-color: ${COLORS.white};
  width: 100%;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex: 0.84;
`;

const ModalHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 39px;
`;

const ModalTitle = styled.Text`
  color: ${COLORS.sub};
  font-size: 28px;
  font-weight: 400;
  letter-spacing: -0.7px;
  margin-bottom: 42px;
`;

const ModalHdButton = styled.TouchableOpacity``;

const ModalIcons = styled.Image``;

const htmlSource = data => {
  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
        p {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.4px;
          color: ${COLORS.gray_400};
        }
        li {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.4px;
          color: ${COLORS.gray_400};
        }
        ol{
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.4px;
          color: ${COLORS.gray_400};
        }
        ul{
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.4px;
          color: ${COLORS.gray_400};
        }
        span {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.4px;
          color: ${COLORS.gray_400};
        }
        img { max-width: 100%; height: auto; }
      </style>
      </head>
      <body>
      ${data ? data : ''}
      </body>
    </html>
    `;
};
