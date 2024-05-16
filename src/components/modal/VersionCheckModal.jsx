import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Modal} from 'react-native';

function VersionCheckModal({ visible, alertText, openStore}) {

    const goUpdateStore = () => {
        openStore();
    }

    return (
        <Modal
        animationType=""
        transparent
      >
        <ModalContainer>
            <ModalView>
                <ModalTitle>[업데이트 알림]</ModalTitle>
                <ModalSubTitle>{alertText}</ModalSubTitle>
                <ButtonContainer>
            <BtnSubBoxContainer onPress={goUpdateStore}>
                    <BtnText>확인</BtnText>
            </BtnSubBoxContainer>
        </ButtonContainer>

            </ModalView>
        </ModalContainer>
            
        </Modal>
    );
}

export default VersionCheckModal;


const ModalContainer = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.50);
    align-items: center;
    justify-content: center;
    z-index: 1;
`

const ModalView = styled.View`
    align-items: center;
    justify-content: center;
    height: 209px;
    width: 93%;
    background-color: ${COLORS.white};
    border-radius: 15px;
`

const ModalTitle = styled.Text`
color: ${COLORS.sub};
font-size: 20px;
font-weight: 600;
line-height: 30px;
`



const ModalSubTitle = styled.Text`
font-size: 14px;
margin-top: 4px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_400};
`

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 23px;
    margin-top: 31px;
`

const BtnSubBoxContainer = styled.TouchableOpacity`
background-color: ${props => props.isMain ? COLORS.sub : COLORS.gray_100};
height: 48px;
width: 48%;

align-items: center;
justify-content: center;
border-radius: 10px;
`

const BtnText = styled.Text`
font-size: 16px;
color: ${props => props.isMain ? COLORS.white : COLORS.gray_400};
font-weight: 600;
`

