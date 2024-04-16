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