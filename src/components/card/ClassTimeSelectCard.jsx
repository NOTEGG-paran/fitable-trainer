import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState} from 'react';
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

function ClassTimeSelectCard({children, imgIcon,setStartTime,setEndTime,startTime, endTime}) {
    // const {startTime,endTime}=state
    // console.log('state',state) 40 32 
    const rightIcon = require('../../assets/img/colsdowngray.png');
    
    const openStartPicker = () => {
        console.log("Opening start picker");
        setSopen(true);
    };
    
    const openEndPicker = () => {
        console.log("Opening end picker");
        setEopen(true);
    };
    const [sopen, setSopen] = useState(false)
    const [eopen, setEopen] = useState(false)
    const [sdate, setSdate] = useState(new Date())
    const [edate, setEdate] = useState(new Date())

    return (
       
        <Container>
                <LabelText>{children}</LabelText>
        <SelectBoxGrid>
        

  
          <SelectBox onPress={openStartPicker}>
          <SelectInnerBox>
              {
                  imgIcon && imgIcon && (<LeftIcon source={imgIcon}
                    tintColor={startTime? COLORS.sub : COLORS.gray_300}
                  />)
              }
              <DatePicker
               modal
               open={sopen}
               mode='time'
               locale="ko-KR"
               title={null}
               confirmText="확인"
               cancelText="취소"
               onConfirm={(value) => {
                setStartTime(moment(value).format('HH:mm'));
                setSopen(false);
                }}
               date={sdate}
               minuteInterval={5} 
               onCancel={() => {
                setSopen(false)
                }}
               />
          <SelectBoxText isTime={startTime}>
            {startTime? startTime: '시작 시간'}
          </SelectBoxText>
          </SelectInnerBox>
          <RigthIcon source={rightIcon}
          tintColor={startTime? COLORS.sub : COLORS.gray_300}
          />
       </SelectBox>

            <DividerText>~</DividerText>

          <SelectBox onPress={openEndPicker}>
          <SelectInnerBox>
              {
                  imgIcon && imgIcon && (<LeftIcon source={imgIcon}
                    tintColor={endTime? COLORS.sub : COLORS.gray_300}
                  />)
              }
                      <DatePicker
                       modal
                       locale="ko-KR"
                       title={null}
                       mode='time'
                    confirmText="확인"
                    cancelText="취소"
                    date={edate}
                    open={eopen}
                    minuteInterval={5} 
                    onConfirm={(value) => {
                        setEndTime(moment(value).format('HH:mm'));
                        setEopen(false);
                    }}
                    onCancel={() => {
                        setEopen(false)
                      }}
                />
          <SelectBoxText isTime={endTime}>
            {endTime? endTime: '종료 시간'}
          </SelectBoxText>
          </SelectInnerBox>
          <RigthIcon source={rightIcon}
          tintColor={endTime? COLORS.sub : COLORS.gray_300}
          />
       </SelectBox>
   
         </SelectBoxGrid>
    </Container>

    );
}

export default ClassTimeSelectCard;



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
    width: 45%;
`

const DividerText = styled.Text`
font-size: 20px;
color: ${COLORS.gray_200};
font-family: Pretendard;
font-weight: 600;
line-height: 28px;
/* margin: 0 8px; */
`


const SelectInnerBox = styled.View`
flex-direction: row;
align-items: center;
`;

const SelectBoxText = styled.Text`
font-size: 14px;
color:${props => props.isTime? COLORS.sub : COLORS.gray_300};
font-weight: 400;
line-height: 22.40px;
`;

const LabelText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_400};
margin-bottom: 12px;
`;

const RigthIcon = styled(FastImage)`
width: 20px;
height: 20px;
`;

const LeftIcon = styled(FastImage)`
margin-right:11px;
width: 20px;
height: 20px;
`;