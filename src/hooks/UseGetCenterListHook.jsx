/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: UseGetCenterListHook.js
 * 3. **설명**:
 *    - 센터 리스트를 가져오고 현재 선택된 센터 ID를 관리하는 커스텀 훅.
 *    - Recoil 상태와 AsyncStorage를 활용해 데이터 동기화.
 *
 * 4. **주요 로직**:
 *    - **센터 리스트 가져오기**:
 *      - `getCenterList` API 호출로 센터 리스트 데이터를 가져옴.
 *      - 가져온 데이터를 Recoil 상태 `centerListState`에 저장.
 *    - **센터 ID 초기화**:
 *      - AsyncStorage에서 저장된 `centerId`를 가져옴.
 *      - 저장된 ID가 유효한 경우 `centerIdState`를 업데이트.
 *      - 유효하지 않거나 저장된 값이 없으면 첫 번째 센터의 ID를 기본값으로 설정.
 *    - **에러 처리**:
 *      - API 호출 실패나 AsyncStorage 읽기 실패 시, 에러를 로깅하고 기본 상태를 초기화.
 *
 * 5. **주요 기능**:
 *    - **센터 리스트 관리**:
 *      - API 호출로 최신 센터 리스트 가져오기.
 *      - Recoil 상태 `centerListState`를 통해 전역에서 센터 리스트 활용.
 *    - **센터 선택 상태 관리**:
 *      - AsyncStorage에서 저장된 선택된 센터 ID를 불러와 초기화.
 *      - `centerIdState`를 통해 선택된 센터 ID를 전역에서 활용.
 *    - **동기화 및 에러 처리**:
 *      - API와 AsyncStorage 간 데이터 동기화.
 *      - 네트워크 에러 및 비정상 데이터 처리 로직 포함.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 사용**:
 *      - `useRecoilState(centerIdState)`로 선택된 센터 ID 관리.
 *      - `useRecoilState(centerListState)`로 센터 리스트 데이터 관리.
 *    - **AsyncStorage 활용**:
 *      - 비동기로 저장된 `centerId`를 읽어 상태 초기화.
 *    - **API 호출**:
 *      - `getCenterList`를 호출해 센터 리스트 데이터를 동적으로 가져옴.
 */


import { useEffect,useState,useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { getCenterList } from '../api/trainersApi';
import {centerIdState,centerListState} from '../store/atom';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function UseGetCenterListHook() {
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [centerList, setCenterList] = useRecoilState(centerListState);

    useEffect(() => {
        async function fetchCenterList() {
            try {
                const response = await getCenterList();
                setCenterList(response);
                const storedCenterId = await AsyncStorage.getItem('centerId');

                if (storedCenterId && response.some(center => center.id === storedCenterId)) {
                    setCenterId(storedCenterId);
                } else if (response.length > 0) {
                    setCenterId(response[0].id);
                } else {
                    setCenterId(null);
                }
            } catch (error) {
                console.error('Failed to fetch center list or read AsyncStorage:', error);
                setCenterId(null);
            }
        }

        fetchCenterList();
    }, []);

    return { centerId, centerList };
}

export default UseGetCenterListHook;
