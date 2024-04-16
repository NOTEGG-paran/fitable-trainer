import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
function ProfileSelectDateCard({timeSettingId, timeSettings, changeType ,index}) {
    // const {startDate=""}=state ||{}; 40 32 
    const rightIcon = require('../../assets/img/colsdowngray.png');
    const screenWidth = Dimensions.get('window').width-88;
    const [selectedValue, setSelectedValue] = useState(timeSettings?.type || '');

    const handleChangeValue = (value) => {
      setSelectedValue(value);
      changeType(timeSettingId, value, index);
  };
    const pickerRef = useRef();
    const openPicker = () => {
        pickerRef.current?.togglePicker(true);
      };
    const items = [{
        label: '평일',
        value: '평일',
      }, {
        label: '주말',
        value: '주말',
      }];

  
    // console.log('timeSettings',timeSettings)


    return (
        <>
        <Container>
          {
                Platform.OS === 'ios' ? (
                  <SelectBox onPress={openPicker}>
                  <SelectInnerBox>
                      <RNPickerSelect
                        ref={pickerRef}
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                        // InputAccessoryView={() => null}
                        doneText='확인'
                          onValueChange={(value) => handleChangeValue(value)}
                          items={items}
                          placeholder={{}}
                          style={{ inputIOS: { color: 'black' }, 
                          inputAndroid: { 
                            color: 'black',
                            height: 20,
                            padding:0,
                            margin:0,
                             } }}/>
                  </SelectInnerBox>
                  <RigthIcon source={rightIcon}/>
               </SelectBox>
                ):(
                  <AndSelectBox>
          
                      <RNPickerSelect
                        ref={pickerRef}
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                        // InputAccessoryView={() => null}
                        doneText='확인'
                          onValueChange={(value) => handleChangeValue(value)}
                          items={items}
                          placeholder={{}}
                          Icon={() => {
                            return <RigthIcon 
                            resizeMode='contain'
                            source={rightIcon}/>;
                            }
                          }
                          style={
                            { 
                          inputAndroid: 
                          {  
                          fontSize: 16,
                          height: 50, 
                          color: '#000000',
                          borderColor: COLORS.gray_200, 
                          }, 
                          iconContainer: {
                            top: 14,
                          },
                          placeholder: { 
                            color: COLORS.sub
                             }
                          }}/>
            
              
                  </AndSelectBox>
                )
          }
           
        </Container>
        </>
    );
}

export default ProfileSelectDateCard;


const Container = styled.View`
margin-bottom: 8px;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 15px 16px;
`

const AndSelectBox = styled.View`
    
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 0 16px;
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

const RigthIcon = styled(FastImage)`
width: 20px;
height: 20px;
`

const LeftIcon = styled(FastImage)`
margin-right:11px;
width: 20px;
height: 20px;
`
