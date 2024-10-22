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

