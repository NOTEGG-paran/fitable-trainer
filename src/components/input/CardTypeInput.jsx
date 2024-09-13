import React ,{useRef} from 'react';
import {COLORS} from '../../constants/color';
import styled from 'styled-components/native';
import {ScrollView, Title,Platform} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FastImage from 'react-native-fast-image';

function CardTypeInput({cardName, setCardName,cardList}) {

      const rightIcon = require('../../assets/img/caretdownblack.png');

      const pickerRef = useRef();
  
      const openPicker = () => {
        console.log('dㅁㄴㅇㄹd')
          pickerRef.current?.togglePicker(true);
        };

    return (
        <InputContainer>
            <InfoTitleText>카드사(선택)</InfoTitleText>
            {
                Platform.OS === 'ios' ? (
                    <SelectBox onPress={openPicker}>
                    <RNPickerSelect
                    ref={pickerRef}
                      textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        doneText="변경"
                        value={cardName}
                        onValueChange={(value) => setCardName(value)}
                        items={cardList}
                        placeholder={{ label: "카드를 선택해주세요", value: null }}
                        style={{ inputIOS: { color: 'black' }, 
                        placeholder: { 
                            color: COLORS.sub
                             }  }}/>
                <RigthIcon 
                resizeMode='contain'
                source={rightIcon}/>
             </SelectBox>
                ):(

                    <RNPickerSelect
                      ref={pickerRef}
                      textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        doneText="변경"
                        value={cardName}
                        onValueChange={(value) => setCardName(value)}
                        items={cardList}
                        placeholder={{ label: "은행을 선택해주세요", value: null }}
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
                          height: 60, 
                          // width:screenWidth,
                          borderRadius: 13,
                          color: '#000000',
                          backgroundColor: COLORS.gray_100,
                          padding: 10,
                          }, 
                          iconContainer: {
                            top: 24,
                            right: 12,
                          },
                          placeholder: { 
                            color: COLORS.sub
                             }
                          }}
                          
                             />
                    
       
                )
            }
        </InputContainer>
    );
}

export default CardTypeInput;

const InputContainer = styled.View`
    margin-top: 18px;
`

const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-weight: 500;
 line-height: 22px;
 margin-bottom: 8px;
`;

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
`

const RigthIcon = styled(FastImage)`
width: 14px;
height: 14px;
`