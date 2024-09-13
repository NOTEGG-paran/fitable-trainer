import React, { useState,useEffect } from 'react';
import { COLORS } from '../../constants/color';
import {MainContainer} from '../../style/gridStyled';
import styled from 'styled-components/native';
import GobackGrid from '../../components/grid/GobackGrid';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Platform,ScrollView,KeyboardAvoidingView,View,Pressable } from 'react-native';
import {paymentTypeItem, bankList, cardList} from './../../data/receiptData';
import PaymentMethod from '../../components/input/PaymentMethod';
import PaymentPrice from '../../components/input/PaymentPrice';
import ReciptCashGrid from '../../components/grid/ReciptCashGrid';
import BankTransferGrid from '../../components/grid/BankTransferGrid';
import ReceiptImageGrid from '../../components/grid/ReceiptImageGrid';
import {useRecoilState} from 'recoil';
import {centerIdState, contractState} from '../../store/atom';
import ReceiptCardGrid from '../../components/grid/ReceiptCardGrid';
import {generateUUID} from './../../utils/CustomUtils';

function AddReceiptScreen(props) {
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
      };

      useEffect(() => {
        if (!receipt && contract.updatedSelectedTickets) { // 새 영수증 추가 모드인 경우에만 실행
          console.log('contract.updatedSelectedTickets', contract.updatedSelectedTickets);
          const totalPrice = contract.updatedSelectedTickets.reduce((sum, ticket) => {
            const price = parseFloat(ticket.price.toString().replace(/,/g, ''));
            console.log('price:', price); // 디버깅용 로그
            return sum + (isNaN(price) ? 0 : price);
          }, 0);
          console.log('totalPrice:', totalPrice); // 디버깅용 로그
          setPrice(totalPrice.toString());
        }
      }, []);
      
      

    const route = useRoute();
    const { receipt } = route.params || {}; // 수정 모드인 경우 전달받은 데이터
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [contract, setContract] = useRecoilState(contractState);
    const {memberId} = route.params;
    // // 결제 수단 타입
    // const [paymentType, setPaymentType] = useState('CASH')
    // // 결제 금액
    // const [price, setPrice] = useState('')
    // // 발행 유무
    // const [isPublishCashReceipt ,setIsPublishCashReceipt] = useState(false)
    // // 발행 현금 타입
    // const [cashReceiptType, setCashReceiptType] = useState('PERSONAL')
    // // 공제 번호
    // const [cashReceiptNumber, setCashReceiptNumber] = useState(null)
    // // 승인번호
    // const [authCode, setAuthCode] = useState(null)
    // // 은행 선택
    // const [bankName, setBankName] = useState(null);
    // // 카드 선택
    // const [cardName, setCardName] = useState(null)
    // // 카드번호
    // const [cardNumber, setCardNumber] = useState(null);
    // // 이미지
    // const [img, setImg] = useState(null);
    // // 할부
    // const [cardQuota, setCardQuota] = useState('1');
    // // 보낸사람
    // const [senderName, setSenderName] = useState(null);

  // 결제 수단 타입
  const [paymentType, setPaymentType] = useState(receipt ? receipt.paymentType : 'CASH');
  // 결제 금액
  const [price, setPrice] = useState(receipt && receipt.price !== null ? receipt.price.toString() : '');
  // 발행 유무
  const [isPublishCashReceipt, setIsPublishCashReceipt] = useState(receipt ? receipt.isPublishCashReceipt : false);
  // 발행 현금 타입
  const [cashReceiptType, setCashReceiptType] = useState(receipt ? receipt.cashReceiptType : 'PERSONAL');
  // 공제 번호
  const [cashReceiptNumber, setCashReceiptNumber] = useState(receipt && receipt.cashReceiptNumber !== null ? receipt.cashReceiptNumber.toString() : null);
  // 승인번호
  const [authCode, setAuthCode] = useState(receipt && receipt.authCode !== null ? receipt.authCode.toString() : null);
  // 은행 선택
  const [bankName, setBankName] = useState(receipt ? receipt.bankName : null);
  // 카드 선택
  const [cardName, setCardName] = useState(receipt ? receipt.cardName : null);
  // 카드번호
  const [cardNumber, setCardNumber] = useState(receipt && receipt.cardNumber !== null ? receipt.cardNumber.toString() : null);
  // 이미지
  const [img, setImg] = useState(receipt ? receipt.image : null);
  // 할부
  const [cardQuota, setCardQuota] = useState(receipt && receipt.cardQuota !== null ? receipt.cardQuota.toString() : '1');
  // 보낸사람
  const [senderName, setSenderName] = useState(receipt && receipt.senderName !== null ? receipt.senderName.toString() : null);

    //버튼 활성화
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);


// text상태관리
const priceTextChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPrice(numericText);
}

const cashReceiptNumberTextChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setCashReceiptNumber(numericText);
}

const authCodeTextChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setAuthCode(numericText);
}

const cardQuotaTextChange = (text) => {
    setCardQuota(text);
}

const senderNameTextChange = (text) => {
    setSenderName(text);
}

const cardNumberTextChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setCardNumber(numericText);
}



const updateReceiptData = () => {
    const newReceipt = {
      id: receipt ? receipt.id : generateUUID(),
      paymentType,
      price: paymentType !== 'PAYMENT_LINK' && paymentType !== 'APP_CARD' ? price : null,
      isPublishCashReceipt: (paymentType === 'CASH' || paymentType === 'BANK_TRANSFER') ? isPublishCashReceipt : null,
      cashReceiptType: (paymentType === 'CASH' || paymentType === 'BANK_TRANSFER') ? cashReceiptType : null,
      cashReceiptNumber: (paymentType === 'CASH' || paymentType === 'BANK_TRANSFER') ? cashReceiptNumber : null,
      authCode: paymentType !== 'PAYMENT_LINK' && paymentType !== 'APP_CARD' ? authCode : null,
      cardQuota: paymentType === 'CARD' ? cardQuota : null,
      cardName: paymentType === 'CARD' ? cardName : null,
      cardNumber: paymentType === 'CARD' ? cardNumber : null,
      bankName: paymentType === 'BANK_TRANSFER' ? bankName : null,
      senderName: paymentType === 'BANK_TRANSFER' ? senderName : null,
      image: img,
      ...(img && { imageName: `receipt-${generateUUID()}.jpg` }) 
    };

    if (receipt) {
      setContract((prevContract) => ({
        ...prevContract,
        addReceipts: prevContract.addReceipts.map((r) => (r.id === receipt.id ? newReceipt : r))
      }));
    } else {
      setContract((prevContract) => ({
        ...prevContract,
        addReceipts: [...prevContract.addReceipts, newReceipt]
      }));
    }

    navigation.goBack();
  };

// const updateReceiptData = () => {
//     let newReceipt = {
//         id: generateUUID(),
//         paymentType,
//         price: paymentType !== 'PAYMENT_LINK' && paymentType !== 'APP_CARD' ? price : null,
//         isPublishCashReceipt: (paymentType === 'CASH' || paymentType === 'BANK_TRANSFER') ? isPublishCashReceipt : null,
//         cashReceiptType: (paymentType === 'CASH' || paymentType === 'BANK_TRANSFER') ? cashReceiptType : null,
//         cashReceiptNumber: (paymentType === 'CASH' || paymentType === 'BANK_TRANSFER') ? cashReceiptNumber : null,
//         authCode: paymentType !== 'PAYMENT_LINK' && paymentType !== 'APP_CARD' ? authCode : null,
//         cardQuota: paymentType === 'CARD' ? cardQuota : null,
//         cardName: paymentType === 'CARD' ? cardName : null,
//         cardNumber: paymentType === 'CARD' ? cardNumber : null,
//         bankName: paymentType === 'BANK_TRANSFER' ? bankName : null,
//         senderName: paymentType === 'BANK_TRANSFER' ? senderName : null,
//         image: img
//     };

//     setContract((prevContract) => ({
//         ...prevContract,
//         addReceipts: [...prevContract.addReceipts, newReceipt]
//         // addReceipts: []
//     }));
//     setPaymentType('CASH')
//     setIsPublishCashReceipt(false)
//     setCashReceiptType('PERSONAL')

//     setCashReceiptNumber(null)
//     setAuthCode(null)
//     setCardQuota('1')
//     setSenderName(null)
//     setImg(null)
// };




    const saveReceiptDataBtn = () => {
        updateReceiptData()
        navigation.navigate('ReceiptHistory',{memberId})
    }

    console.log('보냄',contract.addReceipts)
    // console.log('이건 영수증 티겟만',contract.updatedSelectedTickets)
    // 초기화 리셋코드
    const resetState = () => {
        // setPrice('');
        setIsPublishCashReceipt(false);
        setCashReceiptType('PERSONAL');
        setCashReceiptNumber(null);
        setAuthCode(null);
        setBankName(null);
        setCardName(null);
        setCardNumber(null);
        setImg(null);
        setCardQuota('1');
        setSenderName(null);
    };
    
    const resetOnPaymentTypeChange = () => {
        resetState();
    };
    
    const resetOnIsPublishCashReceiptChange = () => {
        setAuthCode(null);
    };
    
    const resetOnCashReceiptTypeChange = () => {
        setAuthCode(null);
        setCashReceiptNumber(null);
    };


    // 버튼 활성화 
    const validateFields = () => {

        const parsedPrice = parseFloat(price);

        if (!parsedPrice || isNaN(parsedPrice) || parsedPrice <= 0) {
            return false;
        }

        if (paymentType === 'CASH') {
            if (!price) return false;
            if (isPublishCashReceipt) {
                if (!cashReceiptType) return false;
                if (cashReceiptType === 'PERSONAL' && (!cashReceiptNumber || cashReceiptNumber.length !== 11)) return false;
                if (cashReceiptType === 'BUSINESS' && (!cashReceiptNumber || cashReceiptNumber.length !== 10)) return false;
            }
            return true;
        }
    
        if (paymentType === 'CARD') {
            if (!price || !cardQuota) return false;
            return true;
        }
    
        if (paymentType === 'BANK_TRANSFER') {
            if (!price) return false;
            if (isPublishCashReceipt) {
                if (!cashReceiptType) return false;
                if (cashReceiptType === 'PERSONAL' && (!cashReceiptNumber || cashReceiptNumber.length !== 11)) return false;
                if (cashReceiptType === 'BUSINESS' && (!cashReceiptNumber || cashReceiptNumber.length !== 10)) return false;
            }
            return true;
        }
    
        return true;
    };
    
    useEffect(() => {
        setIsButtonEnabled(validateFields());
    }, [paymentType, price, isPublishCashReceipt, cashReceiptType, cashReceiptNumber, cardQuota]);
    
    return (
   
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <MainContainer>
        <GobackGrid onPress={goBack}>영수증 {receipt ? '수정' : '추가'}</GobackGrid>
        <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{marginBottom: 100}}
      >
        {/* 결제수 단 */}
        <PaymentMethod 
        paymentType={paymentType}
        setPaymentType={setPaymentType}
        paymentTypeItem={paymentTypeItem}
        setContract={setContract}
        resetOnPaymentTypeChange={resetOnPaymentTypeChange}
        />
        {/* 결제 금액 */}
        {
            paymentType !== 'PAYMENT_LINK' && paymentType !== 'APP_CARD' ? (
            <PaymentPrice 
            priceTextChange={priceTextChange}
            price={price}
            />):(null)
        }

        {/* 계좌이체만 따로 */}
        {
            paymentType === 'BANK_TRANSFER' && (
                <BankTransferGrid 
                bankName={bankName}
                setBankName={setBankName}
                bankList={bankList}
                senderNameTextChange={senderNameTextChange}
                senderName={senderName}
                />
            )
        }


        {/* 여기서부턴 상태에 따라서 유아이 다르게 */}
        {
            paymentType === 'CASH' && (
                <ReciptCashGrid 
                selectedCheckBox={isPublishCashReceipt}
                setSelectedCheckBox={setIsPublishCashReceipt}
                cashReceiptType={cashReceiptType} 
                setCashReceiptType={setCashReceiptType}
                cashReceiptNumber={cashReceiptNumber}
                setCashReceiptNumber={setCashReceiptNumber}
                authCode={authCode}
                setAuthCode={setAuthCode}
                cashReceiptNumberTextChange={cashReceiptNumberTextChange}
                authCodeTextChange={authCodeTextChange}

                resetOnIsPublishCashReceiptChange={resetOnIsPublishCashReceiptChange}
                resetOnCashReceiptTypeChange={resetOnCashReceiptTypeChange}
               />
            )
        }

        {
            paymentType === 'CARD' && (
                <ReceiptCardGrid 
                cardName={cardName}
                setCardName={setCardName}
                cashReceiptType={cashReceiptType} 
                setCashReceiptType={setCashReceiptType}
                cardList={cardList}
                authCode={authCode}
                authCodeTextChange={authCodeTextChange}
                cardQuota={cardQuota}
                cardQuotaTextChange={cardQuotaTextChange}
                cardNumber={cardNumber}
                cardNumberTextChange={cardNumberTextChange}
                />
            )
        }

        {
            paymentType === 'BANK_TRANSFER' && (
                <ReciptCashGrid 
                selectedCheckBox={isPublishCashReceipt}
                setSelectedCheckBox={setIsPublishCashReceipt}
                cashReceiptType={cashReceiptType} 
                setCashReceiptType={setCashReceiptType}
                cashReceiptNumber={cashReceiptNumber}
                setCashReceiptNumber={setCashReceiptNumber}
                authCode={authCode}
                setAuthCode={setAuthCode}
                cashReceiptNumberTextChange={cashReceiptNumberTextChange}
                authCodeTextChange={authCodeTextChange}

                resetOnIsPublishCashReceiptChange={resetOnIsPublishCashReceiptChange}
                resetOnCashReceiptTypeChange={resetOnCashReceiptTypeChange}
               />
            )
        }

        {/* <PaymentPrice /> */}


        {/* 이미지 업로드 */}
        <ReceiptImageGrid 
        img={img}
        setImg={setImg}
        />


        </ScrollView>
        <BasicMainBtnContainer>

        <BasicMainBtnNextBtn
          disabled={!isButtonEnabled}
          isActive={isButtonEnabled}
          onPress={() => saveReceiptDataBtn()}>
          <BasicMainBtnNextBtnNextText isActive={isButtonEnabled}>
            저장
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>

        </MainContainer>
        </KeyboardAvoidingView>
    );
}


export default AddReceiptScreen;

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