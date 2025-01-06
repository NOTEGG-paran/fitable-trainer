/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: BottomTab.jsx
 * 3. **설명**:
 *    - 앱의 메인 하단 탭 네비게이션을 구성하는 파일.
 *    - 각 탭에 스케줄, 회원 관리, 알림, 마이페이지 네비게이션 스택을 설정.
 *
 * 4. **주요 로직**:
 *    - **하단 탭 네비게이션**:
 *      - `ScheduleScreens`: 스케줄 관련 화면 스택 구성.
 *      - `MemberScreens`: 회원 관리 관련 화면 스택 구성.
 *      - `AlarmScreens`: 알림 관련 화면 스택 구성.
 *      - `MyMainScreen`: 마이페이지 관련 화면 스택 구성.
 *    - **탭 스타일링 및 아이콘 설정**:
 *      - 탭 선택 여부에 따라 아이콘 변경.
 *      - 선택된 탭의 텍스트와 아이콘 강조 표시.
 *
 * 5. **주요 기능**:
 *    - **탭 네비게이션**:
 *      - `createBottomTabNavigator`로 네비게이션 탭 설정.
 *      - 각 탭에 스택 네비게이터를 연결하여 화면 전환 관리.
 *    - **스타일 및 사용자 경험**:
 *      - `tabBarStyle` 및 `tabBarIcon`을 통해 UI와 UX 강화.
 *      - 아이콘과 텍스트 스타일링으로 가독성과 편의성 제공.
 *
 */


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/constants/color';
import ScheduleMainScreen from './src/screens/schedulePage/ScheduleMainScreen';
import MemberMainScreen from './src/screens/memberPage/MemberMainScreen';
import MypageMainScreen from './src/screens/myPage/MypageMainScreen';
import AlarmMainScreen from './src/screens/alarmPage/AlarmMainScreen';
import { useRecoilValue } from 'recoil';
import {floatingState} from './src/store/atom'
import FastImage from 'react-native-fast-image'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const baseOptions = {
  title: '',
  headerStyle: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0, 
  },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  shadowColor: 'transparent',
  headerBackVisible: false,
}

const bottonIconSize = {
  width: 24,
  height: 24,
}

// 스케줄
function ScheduleScreens({ navigation }) {
    return (  
      <Stack.Navigator>
        <Stack.Screen name="ScheduleMain" component={ScheduleMainScreen} 
             options={{
                ...baseOptions
              }}
            />
      </Stack.Navigator>
    );
  }
  
  // 맴버관리 
  function MemberScreens({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="MemberMain" component={MemberMainScreen}
          options={{
            ...baseOptions
          }}
        />
      </Stack.Navigator>
    );
  }
  // MemberMainScreen
  // 알람페이지
  function AlarmScreens({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="AlarmMain" component={AlarmMainScreen}
          options={{
           ...baseOptions
          }}
        />
      </Stack.Navigator>
    );
  }
  
  // 마이페이지
  function MyMainScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="MypageMain" component={MypageMainScreen}
           options={{
            ...baseOptions
          }}
        />
      </Stack.Navigator>
    );
  }

function MainTabScreen(props) {

  const openFloatingModal = useRecoilValue(floatingState);
//   const tabBarBackgroundColor = openFloatingModal ? 'rgba(0, 0, 0, 0.75)' : COLORS.white;
// console.log('openFloatingModal',openFloatingModal)
    return (
        <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle:({ focused }) => ({
            color: focused ? COLORS.sub : COLORS.gray_300,
            fontSize: 12,
            fontWeight: 'bold',
          }),
          tabBarStyle: {
            backgroundColor: COLORS.white,
          },
          tabBarActiveTintColor: COLORS.sub,
          headerStyle: {
            backgroundColor: COLORS.white,
          
          },
          headerShown: false,
        }}
        // tabBar={(props) => (openFloatingModal ? null : <BottomTabBar {...props} />)}
      >
        <Tab.Screen name="Schedule" component={ScheduleScreens} 
          options={{
            title: '내 일정',
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => (
              <FastImage
              source={
                focused? 
                require('./src/assets/bottomTab/bottom_scactive.png') :
                require('./src/assets/bottomTab/bottom_scunactive.png')}
              style={{ 
                ...bottonIconSize,}}
                resizeMode={FastImage.resizeMode.contain}
            />

            ),
            
          }}
        /> 
        <Tab.Screen name="Member" component={MemberScreens} 
         options={{
          title: '회원 관리',
          tabBarIcon: ({ focused }) => (
            <FastImage
            source={
              focused? 
              require('./src/assets/bottomTab/bottom_meactive.png') :
              require('./src/assets/bottomTab/bottom_meunactive.png')}
            style={{ 
              ...bottonIconSize,}}
              resizeMode={FastImage.resizeMode.contain}
          />


          ),
              }}
        />
        <Tab.Screen name="Alarm" component={AlarmScreens} 
                options={{
                  title: '알림',
                  tabBarIcon: ({ focused }) => (
                    <FastImage
                    source={
                      focused? 
                      require('./src/assets/bottomTab/bottom_beactive.png') :
                      require('./src/assets/bottomTab/bottom_beunactive.png')}
                    style={{ 
                      ...bottonIconSize,}}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                  ),
                      }}
        />
        <Tab.Screen name="Mypage" component={MyMainScreen} 
            options={{
              title: '마이',
              tabBarIcon: ({ focused }) => (
                <FastImage
                source={
                  focused? 
                  require('./src/assets/bottomTab/bottom_myactive.png') :
                  require('./src/assets/bottomTab/bottom_myunactive.png')}
                style={{ 
                  ...bottonIconSize,}}
                  resizeMode={FastImage.resizeMode.contain}
              />
              ),
                  }}
        />
      </Tab.Navigator>
    );
}

export default MainTabScreen;