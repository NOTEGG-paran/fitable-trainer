import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { startTime, endTime } from '../../data/selectDate';
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';
function TimeSelectCard({children, imgIcon, text,onTimeChange }) {

    // const {startTime,endTime}=state
    // console.log('state',state)
    const rightIcon = require('../../assets/img/colsdowngray.png');

    const startPickerRef = useRef();
    const endPickerRef = useRef();

    const openStartPicker = () => {
        startPickerRef.current?.togglePicker(true);
    };

    const openEndPicker = () => {
        endPickerRef.current?.togglePicker(true);
    };

    const handleTimeChange = (newTime, timeType) => {
        console.log(newTime);
        onTimeChange(newTime, timeType);
      };


    return (
        <Container>
            {
                text ==='profile' ? null : <LabelText>{children}</LabelText>
            }
        <SelectBoxGrid>
            {
                Platform.OS === 'ios' ? (
                    <SelectBox onPress={openStartPicker}>
                    <SelectInnerBox>
                        {
                            imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
                        }
                        {
                            text ==='profile' ?
                            (
                            <RNPickerSelect
                              ref={startPickerRef}
                              textInputProps={{ underlineColorAndroid: 'transparent'}}
                              useNativeAndroidPickerStyle={false}
                              fixAndroidTouchableBug={true}
                            //   InputAccessoryView={() => null}
                            doneText='확인'
                              onValueChange={(newTime) => handleTimeChange(newTime, 'startTime')}
                              items={startTime}
                            //   value={}
                              placeholder={{}}
                              style={{ inputIOS: { color: 'black' },
                               inputAndroid: { 
                                color: 'black',
                                height: 20,
                                padding:0,
                                margin:0,
                            } }}/>) : null
                        }
                    </SelectInnerBox>
                    <RigthIcon source={rightIcon}/>
                 </SelectBox>
                ):(
                    <SelectInnerBox>
                        {
                            text ==='profile' ?
                            (
                            <RNPickerSelect
                              ref={startPickerRef}
                              textInputProps={{ underlineColorAndroid: 'transparent'}}
                              useNativeAndroidPickerStyle={false}
                              fixAndroidTouchableBug={true}
                            //   InputAccessoryView={() => null}
                            doneText='확인'
                              onValueChange={(newTime) => handleTimeChange(newTime, 'startTime')}
                              items={startTime}
                            //   value={}
                              placeholder={{}}
                              Icon={() => {
                                return <RigthIcon source={rightIcon}/>;
                                }
                              }
                              style={
                                { 
                              inputAndroid: 
                              {  
                              fontSize: 16,
                              height: 50, 
                              width:150, 
                              color: '#000000',
                              borderColor: COLORS.gray_200, 
                              borderWidth: 1, 
                              borderRadius: 12,
                              padding: 10
                              }, 
                              iconContainer: {
                                top: 14,
                                right: 12,
                              },
                              placeholder: { 
                                color: COLORS.sub
                                 }
                              }}/>
                            ) : null
                        }
                    </SelectInnerBox>
                  
                )
            }
      
                <DividerText>~</DividerText>
                {
                    Platform.OS === 'ios' ? (
                        <SelectBox onPress={openEndPicker}>
                        <SelectInnerBox>
                            {
                                imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
                            }
                            {
                                text ==='profile' ?
                                (
                                <RNPickerSelect
                                  ref={endPickerRef}
                                //   InputAccessoryView={() => null}
                                    doneText='확인'
                                  textInputProps={{ underlineColorAndroid: 'transparent'}}
                                  useNativeAndroidPickerStyle={false}
                                  fixAndroidTouchableBug={true}
                                  onValueChange={(newTime) => handleTimeChange(newTime, 'endTime')}
                                  items={endTime}
                                //   value={}
                                  placeholder={{}}
                                  style={{ inputIOS: { color: 'black' },
                                   inputAndroid: { 
                                    color: 'black',
                                    height: 20,
                                    padding:0,
                                    margin:0,
                                } }}/>) : null
                            }
                        </SelectInnerBox>
                        <RigthIcon source={rightIcon}/>
                     </SelectBox>
                    ):(
                      
                        <SelectInnerBox>
                            {
                                text ==='profile' ?
                                (
                                <RNPickerSelect
                                  ref={endPickerRef}
                                //   InputAccessoryView={() => null}
                                    doneText='확인'
                                  textInputProps={{ underlineColorAndroid: 'transparent'}}
                                  useNativeAndroidPickerStyle={false}
                                  fixAndroidTouchableBug={true}
                                  onValueChange={(newTime) => handleTimeChange(newTime, 'endTime')}
                                  items={endTime}
                                //   value={}
                                  placeholder={{}}
                                  Icon={() => {
                                    return <RigthIcon source={rightIcon}/>;
                                    }
                                  }
                                  style={
                                    { 
                                  inputAndroid: 
                                  {  
                                  fontSize: 16,
                                  height: 50, 
                                  width:150, 
                                  color: '#000000',
                                  borderColor: COLORS.gray_200, 
                                  borderWidth: 1, 
                                  borderRadius: 12,
                                  padding: 10
                                  }, 
                                  iconContainer: {
                                    top: 14,
                                    right: 12,
                                  },
                                  placeholder: { 
                                    color: COLORS.sub
                                     }
                                  }}/>
                                ) : null
                            }
                        </SelectInnerBox>
                     
                    )
                }
        
         </SelectBoxGrid>
    </Container>
    );
}

export default TimeSelectCard;



         


const Container = styled.View`
margin-top: 10px;
margin-bottom: 20px;
`

const SelectBoxGrid = styled.View`
display: flex;
flex-direction: row;
align-items: center; 
justify-content: space-between;
width: 100%;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 15px 16px;
    width: 45%;
`
const DividerText = styled.Text`
font-size: 20px;
color: ${COLORS.gray_200};
font-family: Pretendard;
font-weight: 600;
line-height: 28px;
/* margin: 0 8px; */
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
width: 20px;
height: 20px;
`