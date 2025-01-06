/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: CustomUtils.js
 * 3. **설명**:
 *    - 애플리케이션에서 사용되는 다양한 유틸리티 함수 모음.
 *    - 데이터 포맷 변환, 정규식 검사, 버전 비교, UUID 생성 등 공통적으로 필요한 기능을 제공.
 *
 */

// 비밀번호 정규식
export function validatePassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,16}$/i;
    return pattern.test(password);
  }


// 핸드폰 번호 하이폰 정규식
export function formatPhoneNumber(phone){

    if (!phone) {
        return '';
    }

    if (phone.length === 10) {
        return `${phone.substring(0, 3)}-${phone.substring(3, 6)}-${phone.substring(6)}`;
    } else if (phone.length === 11) {
        return `${phone.substring(0, 3)}-${phone.substring(3, 7)}-${phone.substring(7)}`;
    } else {
        return phone;
    }
};

// 시간 포맷
export const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};


// 날짜 포맷
export function formatDate(dateString) {
  if (!dateString) {
      // 또는 다른 처리를 수행할 수 있습니다.
      console.error('Invalid date string');
      return '';  // 빈 문자열 반환
  }

  return dateString.split('T')[0];
}

// 숫자 콤마
export function formatCommaNumber(num) {
  if (num === '' || isNaN(Number(num))) {
    return '0';
  }
  return new Intl.NumberFormat().format(Number(num));
}

// 하이폰 제거 - 대신 .
export function formatReplaceString(dateString) {
  if (!dateString || dateString.trim() === '') {
      return '';  // 빈 문자열 반환
  }
  
  return dateString.replace(/-/g, '.');
}

// 휴대폰 번호 정규식
export function validatePhone(phone) {
  const pattern = /^010\d{8}$/;
    return pattern.test(phone);
  }

// 날짜 데이터 형식 변환
export function getFormattedDate(dateString) {
  const date = new Date(dateString);
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0'); 
  const dayOfWeek = days[date.getDay()];

  return `${month}.${day} ${dayOfWeek}요일`;
}

// 버전체크
export function compareVersions(version1, version2) {
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1 = v1Parts[i] || 0;
      const v2 = v2Parts[i] || 0;
      if (v1 > v2) return 1; // version1이 더 높음
      if (v1 < v2) return -1; // version2가 더 높음
  }
  return 0; // 두 버전이 동일함
}

export function generateUUID() {
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}


// token
const base64Decode = (str) => {
  try {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (error) {
    console.error('Base64 디코딩 오류:', error);
    return null;
  }
};

export const checkAccessTokenValidity = (token) => {
  if (!token) {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    console.error('토큰 형식 오류: 토큰은 세 부분으로 구성되어야 합니다');
    return false;
  }

  try {
    const payload = JSON.parse(base64Decode(parts[1]));
    const currentTime = Date.now() / 1000; // 현재 시간(초 단위)
    return payload.exp > currentTime; // 토큰 만료 시간과 현재 시간 비교
  } catch (error) {
    console.error('토큰 유효성 검사 오류:', error);
    return false;
  }
};