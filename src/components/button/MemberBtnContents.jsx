import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import {totalElementsState,centerIdState } from '../../store/atom';

function MemberBtnContents({type, setType,setSearchText}) {

  const [totalElements, setTotalElements] = useRecoilState(totalElementsState);
  const [centerId, setCenterId] = useRecoilState(centerIdState);

    const handleTabClick = (tab) => {
      setType(tab);
      setSearchText('');
      };

    return (
        <BtnListContainer>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
            bounces={false}
            >
        
        {
             centerId && totalElements.PERSONAL > 0 &&
            <BtnListBox selected={type === 'PERSONAL'} onPress={()=>handleTabClick('PERSONAL')}>
             <BtnListText selected={type === 'PERSONAL'}>개인레슨 {centerId ? totalElements.PERSONAL:0}</BtnListText>
           </BtnListBox>
        }

        {
            centerId && totalElements.GROUP > 0 &&
            <BtnListBox selected={type === 'GROUP'} onPress={()=>handleTabClick('GROUP')}>
            <BtnListText selected={type === 'GROUP'}>그룹레슨 {centerId ? totalElements.GROUP:0}</BtnListText>
          </BtnListBox>
        }

        <BtnListBox selected={type === 'ATTENDANCE'} onPress={()=>handleTabClick('ATTENDANCE')}>
          <BtnListText selected={type === 'ATTENDANCE'}>입장중 {centerId ? totalElements.ATTENDANCE:0}</BtnListText>
        </BtnListBox>

        <BtnListBox selected={type === 'MANAGING'} onPress={()=>handleTabClick('MANAGING')}>
          <BtnListText selected={type === 'MANAGING'}>관리담당 {centerId ? totalElements.MANAGING:0}</BtnListText>
        </BtnListBox>

          <BtnListBox selected={type === 'POTENTIAL'} onPress={()=>handleTabClick('POTENTIAL')}>
          <BtnListText selected={type === 'POTENTIAL'}>비회원 {centerId ? totalElements.POTENTIAL:0}</BtnListText>
        </BtnListBox>
    
        
        </ScrollView>
      </BtnListContainer>
    );
}

export default MemberBtnContents;

const BtnListContainer = styled.View`
  flex-direction: row;
  margin-top: 32px;
  margin-bottom: 28px;
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