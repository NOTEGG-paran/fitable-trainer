/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: RegisterMemberScreen.js
 * 3. **설명**:
 *    - 새로운 회원을 등록하거나 기존 회원 정보를 수정할 수 있는 화면.
 *    - 회원 정보와 함께 이용권 추가 및 결제 정보를 입력받아 처리.
 *
 * 4. **주요 로직**:
 *    - **회원 등록/수정**:
 *      - `registerMember` API를 호출하여 회원 정보를 서버에 등록.
 *      - 이용권 정보가 있을 경우 함께 등록하며, 필수 입력값 검증 후 진행.
 *    - **회원 상세 정보 이동**:
 *      - 등록이 완료되면 `getMemberDetail` API를 호출하여 회원 상세 정보 화면으로 이동.
 *    - **입력 데이터 상태 관리**:
 *      - 이름, 성별, 연락처, 이용권 정보를 `formData` 상태로 관리.
 *    - **유효성 검사**:
 *      - 이름, 성별, 연락처 입력값의 유효성을 검사하여 등록 버튼 활성화 여부 결정.
 *
 * 5. **주요 기능**:
 *    - **회원 정보 입력**:
 *      - 이름, 성별, 연락처 등 회원 기본 정보를 입력받음.
 *    - **이용권 추가**:
 *      - 여러 이용권을 추가하고 각 이용권에 대한 결제 및 기간 정보를 입력.
 *    - **회원 등록 및 수정**:
 *      - 신규 회원 등록 및 기존 회원 정보 업데이트를 지원.
 *    - **에러 처리**:
 *      - 입력값 누락 및 서버 응답 오류에 대해 Alert로 사용자에게 알림.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - `centerIdState`를 사용해 현재 센터 정보를 상태로 관리.
 *    - **API 호출**:
 *      - `registerMember`, `getMemberDetail` API를 호출하여 데이터 처리.
 *    - **KeyboardAwareScrollView 사용**:
 *      - 키보드가 화면을 가리지 않도록 스크롤 뷰 조정.
 *    - **Styled-Components 사용**:
 *      - UI 요소의 스타일을 선언적으로 정의.
 *    - **동적 폼 데이터 관리**:
 *      - `formData` 상태를 통해 회원 정보 및 이용권 데이터를 동적으로 관리.
 */


import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import MemberRegisterGrid from '../../components/grid/MemberRegisterGrid';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useState,useEffect,useRef } from 'react';
import {registerMember, getMemberDetail} from '../../api/memberApi';
import { useRecoilState } from 'recoil';
import { centerIdState } from '../../store/atom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
function RegisterMemberScreen(props) {

    const navigation = useNavigation();
    const route = useRoute();
    const goBack = () => {
        navigation.goBack();
    }
    const { memberInfo = {}, type = ''} = route.params || {};
  
    console.log('sk나넘어왔엉',memberInfo, type)
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [name, setName] = useState(type? memberInfo.name : '');
    const [selectedGender, setSelectedGender] = useState(type? memberInfo.genderType : 'MALE');
    const [phone, setPhone] = useState(type? memberInfo.phone:null);



    const [bookmarkTickets, setBookmarkTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectTicketId, setSelectTicketId] = useState([]);
    const [memberId, setMemberId] = useState(null);
    const [date, setDate] = useState(new Date());
    const initstartDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    const initialFormData = {
        centerId: centerId || '',
        name:name||'',
        genderType:selectedGender,
        phone:phone||'',
        tickets: [],
    };
    
    const [formData, setFormData] = useState(initialFormData);

      console.log('formDataformDataformDataselectedTicket',formData)


      const addTicket = () => {
        setFormData((prevData) => ({
          ...prevData,
          tickets: [
            ...prevData.tickets,
            {
              id: '',
              time: null,
              period: null,
              periodType: null,
              startDate: initstartDate,
              endDate: '',
              stopTicketDay: 0,
              stopTicketTime: 0,

              paymentType: null,
              salePrice: 0,
              receivedPrice: 0,
            },
          ],
        }));
      };



    useEffect(() => {
        if(memberId) {
            memberDetailScreen(centerId, memberId);
        }
    }, [memberId]);

    useEffect(() => {
        setFormData({
            centerId: centerId || '',
            name: name || '',
            genderType: selectedGender,
            phone: phone || '',
            tickets: [],
        });
    }, [centerId, name, selectedGender, phone]);

    const registerBtn = async() => {
        if(isActive){
            console.log('ddd')
            const data = {
                name,
                genderType:selectedGender,
                phone,
                centerId
            }
            // console.log('data',data,formData)
            if (formData.tickets.length > 0) {
                console.log('저는 값이있어요', formData.tickets.length);
                const allTicketsValid = formData.tickets.every(ticket => 
                    ticket.paymentType !== null && 
                    ticket.receivedPrice > 0 && 
                    ticket.salePrice > 0
                );
            
                if (!allTicketsValid) {
                    formData.tickets.forEach(ticket => {
                        if (ticket.paymentType === null) {
                            Alert.alert("오류", "결제수단을 선택해주세요");
                        } else if (ticket.receivedPrice === 0) {
                            Alert.alert("오류", "받은금액을 입력해주세요");
                        } else if (ticket.salePrice === 0) {
                            Alert.alert("오류", "판매금액을 입력해주세요");
                        }
                    });
                }else{
                    await postRegisterMemberApi(formData);
                    memberDetailScreen(centerId, memberId);
                }
             }else{
                console.log('저는 값이 없어요',formData.tickets.length)
                await postRegisterMemberApi(data);
                memberDetailScreen(centerId, memberId);
            }        
            // memberDetailScreen(centerId, memberId);
        }
    }

    const postRegisterMemberApi = async (data) => {
        console.log('q받은데이터',data)
        try{
            const response = await registerMember(data);
            if(response){
                console.log('response',response.id)
                setMemberId(response.id);
            }
        }catch(error){
            console.log('w등록에러',error)
            if(error.code === 10201){
                Alert.alert("휴대폰번호 오류","가입되지 않은 휴대폰번호를\n 입력해주시길 바랍니다.",
                [{ text: "확인", onPress: () => {
                    
                } }]);
            }
            // throw error;
        }finally{
            console.log('finally')
        }
        
    }

 

    const memberDetailScreen = async(id,memberId) => {
        console.log('memberDetailScreen@@@',id,memberId);
        try{
            const response = await getMemberDetail({id,memberId});
            console.log('회원 상세 응답@@',response)
            if(response){
                navigation.navigate('ClassMemberDetail',{
                    detailData: response,
                    screenType:'memberDetail',
                    memberId:memberId
                })
            }

        }catch(error){
            console.log('error',error);
        }finally{
            console.log('finally')
        }
    }

    const isActive = (name && selectedGender && phone.length===11) ? true : false;

    // console.log('데이터 값들', name, selectedGender,phone,centerId)

    return (
        <MainContainer>
            <HeaderContainer>
            <GobackGrid onPress={goBack}>회원 등록</GobackGrid>
            <RegisterBtn onPress={registerBtn}>
            <HeaderText isActive={isActive}>등록</HeaderText>
            </RegisterBtn>
            </HeaderContainer>
            <ScrollViewContainer
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView
              extraScrollHeight={10}
              enableOnAndroid={true}
              keyboardShouldPersistTaps='handled'
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
            <MemberRegisterGrid 
            name={name}
            setName={setName}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            phone={phone}
            setPhone={setPhone}
            memberInfo={memberInfo} type={type}
            bookmarkTickets={bookmarkTickets}
            setBookmarkTickets={setBookmarkTickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            addTicket={addTicket}
            formData={formData}setFormData={setFormData}
            selectTicketId={selectTicketId}
            setSelectTicketId={setSelectTicketId}
            />
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
            </ScrollViewContainer>
        </MainContainer>
    );
}
export default RegisterMemberScreen;

const HeaderContainer = styled.View`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`

const RegisterBtn = styled.TouchableOpacity`
 padding: 20px 10px 20px 30px;
`

const ScrollViewContainer = styled.ScrollView`
    flex:1;
`

const HeaderText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.isActive ? COLORS.sub : COLORS.gray_300};
`;