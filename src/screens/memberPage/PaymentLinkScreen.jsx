import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import MemberRegisterGrid from '../../components/grid/MemberRegisterGrid';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { centerIdState } from '../../store/atom';
import {sendPaymentLink} from '../../api/memberApi';
import BasicMainBtn from '../../components/button/BasicMainBtn';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
function PaymentLinkScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const goBack = () => {
        navigation.goBack();
    }

    const { memberInfo = {}, type = '',memberId } = route.params || {};

    console.log('dkdk나넘어왓와오옹ㅁ',memberInfo,type,memberId ,memberInfo.id)
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [name, setName] = useState(type? memberInfo.name : '');
    const [selectedGender, setSelectedGender] = useState(type? memberInfo.genderType : 'MALE');
    const [phone, setPhone] = useState(type? memberInfo.phone:null);

    const [bookmarkTickets, setBookmarkTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectTicketId, setSelectTicketId] = useState([]);
    const [date, setDate] = useState(new Date());
    const initstartDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const initialFormData = {
        memberId: memberId || '',
        centerId: centerId || '',
        name,
        genderType:selectedGender,
        phone,
        tickets: [],
    };
    
    const [formData, setFormData] = useState(initialFormData);

    const addTicket = () => {
      setFormData((prevData) => ({
        ...prevData,
        tickets: [
          ...prevData.tickets,
          {
            id: '',
            time: null,
            period: null,
            periodType: null,
            startDate: initstartDate,
            endDate: '',
            stopTicketDay: 0,
            stopTicketTime: 0,
            couponId: null,
            paymentType: 'PAYMENT_LINK',
            salePrice: 0,
            receivedPrice: 0,
          },
        ],
      }));
    };

// console.log('formDataformData',formData)
console.log('bookmarkTickets',selectedTicket,selectTicketId)

      const sendPaymentLinkHandler = async () => {
        const { memberId, centerId, name, genderType, phone, tickets } = formData;
        const data = {
          memberId:memberInfo.id,
          centerId,
          name,
          genderType,
          phone,
          tickets,
        };
        console.log('data',data)
        try {
          const result = await sendPaymentLink(data);
          console.log('결제링크 전송',result)
          if (result) {
            navigation.goBack();
          }
        }
        catch (err) {
          console.log('결제링크 전송',err)
        }
      }


      const isActive = formData.tickets.every(ticket => {
        // endDate와 salePrice가 존재해야 하며, period가 있을 경우 periodType도 존재해야 한다.
        return ticket.endDate && ticket.salePrice !== 0 && (!ticket.period || ticket.periodType);
    });


    return (
      <MainContainer>
            <GobackGrid onPress={goBack}>결제링크 전송</GobackGrid>
         
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            extraScrollHeight={10}
            >
            
            <MemberRegisterGrid 
            name={name}
            setName={setName}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            phone={phone}
            setPhone={setPhone}
            memberInfo={memberInfo} type={type}
            bookmarkTickets={bookmarkTickets}
            setBookmarkTickets={setBookmarkTickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            addTicket={addTicket}
            formData={formData}setFormData={setFormData}
            selectTicketId={selectTicketId}
            setSelectTicketId={setSelectTicketId}
            memberId={memberId}
            />
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        {
          selectTicketId.length > 0 && (
            <BasicMainBtn
            isActive={isActive}
            onPress={()=>sendPaymentLinkHandler(memberInfo.id)}
            >결제링크 전송</BasicMainBtn>
          )
        }
        </MainContainer>
    );
}

export default PaymentLinkScreen;