/**
 * 1. **프로젝트명**: 핏에이블 강사앱
 * 2. **파일명**: ContractScreen.js
 * 3. **설명**: 
 *    - 계약서 작성 화면으로, 회원과 연결된 계약서를 선택하거나 새 계약서를 작성하기 전에 제공된 계약서 템플릿을 선택합니다.
 * 4. **주요 로직**:
 *    - `getMemberContractList` API를 호출하여 현재 센터의 등록된 계약서 리스트를 가져옵니다.
 *    - 선택된 계약서를 `Recoil`의 `contractState`에 저장합니다.
 *    - "이용권 선택" 버튼은 계약서 선택 여부에 따라 활성화/비활성화됩니다.
 * 5. **주요 기능**:
 *    - 계약서 리스트를 표시.
 *    - 계약서 선택 및 상태 관리.
 *    - "이용권 선택" 버튼을 통한 다음 화면으로 이동.
 */

import React from 'react';
import {MainContainer} from '../../style/gridStyled';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {getMemberContractList} from '../../api/memberApi';
import {useRecoilState} from 'recoil';
import {centerIdState, contractState} from '../../store/atom';
import {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';

import {Text, View} from 'react-native';

function ContractScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const goBack = () => {
    navigation.goBack();
  };

  const {memberId} = route.params;

  //계약서 작성 관련 state
  const [contract, setContract] = useRecoilState(contractState);

  const [centerId, setCenterId] = useRecoilState(centerIdState);

  const [contractList, setContractList] = useState([]);

  useEffect(() => {
    const getMemberContractListData = async () => {
      try {
        const response = await getMemberContractList(centerId);
        if (response) {
          setContractList(response);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    getMemberContractListData();
  }, []);

  const goContractDetail = () => {
    navigation.navigate('ContractTicket', {memberId});
  };

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <Title>신규 계약서 선택</Title>
      {contractList.map((item, index) => {
        return (
          <ContractCard key={index}>
            <ContractBtnBox
              isActive={contract.contractTemplate.id === item.id}
              onPress={() =>
                setContract(prev => {
                  return {
                    ...prev,
                    ['contractTemplate']: item,
                  };
                })
              }>
              <ContractTitle
                isActive={contract.contractTemplate.id === item.id}>
                {item.name}
              </ContractTitle>
            </ContractBtnBox>
          </ContractCard>
        );
      })}
      {contractList.length === 0 && (
        <EmptyView>
          <Text style={{color: COLORS.gray_300}}>등록된 계약서가 없습니다</Text>
        </EmptyView>
      )}

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          isActive={contract?.contractTemplate?.id}
          disabled={!contract?.contractTemplate?.id}
          onPress={() => goContractDetail()}>
          <BasicMainBtnNextBtnNextText
            isActive={contract?.contractTemplate?.id}>
            이용권 선택
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default ContractScreen;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.35px;
  color: ${COLORS.gray_400};
  margin-bottom: 10px;
  margin-top: 44px;
`;

const ContractCard = styled.View`
  border-radius: 10px;
  background-color: ${COLORS.white};
  margin-top: 8px;
`;

const ContractTitle = styled.Text`
  font-size: 16px;
  color: ${props => (props.isActive ? COLORS.main : COLORS.sub)};
  font-weight: 500;
  line-height: 22.4px;
`;

const ContractBtnBox = styled.TouchableOpacity`
  background-color: ${props => (props.isActive ? COLORS.sub : COLORS.gray_100)};

  /* background-color: ${COLORS.gray_100}; */
  border-radius: 13px;
  padding: 14px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
