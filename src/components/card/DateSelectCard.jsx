import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import {formatDate} from '../../utils/CustomUtils'
import DatePicker from 'react-native-date-picker'
import { startTime, endTime } from '../../data/selectDate';
import FastImage from 'react-native-fast-image';
import { Alert } from 'react-native';
function DateSelectCard({children, imgIcon, date, setDate, edate,setEdate}) {

    
    const [showStartModal, setShowStartModal] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);
  
    const openStartPicker = () => {
      setShowStartModal(true);
    };
  
    const openEndPicker = () => {
      setShowEndModal(true);
    };

    const handleStartConfirm = (selectedDate) => {
        if (edate && selectedDate > edate) {
            Alert.alert("오류", "시작 날짜는 종료 날짜보다 이전이어야 합니다.");
        } else {
            setDate(selectedDate);
        }
        setShowStartModal(false);
    };

    // 종료 날짜 선택 시의 onConfirm 수정
    const handleEndConfirm = (selectedDate) => {
        if (date && selectedDate < date) {
            Alert.alert("오류", "종료 날짜는 시작 날짜보다 이후여야 합니다.");
        } else {
            setEdate(selectedDate);
        }
        setShowEndModal(false);
    };

    const selectDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
    const selectEdate = `${edate.getFullYear()}.${(edate.getMonth() + 1).toString().padStart(2, '0')}.${edate.getDate().toString().padStart(2, '0')}`;
    const rightIcon = require('../../assets/img/colsdowngray.png');

    return (
        <Container>
        <LabelText>{children}</LabelText>
        <SelectBoxGrid>
        <SelectBox onPress={openStartPicker}>
            <SelectInnerBox>
                {
                    imgIcon && imgIcon && (<LeftIcon source={imgIcon}
                    tintColor={date? COLORS.sub : COLORS.gray_300}
                    />)
                }
                 {
                      selectDate.length ==! 10 ?  <SelectBoxText>수업 날짜를 선택해주세요</SelectBoxText> :
                                                  <SelectBoxDateText>{selectDate}</SelectBoxDateText>
                    }
            {/* <SelectBoxText>{formatDate(startDate)}</SelectBoxText> */}
            <DatePicker
                        modal
                        locale="ko-KR"
                        open={showStartModal}
                        date={date}
                        mode="date"
                        title={null}
                        confirmText="확인"
                        cancelText="취소"
                        onConfirm={handleStartConfirm}
                        onCancel={() => {
                            setShowStartModal(false)
                        }}
                      />
            </SelectInnerBox>
            <RigthIcon source={rightIcon}
            tintColor={date? COLORS.sub : COLORS.gray_300}
            />
         </SelectBox>
            
         <SelectBox onPress={openEndPicker}>
            <SelectInnerBox>
                {
                    imgIcon && imgIcon && (<LeftIcon source={imgIcon}
                        tintColor={date? COLORS.sub : COLORS.gray_300}
                    />)
                }
            {
                      selectEdate.length ==! 10 ?  <SelectBoxText>수업 날짜를 선택해주세요</SelectBoxText> :
                                                  <SelectBoxDateText>{selectEdate}</SelectBoxDateText>
                    }
            <DatePicker
                        modal
                        locale="ko-KR"
                        open={showEndModal}
                        date={edate}
                        mode="date"
                        title={null}
                        confirmText="확인"
                        cancelText="취소"
                        onConfirm={handleEndConfirm}
                        onCancel={() => {
                            setShowEndModal(false)
                        }}
                      />
            </SelectInnerBox>
            <RigthIcon source={rightIcon}
            tintColor={date? COLORS.sub : COLORS.gray_300}
            />
         </SelectBox>
         </SelectBoxGrid>
    </Container>
    );
}

export default DateSelectCard;


const Container = styled.View`
margin-top: 10px;
margin-bottom: 20px;
`

const SelectBoxGrid = styled.View`
display: flex;
flex-direction: row;
align-items: center; 
justify-content: space-between;
width: 100%;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 15px 16px;
    width: 49%;
`

const SelectInnerBox = styled.View`
flex-direction: row;
align-items: center;
`

const SelectBoxText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_300};
font-weight: 400;
line-height: 22.40px;
`

const SelectBoxDateText = styled.Text`
font-size: 14px;
color: ${COLORS.sub};
font-weight: 400;
line-height: 22.40px;
`

const LabelText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_400};
margin-bottom: 12px;
`

const RigthIcon = styled(FastImage)`
width: 20px;
height: 20px;
`

const LeftIcon = styled(FastImage)`
margin-right:5px;
width: 20px;
height: 20px;
`