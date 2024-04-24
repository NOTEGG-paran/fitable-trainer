import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {getMemberConditions} from '../../api/memberApi';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';
function MemberTicketSelectCard({ticketId,bookmarkTickets,
    setFormData,selectedTicket, timeAndPeriod, setTimeAndPeriod,index,setSelectTicketId}) {
    // const {startDate=""}=state ||{};
    const rightIcon = require('../../assets/img/caretdownblack.png');
    const screenWidth = Dimensions.get('window').width-92;
    const [currentTicketId, setCurrentTicketId] = useState(ticketId[index].id);
    const [periodType, setPeriodType] = useState('MONTH'); 
    const pickerRef = useRef();
    const secPickerRef = useRef();
    const trPickerRef = useRef();

    const openPicker = () => {
        pickerRef.current?.togglePicker(true);
      };

    const openSecPicker = () => {
        secPickerRef.current?.togglePicker(true);
    };

    const openTrPicker = () => {
        trPickerRef.current?.togglePicker(true);
    };


      const transformedBookmarkTickets = bookmarkTickets.map(ticket => ({
        label: ticket.name,
        value: ticket.id,
      }));

      const transformedTimeAndPeriodTickets = timeAndPeriod.map(ticket => ({
        label: ticket.limit ? `${ticket.registration}(${ticket.limit})` : `${ticket.registration}`,
        value: ticket.id,
      }));
  
    // console.log('timeSettings',timeSettings)
    const changeTicketId = (index, newId) => {
        // console.log('newId',newId,index)
        const newTicket = bookmarkTickets.find(ticket => ticket.id === newId);
    
        if (newTicket) {
            setSelectTicketId(prevIds => prevIds.map((ticket, i) => {
                if (i === index) {
                    return newTicket;
                }
                return ticket;
            }));
        }
        getMemberConditionsData(newId);
      };
      
      const getMemberConditionsData = async (id) => {
        try {
          const response = await getMemberConditions(id);
        //   console.log('response1123',response)
          if (response) {
            setTimeAndPeriod(response);        
            }
        } catch (error) {
          console.log('error',error);
        }
      }

      useEffect(() => {
        // 초기 호출인 경우 selectTicketId[index].id 값을 사용하고,
        // 그 이후 호출인 경우 newId 값을 사용
        if (ticketId[index].id !== undefined) {
            getMemberConditionsData(ticketId[index].id);
        } else {
            getMemberConditionsData(newId);
        }
    }, [ticketId[index].id]);

    const periodTypeItem = [
        {
            label: '개월',
            value: 'MONTH',
        },
        {
            label: '일',
            value: 'DAY',
        },
    ]


    return (
        <>
        <Container>
            <InfoTitleText>이용권</InfoTitleText>

            {
                Platform.OS === 'ios' ? (
                    <SelectBox onPress={openPicker}>
                    <RNPickerSelect
                      ref={pickerRef}
                      textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        doneText="변경"
                        value={ticketId[index].id}
                        onValueChange={(newId) => changeTicketId(index, newId)}
                        items={transformedBookmarkTickets}
                        placeholder={{}}
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
                        value={ticketId[index].id}
                        onValueChange={(newId) => changeTicketId(index, newId)}
                        items={transformedBookmarkTickets}
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

          
        </Container>

        <Container>
             <InfoTitleText>기간 & 횟수</InfoTitleText>
             {
                Platform.OS === 'ios' ? (
                    <SelectBoxDivider onPress={openSecPicker}>
                    <RNPickerSelect
                      ref={secPickerRef}
                      textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        doneText="변경"
                        value={currentTicketId}
                        onValueChange={(value) => {
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].id = value;
                                return {...prevData, tickets};
                            });
                            setCurrentTicketId(value);
                        }}
                        items={transformedTimeAndPeriodTickets}
                        placeholder={{}}
                        style={{ inputIOS: { color: 'black' }, }}
                         />
                <RigthIcon 
                  resizeMode='contain'
                source={rightIcon}/>
             </SelectBoxDivider>
                ):(
                  <AndSelectBox>
                    <RNPickerSelect
                      textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        doneText="변경"
                        value={currentTicketId}
                        onValueChange={(value) => {
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].id = value;
                                return {...prevData, tickets};
                            });
                            setCurrentTicketId(value);
                        }}
                        items={transformedTimeAndPeriodTickets}
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
                          height: 60, 
                          color: '#000000',
                        //   borderColor: COLORS.gray_100, 
                        backgroundColor: COLORS.gray_100, 
                        borderColor: COLORS.gray_100, 
                        borderWidth: 1, 
                        borderRadius: 12,
                        padding: 10,
                          }, 
                          iconContainer: {
                            top: 24,
                            right:12,
                          },
                          placeholder: { 
                            color: COLORS.sub
                             }
                          }}/>
                          </AndSelectBox>
                       
                )
             }
           
        </Container>


        <Container>
        <InfoTitleText>횟수 변경</InfoTitleText>
                    <CountTextInput 
                    keyboardType='numeric'
                    placeholder="횟수"
                    onChangeText={(text) => {
                        setFormData((prevData) => {
                            let tickets = [...prevData.tickets];
                            tickets[index].time = text;
                            return {...prevData, tickets};
                        });
                    }}
                    />
        </Container>



        <Container>
        <InfoTitleText>기간 변경</InfoTitleText>

                    <SelectInnerSecondBox>
                    
                            <CountDateTextInput
                             keyboardType='numeric'
                             placeholder="0"
                             onChangeText={(text) => {
                                 setFormData((prevData) => {
                                     let tickets = [...prevData.tickets];
                                     tickets[index].period = text;
                                     return {...prevData, tickets};
                                 });
                             }}
                            />
               

            {
                 Platform.OS === 'ios' ? (
                    <SelectTextInputSecondContainer onPress={openTrPicker}>
                    <RNPickerSelect
                        ref={trPickerRef}
                        doneText="변경"
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        onValueChange={(value) => {
                           setPeriodType(value);
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].periodType = value;
                                return {...prevData, tickets};
                            });
                        }}
                        items={periodTypeItem}
                        // placeholder={{
                        //     label: '개월/일',
                        //     value: null,
                        // }}
                        placeholder={{}}
                        value={periodType}
                        style={{ inputIOS: { color: 'black' }}}/>
                        <RigthIcon 
                          resizeMode='contain'
                        source={rightIcon}/>
             </SelectTextInputSecondContainer>
                 ):(

                    <RNPickerSelect
                        // ref={trPickerRef}
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        onValueChange={(value) => {
                            setPeriodType(value);
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].periodType = value;
                                return {...prevData, tickets};
                            });
                        }}
                        items={periodTypeItem}
                        // placeholder={{
                        //     label: '개월/일',
                        //     value: null,
                        // }}
                        placeholder={{}}
                        value={periodType}
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
                          width:100, 
                          color: '#000000',
                          borderColor: COLORS.gray_100, 
                          backgroundColor: COLORS.gray_100,
                          borderWidth: 1, 
                          borderRadius: 12,
                          padding: 10,
                          marginLeft: 10
                          }, 
                          iconContainer: {
                            top: 24,
                            right:12,
                          },
                          placeholder: { 
                            color: COLORS.sub
                             }
                          }}/>
                     
                 )
            }
           
                </SelectInnerSecondBox>
        </Container>
        </>
    );
}

export default MemberTicketSelectCard;


const Container = styled.View`
margin-bottom: 26px;
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

const AndSelectBox = styled.View`
width: 50%;
    /* flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 0 16px;
    background-color: ${COLORS.gray_100}; */
`

const SelectBoxDivider = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
    width: 50%;
`

const AndSelectBoxDivider = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 0 16px;
    background-color: ${COLORS.gray_100};
    width: 50%;
`


const SelectTextInputSecondContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
    width: 48%;
`


const SelectInnerSecondBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 50%;
`

const RigthIcon = styled(FastImage)`
width: 14px;
height: 14px;
`

const CountTextInput = styled.TextInput`
    text-align: right;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
    width: 50%;
`

const CountDateTextInput = styled.TextInput`
    text-align: right;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
    width: 48%;
`