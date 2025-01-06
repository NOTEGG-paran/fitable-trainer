/**
 * 1. **프로젝트명**: 핏에이블 강사앱
 * 2. **파일명**: ContractTicketScreen.js
 * 3. **설명**:
 *    - 사용자가 계약서에 포함할 이용권을 선택하는 화면입니다.
 * 4. **주요 로직**:
 *    - **이용권 리스트 호출**:
 *      - API를 통해 사용자의 이용 가능한 이용권 데이터를 호출하여 표시합니다.
 *    - **이용권 선택 및 해제**:
 *      - 선택한 이용권의 상태를 `Recoil` 상태로 관리하며, 이미 선택된 이용권은 해제 가능합니다.
 *    - **버튼 활성화**:
 *      - 선택된 이용권이 있을 경우, 계약서 작성 버튼이 활성화됩니다.
 * 5. **주요 기능**:
 *    - 사용자의 이용권 리스트를 표시.
 *    - 이용권 선택 및 다중 선택 가능.
 *    - 선택한 이용권을 기반으로 계약서 작성 화면으로 이동.
 */


import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled, {css} from 'styled-components/native';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import {MainContainer} from '../../style/gridStyled';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {useRecoilState} from 'recoil';
import {getMemberContractTicketList} from '../../api/memberApi';
import {centerIdState, contractState} from '../../store/atom';

function ContractTicketScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => {
    navigation.goBack();
  };

  const {memberId} = route.params;

  const [centerId, setCenterId] = useRecoilState(centerIdState);

  const [contract, setContract] = useRecoilState(contractState);

  const [contractList, setContractList] = useState([]);

  useEffect(() => {
    const getMemberContractTicketListData = async () => {
      try {
        const response = await getMemberContractTicketList({
          centerId,
          memberId,
        });
        if (response) {
          setContractList(response);
        }
      } catch (error) {
        console.log('error', error);
      }
    };



    if (centerId && memberId) {
      getMemberContractTicketListData();
    }
  }, []);

  const onPressContractBtn = item => {
    if (contract.selectedTickets.some(contract => contract.id === item.id)) {
      const updatedContractData = contract.selectedTickets.filter(
        contract => contract.id !== item.id,
      );

      setContract(prev => {
        return {
          ...prev,
          ['selectedTickets']: updatedContractData,
        };
      });
    } else {
      const updatedContractData = [...contract.selectedTickets, item];

      setContract(prev => {
        return {
          ...prev,
          ['selectedTickets']: updatedContractData,
        };
      });
    }
  };

  const goEditContract = () => {
    navigation.navigate('EditContract', {memberId});
  };

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <Title>이용 중인 이용권 선택</Title>
      {contractList?.tickets?.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={{marginBottom: 100}}>
          {contractList?.tickets?.map((item, index) => {
            return (
              <ContractCard
                key={item.id}
                isActive={contract.selectedTickets.some(
                  contract => contract.id === item.id,
                )}
                onPress={() => onPressContractBtn(item)}>
                <ContractTitle
                  isActive={contract.selectedTickets.some(
                    contract => contract.id === item.id,
                  )}>
                  {item.name.length > 16
                    ? item.name.substring(0, 16) + '...'
                    : item.name}
                </ContractTitle>
              </ContractCard>
            );
          })}
        </ScrollView>
      )}

      {contractList?.tickets?.length === 0 && (
        <EmptyView>
          <Text style={{color: COLORS.gray_300}}>등록된 계약서가 없습니다</Text>
        </EmptyView>
      )}

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          isActive={contract.selectedTickets.length > 0}
          disabled={contract.selectedTickets.length < 1}
          onPress={() => goEditContract()}>
          <BasicMainBtnNextBtnNextText
            isActive={contract.selectedTickets.length > 0}>
            계약서 작성
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default ContractTicketScreen;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.35px;
  color: ${COLORS.gray_400};
  margin-bottom: 10px;
  margin-top: 44px;
`;

const ContractCard = styled.TouchableOpacity`
  background-color: ${COLORS.gray_100};
  border-radius: 13px;
  padding: 14px 16px;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${props =>
    props.isActive &&
    css`
      background-color: ${COLORS.sub};
    `}
`;

const ContractTitle = styled.Text`
  font-size: 16px;
  color: ${COLORS.sub};
  font-weight: 500;
  line-height: 22.4px;

  ${props =>
    props.isActive &&
    css`
      color: ${COLORS.main};
    `}
`;

const BasicMainBtnContainer = styled.View`
  position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
  height: 80px;
  background-color: ${COLORS.white};
  /* align-items: center; */
  /* justify-content: center;     */
`;

const BasicMainBtnNextBtn = styled.TouchableOpacity`
  background-color: ${props => (props.isActive ? COLORS.sub : COLORS.gray_100)};

  border-radius: 90px;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  width: 100%;
`;

const BasicMainBtnNextBtnNextText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  color: ${COLORS.white};
`;

const EmptyView = styled.View`
  flex: 0.8;
  align-items: center;
  justify-content: center;
`;
