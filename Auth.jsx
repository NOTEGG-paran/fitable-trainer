import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { COLORS } from './src/constants/color';
import LoginPage from './src/screens/authLoginPage/LoginPage';
import FindPassword from './src/screens/authLoginPage/FindPassword';
import NewPassword from './src/screens/authLoginPage/NewPassword';

const Stack = createNativeStackNavigator();


function Auth(props) {
    return (
        <Stack.Navigator
            screenOptions={{
              title: '',
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.white,
                borderBottomWidth: 0,
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              shadowColor: 'transparent',
              elevation: 0, 
          }}>
             <Stack.Screen
            name="SignIn"
            component={LoginPage}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="FindPassword"
            component={FindPassword}
          />
          {/* 이건 로그인 후 비밀번호 설정할 때 */}
            <Stack.Screen
            name="NewPassword"
            component={NewPassword}
          />
          </Stack.Navigator>
    );
}

export default Auth;