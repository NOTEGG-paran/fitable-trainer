import ProfileInput from '../input/ProfileInput';
import GenderSelectBtn from '../button/GenderSelectBtn';
import React,{ useState } from 'react';
import { ScrollView, TextInput, Platform } from 'react-native';
import MemberPhoneInfo from '../input/MemberPhoneInfo';
import { COLORS } from '../../constants/color';
import styled from 'styled-components/native';
import {GridLineGrayOne}from '../../style/gridStyled';
import BookmarkTicketModal from '../modal/BookmarkTicketModal';
import { centerIdState } from '../../store/atom';
import { useRecoilState } from 'recoil';
import {getBookmarkTickets} from '../../api/memberApi';
import MemberTicketsInfoGrid from './MemberTicketsInfoGrid';
import FastImage from 'react-native-fast-image';
function MemberRegisterGrid({memberInfo,type,name, setName,selectedGender,
    setSelectedGender,phone, setPhone,bookmarkTickets,
     setBookmarkTickets,selectedTicket, setSelectedTicket,selectTicketId, 
     setSelectTicketId,addTicket,formData,setFormData,memberId
    }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    

    const closeModal = () => {
      setModalVisible(false);
    };

    const openBookmarkTicketModal = async() => {
        try{
            const response = await getBookmarkTickets(centerId);
            if(response){
                setBookmarkTickets(response.content);
                setModalVisible(true);
            }
        }catch(error){
            console.log('error',error)
        }
      
    }


    const addbtn = require('../../assets/img/pluscircle.png');

    return (
        <>
        {
            Platform.OS === 'ios'? (
                <ProfileInput
                type={type}
                title={'이름'}
                onChangeText={setName}
                setName={setName}
                maxLength={10} 
                value={name}
                placeholder={type === 'paylink' ? memberInfo?.name : '회원명'}
            />
            ):(
                <>
                <InfoTitleText>이름</InfoTitleText>
                <InfoTextInputContainer>
                <ProfileInfoTextInput
                type={type}
                onChangeText={setName}
                setName={setName}
                maxLength={10} 
                value={name}
                placeholder={type === 'paylink' ? memberInfo?.name : '회원명'}
                />
                </InfoTextInputContainer>
                </>
            )
        }
       

            <GenderSelectBtn 
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            />

            <MemberPhoneInfo 
            setPhone={setPhone}
            phone={phone}
            type={type}
            />

            <GridLineGrayOne/>
            {formData.tickets.map((ticket, index) => (
                <React.Fragment key={index}>
                <MemberTicketsInfoGrid
                  type={type}
                  index={index}
                  ticket={ticket}
                  formData={formData}
                  bookmarkTickets={bookmarkTickets}
                  selectedTicket={selectedTicket}
                  selectTicketId={selectTicketId}
                  setSelectTicketId={setSelectTicketId}memberId={memberId}
                  setSelectedTicket={setSelectedTicket}setFormData={setFormData}
                />
                </React.Fragment>
            ))}

            <AddBtnContainer onPress={openBookmarkTicketModal}>
                <AddbtnBox>
                    <AddbtnIcon source={addbtn}/>
                    <AddBtnText>이용권 추가</AddBtnText>
                </AddbtnBox>
            </AddBtnContainer>
            {
                modalVisible &&
            <BookmarkTicketModal 
            modalVisible={modalVisible}
            closeModal={closeModal}
            type={type}
            bookmarkTickets={bookmarkTickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            selectTicketId={selectTicketId}
            setSelectTicketId={setSelectTicketId}
            addTicket={addTicket}
            openBookmarkTicketModal={openBookmarkTicketModal}
            />
        }
        </>
    );
}

export default MemberRegisterGrid;

const AddBtnContainer = styled.TouchableOpacity`
background-color: ${COLORS.white};
border : 1px solid ${COLORS.gray_200};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 112px;
`;

const AddbtnBox = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`;

const AddbtnIcon = styled(FastImage)`
    margin-right: 8px;
    width: 20px;
    height: 20px; 
`;

const AddBtnText = styled.Text`
font-size: 14px;
color: ${COLORS.sub};
font-weight: 400;
line-height: 22.40px;
`;

const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-family: Pretendard;
 font-weight: 500;
 line-height: 22px;
 margin-bottom: 8px;
 margin-top: 40px;
`;


const InfoTextInputContainer = styled.View`
    width: 100%;
    height: 60px;
    background-color: ${COLORS.white};
    border-radius: 13px;
    padding: 0px 20px;
    border-width: 1px;
    border-color: ${COLORS.gray_200};
`;

const ProfileInfoTextInput = styled.TextInput.attrs(props => ({
     placeholderTextColor: COLORS.gray_300,
     fontSize: 14,
  }))`
        padding: 10px 0px;
        flex:1;
        color: ${COLORS.sub};
        font-weight: 500;
        line-height: 22px;
        /* line-height: ${props => (props.isType ? '0' : '22px')}; */
`;