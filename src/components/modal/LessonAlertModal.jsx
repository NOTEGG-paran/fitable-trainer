import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Modal} from 'react-native';
import { useState } from 'react';
function LessonAlertModal({ closeModal,modalVisible,startTime,endTime,memberName,statusType,memberLessonId,cancel,attendance,absent}) {

    const [isClick,setIsClick]=useState(false);

    const closeLessonModal = () => {
        closeModal(false)
    }

    const onPressDoneBtn = (id,statusType) => {
        console.log('id중복막았어?',statusType)
        setIsClick(true)
        try{
            if(statusType ==='ATTENDANCE'){
                console.log('참석')
                attendance(id)
            }else if(statusType ==='ABSENT'){
                console.log('결석처리입니다')
                absent(id)
            }else{
                console.log('예약취소입니다')
                cancel(id)
            }
        }catch{
            setIsClick(false)
        }
    }

    return (
        <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeLessonModal}
      >
        <ModalContainer>
            <ModalView>
                <ModalTitle>{startTime}~{endTime},{memberName}</ModalTitle>

                {
                    statusType ==='ATTENDANCE' ? <ModalSubTitle>출석처리 하시겠습니까?</ModalSubTitle>:
                    statusType ==='ABSENT' ? <ModalSubTitle>결석처리 하시겠습니까?</ModalSubTitle>:<ModalSubTitle>예약취소 하시겠습니까?</ModalSubTitle>
                }
                <ButtonContainer>
            <BtnSubBoxContainer onPress={closeLessonModal}>
                    <BtnText>취소</BtnText>
            </BtnSubBoxContainer>

            <BtnSubBoxContainer 
            disabled={isClick?true:false}
            color={true} onPress={()=>onPressDoneBtn(memberLessonId,statusType)}>
                    <BtnText color={true} >확인</BtnText>
            </BtnSubBoxContainer>
        </ButtonContainer>

            </ModalView>
        </ModalContainer>

        </Modal>
    );
}

export default LessonAlertModal;


const ModalContainer = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.50);
    align-items: center;
    justify-content: center;
    z-index: 5;
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
background-color: ${props => props.color ? COLORS.sub : COLORS.gray_100};
height: 48px;
width: 48%;
align-items: center;
justify-content: center;
border-radius: 10px;
`

const BtnText = styled.Text`
font-size: 16px;
color: ${props => props.color ? COLORS.white : COLORS.gray_400};
font-weight: 600;
`