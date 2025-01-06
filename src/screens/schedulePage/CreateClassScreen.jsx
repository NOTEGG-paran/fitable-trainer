/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: CreateClassScreen.js
 * 3. **설명**:
 *    - 그룹 및 1:1 수업 등록을 위한 화면.
 *    - 수업명, 시간, 날짜, 장소, 강사 등의 정보를 입력받아 수업을 생성.
 *    - 선택한 수업 유형(그룹/1:1)과 일정 반복 여부에 따라 데이터 처리.
 *
 * 4. **주요 로직**:
 *    - **수업 데이터 로드**:
 *      - API 호출을 통해 수업명, 종목, 장소, 강사 정보를 가져옴.
 *    - **수업 데이터 상태 관리**:
 *      - `classData`를 기반으로 사용자가 입력한 데이터를 저장하고 업데이트.
 *    - **등록 요청**:
 *      - `registerClass` API를 호출하여 수업 데이터를 서버에 저장.
 *      - 단일 일정(SINGLE)과 반복 일정(MULTIPLE)에 따라 데이터를 다르게 처리.
 *    - **유효성 검사**:
 *      - 시간, 날짜, 강사 정보 등의 필수 입력값에 대한 유효성 검사 수행.
 *      - 시작 시간이 종료 시간보다 늦을 경우 오류 처리.
 *    - **회원 배정**:
 *      - API 호출로 배정 가능한 회원 목록을 가져오고, 회원 선택 화면으로 이동.
 *
 * 5. **주요 기능**:
 *    - **그룹 및 개인 수업 등록**:
 *      - 단일 일정(SINGLE) 및 반복 일정(MULTIPLE) 모두 지원.
 *    - **수업 데이터 입력**:
 *      - 수업명, 날짜, 시간, 장소, 강사 정보를 사용자가 입력.
 *    - **회원 배정**:
 *      - 1:1 수업의 경우 회원을 배정하거나 삭제.
 *    - **등록 완료 모달 표시**:
 *      - 수업 등록 성공 시 모달을 통해 사용자에게 알림.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - `centerIdState`를 사용해 현재 센터 ID 및 기타 상태 관리.
 *    - **API 호출**:
 *      - `getClassNames`, `getClassItem`, `getClassPlaces`, `getClassTrainer`, `registerClass` 등을 통해 데이터 처리.
 *    - **Styled-Components 사용**:
 *      - 화면 구성 요소의 스타일을 선언적으로 정의.
 *    - **실시간 유효성 검사**:
 *      - 필수 입력값 및 일정 유효성을 검사하여 버튼 활성화 상태를 동적으로 변경.
 */

import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {MainContainer} from '../../style/gridStyled'
import MainLongTextGrid from '../../components/grid/MainLongTextGrid';
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { ScrollView, Alert } from 'react-native';
import CheckBtnGrid from '../../components/grid/CheckBtnGrid';
import { useState, useEffect } from 'react';
import BasicMainBtn from '../../components/button/BasicMainBtn';
import CreateClassSelectCard from '../../components/card/CreateClassSelectCard';
import TimeSelectCard from '../../components/card/TimeSelectCard';
import DateSelectCard from '../../components/card/DateSelectCard';
import DaySelectBtnGrid from '../../components/grid/DaySelectBtnGrid';
import SelectClassDateCard from '../../components/card/SelectClassDateCard';
import {centerIdState,floatingState} from '../../store/atom';
import { useRecoilState } from 'recoil';
import {getClassNames, getClassItem, getClassPlaces ,registerClass, getClassTrainer,getAssignableMembers} from '../../api/classApi';
import ClassTimeSelectCard from '../../components/card/ClassTimeSelectCard';
import RegisteredModal from '../../components/modal/RegisteredModal';

import ClassDateCheckBtn from '../../components/button/ClassDateCheckBtn';
import FastImage from 'react-native-fast-image';
import LoadingModal from '../../components/modal/LoadingModal';
function CreateClassScreen(props) {

    const route = useRoute();
    const { type } = route.params;
    const {selectedMember} = route.params;
    const [member, setMember] = useState(selectedMember);
    // console.log('selectedMember',selectedMember,member?.memberTicketId)
    const navigation = useNavigation();

    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [registeredModal, setRegisteredModal] = useState(false);
    const [selectedCheckBox, setSelectedCheckBox] = useState("SINGLE");
    const [name, setName] = useState([]);
    const [item, setItem] = useState([]);
    const [location, setLocation] = useState([]);
    const [trainers,setTrainers] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    // 상태관리 값 
const [classData, setClassData] = useState({
    centerId: centerId,
    type: type,
    isLesson: true,
    name: "",
    item: "",
    location: "",
    schedulerType: "",
    startDate: "",
    schedules: [
      {
        dayOfWeek: "",
        startTime: "",
        endTime: "",
      },
    ],
  });
  
  const [isActive, setIsActive] = useState(false);

const [className, setClassName] = useState("");
const [classItem, setClassItem] = useState("");
const [classLocation, setClassLocation] = useState("");
const [classTrainer, setClassTrainer] = useState([])
//start
const [date, setDate] = useState(new Date())
const [edate, setEdate] = useState(new Date())

const [schedulerType, setSchedulerType] = useState(selectedCheckBox);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [dayOfWeek, setDayOfWeek] = useState("");
const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");
const [isLesson, setIsLesson] = useState(true);
const [selectName, setSelectName] = useState(className);
const [selectItem, setSelectItem] = useState(classItem);
const [selectLocation, setSelectLocation] = useState(classLocation);
const [selectTrainer,setSelectTrainer] = useState(classTrainer)
console.log('className',className,classItem,classLocation)
// schedules
const [schedules, setSchedules] = useState([
    {
        dayOfWeek: "",
        startTime: "",
        endTime: "",
    },
]);

const [isAssigningMember, setIsAssigningMember] = useState(false);


    //api
    console.log('schedulesschedulesschedules',schedules)

    const getClassNamesApi = async (centerId) => {
        try{
            const response = await getClassNames(centerId);
            if(response){
                setName(response)
            }
        }catch(error){
            console.log('getClassNamesApi',error.response)
        }
    }

    const getClassItemApi = async (centerId) => {
        try{
            const response = await getClassItem(centerId);
            if(response){
                setItem(response)
            }
        }catch(error){
            console.log('getClassItemApi',error.response)
        }
    }

    const getClassPlacesApi = async (centerId) => {
        try{
            const response = await getClassPlaces(centerId);
            if(response){
                setLocation(response)
            }
        }catch(error){
            console.log('getClassPlacesApi',error.response)
        }
    }

    const getClassTrainerApi = async (centerId) => {
        try{
            const response = await getClassTrainer(centerId);
            if(response){
                setTrainers(response)
            }
        }catch(error){
            console.log('getClassTrainerApi',error.response)
        }
    }

    useEffect(() => {
        if(centerId){
            getClassNamesApi(centerId);
            getClassItemApi(centerId);
            getClassPlacesApi(centerId);
            getClassTrainerApi(centerId)
        }
    }, []);

    // 수업 관련 데이터 상태 관리

    const resetClassData = () => {
        // setClassName(null);
        // setClassItem(null);
        // setClassLocation(null);
        // setDate(new Date());
        // setEdate(new Date());
        // setStartDate("");
        // setEndDate("");
        setDayOfWeek("");
        // setStartTime("");
        // setEndTime("");
        // setSelectedCheckBox("SINGLE");
        setSchedules([
            {
                dayOfWeek: "",
                startTime: "",
                endTime: "",
            },
        ]);

        // setSelectItem(null);
        // setSelectLocation(null);
        // setSelectName(null);
        // if(isLesson === false && selectedCheckBox==='SINGLE' &&  type !== 'GROUP' && member){
        //         setMember(null)
        // }
        // updateClassData();
    }

    const resetbtnData = () => {
    //     setClassName(null);
    //     setClassItem(null);
    //     setClassLocation(null);
    //     setDate(new Date());
    //     setEdate(new Date());
    //     setStartDate("");
    //     setEndDate("");
        setDayOfWeek("");
    //     setStartTime("");
    //     setEndTime("");
        setSchedules([
            {
                dayOfWeek: "",
                startTime: "",
                endTime: "",
            },
        ]);

    //     setSelectItem(null);
    //     setSelectLocation(null);
    //     setSelectName(null);
    //     if(isLesson === false && selectedCheckBox==='SINGLE' &&  type !== 'GROUP' && member){
    //         setMember(null)
    // }
    //     updateClassData();
    }


    const updateClassData = () => {
        setClassData(prevData => ({
            ...prevData,
            name: className || "",
            item: classItem !== null ? classItem : "",
            location: classLocation || "",
            trainers:classTrainer ||[],
            schedulerType: selectedCheckBox,
            startDate: selectDate || "",
            schedules: [
                {
                    startTime: startTime || "",
                    endTime: endTime || "",
                },
            ],
        }));
    };

        // 1:1 수업 일정 일회성 데이터
        const postPersonalSingleData = {
            centerId: centerId,
            type: type,
            isLesson: isLesson,
            name: className,
            location: classLocation,
            trainers:classTrainer,
            schedulerType: selectedCheckBox,
            startDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            schedules: [
                {
                    startTime: startTime,
                    endTime: endTime,
                },
            ],
            assignedMemberTicketId: member?.memberTicketId,
        }

        // 1:1수업 반복 데이터
        const postPersonalMultipleData = {
            centerId: centerId,
            type: type,
            isLesson: true,
            name: className,
            location: classLocation,
            trainers:classTrainer,
            schedulerType: selectedCheckBox,
            startDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            endDate: `${edate.getFullYear()}-${(edate.getMonth() + 1).toString().padStart(2, '0')}-${edate.getDate().toString().padStart(2, '0')}`,
            schedules: schedules
        }


        // 그룹 수업 일회성 데이터
        const postGroupSingleData = {
            centerId: centerId,
            type: type,
            isLesson: true,
            name: className,
            item: classItem,
            location: classLocation,
            schedulerType: selectedCheckBox,
            startDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            schedules: [
                {
                    startTime: startTime,
                    endTime: endTime,
                },
            ],
        }
     
        // 그룹수업 반복 데이터
        const postGroupMultipleData = {
            centerId: centerId,
            type: type,
            isLesson: true,
            name: className,
            item: classItem,
            location: classLocation,
            schedulerType: selectedCheckBox,
            startDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            endDate: `${edate.getFullYear()}-${(edate.getMonth() + 1).toString().padStart(2, '0')}-${edate.getDate().toString().padStart(2, '0')}`,
            schedules: schedules
        }

        const personalData = selectedCheckBox === 'SINGLE' ? postPersonalSingleData : postPersonalMultipleData;
        const postData = selectedCheckBox === 'SINGLE' ? postGroupSingleData : postGroupMultipleData;
        

    const selectDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    // 개인 수업 등록SINGLE
    // const singleRegisterBtn = async(personalData, selectedCheckBox) => {
    //     console.log('/fuckck',personalData)
    // }
    const singleRegisterBtn = async(personalData, selectedCheckBox) => {
        console.log('Class data in test11111:', postPersonalSingleData);
        // setRegisteredModal(true);
        if(selectedCheckBox === 'SINGLE'){
            console.log('tl싱글 개인이요',personalData)
            // setRegisteredModal(true);
            try {
                const response = await registerClass(personalData);
                if (response) {
                    console.log('response@#!@#!@#!@#!@#!@#!@#!@', response.data);
                    console.log('응답성공해서',personalData)
                    setRegisteredModal(true);
                }
            } catch (error) {
                console.log('err', error.response.data);
                if(error.response.data.code === 20919){
                    Alert.alert('이미 등록된 일정이 있어 수업을 등록할 수 없습니다.\n일정을 다시 한 번 확인해주세요.')
                }else if(error.response.data.code === 20808){
                    Alert.alert('시작일보다 끝나는 날짜가 더 빠릅니다. 다시 선택해주세요')
                }
            }

        }else if(selectedCheckBox === 'MULTIPLE'){
            // setRegisteredModal(true);
            console.log('tl멀티 개인이요',personalData)
            try {
                const response = await registerClass(personalData);
                if (response) {
                    console.log('멀티 개인이', response.data);
                    console.log('멀티 개인이@~@~@~@~@~',personalData)
                    setRegisteredModal(true);
                }
            } catch (error) {
                console.log('err', error);
                if(error.response.data.code === 20919){
                    Alert.alert('이미 등록된 일정이 있어 수업을 등록할 수 없습니다.\n일정을 다시 한 번 확인해주세요.')
                }else if(error.response.data.code === 20808){
                    Alert.alert('시작일보다 끝나는 날짜가 더 빠릅니다. 다시 선택해주세요')
                }
            }
        }
    }



//  console.log('버튼 콘솔',personalSingleBtnActive,personalMultipleBtnActive,groupSingleBtnActive,groupMultipleBtnActive)
    // 그룹 수업 등록
    const groupRegisterBtn = async(postData,selectedCheckBox) => {
        console.log('postData@#!@#!@#!@#!@#@!#!@#!@#!@#!@#!@#!@#!@#@!',postData)
        // updateClassData();
        // setRegisteredModal(true);
        console.log('Class data in test:', classData);
        console.log('성공전전에 classData0', classData);

        if(selectedCheckBox === 'SINGLE'){
            // setRegisteredModal(true);
        try {
            const response = await registerClass(postData);
            if (response) {
                console.log('response@#!@#!@#!@#!@#!@#!@#!@', response.data);
                console.log('응답성공해서',postData)
                setRegisteredModal(true);
            }
        } catch (error) {
            console.log('err', error.response.data);
            if(error.response.data.code === 20919){
                Alert.alert('이미 등록된 일정이 있어 수업을 등록할 수 없습니다.\n일정을 다시 한 번 확인해주세요.')
            }else if(error.response.data.code === 20808){
                Alert.alert('시작일보다 끝나는 날짜가 더 빠릅니다. 다시 선택해주세요')
            }
        }
    }else if(selectedCheckBox === 'MULTIPLE'){
        // setRegisteredModal(true);
    try {
        console.log('aajfxlajf멀티쪽임')
        const response = await registerClass(postData);
        if (response) {
            console.log('response@#!@#!@#!@#!@#!@#!@#!@', response.data);
            console.log('응답성공해서',postData)
            setRegisteredModal(true);
        }
    } catch (error) {
        console.log('err', error.response.data);
        if(error.response.data.code === 20919){
            Alert.alert('이미 등록된 일정이 있어 수업을 등록할 수 없습니다.\n일정을 다시 한 번 확인해주세요.')
        }else if(error.response.data.code === 20808){
            Alert.alert('시작일보다 끝나는 날짜가 더 빠릅니다. 다시 선택해주세요')
        }
    }
    }
}

    // 그룹 1회성
   const isActiveFn = () => {
        if (
            (className === undefined || className === "") ||
            (classItem === undefined || classItem === "" || classItem === null || classItem === "null" || classItem === "") ||
            (selectDate === undefined || selectDate === "") ||
            (startTime === undefined || startTime === "" || startTime === "null") ||
            (endTime === undefined || endTime === "" || endTime === "null") 
        ) {
            return false;
        }
    const isInvalidSchedule = postData.schedules.some(schedule => {
    const start = schedule.startTime;
    const end = schedule.endTime;
    const startDate = new Date(`2024-01-01T${start}:00`);
    const endDate = new Date(`2024-01-01T${end}:00`);
    return startDate >= endDate;
});
if (isInvalidSchedule) {
    return false;
}


        return true;
    };

    const isActiveMultipleFn = () => {
        const isScheduleValid = schedules.every(
            (schedule) =>
              schedule.startTime !== null &&
              schedule.endTime !== null &&
              schedule.startTime !== "" &&
              schedule.endTime !== ""
          );
        if (
          (className === undefined || className === "") ||
          (classItem === undefined || classItem === "" || classItem === null || classItem === "null" || classItem === "") ||
          (selectDate === undefined || selectDate === "") ||
          (edate === undefined || edate === "" || edate === "null") ||
          !isScheduleValid
        ) {
          console.log("Condition not met");
          return false;
        }
      
        console.log("Condition met");
        return true;
      }

    const isPersonalActiveFn = () => {
       if(
        // (postPersonalSingleData.name === "" || postPersonalSingleData.name === undefined) || 
        (startTime === undefined || startTime === "" || startTime === "null") ||
        (endTime === undefined || endTime === "" || endTime === "null") ||
        (classTrainer === undefined || classTrainer.length === 0 || classTrainer.includes(null))
       ){
        return false;
       }
        const isInvalidSchedule = personalData.schedules.some(schedule => {
        const start = schedule.startTime;
        const end = schedule.endTime;
        const startDate = new Date(`2024-01-01T${start}:00`);
        const endDate = new Date(`2024-01-01T${end}:00`);
        return startDate >= endDate;
    });
    if (isInvalidSchedule) {
        return false;
    }
         return true;
    }



    const isPersonalMultipleActiveFn = () => {
        const isScheduleValid = schedules.every(
            (schedule) =>
              schedule.startTime !== null &&
              schedule.endTime !== null &&
              schedule.startTime !== "" &&
              schedule.endTime !== ""
          );
        if(
            // (postPersonalMultipleData.name === "" || postPersonalMultipleData.name === undefined) || 
            (selectDate === undefined || selectDate === "") ||
            (edate === undefined || edate === "" || edate === "null") ||!isScheduleValid ||
            // (postPersonalMultipleData.trainers === undefined || postPersonalMultipleData.trainers.length === 0)
            (classTrainer === undefined || classTrainer.length === 0 || classTrainer.includes(null))
        ){
                return false;
        }
            return true;
    }

    
    const getAssignableMembersScreen = async(id, ableDate, startTime, endTime,trainerIds) => {
        console.log('gg확인용',id, ableDate, startTime, endTime,trainerIds)

        setIsLoading(true);
        const date = `${ableDate.getFullYear()}-${(ableDate.getMonth() + 1).toString().padStart(2, '0')}-${ableDate.getDate().toString().padStart(2, '0')}`
        if(!date || !startTime || !endTime|| trainerIds.length===0|| trainerIds.includes(null)){
            Alert.alert('날짜, 시간, 그리고 트레이너를 선택해주세요');
            setIsLoading(false);
        }else{
            
            try{
                const trainerIdsString = trainerIds.join(',');
                console.log('여기 데이터 탈까요 ?',trainerIdsString)
                const response = await getAssignableMembers({id, date, startTime, endTime, trainerId: trainerIdsString,},0,10);
                console.log('최초 회원 선택 응답',response.content.length)
                console.log('response회원배정',response)
                navigation.navigate('MemberSelect',{
                    selectData: response.content,
                    routerType:'ableclass',
                    nextPage: 1, 
                    hasMore: response.content.length === 10,
                    abprops:{id, date, startTime, endTime,trainerIdsString},
                    onAssignMember: () => setIsAssigningMember(true)
                })
            }catch(error){
                console.log('123err123123123', error.response)
            }finally{
                setIsLoading(false);
            }
        }
    }
console.log('personalData',personalData)
    
    //맴버 삭제 버튼
    const handleDeleteBtn = () =>{
        setIsAssigningMember(false);
        setMember(null)
    }
    useEffect(() => {
        if (selectedMember) {
          setMember(selectedMember);
        }
      }, [selectedMember]);

    
    useEffect(() => {
        console.log('Class data updated:', classData,isActive);
        if(type === 'GROUP'){
            if(selectedCheckBox === 'SINGLE'){
                 setIsActive(isActiveFn());
                 grupPersActive(postGroupSingleData)
            }else if(selectedCheckBox === 'MULTIPLE'){
                 setIsActive(isActiveMultipleFn());
            }
        }else if(type === 'PERSONAL'){
            if(selectedCheckBox === 'SINGLE'){
                 setIsActive(isPersonalActiveFn());
                 singlePersActive(postPersonalSingleData)
            }else if(selectedCheckBox === 'MULTIPLE'){
                 setIsActive(isPersonalMultipleActiveFn());
            }
        }
    }, [className, classItem, classLocation, startDate, startTime, endTime, classData,schedules,selectedCheckBox,classTrainer]);
  

const singlePersActive = (personalData) => {
    const isInvalidSchedule = personalData.schedules.some(schedule => {
        const start = schedule.startTime;
        const end = schedule.endTime;
        const startDate = new Date(`2024-01-01T${start}:00`);
        const endDate = new Date(`2024-01-01T${end}:00`);
        return endDate <= startDate;
    });
    if (isInvalidSchedule) {
        Alert.alert('수업 종료 시간을 시작 시간보다 더 늦은 시간으로 설정해주세요');
        return;
    }

}



const grupPersActive = (postData) => {
    const isInvalidSchedule = postData.schedules.some(schedule => {
        const start = schedule.startTime;
        const end = schedule.endTime;
        const startDate = new Date(`2024-01-01T${start}:00`);
        const endDate = new Date(`2024-01-01T${end}:00`);
        return endDate <= startDate;
    });
    if (isInvalidSchedule) {
        Alert.alert('수업 종료 시간을 시작 시간보다 더 늦은 시간으로 설정해주세요');
        return;
    }

}



    const goBack = () => {
        navigation.goBack();
    }

    const calendarIcon = require('../../assets/img/calendarIcon.png');
    const classIcon = require('../../assets/img/classIcon.png');
    const clockIcon = require('../../assets/img/clockIcon.png');
    const itemIcon = require('../../assets/img/itemIcon.png');
    const locationIcon = require('../../assets/img/locationIcon.png');
    const addBtnIcon = require('../../assets/img/pluscircle.png')
    const trainerIcon = require('../../assets/img/trainerIcon.png')
    return (
        <>
        <MainContainer>
            <GobackGrid onPress={goBack}/>
                <ScrollView showsVerticalScrollIndicator={false}overScrollMode="never"bounces={false}>
                    {
                        type === 'GROUP' ? (
                            <GridContainer>
                            <MainLongTextGrid>그룹 수업을</MainLongTextGrid>
                            </GridContainer>
                            ):(
                                <GridContainer>
                                <MainLongTextGrid>1:1수업 일정을</MainLongTextGrid>
                                </GridContainer>
                                )
                    }
                    <MainLongTextGrid>만들어주세요</MainLongTextGrid>
                    {/* 컨텐츠 바디 */}
                    <CheckBtnGrid 
                    selectedCheckBox={selectedCheckBox} 
                    resetClassData={resetbtnData}
                    setIsActive={setIsActive}
                    setSelectedCheckBox={setSelectedCheckBox}/>
                    {
                    selectedCheckBox==='SINGLE' &&  type !== 'GROUP' && (
                            <ClassDateCheckBtn 
                            classDate={classData}
                            isLesson={isLesson}
                            setIsLesson={setIsLesson}
                            setMember={setMember}
                            isAssigningMember={isAssigningMember}
                            />
                        )
                    }
                    {
                       
                type === 'GROUP' ? (
                    <>
                    <CreateClassSelectCard selectState={selectName} setSelectState={setSelectName} state={name} imgIcon={classIcon} type="name" setState={setClassName} maindata={className} updateClassData={updateClassData} >수업명</CreateClassSelectCard>
                    <CreateClassSelectCard selectState={selectItem} setSelectState={setSelectItem} state={item} imgIcon={itemIcon} type="item" setState={setClassItem} updateClassData={updateClassData} maindata={classItem}>종목</CreateClassSelectCard>
                    {
                        selectedCheckBox === 'SINGLE' ? 
                        (<SelectClassDateCard state={name}imgIcon={calendarIcon} type="date"date={date} setDate={setDate}>날짜</SelectClassDateCard>)
                        :( <DateSelectCard 
                            date={date} setDate={setDate}
                            edate={edate} setEdate={setEdate}
                            imgIcon={calendarIcon} state={classData}>날짜</DateSelectCard>)
                    }
                        <CreateClassSelectCard selectState={selectLocation} setSelectState={setSelectLocation} state={location} imgIcon={locationIcon}type="location" setState={setClassLocation} updateClassData={updateClassData} maindata={classLocation}>장소(선택)</CreateClassSelectCard>
                    {
                        selectedCheckBox === 'SINGLE' && 
                        <ClassTimeSelectCard 
                        startTime={startTime}  
                        endTime={endTime}
                        setStartTime={setStartTime} setEndTime={setEndTime} setEndTimeimgIcon={clockIcon}>시간</ClassTimeSelectCard>
                    }
                   
                    {
                        selectedCheckBox === 'MULTIPLE' && (<DaySelectBtnGrid
                        title="시간"
                        schedules={schedules}
                        setSchedules={setSchedules}
                        />)
                    }
                    </>):(
                    // 1:1 수업
                    <>
                    <CreateClassSelectCard selectState={selectName} setSelectState={setSelectName} state={name} imgIcon={classIcon} type="name" setState={setClassName} updateClassData={updateClassData}>수업명(선택)</CreateClassSelectCard>

                    
                    {
                        selectedCheckBox === 'SINGLE' ? (
                            <>
                        <SelectClassDateCard state={name}imgIcon={calendarIcon} type="date" date={date} setDate={setDate}>날짜</SelectClassDateCard>


                        </>
                        ):( <DateSelectCard 
                            date={date} setDate={setDate}
                            edate={edate} setEdate={setEdate}
                            imgIcon={calendarIcon} state={classData}
                            >날짜</DateSelectCard>)
                    }

                    <CreateClassSelectCard selectState={selectLocation} setSelectState={setSelectLocation} state={location} imgIcon={locationIcon} type="location" setState={setClassLocation} updateClassData={updateClassData}>장소(선택)</CreateClassSelectCard>
                   
                   {
                    type==="PERSONAL" &&
                    (<CreateClassSelectCard selectState={selectTrainer} setSelectState={setSelectTrainer} state={trainers} imgIcon={trainerIcon} type="trainer" setState={setClassTrainer} updateClassData={updateClassData}>강사</CreateClassSelectCard>)
                   }

                
                    {
                        selectedCheckBox === 'SINGLE' &&  <ClassTimeSelectCard  
                        startTime={startTime}  
                        endTime={endTime}
                        setStartTime={setStartTime} setEndTime={setEndTime} imgIcon={clockIcon}>시간</ClassTimeSelectCard>
                    }
                    {
                    type==="PERSONAL" && selectedCheckBox === 'MULTIPLE' && (<DaySelectBtnGrid
                        title="시간"
                        schedules={schedules}
                        setSchedules={setSchedules}
                        />)
                    }
                    
                    </>
                    
                    )
            }
               {
                  isLesson === true && selectedCheckBox==='SINGLE' &&  type !== 'GROUP' && (
                        member ? (
                            <MembersListContaniner>
                            <MemberName>{member.name}</MemberName>
                            <DeleteContainer onPress={handleDeleteBtn}>
                            <MemberName>⎯</MemberName>
                            </DeleteContainer>
                            </MembersListContaniner>
                        ):(
                            <AssignMemberContainer 
                            disabled={isLoading}
                            onPress={()=>getAssignableMembersScreen(centerId, date, startTime, endTime,classTrainer)}>
                            <AddbtnBox>
                            <AddbtnIcon source={addBtnIcon}/>    
                            <LabelText>예약 회원</LabelText>
                            </AddbtnBox>
                            </AssignMemberContainer>
                                )
                        
                        )
                }


            </ScrollView>
        <CreateBtnContainer />
        <BasicMainBtn 
        isActive={isActive}
        disabled={isActive}
        onPress={type === 'GROUP' ? ()=>groupRegisterBtn(postData, selectedCheckBox) : ()=>singleRegisterBtn(personalData, selectedCheckBox)}>등록하기</BasicMainBtn>
        </MainContainer>
        {
           registeredModal && <RegisteredModal 
           resetClassData={resetClassData}
              setRegisteredModal={setRegisteredModal}
           />
        }
        {
            isLoading && <LoadingModal />
        }
        </>
    );
}

export default CreateClassScreen;

const CreateBtnContainer = styled.View`
    margin-top: 80px;
`;

const AssignMemberContainer = styled.TouchableOpacity`
/* display: flex;
flex-direction: row;
align-items: center;
margin-top: 22px;
margin-bottom: 42px; */
background-color: ${COLORS.white};
border : 1px solid ${COLORS.gray_200};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 22px;
`;

const AddbtnBox = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`

const LabelText = styled.Text`
/* font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_400}; */
font-size: 14px;
color: ${COLORS.sub};
font-weight: 400;
line-height: 22.40px;
`;

const AddbtnIcon = styled(FastImage)`
    margin-right: 8px;
    width:  20px;
    height: 20px;
`;

const MembersListContaniner = styled.View`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 12px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const DeleteContainer = styled.TouchableOpacity`
width: 28px;
`

const MemberName = styled.Text`
 font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`;

const GridContainer = styled.View`
    margin-top: 44px;
`
