import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import {formatDate} from '../../utils/CustomUtils'
import RNPickerSelect from 'react-native-picker-select';
import { useState ,useRef, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import FastImage from 'react-native-fast-image';
import { Dimensions,Platform } from 'react-native';
import { View } from 'react-native';

function CreateClassSelectCard({children,selectState, setSelectState, imgIcon, state ,setState,type,updateClassData,maindata}) {
    // const {startDate=""}=state ||{};
    console.log('Render CreateClassSelectCard11:', type,maindata);
    const rightIcon = require('../../assets/img/colsdowngray.png');
    // console.log('state@',type,maindata)
    const screenWidth = Dimensions.get('window').width-80;

    const transformedState = (state || []).map(item => ({
        label: item.name,
        value: item.id,
    }));
    
    useEffect(() => {
        console.log('state@',type,maindata)
    }, [maindata]);


    const pickerRef = useRef();

    const openStartPicker = () => {
        pickerRef.current?.togglePicker(true);
    };


    

    return (
        <Container>
            <LabelText>{children}</LabelText>


            {
                 Platform.OS === 'ios' ? (
                    <SelectBox onPress={openStartPicker}>
                    <SelectInnerBox>
                        {
                            imgIcon && imgIcon && (<LeftIcon source={imgIcon}
                            tintColor={selectState? COLORS.sub : COLORS.gray_300}
                            />)
                        }
                        {(
                             <RNPickerSelect
                             ref={pickerRef}
                            //  InputAccessoryView={() => null}
                            doneText='확인'
                             onValueChange={(value) => {
                                setSelectState(value);
                                const selectedLabel = transformedState.find(item => item.value === value)?.label;
                                if(type === 'item'){
                                    setState(value);
                                    updateClassData();
                                    return;
                                }else{
                                    setState(selectedLabel);
                                    updateClassData();
                                }
                              }}
                             value={selectState}
                             items={transformedState}
                             textInputProps={{ underlineColorAndroid: 'transparent'}}
                             useNativeAndroidPickerStyle={false}
                             fixAndroidTouchableBug={true}
                             placeholder={{
                                    label: type ==='name' ? '수업명을 선택해주세요' :
                                           type ==='item' ? '수업 종목을 선택해주세요' :
                                           type ==='location' ? '수업장소를 선택해주세요' :'',
                                    value: null,
                             }}
                             style={{ inputIOS: { color: 'black' }, 
                             inputAndroid: { 
                                color: 'black',
                                height: 20,
                                padding:0,
                                margin:0,
                             } }}/>)
                        }
                    </SelectInnerBox>
                    <RigthIcon 
                    resizeMode='contain'
                    source={rightIcon}
                    tintColor={selectState? COLORS.sub : COLORS.gray_300}
                    />
                 </SelectBox>
                 ):(
                    <View style={{
                        flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between',borderRadius: 13,  borderWidth: 1, borderColor: COLORS.gray_200,  height: 50,
                    }}>
                    {/* <SelectInnerBox> */}
                        {
                            imgIcon && imgIcon && (<LeftIcon source={imgIcon}
                                tintColor={selectState? COLORS.sub : COLORS.gray_300}
                            />)
                        }
                        {(
                             <RNPickerSelect
                             onValueChange={(value) => {
                                const selectedLabel = transformedState.find(item => item.value === value)?.label;
                                if(type === 'item'){
                                    setState(value);
                                    updateClassData();
                                    return;
                                }else{
                                    setState(selectedLabel);
                                    updateClassData();
                                }
                              }}
                             items={transformedState}
                             textInputProps={{ underlineColorAndroid: 'transparent'}}
                             useNativeAndroidPickerStyle={false}
                             fixAndroidTouchableBug={true}
                             placeholder={{
                                    label: type ==='name' ? '수업명을 선택해주세요' :
                                           type ==='item' ? '수업 종목을 선택해주세요' :
                                           type ==='location' ? '수업장소를 선택해주세요' :'',
                                    value: null,
                             }}
                             Icon={() => {
                                return <RigthIcon 
                                resizeMode='contain'
                                source={rightIcon}
                                tintColor={selectState? COLORS.sub : COLORS.gray_300}
                                />;
                                }
                              }
                
                              style={{
                              inputAndroid: 
                              {  
                              fontSize: 16,
                              color: '#000000',
                            //   backgroundColor:'red',
                              width: screenWidth,
                              }, 
                             
                              iconContainer: {
                                top: 14,
                                right: 20,
                              },
                              }}
                              />
                             )
                        }
                    {/* </SelectInnerBox> */}
                    </View>
             
                 )
            }

        </Container>
    );
}

export default CreateClassSelectCard;


const Container = styled.View`
margin-top: 10px;
margin-bottom: 20px;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 15px 16px;
`

const AndroidSelectBox = styled.View`
    /* width: 100%; */
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 0 16px;
    flex:1;
`

const SelectInnerBox = styled.View`
flex-direction: row;
align-items: center;
`

const SelectBoxText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_300};
font-weight: 400;
line-height: 22.40px;
`

const LabelText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_400};
margin-bottom: 12px;
`

const RigthIcon = styled(FastImage)`
width: 20px;
height: 20px;
`

const LeftIcon = styled(FastImage)`
margin-right:11px;
margin-left: ${Platform.OS === 'ios' ? '0px' : '12px'};
width: 20px;
height: 20px;
`