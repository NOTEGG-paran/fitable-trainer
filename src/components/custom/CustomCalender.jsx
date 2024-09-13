import React, { useState,useEffect, useCallback } from 'react';
import {ExpandableCalendar, CalendarProvider, WeekCalendar,Calendar, LocaleConfig} from 'react-native-calendars';
import { COLORS } from '../../constants/color';
import { themeStyled } from '../../constants/calendarTheme';
import styled from 'styled-components/native';
import CalenderToggleBtn from '../toggle/CalenderToggleBtn';
import {getLessonCalendar,getLessonList} from '../../api/lessonApi';
import { useRecoilState } from 'recoil';
import {centerIdState} from '../../store/atom';
import LessonListGrid from '../grid/LessonListGrid';
import { GridLine } from '../../style/gridStyled';
import {getFormattedDate} from '../../utils/CustomUtils';
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';

LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'ko';

function CustomCalendar(props) {
  const {weekView} = props;
  // console.log('weekView',weekView)
  const isFocused = useIsFocused();
    const [centerId, setCenterId] = useRecoilState(centerIdState);

  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [selected, setSelected] = useState(todayString);
  const [currentMonth, setCurrentMonth] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [availableDates, setAvailableDates] = useState({});
  const [lessonList, setLessonList] = useState([]);

  const [showDatetModal, setShowDateModal] = useState(false);
  // console.log('currentMoncurrentMonthth',centerId)
  const openPicker = () => {
    setShowDateModal(true);
  };

  const handleConfirm = useCallback(date => {
  
    const newSelectedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    console.log('newSelectedDatenewSelectedDate',newSelectedDate)
    setSelected(newSelectedDate);
    setShowDateModal(false);

    const newCurrentMonth = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    setCurrentMonth(newCurrentMonth);

    // API 호출을 통해 선택된 날짜의 수업 정보를 불러옵니다.
    getLessonList(centerId, newSelectedDate)
        .then(data => {
            setLessonList(data.content); // 수업 리스트 상태 업데이트
        })
        .catch(error => {
            console.error("Error fetching lesson list for the selected date:", error);
        });
      }, [centerId,setCurrentMonth, setSelected, setShowDateModal]);


console.log('currentMonth',currentMonth,selected)


  const handleDayPress = useCallback(day => {
    if (day.dateString === todayString) {
      setSelected(todayString);
    } else {
      setSelected(day.dateString);
    }
    if(centerId){
      getLessonList(centerId, day.dateString)
      .then(data => {
          setLessonList(data.content);
      })
      .catch(error => {
          console.error("Error fetching lesson list:", error);
      });
    }

  }, [todayString, centerId,availableDates]);

  useEffect(() => {
    // 현재 날짜 정보를 가져와서 초기 월과 년도 설정
    const currentDate = new Date();
    setCurrentMonth(`${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}`);
  }, [isFocused]);

  useEffect(() => {
    if(centerId){
      fetchAvailableDates();
    }else if(!centerId){
      setAvailableDates({});
      setLessonList([]);
    }

}, [centerId, currentMonth ,isFocused]);

  function fetchAvailableDates() {
    if (!centerId || !currentMonth) return;
    const [year, month] = currentMonth.split('.');
    getLessonCalendar({ id: centerId, year, month })
        .then(data => {
            const updatedAvailableDates = data.dates.reduce((acc, currDate) => {
                acc[currDate] = { 
                    selected: true,
                    selectedColor: COLORS.gray_100,
                    selectedTextColor: '#000000' 
                };
                return acc;
            }, {});
            setAvailableDates(updatedAvailableDates);
        })
        .catch(error => {
            console.error("Error fetching available dates:", error);
        });
}

const fetchLessons = (date = todayString) => {
  if (!centerId) return;
  // console.log('centerIdcenterIdcenterIdcenterId',centerId)
  getLessonList(centerId, date)
      .then(data => {
        // console.log('d왜호출됨 ?',centerId,data)
          setLessonList(data.content);
      })
      .catch(error => {
          console.error("Error fetching lesson list11:", error);
      });
};


useEffect(() => {
  if (centerId&&isFocused) {
    setSelected(selected);
    fetchLessons(selected); // 오늘 날짜의 수업 목록을 불러옵니다.
}
}, [centerId,isFocused]);


  const renderCustomHeader = () => {
    const rigthIcon = require('../../assets/img/rightIcon.png');
    return (
      <>
      <Container>
        <MonthContainer onPress={openPicker}>
        <TitleText>{currentMonth}</TitleText>
        <Icons source={rigthIcon}/>
        </MonthContainer>
      </Container>
      </>
    );
  };


  return (
    <>
       <CalendarProvider
        date={selected}
        theme={themeStyled}
        hideExtraDays={true}
        renderHeader={renderCustomHeader}
    

    >
      {weekView ? (
        <WeekCalendar  
        disableAllTouchEventsForDisabledDays={true}
        disableAllTouchEventsForInactiveDays={true}
        firstDay={0} markedDates={availableDates}
        hideExtraDays={true}
        />
      ) : (
   
        <ExpandableCalendar
        style={{
            ...Platform.select({
              ios: {
                shadowColor: 'transparent',
                zIndex: 99,
                backgroundColor: 'transparent',
              },
              android: {
                elevation: 0
              }
            }),
        }}
        disableAllTouchEventsForDisabledDays={true}
        disableAllTouchEventsForInactiveDays={true}
        hideKnob={false}
        hideExtraDays={true}
        renderHeader={renderCustomHeader}
        hideArrows
        markedDates={{
          ...availableDates,
          [todayString]: {
            ...(availableDates[todayString] || {}),
            marked: true,
            dotColor: '#FF7A00', // 마크 색상
          },
          [selected]: {
            selected: true,
            selectedColor: COLORS.sub,
            selectedTextColor: COLORS.main,
            disableTouchEvent: true,
            ...(selected === todayString && { // 오늘 날짜일 경우 주황색 닷 추가
              marked: true,
              dotColor: '#FF7A00',
            }),
          },
        }}
          onDayPress={handleDayPress}
          theme={themeStyled}
          onMonthChange={(month) => {
            setCurrentMonth(`${month.year}.${String(month.month).padStart(2, '0')}`);
        }}
          firstDay={0}
        />

      )
      }
<GridWrapper>
    
          <GridLine/>
          {lessonList?.length === 0 ? null : (
            <DateTitleContainer>
              <DateTitleText>{getFormattedDate(selected)}</DateTitleText>
              {selected === todayString ? (
                <TodayText>오늘</TodayText>
              ) : null}
            </DateTitleContainer>
          )}
        </GridWrapper>
        <LessonListGrid lessonList={lessonList} />
        {
      showDatetModal && (
        <DatePicker
        modal
        open={showDatetModal}
        locale="ko-KR"
        title={null}
        date={today}
        confirmText="확인"
        cancelText="취소"
        onConfirm={(today) => {
          handleConfirm(today)
      }}
        mode="date"
        onCancel={() => {
         setShowDateModal(false)
     }}
     />
      )
    }
    </CalendarProvider>
    </>
  );
}

export default CustomCalendar;

const Container = styled.View`
    background-color: ${COLORS.white};
    margin-bottom: 6px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 8px;
    padding: 0 5px;
`
const MonthContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const Icons = styled(FastImage)`
    width: 20px;
    height: 20px;
`


const TitleText = styled.Text`
    color: ${COLORS.sub};
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
`

const DateTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom:20px; 
    margin-top: 10px;
`

const DateTitleText = styled.Text`

color: ${COLORS.sub};
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
`
const GridWrapper = styled.View`
    padding: 0 20px;
`

const TodayText = styled.Text`
color: #FF7A00;
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
margin-left: 8px;
padding-top: 2px;
`
const CalendarContainer = styled.View`
  padding-bottom: 20px; // 이 값을 조절하여 캘린더 아래쪽에 원하는 만큼의 패딩 추가
`;