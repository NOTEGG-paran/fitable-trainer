import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { centerIdState } from '../../store/atom';
import { useRecoilState } from 'recoil';
import {getMemberCoupons} from '../../api/memberApi';
import FastImage from 'react-native-fast-image';
import { Dimensions,Platform } from 'react-native';
function PaymentGridCard({setFormData,type,index,timeAndPeriod,memberId,formData}) {
    // const {startDate=""}=state ||{};
    const screenWidth = Dimensions.get('window').width-92;
    const rightIcon = require('../../assets/img/caretdownblack.png');
    const [timeAndPeriodStr, setTimeAndPeriodStr] = useState(String(timeAndPeriod));
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [couponList, setCouponList] = useState([]);

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const inputRef = useRef();
    useEffect(() => {
    setTimeAndPeriodStr(String(timeAndPeriod));
}, [timeAndPeriod]);

// console.log('type',type)
    const pickerRef = useRef();
    const couponRef = useRef();
    const openPicker = () => {
        pickerRef.current?.togglePicker(true);
      };

    const openCouponPicker = () => {
        couponRef.current?.togglePicker(true);
    };


    const getCouponList = async (id, memberId) => {
        try{
            const response = await getMemberCoupons({id, memberId});
            console.log('response@@!@#1', response.coupons)
            if(response && response.coupons && response.coupons.length > 0){
                setCouponList(response.coupons);
            }
        }catch(error){
            console.log('error@@', error)
        }
    }
    

const transformedCouponTickets = couponList && couponList.length > 0 ? couponList.map((ticket) => ({
    label: ticket?.centerName,
    value: ticket?.id,
})) : [];



useEffect(() => {
    if(type === 'paylink' && centerId && memberId){
        getCouponList(centerId, memberId);
    }
}, [centerId, memberId,type])


    const paymentTypeItem = [
        {
            label: '카드',
            value: 'CARD',
        },
        {
            label: '현금',
            value: 'CASH',
        },
        {
            label: '계좌이체',
            value: 'BANK_TRANSFER',
        },
        {
            label: '결제링크',
            value: 'PAYMENT_LINK',
        },
    ]
console.log('formData.tickets[index].paymentType ',formData.tickets[index].paymentType )
    return (
        <>
        {
        type && type && (
            <Container>
            <InfoTitleText>쿠폰(선택)</InfoTitleText>
            {
                Platform.OS === 'ios' ? (
                    <SelectBox onPress={openCouponPicker}>
                    <RNPickerSelect
                        ref={couponRef}
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        doneText="변경"
                        onValueChange={(value) => {
                            if (value !== undefined) {
                                setFormData((prevData) => {
                                    let tickets = [...prevData.tickets];
                                    tickets[index].couponId = value;
                                    return {...prevData, tickets};
                                });
                            }
                        }}
                        items={transformedCouponTickets}
                        placeholder={{
                            label: '쿠폰을 선택해주세요',
                            
                        }}
                        style={{ inputIOS: { color: 'black' }, 
                        inputAndroid: {
                            color: 'black',
                            height: 20,
                            padding:0,
                            margin:0,
                             } }}/>
                <RigthIcon   
                tintColor={!!formData.tickets[index].couponId ? COLORS.sub : COLORS.gray_300}
                resizeMode='contain'
                source={rightIcon}/>
             </SelectBox>
                ):(
                    <AndSelectBox>
                    <RNPickerSelect
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        doneText="변경"
                        onValueChange={(value) => {
                            if (value !== undefined) {
                                setFormData((prevData) => {
                                    let tickets = [...prevData.tickets];
                                    tickets[index].couponId = value;
                                    return {...prevData, tickets};
                                });
                            }
                        }}
                        items={transformedCouponTickets}
                        placeholder={{
                            label: '쿠폰을 선택해주세요',
                            
                        }}
                        Icon={() => {
                           
                            return <RigthIcon
                            resizeMode='contain'
                            source={rightIcon}
                            tintColor={!!formData.tickets[index].couponId ? COLORS.sub : COLORS.gray_300}/>
                            }
                          }
                          style={
                            { 
                          inputAndroid: 
                          {  
                          fontSize: 16,
                          height: 60, 
                          color: '#000000',
                          borderColor: COLORS.gray_100, 
                          backgroundColor: COLORS.gray_100,
                          borderWidth: 1, 
                          borderRadius: 12,
                          padding: 10
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
                </AndSelectBox>
                )
            }
            
        </Container>
        )
        }

        <Container>
            <InfoTitleText>결제수단</InfoTitleText>
            {
                 Platform.OS === 'ios' ? (
                    <SelectBox onPress={openPicker}>
                    <RNPickerSelect
                        ref={pickerRef}
                        doneText="변경"
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                        disabled={type === 'paylink' ? true : false}
                        onValueChange={(value) => {
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].paymentType = value;
                                return {...prevData, tickets};
                            });
                        }}
                        items={paymentTypeItem}
                        placeholder={{
                            label: type === 'paylink' ? '결제링크' : '결제수단을 선택해주세요',
                            value: null,
                        }}
                        style={{ inputIOS: { color: 'black' }, 
                        inputAndroid: { 
                            color: 'black',
                            height: 20,
                            padding:0,
                            margin:0,
                            } }}/>
                <RigthIcon 
                    tintColor={type === 'paylink' ? COLORS.gray_300 : (!!formData.tickets[index].paymentType ? COLORS.sub : COLORS.gray_300)}
                  resizeMode='contain'
                source={rightIcon}/>
             </SelectBox>
                 ):(
                   <AndSelectBox>
                    <RNPickerSelect
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                        disabled={type === 'paylink' ? true : false}
                        onValueChange={(value) => {
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].paymentType = value;
                                return {...prevData, tickets};
                            });
                        }}
                        items={paymentTypeItem}
                        placeholder={{
                            label: type === 'paylink' ? '결제링크' : '결제수단을 선택해주세요',
                            value: null,
                        }}
                        Icon={() => {
                            return <RigthIcon 
                            resizeMode='contain'
                            source={rightIcon}
                            tintColor={type === 'paylink' ? COLORS.gray_300 : (!!formData.tickets[index].paymentType ? COLORS.sub : COLORS.gray_300)}/>
                            }
                          }
                          style={
                            { 
                          inputAndroid: 
                          {  
                          fontSize: 16,
                          height: 60, 
                          color: '#000000',
                          borderColor: COLORS.gray_100, 
                          backgroundColor: COLORS.gray_100,
                          borderWidth: 1, 
                          borderRadius: 12,
                          padding: 10
                          }, 
                          iconContainer: {
                            top: 24,
                            right: 12,
                          },
                          placeholder: { 
                            color: COLORS.sub
                             }
                          }}/>
                         
              </AndSelectBox>
                 )
            }
           
        </Container>

        <Container isFocused={isFocused}>
            <PriceContainer
                paylink={type === 'paylink' ? true : false}
            >

             <PriceInnerContainer paylink={type === 'paylink' ? true : false}>
            <InfoTitleText>상품 가격</InfoTitleText>
            <FirstPriceTextInput
           value={`${timeAndPeriodStr}원`}
            disabled={true}
            />
            </PriceInnerContainer>           

            <PriceInnerContainer>
            <InfoTitleText>판매 금액</InfoTitleText>
            <CountTextInputContainer>

            <PriceTextInput 
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="0" keyboardType="number-pad" 
            onChangeText={(text) => {
                setFormData((prevData) => {
                    let tickets = [...prevData.tickets];
                    tickets[index].salePrice = text;
                    return {...prevData, tickets};
                });
            }}
            />
            <PriceLabel isActive={!!formData.tickets[index].salePrice}>원</PriceLabel>
            </CountTextInputContainer>
            </PriceInnerContainer>

{
    type === 'paylink' ? (
        null
    ):(
        <PriceInnerContainer>
        <InfoTitleText>받은 금액</InfoTitleText>
        <CountTextInputContainer>
        <PriceTextInput 
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="0" keyboardType="number-pad" 
        onChangeText={(text) => {
            setFormData((prevData) => {
                let tickets = [...prevData.tickets];
                tickets[index].receivedPrice = text;
                return {...prevData, tickets};
            });
        }}
        />
         <PriceLabel isActive={!!formData.tickets[index].receivedPrice}>원</PriceLabel>
        </CountTextInputContainer>
        </PriceInnerContainer>
    )
}
           
            </PriceContainer>
        </Container>
    
        </>
    );
}

export default PaymentGridCard;


const Container = styled.View`
margin-bottom: ${props => props.isFocused && Platform.OS ==='android' ? '120px' : '26px'};
`;

const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-family: Pretendard;
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

`

const PriceContainer = styled.View`
    flex-direction: row;
    justify-content: ${props => props.paylink ? '' : 'space-between'};

`

const PriceInnerContainer = styled.View`
    flex-direction: column;
    width: 32%;
    margin-right: ${props => props.paylink ? '8px' : ''};
`
const CountTextInputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
      color: ${COLORS.sub};
      font-weight: 400;
      border: 1px solid ${COLORS.gray_100};
      background-color: ${COLORS.gray_100};
      border-radius: 13px;
      /* padding: 15px 16px; */
      padding: ${Platform.OS === 'ios' ? '15px 16px' : '4px 16px'};
      margin-bottom: 8px;
      text-align: right;
`;

const RigthIcon = styled(FastImage)`
width: 14px;
height: 14px;
`

const PriceLabel = styled.Text`
    font-size: 16px;
    color: ${(props) => props.isActive ? COLORS.sub : COLORS.gray_300};
`;

const FirstPriceTextInput = styled.TextInput.attrs(props => ({
    editable: !props.disabled,
    placeholderTextColor: props.disabled ? COLORS.sub : COLORS.gray_300,
  }))`
        font-size: 16px;
      color: ${COLORS.gray_300};
      font-weight: 400;
      border: 1px solid ${COLORS.gray_100};
      background-color: ${COLORS.gray_100};
      border-radius: 13px;
      /* padding: 15px 16px; */
      padding: ${Platform.OS === 'ios' ? '15px 16px' : '15px 16px'};
      margin-bottom: 8px;
      text-align: right;
  `

const PriceTextInput = styled.TextInput.attrs(props => ({
    editable: !props.disabled,
    placeholderTextColor: props.disabled ? COLORS.sub : COLORS.gray_300,
  }))`
        flex:1;
         width: 100%;
        font-size: 16px;
        text-align: right;
  `
  