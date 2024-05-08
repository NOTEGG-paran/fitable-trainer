import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { floatingState } from '../../store/atom';
function RegisteredModal({setRegisteredModal , resetClassData}) {

    const navigation = useNavigation();
    const [openFloatingModal, setOpenFloatingModal] = useRecoilState(floatingState);
    const closeModal = () => {
        // resetClassData();
        setRegisteredModal(false);
    }

    const goScheduleScreen = () => {
        navigation.navigate('Schedule',
        setOpenFloatingModal(false)
        );
    }

    return (
        <Modal
        // visible={modalVisible}
        animationType=""
        transparent
        onRequestClose={closeModal}
      >
        <ModalContainer>
            <ModalView>
                <ModalTitle>수업 등록</ModalTitle>
                <ModalSubTitle>일정이 등록되었습니다</ModalSubTitle>
                <ButtonContainer>
            <BtnSubBoxContainer onPress={closeModal}>
                    <BtnText>계속 등록하기</BtnText>
            </BtnSubBoxContainer>

            <BtnSubBoxContainer onPress={goScheduleScreen} isMain={true}>
                    <BtnText isMain={true}>내 일정으로 이동</BtnText>
            </BtnSubBoxContainer>
        </ButtonContainer>

            </ModalView>
        </ModalContainer>
            
        </Modal>
    );
}

export default RegisteredModal;


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
    justify-content: space-between;
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

