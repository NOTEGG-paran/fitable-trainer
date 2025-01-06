/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: ScheduleMainScreen.js
 * 3. **설명**:
 *    - 스케줄 관리 메인 화면으로, 캘린더와 수업 예약 및 회원 등록 기능을 제공.
 *    - 플로팅 버튼을 통해 추가 작업(회원 등록 등)을 실행.
 *
 * 4. **주요 로직**:
 *    - **센터 선택 및 데이터 로드**:
 *      - `centerId`를 기반으로 `getLessonAvailable` API를 호출하여 센터에서 예약 가능한 수업 데이터를 확인.
 *    - **플로팅 모달 관리**:
 *      - `floatingState`를 사용해 플로팅 모달의 열림/닫힘 상태를 관리.
 *    - **회원 등록 화면 이동**:
 *      - 추가 버튼을 통해 회원 등록 화면(`RegisterMember`)으로 이동.
 *    - **캘린더 컴포넌트**:
 *      - `CustomCalendar`를 통해 스케줄을 확인하고 인터랙션 가능.
 *
 * 5. **주요 기능**:
 *    - **캘린더**:
 *      - 커스텀 캘린더를 통해 스케줄 및 예약 상태를 확인.
 *    - **회원 등록 버튼**:
 *      - 플로팅 버튼 및 헤더에서 회원 등록 화면으로 이동 가능.
 *    - **플로팅 모달**:
 *      - 플로팅 버튼을 클릭해 추가 작업(예: 수업 등록)을 위한 모달 표시.
 *    - **센터 및 수업 데이터 로드**:
 *      - API를 호출해 센터와 관련된 예약 가능 여부를 확인.
 *
 */


import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {GridLine} from '../../style/gridStyled'
import CustomCalendar from '../../components/custom/CustomCalender';
import CenterListHeaderGrid from '../../components/grid/CenterListHeaderGrid';
import FloatingBtn from '../../components/button/FloatingBtn';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import FloatingModal from '../../components/modal/FloatingModal';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { floatingState,centerIdState } from '../../store/atom';
import {getLessonAvailable} from '../../api/lessonApi';
import LessonListGrid from '../../components/grid/LessonListGrid';
import FastImage from 'react-native-fast-image';

function ScheduleMainScreen(props) {

    const navigation = useNavigation();

    const [openFloatingModal, setOpenFloatingModal] = useRecoilState(floatingState);
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [isAvailable, setIsAvailable] = useState(false);
    const toggleFloatingModal = () =>{
        setOpenFloatingModal(!openFloatingModal);
    }
    useEffect(() => {
      if(centerId){
        getLessonAvailableData()
        }
    }
    ,[centerId]);

    const getLessonAvailableData = async () => {
      // console.log('centerId',centerId)
      if (!centerId) {
          setIsAvailable(false);
          return;
      }
      const response = await getLessonAvailable(centerId);
      setIsAvailable(response);
  }


    const goRegitserMemberScreen = () => {
        navigation.navigate('RegisterMember')
    }

    // useFocusEffect(
    //   useCallback(() => {
    //     if(centerId){
    //       getLessonAvailableData()
    //       }
    //   },[centerId]));


    console.log('isAvailable1',isAvailable,'centerId',centerId)


    // useEffect(() => {
    //     if (openFloatingModal) {
    //       navigation.setOptions({
    //         headerStyle: {
    //           backgroundColor: "rgba(0, 0, 0, 0.75)",
    //         },
    //       });
    //     } else {
    //       navigation.setOptions({
    //         headerStyle: {
    //           backgroundColor: COLORS.white,
    //         },
    //       });
    //     }
    //   }, [openFloatingModal]);
      


 const addUserIcon = require('../../assets/img/adduser.png')

    return (
    <>
        <Container>
            <HeaderContainer>
                <CenterListHeaderGrid />
                {
                  centerId && centerId && (
                    <IconContainer onPress={goRegitserMemberScreen}>
                    <AddUserImg
                      source={addUserIcon}
                      resizeMode="contain"
                    />
                  </IconContainer>
                  )
                }
               
            </HeaderContainer>
                <CustomCalendar/>
            
            {/* lessonList */}
          {/* <LessonListGrid lessonList={lessonList}/> */}
    </Container>
    {
         isAvailable && isAvailable && (
          // centerId && centerId && (
            <FloatingBtn onPress={toggleFloatingModal} isOpen={openFloatingModal}/>
        )
    }
    {openFloatingModal && <FloatingModal isOpen={openFloatingModal} closeModal={toggleFloatingModal}
    setOpenFloatingModal={setOpenFloatingModal}
    />}
    </>
    );
}

export default ScheduleMainScreen;

const Container = styled.View`
   flex:1;
    background-color: ${COLORS.white};
`
    

const HeaderContainer = styled.View`
    padding:0 20px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`

const IconContainer = styled.TouchableOpacity`

`

const AddUserImg = styled(FastImage)`
  width: 30px;
  height: 30px;
`


// import React, { useState } from 'react';
// import { View, Button, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
// import DatePicker from 'react-native-date-picker';
// import Modal from 'react-native-modal';

// const ScheduleMainScreen = () => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [date, setDate] = useState(new Date());

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (selectedDate) => {
//     setDate(selectedDate);
//     hideDatePicker();
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Show Date Picker" onPress={showDatePicker} />

//       <Modal
//         isVisible={isDatePickerVisible}
//         onBackdropPress={() => {}}  // 모달 외부 클릭 시 아무 동작도 하지 않도록 설정
//         onBackButtonPress={() => {}}  // 백 버튼 눌렀을 때 닫히지 않도록 설정
//         propagateSwipe={true}
//       >
//         <TouchableWithoutFeedback onPress={() => {}}>
//           <View style={styles.modalContent}>
//             <DatePicker
//               locale="ko-KR"
//               date={date}
//               mode="date"
//               onDateChange={setDate}  // date 변경시 state 업데이트
//             />
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity onPress={hideDatePicker} style={styles.button}>
//                 <Text style={styles.buttonText}>취소</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => handleConfirm(date)} style={styles.button}>
//                 <Text style={styles.buttonText}>확인</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   button: {
//     marginHorizontal: 10,
//     padding: 10,
//     backgroundColor: '#2196F3',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//   },
// });

// export default ScheduleMainScreen;

