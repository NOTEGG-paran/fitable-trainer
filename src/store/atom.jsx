/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: atom.js
 * 3. **설명**:
 *    - Recoil을 사용한 애플리케이션 상태 관리 파일.
 *    - 로그인 상태, 사용자 정보, 센터 정보, 계약서 정보 등을 전역 상태로 관리.
 *
 * 4. **주요 로직**:
 *    - **로그인 및 사용자 상태**:
 *      - `isLoginState`: 로그인 여부를 관리.
 *      - `myPhoneState`: 사용자 전화번호를 저장.
 *      - `fcmTokenState`: FCM 토큰 관리.
 *    - **센터 상태**:
 *      - `centerIdState`: 선택된 센터의 ID를 저장.
 *      - `centerListState`: 센터 목록을 저장.
 *      - `selectedCenterIdState`: 사용자가 선택한 센터 ID 저장.
 *    - **플로팅 상태**:
 *      - `floatingState`: 플로팅 모달의 활성화 상태를 관리.
 *    - **프로필 및 계약 상태**:
 *      - `profileState`: 강사의 프로필 정보 관리.
 *      - `contractState`: 계약서 작성 및 관리 상태.
 *    - **회원 관리 상태**:
 *      - `totalElementsState`: 회원 관리 버튼별 요소 수 관리.
 *
 * 5. **주요 기능**:
 *    - **로그인 상태 관리**:
 *      - `isLoginState`: 로그인 여부에 따라 화면 분기.
 *      - `fcmTokenState`: 푸시 알림에 필요한 FCM 토큰 저장.
 *    - **센터 정보 관리**:
 *      - `centerIdState`: 현재 선택된 센터 ID를 전역으로 관리.
 *      - `centerListState`: 센터 목록을 저장해 선택과 검색에 활용.
 *    - **회원 및 계약 정보 관리**:
 *      - `profileState`: 강사 프로필과 관련된 데이터를 저장.
 *      - `contractState`: 계약서 작성 시 필요한 데이터를 저장.
 *    - **UI 상태 관리**:
 *      - `floatingState`: 플로팅 모달 활성화 상태를 제어.
 *      - `totalElementsState`: 회원 관리 화면의 버튼별 상태 관리.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 선언**:
 *      - `atom`을 사용해 상태 선언.
 *      - 각 상태의 `key`는 고유해야 하며, `default` 값으로 초기화.
 *    - **구조화된 상태 관리**:
 *      - 사용자, 센터, 계약서 등으로 상태를 분리해 모듈화.
 *      - 앱의 복잡한 상태를 관리하기 쉽게 구성.
 */

import { atom } from 'recoil';

export const isLoginState = atom({
    key: 'isLoginState',
    default: false,
});

export const myPhoneState = atom({
    key: 'myPhoneState',
    default: '',
});

export const fcmTokenState = atom({
  key: 'fcmTokenState',
  default: '',
});


// mypage info
export const myinfoState = atom({
  key: 'myinfoState',
  default: {
    name: '',
    phone: '',
    isOnPushAlarm: true,
  },
});

// centerId
export const centerIdState = atom({
    key: 'centerIdState',
    default: '',
  });

// CenterList
export const centerListState = atom({
    key: 'centerListState',
    default: [],
  });

// SelectCenterId
export const selectedCenterIdState = atom({
  key:'selectedCenterIdState',
  default:'',
})

// floating state
export const floatingState = atom({
    key: 'floatingState',
    default: false,
});


// 프로필 상태 관리
export const profileState = atom({
    key: 'profileState',
    default: {
        description: '',
        career: '',
        qualifications: '',
        centerProfiles: [],
    },
});

// 회원관리 버튼 넘버 상태관리
export const totalElementsState = atom({
    key: 'totalElementsState',
    default: {
      PERSONAL: 0,
      GROUP: 0,
      ATTENDANCE: 0,
      MANAGING: 0,
      POTENTIAL: 0
    },
  });

  // 계약서 상태관리
export const contractState = atom({
  key: 'contractState',
  default: {
    memberSignImage: {uri: null, file: null},
    adminSignImage: {uri: null, file: null},
    centerSignImage: {uri: null, file: null},

    memberName: '',
    trainerName: '',
    centerName: '',

    contractTemplate: {},
    selectedTickets: [],
    updatedSelectedTickets: null,
    addReceipts:[],
  },
});