import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState } from 'react';
import { ScrollView } from 'react-native';


export function MemberTypeBtn({member, setMember}) {

    // console.log('totalElements123123123',totalElements.ATTENDANCE)
    const handleTabClick = (tab) => {
        setMember(tab);
      };

    //   console.log('dd',member)

    return (
        <BtnListContainer>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        
      
            <BtnListBox selected={member === 'ALL'} onPress={()=>handleTabClick('ALL')}>
             <BtnListText selected={member === 'ALL'}>전체</BtnListText>
           </BtnListBox>
    
            <BtnListBox selected={member === 'VALID'} onPress={()=>handleTabClick('VALID')}>
            <BtnListText selected={member === 'VALID'}>유효회원</BtnListText>
          </BtnListBox>

        <BtnListBox selected={member === 'STOP'} onPress={()=>handleTabClick('STOP')}>
          <BtnListText selected={member === 'STOP'}>중지회원</BtnListText>
        </BtnListBox>

        <BtnListBox selected={member === 'INVALID'} onPress={()=>handleTabClick('INVALID')}>
          <BtnListText selected={member === 'INVALID'}>만료회원</BtnListText>
        </BtnListBox>

          <BtnListBox selected={member === 'PAY_WAITING'} onPress={()=>handleTabClick('PAY_WAITING')}>
          <BtnListText selected={member === 'PAY_WAITING'}>미결제회원</BtnListText>
        </BtnListBox>
        
        <BtnListBox selected={member === 'POTENTIAL'} onPress={()=>handleTabClick('POTENTIAL')}>
          <BtnListText selected={member === 'POTENTIAL'}>비회원</BtnListText>
        </BtnListBox>
    
        
        </ScrollView>
      </BtnListContainer>
    );
}


export function MemberTicketBtn({ticket, setTicket}) {


      const handleTabClick = (tab) => {
        setTicket(tab);
        };
        // console.log('dfasdf',ticket)

      return (
          <BtnListContainer>
              <BtnListBox selected={ticket === 'ALL'} onPress={()=>handleTabClick('ALL')}>
               <BtnListText selected={ticket === 'ALL'}>전체</BtnListText>
             </BtnListBox>
          
              <BtnListBox selected={ticket === 'PERSONAL'} onPress={()=>handleTabClick('PERSONAL')}>
              <BtnListText selected={ticket === 'PERSONAL'}>개인</BtnListText>
            </BtnListBox>
          
          <BtnListBox selected={ticket === 'GROUP'} onPress={()=>handleTabClick('GROUP')}>
            <BtnListText selected={ticket === 'GROUP'}>그룹</BtnListText>
          </BtnListBox>
        </BtnListContainer>
      );
  }

const BtnListContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 36px;
`;

const BtnListBox = styled.TouchableOpacity`
  padding: 9px 20px;
  border-radius: 50px;
    margin-right: 10px;
  background-color: ${({ selected }) => (selected ? COLORS.sub : COLORS.white)};
  border: 1px solid ${({ selected }) => (selected ? COLORS.sub : COLORS.gray_300)};
`;

const BtnListText = styled.Text`
  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  color: ${({ selected }) => (selected ? COLORS.main : COLORS.gray_300)};
`;