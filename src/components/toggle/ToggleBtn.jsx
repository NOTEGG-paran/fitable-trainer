import { styled } from 'styled-components/native';
import {COLORS} from '../../constants/color';
import { useState,useEffect } from 'react';
import {setPushNotification} from '../../api/mypageApi';
import { useRecoilState } from 'recoil';
import {fcmTokenState} from '../../store/atom';
import { Alert } from 'react-native';
function ToggleBtn({isOnPushAlarm}) {

  const [isOn, setIsOn] = useState(isOnPushAlarm);
  const [fcmToken, ] = useRecoilState(fcmTokenState);

  useEffect(() => {
    setIsOn(isOnPushAlarm);
  }, [isOnPushAlarm]);

  const handleToggle = async () => {
    const newIsOn = !isOn;
    try {
      await setPushNotification({
        isOn: newIsOn,
        fcmToken: newIsOn ? fcmToken : null,
      });
      setIsOn(newIsOn);
      console.log('Push notification setting updated successfully.');
    } catch (error) {
      console.error('Failed to update push notification setting:', error);
      // Alert.('알림 설정에 실패했습니다.');
    }
  };
  // console.log('isActive1', isOn,isOnPushAlarm);

    return (
        <ToggleContainer isActive={isOn} onPress={handleToggle}>
        <ToggleBall isActive={isOn} />
      </ToggleContainer>
    );
}

export default ToggleBtn;

const ToggleContainer = styled.TouchableOpacity`
  width: 50px;
  height: 30px;
  background-color: ${(props) => (props.isActive ? '#1F1F1F' : COLORS.gray_200)};
  border-radius: 34px;
  justify-content: center;
  align-items: ${(props) => (props.isActive ? 'flex-end' : 'flex-start')};
  padding: 3px;
`;

const ToggleBall = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${COLORS.white};
`;