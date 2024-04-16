import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import DateTimeSelectCard from '../card/DateTimeSelectCard';
import FastImage from 'react-native-fast-image';
import { Alert } from 'react-native';
import moment from 'moment';
function DaySelectBtnGrid({ title,setSchedules }) {
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const [selectedDays, setSelectedDays] = useState([]);
    const [classTimes, setClassTimes] = useState([]);
  
    const toggleDay = (index) => {
        const currentIndex = selectedDays.indexOf(index);
        const newSelectedDays = [...selectedDays];
        
        if (currentIndex === -1) {
          newSelectedDays.push(index);
          addClassTime(index);
        } else {
          newSelectedDays.splice(currentIndex, 1);
          const newClassTimes = classTimes.filter((classTime) => classTime.dayIndex !== index);
          setClassTimes(newClassTimes);
        }
        
        setSelectedDays(newSelectedDays);
      };
  

    const [classTimeId, setClassTimeId] = useState(0);

    // const addClassTime = (dayIndex) => {
    //   const newClassTimes = [...classTimes, { id: classTimeId, dayIndex }];
    //   setClassTimes(newClassTimes);
    //   setClassTimeId(classTimeId + 1);
    // };
    const addClassTime = (dayIndex) => {
        // 새로운 classTime 객체에 대한 기본 값을 설정합니다.
        // 사용자가 시간을 아직 선택하지 않았으므로, startTime과 endTime은 null이거나 임시 값이 됩니다.
        const newClassTime = {
          id: classTimeId,
          dayIndex,
          dayOfWeek: dayToEnglish(dayIndex),
          startTime: null, // 초기값으로 null 설정
          endTime: null, // 초기값으로 null 설정
        };
      
        setClassTimes(prevClassTimes => [...prevClassTimes, newClassTime]);
        setClassTimeId(prevId => prevId + 1); // 고유 ID 증가
      };
      
    
    const removeClassTime = (id) => {
      const newClassTimes = classTimes.filter((classTime) => classTime.id !== id);
      setClassTimes(newClassTimes);
    };

    const dayToEnglish = (dayIndex) => {
        const daysInEnglish = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
        return daysInEnglish[dayIndex];
      };
          
    const updateClassTime = (id, startTime, endTime) => {
      // const safeStartTime = startTime
      // const safeEndTime = endTime
      // const startHour = parseInt(safeStartTime?.split(':')[0], 10);
      // const endHour = parseInt(safeEndTime?.split(':')[0], 10);
      const startMoment = moment(startTime, 'HH:mm');
      const endMoment = moment(endTime, 'HH:mm');
      // 시작 시간이 종료 시간보다 같거나 늦은 경우 경고
      if (startMoment.isSameOrAfter(endMoment)) {
        Alert.alert("시간 오류", "종료 시간은 시작 시간보다 나중이어야 합니다.");
        return; // 업데이트를 중단하고 함수를 종료
      }
    

        const updatedClassTimes = classTimes.map((classTime) => {
          if (classTime.id === id) {
            return { ...classTime, startTime, endTime, dayOfWeek: dayToEnglish(classTime.dayIndex) };
          }
          return classTime;
        });
        setClassTimes(updatedClassTimes);
        // 상위 컴포넌트에 있는 schedules 상태를 업데이트
        setSchedules(updatedClassTimes.map(ct => ({ dayOfWeek: ct.dayOfWeek, startTime: ct.startTime, endTime: ct.endTime })));
      };
    const plusIcon = require('../../assets/img/plus_s.png');

    return (
      <>
        <LabelText>{title}</LabelText>
        <DaysContainer>
          {days.map((day, index) => (
            <DayButton
              key={index}
              selected={selectedDays.includes(index)}
              onPress={() => toggleDay(index)}
            >
              <DayText selected={selectedDays.includes(index)}>{day}</DayText>
            </DayButton>
          ))}
        </DaysContainer>
        {
            selectedDays && selectedDays.length > 0 && 
   
        <CardLineWrapper>
          {selectedDays.map((selectedDay, index) => (
            <React.Fragment key={index}>
              <CardAddListContaniner>
                <CardDateName>{days[selectedDay]}요일</CardDateName>
              </CardAddListContaniner>
              {classTimes
                .filter((classTime) => classTime.dayIndex === selectedDay)
                .map((classTime) => (
                <TimeWrapper key={classTime.id}>
                    <DateTimeSelectCard 
                    startTime={classTime.startTime}
                    endTime={classTime.endTime}
                      setStartTime={(value) => updateClassTime(classTime.id, value, classTime.endTime)}
                      setEndTime={(value) => updateClassTime(classTime.id, classTime.startTime, value)}
                    />
                        <RemoveButton onPress={() => removeClassTime(classTime.id)}>
                            <RemoveButtonText>삭제</RemoveButtonText>
                        </RemoveButton>
                </TimeWrapper>
                ))}
              <AddButton onPress={() => addClassTime(selectedDay)}>
                <PlusIconImg source={plusIcon} />
                <AddButtonText>시간 추가</AddButtonText>
              </AddButton>
            </React.Fragment>
          ))}
        </CardLineWrapper>
             }
      </>
    );
  }
  
  export default DaySelectBtnGrid;
  

const DaysContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;
`;

const DayButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.selected ? COLORS.sub : COLORS.gray_200)};
  background-color: ${(props) => (props.selected ? COLORS.sub : COLORS.white)};
`;

const DayText = styled.Text`
  color: ${(props) => (props.selected ? COLORS.white : COLORS.gray_300)};
  font-weight: bold;
`;

const LabelText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 22.4px;
  color: ${COLORS.gray_400};
  margin-bottom: 12px;
`;

const CardLineWrapper = styled.View`
  width: 100%;
  padding-top: 40px;
  padding-bottom: 28px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.gray_100};
  border-top-width: 1px;
  border-top-color: ${COLORS.gray_100};
`;

const CardAddListContaniner = styled.View`
  background-color: ${COLORS.gray_100};
  border-radius: 13px;
  padding: 14px 16px;
  /* margin-bottom: 16px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CardDateName = styled.Text`
  font-size: 16px;
  color: ${COLORS.sub};
  font-weight: 500;
  line-height: 22.4px;
`;

const TimeWrapper = styled.View`
  flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;


const RemoveButton = styled.TouchableOpacity`
  /* background-color: ${COLORS.sub}; */
  /* padding: 8px 16px; */
  border-radius: 8px;
  width: 16%;
  margin-top: 24px;
  padding: 15px 0px;
`;

const RemoveButtonText = styled.Text`
  color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height:  22.4px;
letter-spacing: -0.35px;
`;

const AddButton = styled.TouchableOpacity`
  display: flex;
    flex-direction: row;
    align-items: center;
    /* justify-content: center; */
  border-radius: 8px;
  margin-top: 32px;
  margin-bottom: 72px;
  /* padding: 20px; */
  width: 120px;
`;

const PlusIconImg = styled(FastImage)`
  width: 12px;
  height: 12px;
  margin-right: 8px;
`;

const AddButtonText = styled.Text`
   color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height:  22.4px;
letter-spacing: -0.35px;
`;
