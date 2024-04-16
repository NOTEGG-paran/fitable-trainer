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

    useEffect(() => {
        if (openFloatingModal) {
          navigation.setOptions({
            headerStyle: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
          });
        } else {
          navigation.setOptions({
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          });
        }
      }, [openFloatingModal]);
      


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
    {openFloatingModal && <FloatingModal isOpen={openFloatingModal} closeModal={toggleFloatingModal}/>}
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
