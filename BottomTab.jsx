import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/constants/color';
import ScheduleMainScreen from './src/screens/schedulePage/ScheduleMainScreen';
import MemberMainScreen from './src/screens/memberPage/MemberMainScreen';
import MypageMainScreen from './src/screens/myPage/MypageMainScreen';
import AlarmMainScreen from './src/screens/alarmPage/AlarmMainScreen';
import { useRecoilValue } from 'recoil';
import {floatingState} from './src/store/atom'
import { BottomTabBar } from '@react-navigation/bottom-tabs';
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