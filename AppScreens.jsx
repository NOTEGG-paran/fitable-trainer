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
