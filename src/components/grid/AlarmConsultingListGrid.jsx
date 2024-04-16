import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { ScrollView , Alert} from 'react-native';
import {getConsultDetail} from '../../api/alarmApi';
import { useNavigation } from '@react-navigation/native';
import NoListCard from '../card/NoListCard';
import FastImage from 'react-native-fast-image';
function AlarmConsultingListGrid({consultingList}) {

    const navigation = useNavigation();

    const consultIcon = require('../../assets/img/alarm.png');

    const detailConsultScreen = async(id) => {
        console.log('상세 id확인 path',id)
        try{
            const response = await getConsultDetail(id);
            if(response){
                navigation.navigate('ConsultDetail', {consultDetail: response});
            }
        }catch(error){
            console.log('error 뜸 ㅠ22ㅠ')
        }
    }

    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} overScrollMode="never">
      <Container>
        {consultingList && consultingList.length > 0 ? (
          consultingList.map((item) => (
            <DateGroup key={item.date}>
              <DateText>{item.date}</DateText>
              {item.alarms.map((alarm) => (
                <AlarmItem key={alarm.id} onPress={() => detailConsultScreen(alarm.path)}>
                  <ConsultIcon source={consultIcon} />
                  <ContentsBoxContainer>
                    <ContentsContainer>
                      <TitleText>상담 신청</TitleText>
                      <TimeText>{alarm.time}</TimeText>
                    </ContentsContainer>
                    <AlarmText>{alarm.context}</AlarmText>
                  </ContentsBoxContainer>
                </AlarmItem>
              ))}
            </DateGroup>
          ))
        ) : (
          <NoListCardContainer>
          <NoListCard>상담 내역이 없습니다.</NoListCard>
          </NoListCardContainer>
        )}
      </Container>
    </ScrollView>
  );
}

export default AlarmConsultingListGrid;

const Container = styled.View`
  /* padding: 10px; */
  margin-top: 10px;
`;

const DateGroup = styled.View`
  margin-bottom: 20px;
`;

const DateText = styled.Text`
font-size: 20px;
color: ${COLORS.sub};
font-weight: 700;
line-height: 30px;
margin-bottom: 10px;
`;

const AlarmItem = styled.TouchableOpacity`
display: flex;
flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.gray_100};
  padding: 15px 0;
`;

const ContentsContainer = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`

const ContentsBoxContainer = styled.View`
margin-left: 20px;
flex: 1;
`

const TitleText = styled.Text`
  color: ${COLORS.sub};
  font-size: 16px;
font-weight: 600;
line-height: 22.40px;
margin-bottom: 8px;
  `

const AlarmText = styled.Text`
  color: ${COLORS.gray_400};
  font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`;

const TimeText = styled.Text`
  color: ${COLORS.gray_300};
  font-size: 12px;
font-weight: 400;
`;

const ConsultIcon = styled(FastImage)`
  width: 48px;
  height: 48px;
`

const NoListCardContainer = styled(FastImage)`
  height: 300px;
`