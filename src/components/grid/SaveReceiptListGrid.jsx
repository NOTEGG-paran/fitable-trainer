import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import {GridLine} from '../../style/gridStyled';
import {formatCommaNumber} from '../../utils/CustomUtils';
import FastImage from 'react-native-fast-image';
const SaveReceiptListGrid = ({ item,isLast,onEditReceipt, onDeleteReceipt }) => {

    const renderPaymentType = (paymentType) => {
        switch (paymentType) {
          case 'CASH':
            return '현금';
          case 'CARD':
            return '카드';
          case 'BANK_TRANSFER':
            return '계좌이체';
          case 'PAYMENT_LINK':
            return '결제 링크';
          case 'APP_CARD':
            return '앱 카드';
          default:
            return paymentType;
        }
      };

      const renderCardQuota = (cardQuota) => {
        if (cardQuota === '1' || cardQuota === 1) {
          return '일시불';
        }
        return `${cardQuota}개월`;
      };

      const renderCashReceiptType = (cashReceiptType) => {
        switch (cashReceiptType) {
          case 'PERSONAL':
            return '개인소득공제';
          case 'BUSINESS':
            return '사업자지출증빙';
          default:
            return cashReceiptType;
        }
      };
      const editIcon = require('../../assets/img/edtiicon.png');
      const deleteIcon = require('../../assets/img/removeicon.png');
    return (
      <ReceiptContainer>
        <ReceiptTextContainer>
          <ReceiptTitleText>결제수단</ReceiptTitleText>
          <ReceiptText>{renderPaymentType(item.paymentType)}</ReceiptText>
        </ReceiptTextContainer>

        {item.price && (
          <ReceiptTextContainer>
            <ReceiptTitleText>결제금액</ReceiptTitleText>
            <ReceiptText>{formatCommaNumber(item.price)}원</ReceiptText>
          </ReceiptTextContainer>
        )}
        {item.isPublishCashReceipt !== null && (
          <ReceiptTextContainer>
            <ReceiptTitleText>현금 영수증 발행 여부</ReceiptTitleText>
            <ReceiptText>{item.isPublishCashReceipt ? '발행' : '미발행'}</ReceiptText>
          </ReceiptTextContainer>
        )}
      {item.cashReceiptType && item.cashReceiptNumber && (
        <ReceiptTextContainer>
          <ReceiptTitleText>현금영수증</ReceiptTitleText>
          <ReceiptText>{renderCashReceiptType(item.cashReceiptType)} {item.cashReceiptNumber}</ReceiptText>
        </ReceiptTextContainer>
      )}

        {item.cardQuota && (
          <ReceiptTextContainer>
            <ReceiptTitleText>할부기간</ReceiptTitleText>
            <ReceiptText>{renderCardQuota(item.cardQuota)}</ReceiptText>
          </ReceiptTextContainer>
        )}
        {item.cardName && (
          <ReceiptTextContainer>
            <ReceiptTitleText>카드사</ReceiptTitleText>
            <ReceiptText>{item.cardName}</ReceiptText>
          </ReceiptTextContainer>
        )}
        {item.cardNumber && (
          <ReceiptTextContainer>
            <ReceiptTitleText>카드번호</ReceiptTitleText>
            <ReceiptText>{item.cardNumber}</ReceiptText>
          </ReceiptTextContainer>
        )}
        {item.bankName && (
          <ReceiptTextContainer>
            <ReceiptTitleText>입금은행</ReceiptTitleText>
            <ReceiptText>{item.bankName}</ReceiptText>
          </ReceiptTextContainer>
        )}
        {item.senderName && (
          <ReceiptTextContainer>
            <ReceiptTitleText>입금자명</ReceiptTitleText>
            <ReceiptText>{item.senderName}</ReceiptText>
          </ReceiptTextContainer>
        )}
        {item.authCode && (
          <ReceiptTextContainer>
            <ReceiptTitleText>승인번호</ReceiptTitleText>
            <ReceiptText>{item.authCode}</ReceiptText>
          </ReceiptTextContainer>
        )}

    <ImageContainer>
        <EditButton onPress={() => onEditReceipt(item)}>
          <IconImg source={editIcon} />
        </EditButton>
        <RightContainer>
          {item.image && (<ReceiptImage source={{ uri: item.image }} />)}
          <DeleteButton onPress={() => onDeleteReceipt(item.id)}>
            <IconImg source={deleteIcon} />
          </DeleteButton>
        </RightContainer>
      </ImageContainer>

        {!isLast && <GridLine />}
      </ReceiptContainer>
    );
  };
  
  export default SaveReceiptListGrid;


const ReceiptContainer = styled.View`
  margin-bottom: 16px;
`;

const ReceiptTextContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 4px;
`

const ReceiptTitleText = styled.Text`
color: ${COLORS.sub};
font-size: 16px;
font-weight: 700;
`

const ReceiptText = styled.Text`
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`;

const ImageContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const RightContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ReceiptImage = styled.Image`
  width: 50px;
  height: 50px;
  margin: 0 10px;
  border-radius: 5px;
`;

const PlaceholderImage = styled.View`
  width: 50px;
  height: 50px;
  background-color: ${COLORS.gray_200};
  margin: 0 10px;
`;


const EditButton = styled.TouchableOpacity`
  background-color: ${COLORS.gray_200};
  width: 50px;
  height: 50px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: ${COLORS.gray_200};
  width: 50px;
  height: 50px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;


const IconImg = styled(FastImage)`
  width: 20px;
  height: 20px;
`;