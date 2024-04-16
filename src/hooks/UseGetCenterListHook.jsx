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
