/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: CenterListHeaderGrid.js
 * 3. **설명**:
 *    - 센터 목록을 표시하고 선택할 수 있는 헤더 컴포넌트.
 *    - iOS와 Android 플랫폼에 따라 다른 UI와 동작을 제공.
 *    - AsyncStorage를 사용해 사용자가 선택한 센터 ID를 저장 및 관리.
 *    - 재사용 컴포넌트 참고
 * 
 * 4. **주요 로직**:
 *    - **센터 목록 및 ID 관리**:
 *      - `centerList`와 `centerId`를 Recoil 상태로 관리.
 *      - AsyncStorage를 활용하여 선택된 센터 ID를 저장하고 복구.
 *    - **센터 선택**:
 *      - `RNPickerSelect`를 사용하여 센터 선택 UI 구현.
 *      - iOS와 Android에서 각각 다른 UI 제공.
 *    - **선택한 센터 업데이트**:
 *      - `handleDonePress`: 선택한 센터를 업데이트하고 AsyncStorage에 저장.
 *      - `onCenterChange`: 선택된 센터에 따라 Recoil 상태 및 목록 업데이트.
 *
 * 5. **주요 기능**:
 *    - **센터 목록 표시**:
 *      - 센터 목록이 없을 경우 "연동된 센터가 없습니다" 메시지 표시.
 *    - **센터 선택**:
 *      - `RNPickerSelect`를 사용하여 드롭다운 방식으로 센터 선택 가능.
 *    - **플랫폼별 UI 제공**:
 *      - iOS와 Android에서 각각 다른 스타일로 드롭다운 렌더링.
 *    - **AsyncStorage 사용**:
 *      - 선택된 센터 ID를 저장 및 복구하여 지속적인 사용자 경험 제공.
 *
 * 6. **주요 상태 및 로직**:
 *    - **상태**:
 *      - `centerList`: 현재 사용자가 접근 가능한 센터 목록.
 *      - `centerId`: 현재 선택된 센터 ID.
 *      - `selectedCenterId`: 드롭다운에서 임시로 선택한 센터 ID.
 *    - **로직**:
 *      - `handleDonePress`: 선택된 센터 업데이트 및 AsyncStorage에 저장.
 *      - `onCenterChange`: Android에서 센터 변경 시 호출되는 콜백.
 *
 */

import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useRecoilState } from 'recoil';
import { centerListState,centerIdState,selectedCenterIdState } from '../../store/atom';
import UseGetCenterListHook from '../../hooks/UseGetCenterListHook';
import RNPickerSelect from 'react-native-picker-select';
import {useRef,useEffect,useCallback,useState} from 'react';
import { getCenterList } from '../../api/trainersApi';
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
function CenterListHeaderGrid() {

    UseGetCenterListHook();
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const rightIcon = require('../../assets/img/caretdown.png');
    // console.log('centerId@@@@@11',centerId)
    const [selectedCenterId, setSelectedCenterId] = useRecoilState(selectedCenterIdState);
    const startPickerRef = useRef();

    useEffect(() => {
        if (centerList.length === 0) {
            setCenterId(null);
        } else if(centerList.length ===1){
            setCenterId(centerList[0].id);
        }
      }
      , [centerList]);
    console.log('centerId',centerId)

    useEffect(() => {
        // centerId가 변경될 때마다 selectedCenterId를 업데이트
        setSelectedCenterId(centerId);
    }, [centerId, setSelectedCenterId]);

    const openStartPicker = () => {
        startPickerRef.current?.togglePicker(true);
    };


    const transformedState = (centerList || []).map(item => ({
        label: item.name,
        value: item.id,
    }));


    const handleValueChange = (value) => {
        setSelectedCenterId(value);
    }

    const handleClose = () => {
        setSelectedCenterId(centerId);
    }


    // const handleDonePress = async() => {
    //    const selectCenter = centerList.find(center => center.id === selectedCenterId);
    //    if(selectCenter){
    //        setCenterId(selectedCenterId);
    //     //    saveCenterId(selectedCenterId);
    //        setSelectedCenterId(selectedCenterId);
    //        setCenterList([selectCenter, ...centerList.filter(center => center.id !== selectedCenterId)]);
    //    }else{
    //        setSelectedCenterId(centerId);
    //    }

    // }
    const handleDonePress = async () => {
        const selectCenter = centerList.find(center => center.id === selectedCenterId);
        if (selectCenter) {
            setCenterId(selectedCenterId);
            await AsyncStorage.setItem('centerId', selectedCenterId); 
            const test = await AsyncStorage.getItem('centerId');
            console.log('test3213123',test)
            setSelectedCenterId(selectedCenterId); 
            const sortedCenterList = [...centerList.filter(center => center.id !== selectedCenterId), selectCenter].sort((a, b) => a.name.localeCompare(b.name));
            setCenterList(sortedCenterList);
        } else {
            setSelectedCenterId(centerId); // 선택 취소 시 원래 센터 ID로 복귀
        }
    };
    

    const onCenterChange = useCallback(async(id) => {
        console.log('v뭐로',id)
        if (id !== centerId) { // 변경된 경우에만 업데이트
            await AsyncStorage.setItem('centerId', id);
            setCenterId(id);
            setSelectedCenterId(id);
            // saveCenterId(id); 

            const selectedCenter = centerList.find(center => center.id === id);
            const otherCenters = centerList.filter(center => center.id !== id);
            // setCenterList([selectedCenter, ...otherCenters]);
            setCenterList([selectedCenter, ...otherCenters].sort((a, b) => a.name.localeCompare(b.name)));
        }
    }, [centerId, centerList, setCenterId, setCenterList]);

    useEffect(() => {
        startPickerRef.current?.forceUpdate();
      }, [centerId]);
      

    return (
        <>
        {
           !centerList || centerList?.length === 0 ? (
            <CenterListHeaderContainer>
                <CenterListText>연동된 센터가 없습니다</CenterListText>
            </CenterListHeaderContainer>
            ):(
                
                    Platform.OS === 'ios' ? (
                        <CenterListHeaderContainerBtn onPress={openStartPicker}>
                        <RNPickerSelect
                              ref={startPickerRef}
                              value={selectedCenterId||centerId}
                              onValueChange={handleValueChange}
                              onDonePress={handleDonePress}
                              onClose={handleClose}
                              doneText="변경"
                              items={transformedState}
                              textInputProps={{ underlineColorAndroid: 'transparent'}}
                              useNativeAndroidPickerStyle={false}
                              fixAndroidTouchableBug={true}
                              placeholder={{}}
                              style={{ inputIOS: { paddingVertical:10, color: COLORS.sub, fontSize:22, fontWeight:'bold', lineHeight:26 }, 
                                   }}/>
                      <RigthIcon source={rightIcon}/>
                    </CenterListHeaderContainerBtn>
                    ):(
                    <CenterAndroidBtn>
                        <RNPickerSelect
                              value={centerId}
                              onValueChange={(centerId) => onCenterChange(centerId)}
                              items={transformedState}
                              textInputProps={{ underlineColorAndroid: 'transparent'}}
                              useNativeAndroidPickerStyle={false}
                              fixAndroidTouchableBug={true}
                              placeholder={{}}
                              Icon={() => {
                                    return <RigthIcon resizeMode='contain' source={rightIcon}/>
                                }}
                              style={
                                { 
                              inputAndroid: 
                              {  
                              fontSize: 20,
                              fontWeight: 'bold',
                              height: 50, 
                              color: '#000000',
                              padding:10,
                            //   width: 150,
                            //   backgroundColor:'red',
                            marginRight: 12,
                              }, 
                              iconContainer: {
                                top:16,
                              },
                              placeholder: { 
                                color: COLORS.sub
                                 }
                              }}/>
                         </CenterAndroidBtn>
                    )
            )
        }
        </>
    );
}

export default CenterListHeaderGrid;

const CenterListHeaderContainer = styled.View``
const CenterAndroidBtn = styled.View`
width:auto;
`
const CenterListHeaderContainerBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const CenterListText = styled.Text`
font-size: 20px;
color: ${COLORS.sub}; 
font-weight: 600;
line-height: 28px;
`


const RigthIcon = styled(FastImage)`
    width: 20px;
    height: 20px;
    margin-left:4px;
`