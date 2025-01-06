/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: App.jsx
 * 3. **설명**:
 *    - 애플리케이션의 메인 엔트리 포인트.
 *    - FCM 푸시 알림 설정, 앱 버전 체크, 스플래시 화면, 버전 업데이트 모달 관리.
 *
 * 4. **주요 로직**:
 *    - **푸시 알림 설정**:
 *      - FCM 토큰 관리 및 알림 권한 요청.
 *      - 알림 채널 생성 및 알림 수신 처리.
 *    - **앱 버전 체크**:
 *      - 서버에서 최신 버전 정보 확인.
 *      - 현재 앱 버전과 비교하여 업데이트 필요 여부 판단.
 *    - **스플래시 화면**:
 *      - 앱 실행 시 2초간 표시 후 메인 화면 진입.
 *    - **버전 업데이트 모달**:
 *      - 업데이트가 필요할 경우 모달 표시.
 *      - 모달에서 앱스토어/플레이스토어로 이동.
 *
 * 5. **주요 기능**:
 *    - **푸시 알림 설정**:
 *      - `requestUserPermission`: 알림 권한 요청.
 *      - `checkNotificationPermissionAndRedirect`: 알림 권한 미허용 시 설정 화면 이동 안내.
 *      - `configureNotificationChannel`: 푸시 알림 채널 생성.
 *      - `configureNotifications`: 푸시 알림 수신 및 처리.
 *    - **앱 버전 체크**:
 *      - `getAppVersionCheck`: 서버에서 최신 버전 정보 가져오기.
 *      - `compareVersions`: 현재 버전과 서버 버전 비교.
 *    - **스플래시 화면**:
 *      - `showSplash` 상태로 스플래시 화면 표시 제어.
 *    - **버전 업데이트 모달**:
 *      - `showModal` 상태로 업데이트 필요 시 모달 표시.
 *      - `openStore`: 앱스토어/플레이스토어로 이동.
 *
 * 6. **주요 상태 및 로직**:
 *    - **상태**:
 *      - `fcmToken`: FCM 토큰 관리.
 *      - `showSplash`: 스플래시 화면 표시 여부.
 *      - `showModal`: 버전 업데이트 모달 표시 여부.
 *      - `alertText`: 업데이트 안내 메시지.
 *    - **로직**:
 *      - `checkMyAppFn`: 앱 버전 체크 후 업데이트 여부 결정.
 *      - `handleNotification`: 알림 수신 시 UI 업데이트.
 *      - `openStore`: 업데이트 필요 시 스토어 이동.
 *
 *
 * 7. **코드 주요 포인트**:
 *    - **알림 권한 요청**:
 *      - Android 및 iOS에서 알림 권한 요청 로직 분리.
 *    - **앱 버전 체크**:
 *      - `compareVersions`로 버전 비교 및 업데이트 여부 판단.
 *    - **알림 처리**:
 *      - `onMessage`로 알림 수신 시 로컬 알림 생성.
 */


import React, { useEffect, useState } from 'react';
import AppInner from './AppInner';
import { RecoilRoot } from 'recoil';
import { useRecoilState } from 'recoil';
import { fcmTokenState } from './src/store/atom';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import SplashScreen from './src/screens/splash/SplashScreen';
import { Platform, PermissionsAndroid, Linking, Alert,BackHandler } from 'react-native';
import {getAppVersionCheck} from './src/api/version';
import { getVersion } from 'react-native-device-info';
import {compareVersions} from './src/utils/CustomUtils';
import VersionCheckModal from './src/components/modal/VersionCheckModal';

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
      console.log('remoteMessage.notification',remoteMessage.notification)
      PushNotification.localNotification({
        smallIcon: "ic_noti_icons",
        channelId: "fitable-trainer",
        title: title,
        message: body,
        playSound: true,
        soundName: 'default',
        color: "#000000",
        badge: badgeCount,
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
  const [showModal, setShowModal] = useState(false)
  const [alertText, setAlertText] = useState('')

  const openStore = () => {
    console.log('스토어로 이동');
    const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.fitabletrainer&hl=ko&gl=US';
    const appStoreUrl = 'https://apps.apple.com/kr/app/fit-able-%ED%95%8F%EC%97%90%EC%9D%B4%EB%B8%94-%EA%B0%95%EC%82%AC%EC%9A%A9/id6475952083';

    if (Platform.OS === 'ios') {
        Linking.canOpenURL(appStoreUrl).then(supported => {
            if (supported) {
                Linking.openURL(appStoreUrl).catch((err) => console.error('앱 스토어로 이동 실패:', err));
            } else {
                console.log("URL을 열 수 없음: " + appStoreUrl);
            }
        });
    } else if (Platform.OS === 'android') {
      Linking.openURL(googlePlayUrl).catch((err) => console.error('플레이 스토어로 이동 실패:', err));
    }
};

  const checkMyAppFn = async () => {

    try {
        const apiData = await getAppVersionCheck();
        const currentVersion = getVersion();
        console.log('Current Version:', currentVersion,apiData.alert);

        let latestVersion;
        if (Platform.OS === 'ios') {
            latestVersion = apiData.trainerAppVersionForIos;
        } else if (Platform.OS === 'android') {
            latestVersion = apiData.trainerAppVersionForAndroid;
        }

        const comparison = compareVersions(currentVersion, latestVersion);
        if (comparison === -1) {
            console.log('업데이트 필요1:', latestVersion);
            setAlertText(apiData.alert)
            setShowModal(true)
        } else {
            console.log('최신 버전:', currentVersion);
        }
    } catch (error) {
        console.error('버전 확인 실패:', error);
    }
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      checkMyAppFn()
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <RecoilRoot>
      {showSplash ? <SplashScreen /> : <App />}
      {showModal && <VersionCheckModal visible={showModal} alertText={alertText} openStore={openStore}/>}
    </RecoilRoot>
  );
};

export default Main;