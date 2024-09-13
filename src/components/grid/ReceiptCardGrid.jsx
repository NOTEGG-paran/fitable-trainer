import React from 'react';
import ReceiptBasicNumber from '../input/ReceiptBasicNumber';
import CardTypeInput from '../input/CardTypeInput';
import CardQuotaInput from '../input/CardQuotaInput';

function ReceiptCardGrid({cardQuota,cardQuotaTextChange,cardNumber,cardNumberTextChange,cardName, setCardName,cardList,authCode,authCodeTextChange}) {
    return (
        <>
            <CardQuotaInput 
            title='할부기간(개월)'
            placeholder='1-24'
            value={cardQuota}
            onChangeText={cardQuotaTextChange}
            maxLength={2}
            />
            <CardTypeInput
            cardName={cardName}
            setCardName={setCardName}
            cardList={cardList}/>
            <ReceiptBasicNumber 
            title='카드번호(선택)'
            placeholder='뒷자리 4자리 입력해주세요'
            value={cardNumber}
            onChangeText={cardNumberTextChange}
            maxLength={4}
            />
            <ReceiptBasicNumber 
            title='승인번호(선택)'
            placeholder='숫자 8자리 입력해주세요'
            value={authCode}
            onChangeText={authCodeTextChange}
            maxLength={8}
            />
        </>
    );
}

export default ReceiptCardGrid;