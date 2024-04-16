import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import DatePicker from 'react-native-date-picker'
import { useState } from 'react';
import { Button } from 'react-native';
function TrainerProfileGrid(props) {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (

<>
      <Button title="Open" onPress={() => setOpen(true)} />
      
      <DatePicker
         modal
         locale="ko-KR"
         title={null}
        open={open}
        date={date}
        mode='time'
        confirmText="확인"
        cancelText="취소"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
      
    );
}

export default TrainerProfileGrid;

const ProfileTitleText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height: 22.4px;
letter-spacing: -0.35px;
margin-top: 44px;
`;