import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput, View,Platform,KeyboardAvoidingView} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import {contractState} from '../../store/atom';
import {MainContainer} from '../../style/gridStyled';
import {formatReplaceString} from '../../utils/CustomUtils';
const paymentTypeItem = {
  CARD: '카드',
  CASH: '현금',
  BANK_TRANSFER: '계좌이체',
  PAYMENT_LINK: '결제링크',
};

function EditContractScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const goBack = () => {
    navigation.goBack();
  };

  const {memberId} = route.params;

  const [contract, setContract] = useRecoilState(contractState);

  const [updatedContractTicket, setUpdatedContractTicket] = useState([]);

  useEffect(() => {
      //기간제라 횟수(time)가 null일 경우
      setUpdatedContractTicket(
        contract.selectedTickets.map((ticket, idx) => {
          if (contract.selectedTickets[idx].time === null) {
            return {
              ...ticket,
              time: '-',
            };
          } else {
            return {...ticket};
          }
        }),
      );
  }, []);

  const updateContractTicketDetail = (item, key, value) => {
    const updatedData = updatedContractTicket.map(contract => {
      if (contract.id === item.id) {
        return {
          ...contract,
          [key]: value,
        };
      }
      return contract;
    });

    setUpdatedContractTicket(updatedData);
  };

  const goContractAgreement = () => {
    setContract(prev => {
      return {...prev, ['updatedSelectedTickets']: updatedContractTicket};
    });
    navigation.navigate('AgreementContract', {memberId});
  };

  const isActive = () => {
    return !updatedContractTicket.some(ticket => {
      return (
        [
          ticket.name,
          ticket.time,
          ticket.startDate,
          ticket.paymentType,
          ticket.price,
        ] || []
      ).some(element => {
        return element !== 0 && !element;
      });
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{marginBottom: 100}}>
        <ContractTitle>{contract.contractTemplate.name}</ContractTitle>

        <Divider />

        <View style={{gap: 20, marginTop: 30}}>
          {contract.selectedTickets?.map((item, index) => {
            return (
  
                <View key={item.id || index}>
                  <TitleText>{`상품 ${index + 1}`}</TitleText>

                  <Container>
                    <InfoTitleText>기간</InfoTitleText>

                    <DateContainer>
                      <TextInput
                        // style={{ width: '45%' }} 
                        placeholder="0000.00.00"
                        value={formatReplaceString(updatedContractTicket[index]?.startDate)|| ''}
                        onChangeText={text => {
                          updateContractTicketDetail(item, 'startDate', text);
                        }}
                        maxLength={10}
                      />
                      <DateContainer.Text>{` ~ `}</DateContainer.Text>
                      <TextInput
                        // style={{ width: '45%' }} 
                        placeholder="0000.00.00"
                        value={formatReplaceString(updatedContractTicket[index]?.endDate)|| ''}
                        onChangeText={text => {
                          updateContractTicketDetail(item, 'endDate', text);
                        }}
                        maxLength={10}
                      />
                    </DateContainer>

                  </Container>

                  <Container>
                    <InfoTitleText>이용권 상품</InfoTitleText>
                    <PriceTextInput
                      placeholder="이용권 상품"
                      value={updatedContractTicket[index]?.name}
                      onChangeText={text => {
                        updateContractTicketDetail(item, 'name', text);
                      }}
                      maxLength={16}
                    />
                  </Container>
                  <Container>
                    <InfoTitleText>횟수</InfoTitleText>

                    <View style={{width: 100}}>
                      <PriceTextInput
                        placeholder="0회"
                        keyboardType="number-pad"
                        value={String(updatedContractTicket[index]?.time)}
                        onChangeText={text => {
                          updateContractTicketDetail(item, 'time', text);
                        }}
                        maxLength={3}
                      />
                    </View>
                  </Container>
                  <Container>
                    <PriceContainer style={{gap: 11}}>
                      <PriceInnerContainer>
                        <InfoTitleText>결제수단</InfoTitleText>
                        <PriceTextInput
                          placeholder="결제수단"
                          value={
                            paymentTypeItem[
                              updatedContractTicket[index]?.paymentType
                            ] || updatedContractTicket[index]?.paymentType
                          }
                          onChangeText={text => {
                            updateContractTicketDetail(
                              item,
                              'paymentType',
                              text,
                            );
                          }}
                          maxLength={8}
                        />
                      </PriceInnerContainer>

                      <PriceInnerContainer>
                        <InfoTitleText>금액(원)</InfoTitleText>
                        <PriceTextInput
                          placeholder="0원"
                          keyboardType="number-pad"
                          value={String(updatedContractTicket[index]?.price)
                            .replace(/[^0-9]/g, '')
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          onChangeText={text => {
                            updateContractTicketDetail(
                              item,
                              'price',
                              text
                                .replace(/[^0-9]/g, '')
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            );
                          }}
                          maxLength={10}
                        />
                      </PriceInnerContainer>
                    </PriceContainer>
                  </Container>

                  <Divider />
                </View>

            );
          })}
        </View>
      </ScrollView>

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          disabled={!isActive()}
          isActive={isActive()}
          onPress={() => goContractAgreement(memberId)}>
          <BasicMainBtnNextBtnNextText isActive={isActive()}>
            다음
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
    </KeyboardAvoidingView>
  );
}

export default EditContractScreen;

const ContractTitle = styled.Text`
  color: ${COLORS.sub};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 29px;
  margin-top: 44px;
`;


const DateContainer = styled.View`
  width: ${Platform.OS === 'ios' ? '56%' : '66%'};
  flex-direction: row;
  background-color: ${COLORS.gray_100};
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  /* padding: 0px 0px; */
  /* padding: 14px 20px; */
  padding: ${Platform.OS === 'ios' ? '14px 20px' : '0px 10px'};
`;

DateContainer.Text = styled.Text`
  color: ${COLORS.sub};
`;

const Container = styled.View`
  margin-bottom: 26px;
`;

const TitleText = styled.Text`
  color: ${COLORS.sub};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
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

const InfoTitleText = styled.Text`
  color: ${COLORS.gray_400};
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 8px;
`;

const PriceContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const PriceInnerContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const PriceTextInput = styled.TextInput.attrs(props => ({
  editable: !props.disabled,
  placeholderTextColor: props.disabled ? COLORS.sub : COLORS.gray_300,
}))`
  width: 100%;
  font-size: 14px;
  color: ${COLORS.sub};
  font-weight: 400;
  border: 1px solid ${COLORS.gray_100};
  background-color: ${COLORS.gray_100};
  border-radius: 13px;
  padding: 15px 16px;
  margin-bottom: 8px;
`;

const Divider = styled.View`
  background-color: ${COLORS.gray_100};
  width: 100%;
  height: 1px;
`;
