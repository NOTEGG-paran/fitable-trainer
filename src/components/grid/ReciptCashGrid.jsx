import React from 'react';
import ReciptCheckBoxGrid from './ReciptCheckBoxGrid';
import ReceiptBasicNumber from '../input/ReceiptBasicNumber';
import ReciptSubCheckBoxGrid from './ReciptSubCheckBoxGrid';

function ReciptCashGrid({resetOnCashReceiptTypeChange,resetOnIsPublishCashReceiptChange,cashReceiptNumberTextChange,authCodeTextChange,selectedCheckBox,setSelectedCheckBox,cashReceiptType, setCashReceiptType,cashReceiptNumber, setCashReceiptNumber,authCode, setAuthCode}) {
    return (
        <>
         <ReciptCheckBoxGrid 
          selectedCheckBox={selectedCheckBox}
          setSelectedCheckBox={setSelectedCheckBox}
          resetOnIsPublishCashReceiptChange={resetOnIsPublishCashReceiptChange}
         /> 
        {
            !selectedCheckBox ? (
                <ReceiptBasicNumber 
                title='승인번호(선택)'
                placeholder='숫자 8자리 입력해주세요'
                value={authCode}
                onChangeText={authCodeTextChange}
                maxLength={8}
                />
            ):(
                <ReciptSubCheckBoxGrid 
                cashReceiptType={cashReceiptType} 
                setCashReceiptType={setCashReceiptType}
                authCode={authCode}
                authCodeTextChange={authCodeTextChange}
                cashReceiptNumber={cashReceiptNumber}
                cashReceiptNumberTextChange={cashReceiptNumberTextChange}
                resetOnCashReceiptTypeChange={resetOnCashReceiptTypeChange}
                />
            )
        }
        </>
    );
}

export default ReciptCashGrid;