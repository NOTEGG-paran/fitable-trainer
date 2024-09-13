// 로그인 상태관리
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