import React from 'react';
import ReceiptBasicText from '../input/ReceiptBasicText';
import BankTypeInput from '../input/BankTypeInput';

function BankTransferGrid({senderNameTextChange,senderName,bankName, setBankName,bankList}) {
    return (
        <>
            <BankTypeInput 
            bankName={bankName}
            setBankName={setBankName}
            bankList={bankList}
            />
            <ReceiptBasicText 
            title='입금자명(선택)'
            placeholder='입력해주세요'
            value={senderName}
            onChangeText={senderNameTextChange}
            />
        </>
    );
}

export default BankTransferGrid;