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
import {getClassNames, getClassItem, getClassPlaces ,registerClass, getAssignableMembers} from '../../api/classApi';
import ClassTimeSelectCard from '../../components/card/ClassTimeSelectCard';
import RegisteredModal from '../../components/modal/RegisteredModal';
import {formatDate} from '../../utils/CustomUtils';
import ClassDateCheckBtn from '../../components/button/ClassDateCheckBtn';
import FastImage from 'react-native-fast-image';
import TrainerProfileGrid from '../../components/grid/TrainerProfileGrid';
import TestCardsPicker from '../../components/card/TestCardsPicker';
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

console.log('className',className,classItem,classLocation)
// schedules
const [schedules, setSchedules] = useState([
    {
        dayOfWeek: "",
        startTime: "",
        endTime: "",
    },
]);



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
            console.log('getClassNamesApi',error.response)
        }
    }

    const getClassPlacesApi = async (centerId) => {
        try{
            const response = await getClassPlaces(centerId);
            if(response){
                setLocation(response)
            }
        }catch(error){
            console.log('getClassNamesApi',error.response)
        }
    }

    useEffect(() => {
        if(centerId){
            getClassNamesApi(centerId);
            getClassItemApi(centerId);
            getClassPlacesApi(centerId);
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
                console.log('err', error.response);
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
        (postPersonalSingleData.name === "" || postPersonalSingleData.name === undefined) || 
        (startTime === undefined || startTime === "" || startTime === "null") ||
        (endTime === undefined || endTime === "" || endTime === "null") 
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
            (postPersonalSingleData.name === "" || postPersonalSingleData.name === undefined) || 
            (selectDate === undefined || selectDate === "") ||
            (edate === undefined || edate === "" || edate === "null") ||!isScheduleValid
        ){
                return false;
        }
            return true;
    }

    
    const getAssignableMembersScreen = async(id, ableDate, startTime, endTime) => {
        setIsLoading(true);
        const date = `${ableDate.getFullYear()}-${(ableDate.getMonth() + 1).toString().padStart(2, '0')}-${ableDate.getDate().toString().padStart(2, '0')}`
        console.log('회원 배정 date확인 로그',id, date, startTime, endTime)
        if(!date || !startTime || !endTime){
            Alert.alert('날짜와 시간을 선택해주세요');
            setIsLoading(false);
        }else{
            try{
                const response = await getAssignableMembers({id, date, startTime, endTime,},0,10);
                console.log('최초 회원 선택 응답',response.content.length)
                navigation.navigate('MemberSelect',{
                    selectData: response.content,
                    routerType:'ableclass',
                    nextPage: 1, 
                    hasMore: response.content.length === 10,
                    abprops:{id, date, startTime, endTime}
                })
            }catch(error){
                console.log('123err', error)
            }finally{
                setIsLoading(false);
            }
        }
    }
console.log('personalData',personalData)
    
    //맴버 삭제 버튼
    const handleDeleteBtn = () =>{
        setMember(null)
    }
    useEffect(() => {
        if (selectedMember) {
          setMember(selectedMember);
        }
      }, [selectedMember]);

    
    useEffect(() => {
        console.log('Class data updated:', classData);
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
    }, [className, classItem, classLocation, startDate, startTime, endTime, classData,schedules,selectedCheckBox]);
  

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
                    <CreateClassSelectCard selectState={selectName} setSelectState={setSelectName} state={name} imgIcon={classIcon} type="name" setState={setClassName} updateClassData={updateClassData}>수업명</CreateClassSelectCard>

                    
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
                    {/* 수정중 */}
                    {/* {
                        selectedCheckBox === 'SINGLE' && 
                        <TestCardsPicker 
                        startTime={startTime}  
                        endTime={endTime}
                        setStartTime={setStartTime} setEndTime={setEndTime} imgIcon={clockIcon}>시간</TestCardsPicker> 
                    } */}
                
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
                            onPress={()=>getAssignableMembersScreen(centerId, date, startTime, endTime)}>
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
