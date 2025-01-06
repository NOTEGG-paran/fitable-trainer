/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: AppScreens.jsx
 * 3. **설명**:
 *    - 애플리케이션의 주요 네비게이션 스택을 구성하는 파일.
 *    - 다양한 화면과 관련된 `Stack.Navigator` 설정 포함.
 *
 * 4. **주요 로직**:
 *    - **메인 네비게이션 설정**:
 *      - `MainTabScreen`을 기본 화면으로 설정.
 *    - **스택 그룹 구성**:
 *      - 일정, 회원 관리, 알림, 마이페이지에 대한 스크린 그룹화 및 스타일링.
 *    - **헤더 스타일링**:
 *      - 각 그룹별로 공통 스타일 적용 및 커스텀 헤더 설정.
 *
 * 5. **주요 기능**:
 *    - **메인 탭 화면**:
 *      - `MainTabScreen`을 통한 메인 화면 구성.
 *    - **일정 관리**:
 *      - `CreateClassScreen`: 새로운 수업 생성.
 *      - `MemberSelectScreen`: 멤버 선택 화면.
 *      - `ClassMemberDetailScreen`: 수업 멤버 상세보기.
 *      - `RegisterMemberScreen`: 새로운 멤버 등록.
 *    - **회원 관리**:
 *      - `PaymentLinkScreen`: 결제 링크 화면.
 *      - `ContractScreen`: 계약 관리.
 *      - `ContractTicketScreen`: 계약 티켓 상세 화면.
 *      - `EditContractSecreen`: 계약서 수정.
 *      - `ContractAgreementScreen`: 계약 동의 화면.
 *      - `SignContractScreen`: 계약서 서명.
 *      - `AddReceiptScreen`: 영수증 추가.
 *      - `SaveContractScreen`: 계약 저장 히스토리.
 *      - `ContractSuccess`: 계약 성공 알림.
 *    - **알림 관리**:
 *      - `AlarmLessonDetailScreen`: 수업 알림 상세.
 *      - `AlarmConsultDetailScreen`: 상담 알림 상세.
 *    - **마이페이지**:
 *      - `AcountScreen`: 계정 설정.
 *      - `ChangePhoneNumberScreen`: 전화번호 변경.
 *      - `CenterSettingScreen`: 센터 설정.
 *      - `SearchCenterScreen`: 센터 검색.
 *      - `EditProfileScreen`: 프로필 편집.
 *      - `TermsScreen`: 약관 화면.
 *      - `WebViewScreen`: 약관 웹뷰.
 *
 */


import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from './src/constants/color';
import MainTabScreen from './BottomTab';
import EditProfileScreen from './src/screens/myPage/EditProfileScreen';
import AcountScreen from './src/screens/myPage/AccountScreen';
import TermsScreen from './src/screens/myPage/TermsScreen';
import CenterSettingScreen from './src/screens/myPage/CenterSettingScreen';
import ChangePhoneNumberScreen from './src/screens/myPage/ChangePhoneNumberScreen';
import AlarmLessonDetailScreen from './src/screens/alarmPage/AlarmLessonDetailScreen';
import AlarmConsultDetailScreen from './src/screens/alarmPage/AlarmConsultDetailScreen';
import CreateClassScreen from './src/screens/schedulePage/CreateClassScreen';
import MemberSelectScreen from './src/screens/schedulePage/MemberSelectScreen';
import ClassMemberDetailScreen from './src/screens/schedulePage/ClassMemberDetailScreen';

import SearchCenterScreen from './src/screens/myPage/SearchCenterScreen';
import PaymentLinkScreen from './src/screens/memberPage/PaymentLinkScreen';
import ContractScreen from './src/screens/memberPage/ContractScreen';
import ContractTicketScreen from './src/screens/memberPage/ContractTicketScreen';
import RegisterMemberScreen from './src/screens/schedulePage/RegisterMemberScreen';
import EditContractSecreen from './src/screens/memberPage/EditContractScreen';
import ContractAgreementScreen from './src/screens/memberPage/ContractAgreementScreen';
import SignContractScreen from './src/screens/memberPage/SignContractScreen';
import SignScreen from './src/screens/memberPage/SignScreen';
import ContractSuccess from './src/screens/memberPage/ContractSuccess';
import WebViewScreen from './src/screens/myPage/WebViewScreen';
import AddReceiptScreen from './src/screens/memberPage/AddReceiptScreen';
import SaveContractScreen from './src/screens/memberPage/SaveContractScreen';

const Stack = createNativeStackNavigator();

function AppScreens(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: COLORS.sub,
          borderBottomWidth: 0,
          shadowColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
        },
        headerShadowVisible: false,
        shadowColor: 'transparent',
        headerBackVisible: false,
      }}>
      <Stack.Screen
        name="MainTab"
        component={MainTabScreen}
        options={{headerShown: false}}
      />

      {/* 일정 스크린 설정 */}
      <Stack.Group
        screenOptions={{
          title: '',
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen name="CreateClass" component={CreateClassScreen} />
        <Stack.Screen
          name="MemberSelect"
          component={MemberSelectScreen}
          options={{headerStyle: {backgroundColor: COLORS.gray_100}}}
        />
        <Stack.Screen
          name="ClassMemberDetail"
          component={ClassMemberDetailScreen}
          options={{headerStyle: {backgroundColor: COLORS.sub}}}
        />
   
        {/* 회원등록 */}
        <Stack.Screen name="RegisterMember" component={RegisterMemberScreen} />
      </Stack.Group>

      {/* 회원관리 설정 */}
      <Stack.Group
        screenOptions={{
          title: '',
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen name="PaymentLink" component={PaymentLinkScreen} />
        {/* 계약서 */}
        <Stack.Screen name="Contract" component={ContractScreen} />
        <Stack.Screen name="ContractTicket" component={ContractTicketScreen} />

        <Stack.Screen name="EditContract" component={EditContractSecreen} />
        <Stack.Screen
          name="AgreementContract"
          component={ContractAgreementScreen}
        />
        <Stack.Screen name="AddReceipt" component={AddReceiptScreen} />
        <Stack.Screen name='ReceiptHistory' component={SaveContractScreen} />
        <Stack.Screen name="SignContract" component={SignContractScreen} />
        <Stack.Screen name="Sign" component={SignScreen} />
        <Stack.Screen name="ContractSuccess" component={ContractSuccess} />
      </Stack.Group>

      {/* 알림 스크린 설정 */}
      <Stack.Group
        screenOptions={{
          title: '',
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen name="LessonDetail" component={AlarmLessonDetailScreen} />
        <Stack.Screen
          name="ConsultDetail"
          component={AlarmConsultDetailScreen}
        />
      </Stack.Group>

      {/* 마이페이지 스크린 설정 */}
      <Stack.Group
        screenOptions={{
          title: '',
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen name="Account" component={AcountScreen} />
        <Stack.Screen
          name="ChangePhoneNumber"
          component={ChangePhoneNumberScreen}
        />

        <Stack.Screen name="CenterSetting" component={CenterSettingScreen} />
        <Stack.Screen name="MyCenterSearch" component={SearchCenterScreen} />

        <Stack.Screen name="MyProfile" component={EditProfileScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="TermWebView" component={WebViewScreen}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default AppScreens;
