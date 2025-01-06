## 📱 FIT ABLE 강사앱

FIT ABLE 강사앱은 트레이너들이 스케줄 및 회원 관리 기능을 활용할 수 있도록 만들어진 React Native 기반의 앱입니다.


## 📂 프로젝트 폴더 구조

```bash
📦 프로젝트 루트
├── __tests__          # 테스트 코드 작성 폴더
├── android            # Android 관련 빌드 파일
├── ios                # iOS 관련 빌드 파일
├── node_modules       # 의존성 모듈
├── src                # 애플리케이션의 주요 소스 코드
│   ├── api            # API 호출 관련 로직
│   ├── assets         # 이미지, 폰트 등의 정적 파일
│   ├── components     # 재사용 가능한 UI 컴포넌트
│   ├── constants      # 상수값 및 설정 파일
│   ├── data           # 데이터 관련 로직 (ex: 더미 데이터, 데이터 모델)
│   ├── hooks          # 커스텀 훅
│   ├── screens        # 화면(페이지) 컴포넌트
│   ├── store          # 상태 관리 (ex: Recoil, Redux 관련 파일)
│   └── utils          # 유틸리티 함수 모음
├── vendor             # 외부 라이브러리 또는 플러그인 관련 코드
├── .env               # 환경 변수 파일
├── .eslintrc.js       # ESLint 설정 파일
├── .gitignore         # Git 무시 파일 설정
├── .prettierrc.js     # Prettier 설정 파일
├── app.json           # 앱 설정 파일
├── App.jsx            # 앱 진입점
├── AppInner.jsx       # 내부 라우팅 관련 로직
├── AppScreens.jsx     # 화면 라우팅 관리
├── Auth.jsx           # 인증 관련 로직
├── babel.config.js    # Babel 설정 파일
└── BottomTab.jsx      # 하단 탭 네비게이션
```

## 🛠️ 개발 환경 및 기술 스택

React Native: (0.72.1)  
패키지 매니저: npm  
기타 라이브러리 (package.json 참고)  
Axios (^1.4.0)  
Styled-components (^6.0.3)  


## 🚀 설치 및 실행 방법

```bash
# 의존성 설치
npm install

# 앱 실행 안드로이드
npm run android

# 앱 실행 ios
npm run ios
```

## 🔑 환경 변수 설정

env설정할때 test서버로 확인하고 싶으시면 DEV_URL 주소를 API_URL로 바꾸시면 됩니다.

```bash
API_URL=http://118.67.133.204:8080
DEV_URL=http://101.101.216.168:8080
```

## 📝 API 명세

- [개발 서버 test용](http://101.101.216.168:8080/swagger-ui/index.html?urls.primaryName=%EA%B0%95%EC%82%AC)
- [실서버](http://118.67.133.204:8080/swagger-ui/index.html?urls.primaryName=%EA%B0%95%EC%82%AC)


## 📄 유지보수 및 주의사항

- React Native 버전 업데이트 시 호환성 확인 필요
- android/build.gradle 또는 ios/Podfile 수정 시 주의
- (강사앱만)안드로이드 배포시 app.json name `fitableteacher`변경
- (강사앱만)ios 배포시 app.json name `fitabletrainer`변경

## 📄 유지보수 및 주의사항

- 참고 주석은 screens폴더 안에 있는 모든 컴포넌트 상단에 정리하였습니다.
- 일부 그리드, custom 켈린더 정도로만 정리하였습니다. 
- 컴포넌트 폴더에서 조립식으로 작업한거라 최상단 컴포넌트를 참고하여 보시면 됩니다.
