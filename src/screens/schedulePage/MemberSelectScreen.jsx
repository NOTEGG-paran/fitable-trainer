import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { SelectContainer } from '../../style/gridStyled';
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { FlatList,Alert } from 'react-native';
import {formatPhoneNumber} from '../../utils/CustomUtils';
import {postLessonReservation} from '../../api/lessonApi';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';
function MemberSelectScreen(props) {
    const route = useRoute();
    const { selectData, routerType, lessonId } = route.params;
    const navigation = useNavigation();
    const [selectedMember, setSelectedMember] = useState(null);
    const goBack = () => {
        navigation.goBack();
    }


    const reservationBtn = async(lessonId,memberTicketId) => {
        if(routerType ==='ableclass'){
            console.log('callll123123')
            const selected = selectData.find(member => member.memberTicketId === memberTicketId);
            setSelectedMember(selected);
            navigation.navigate('CreateClass', { selectedMember: selected, type:'PERSONAL' });
        }else if(routerType ==='class'){
            console.log('callll')
        }else{
            console.log('id값확인',memberTicketId,lessonId)
            try{
                const response = await postLessonReservation({lessonId,memberTicketId});
                console.log('res등록확인!',response)
                if(response){
                    Alert.alert(
                        "회원 선택",
                        "참가회원을 선택하셨습니다",
                        [
                          { text: "확인", onPress: () => navigation.navigate('Schedule')}
                        ]
                      );
                }
            }catch(error){
                console.log(error)
                if(error.code === 20907){
                    Alert.alert(
                        "정원 초과",
                        "정원이 초과되었습니다.",
                        [
                          { text: "확인", onPress: () => navigation.goBack()}
                        ]
                      );
                }else if(error.code === 20608){
                    Alert.alert(
                        "몰라 20608",
                        "USE_USING_SOON_TICKET_FAILED.",
                        [
                          { text: "확인", onPress: () => navigation.goBack()}
                        ]
                      );
                }
            }
        }
    }

    const nextIcon = require('../../assets/img/rightIcon.png');

    return (
        <SelectContainer>
            <GobackGrid onPress={goBack}>회원 선택</GobackGrid>
            {
                selectData.length === 0 ? 
                <NoListContainer>
                    <NoListText>회원 목록이 없습니다</NoListText>
                </NoListContainer>
                : (
                    <>
                    <TitleText>회원 목록</TitleText>
                    <FlatList 
                    data={selectData}
                    keyExtractor={item => item.memberTicketId}
                    renderItem={({ item }) => (
                        <MemberItem onPress={()=>reservationBtn(lessonId, item.memberTicketId)}>
                            <ContentContainer>
                                {
                                   item.name === null ? <NameText>알 수 없음</NameText> : <NameText>{item.name}</NameText>
                                }
                            <PhoneText>{formatPhoneNumber(item.phone)}</PhoneText>
                            </ContentContainer>
                            <AddNextIcon source={nextIcon}/>
                        </MemberItem>
                    )}
                    />
                    </>
                )
            }
        </SelectContainer>
    );
}

export default MemberSelectScreen;

const MemberItem = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${COLORS.white};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    border-radius: 13px;
    padding: 26px 16px;
`;

const NoListContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
`

const NoListText = styled.Text`
    font-size: 16px;
    font-weight: 600;
    line-height: 22.40px;
    color: ${COLORS.gray_400};
`

const TitleText = styled.Text`
    font-size: 14px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.gray_400};
    margin-bottom: 8px;
    margin-top: 44px;
`;

const ContentContainer = styled.View`
    flex-direction: column;
`

const NameText = styled.Text`
    font-size: 16px;
font-weight: 600;
line-height: 22.40px;
    color: ${COLORS.sub};
`;

const PhoneText = styled.Text`
font-size: 14px;
font-family: Pretendard;
font-weight: 400;
line-height: 22.40px;
    color: ${COLORS.gray_400};
`;

const AddNextIcon = styled(FastImage)`
    width: 20px;
    height: 20px;
`