import { COLORS } from '../../constants/color';
import styled from 'styled-components/native';
import {GridLineGrayOne}from '../../style/gridStyled';
import MemberTicketSelectCard from '../card/MemberTicketSelectCard';
import MemberDateSelectCard from '../card/MemberDateSelectCard';
import PaymentGridCard from '../card/PaymentGridCard';
import { useState } from 'react';
function MemberTicketsInfoGrid({type,ticket,bookmarkTickets,memberId,formData,
  setSelectedTicket,setFormData,selectedTicket,index,selectTicketId,setSelectTicketId}) {

    const [timeAndPeriod, setTimeAndPeriod] = useState([]);
    const [priceIndex, setPriceIndex]= useState('')
 
    return (
        <>
          <SelectedTicketContainer>
               <MemberTicketSelectCard 
                index={index}
                ticketId={selectTicketId}
                setFormData={setFormData}
                selectedTicket={selectedTicket}
                bookmarkTickets={bookmarkTickets}
                setSelectedTicket={setSelectedTicket}
                setSelectTicketId={setSelectTicketId}
                timeAndPeriod={timeAndPeriod}
                setTimeAndPeriod={setTimeAndPeriod}
                setPriceIndex={setPriceIndex}
               />
                </SelectedTicketContainer>

                <GridLineGrayOne/>

               <MemberDateSelectCard 
               setFormData={setFormData}
               index={index}
               formData={formData}
               />
                <GridLineGrayOne/>
                <PaymentGridCard 
                index={index}
                memberId={memberId}
                setFormData={setFormData}
                type={type}
                formData={formData}
                timeAndPeriod={timeAndPeriod[priceIndex]?.price}
                />
                <GridLineGrayOne/>
        </>
    )
}

export default MemberTicketsInfoGrid;


const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-family: Pretendard;
 font-weight: 500;
 line-height: 22px;
`;

const SelectedTicketContainer = styled.View`
  margin-top: 8px;
`;
