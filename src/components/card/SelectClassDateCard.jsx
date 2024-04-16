import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import {formatDate} from '../../utils/CustomUtils'
import { useState ,useRef, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import FastImage from 'react-native-fast-image';
function SelectClassDateCard({children, imgIcon, date, setDate}) {
    // const {startDate=""}=state ||{};
    const rightIcon = require('../../assets/img/colsdowngray.png');
    const [showModal ,setShowModal] = useState(false);



      const selectDateBtn = () => {
        setShowModal(true)
    }
    // console.log('date',date)
    
 
    const selectDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
    // console.log('birthDayNumber',selectDate.length)
    return (
        <Container>
            <LabelText>{children}</LabelText>
            <SelectBox onPress={selectDateBtn}>
                <SelectInnerBox>
                    {
                        imgIcon && imgIcon && (<LeftIcon source={imgIcon}
                            tintColor={date? COLORS.sub : COLORS.gray_300}
                        />)
                    }
                    {
                     !showModal && selectDate.length ==! 10 ?  
                     <SelectBoxText>수업 날짜를 선택해주세요</SelectBoxText> :
                     <SelectBoxDateText>{selectDate}</SelectBoxDateText>
                    }
                      <DatePicker
                        modal
                        locale="ko-KR"
                        open={showModal}
                        date={date}
                        mode="date"
                        title={null}
                        confirmText="확인"
                        cancelText="취소"
                        onConfirm={(date) => {
                            setShowModal(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setShowModal(false)
                        }}
                      />
                </SelectInnerBox>
                <RigthIcon source={rightIcon}
                 tintColor={date? COLORS.sub : COLORS.gray_300}
                />
             </SelectBox>
        </Container>
    );
}

export default SelectClassDateCard;


const Container = styled.View`
margin-top: 10px;
margin-bottom: 20px;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 15px 16px;
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
margin-right:11px;
width: 20px;
height: 20px;
`