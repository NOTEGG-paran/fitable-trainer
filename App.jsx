import React, { useEffect, useState } from 'react';
import AppInner from './AppInner';
import { RecoilRoot } from 'recoil';
import { useRecoilState } from 'recoil';
import { fcmTokenState } from './src/store/atom';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import SplashScreen from './src/screens/splash/SplashScreen';
import { Platform, PermissionsAndroid, Linking, Alert } from 'react-native';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
async function checkNotificationPermissionAndRedirect() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  );
  console.log('granted123', granted);
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('You can use notifications');
  }else if(granted === PermissionsAndroid.RESULTS.DENIED||PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN){
    Alert.alert(
      '알림 권한 설정',
      '알림 권한을 허용해주세요.',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '설정',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
      { cancelable: false }
    );
  }

}

const configureNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: "fitable-trainer",
      channelName: "fitable client channel",
      channelDescription: "A default channel for all the notifications",
      soundName: "default",
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`CreateChannel returned '${created}'`)
  );
};

const configureNotifications = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
      // process the action
    },

    onRegistrationError: function(err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

function App() {
  const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);

  useEffect(() => {
    requestUserPermission();
    configureNotificationChannel();
    configureNotifications();
    if(Platform.OS === 'android') {
      checkNotificationPermissionAndRedirect();
    }
    const unsubscribeToken = messaging().onTokenRefresh(token => {
      // console.log("FCM Token Refresh >>> ", token);
      setFcmToken(token);
    });

    messaging().getToken().then(token => {
      // console.log("FCM Token >>> ", token);
      setFcmToken(token);
    });

    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      const {title, body} = remoteMessage.notification;
      PushNotification.localNotification({
        smallIcon: "ic_noti_icons",
        channelId: "fitable-trainer",
        title: title,
        message: body,
        playSound: true,
        soundName: 'default',
        color: "#000000",
      });
    });

    return () => {
      unsubscribeToken();
      unsubscribeMessage();
    };
  }, []);

  console.log('fcmToken', fcmToken);

  return <AppInner />;
}

const Main = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <RecoilRoot>
      {showSplash ? <SplashScreen /> : <App />}
    </RecoilRoot>
  );
};

export default Main;