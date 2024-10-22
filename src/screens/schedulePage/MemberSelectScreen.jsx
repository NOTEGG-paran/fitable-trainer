import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { SelectContainer } from '../../style/gridStyled';
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { FlatList,Alert,ActivityIndicator } from 'react-native';
import {formatPhoneNumber} from '../../utils/CustomUtils';
import {postLessonReservation} from '../../api/lessonApi';
import {getAssignableMembers} from '../../api/classApi';
import { useState,useEffect,useCallback } from 'react';
import FastImage from 'react-native-fast-image';
import {getLessonReservationMembers} from'../../api/lessonApi';
function MemberSelectScreen(props) {
    const route = useRoute();
    const { selectData, routerType, lessonId, nextPage, hasMore,abprops,test,onAssignMember  } = route.params;
    console.log('routerTypㅂe, lessonId, nextPage, hasMore ',routerType, lessonId, nextPage, hasMore,abprops,onAssignMember )
    console.log('testtesttest',test)
    const navigation = useNavigation();
    const [selectedMember, setSelectedMember] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [members, setMembers] = useState(selectData || []);
    const [page, setPage] = useState(nextPage || 0);
    const [hasMorePages, setHasMorePages] = useState(hasMore || false);
    const [isLoading, setIsLoading] = useState(false);
    const [isClickBtn, setIsClickBtn]= useState(false);
    const goBack = () => {
        navigation.goBack();
    }
    console.log('routerType',routerType)
    useEffect(() => {
        if(routerType ==='ableclass'){
            console.log('수업목록ㅇㅇ')
            classMembers();
        }else{
            console.log('목록ㅇㅇ')
            loadMembers();
        }
    }, [routerType]); 
    // }, [routerType, classMembers, loadMembers]);

    const classMembers = useCallback(async () => {
        console.log('더호출할까 ?')
        if (!hasMore) return;
        setIsLoading(true);
        try {
            const { id, date, startTime, endTime, trainerIdsString } = abprops;
            const response = await getAssignableMembers({id, date, startTime, endTime ,trainerId:trainerIdsString ,page,size:10});
            console.log('나호출123123 ??!',page,response)
            if (response && response.content.length < 10) {
                setHasMorePages(false); // 데이터가 10개 미만이면 마지막 페이지로 간주
            }
            setMembers(prev => {
                const updatedMembers = [...prev, ...response.content];
                const uniqueMembers = Array.from(new Set(updatedMembers.map(a => a.memberTicketId)))
                    .map(id => {
                        return updatedMembers.find(a => a.memberTicketId === id)
                    });
                return uniqueMembers;
            });
            setPage(page + 1);
        } catch (error) {
            console.error('Failed to fetch members:', error);
            setHasMorePages(false);
        } finally {
            setIsLoading(false);
        }
    }, [abprops, hasMorePages, isLoading, page]);
    // }, [hasMore, isLoading, lessonId, members, page]);
console.log('vpdlwl',page)

    const loadMembers = useCallback(async () => {
        if (!hasMore || isLoading) return; // 이미 로딩 중이거나 더 불러올 데이터가 없으면 실행하지 않음
        setIsLoading(true);
        try {
            const response = await getLessonReservationMembers(lessonId, page, 10);
            console.log('나호출 ??!')
            if (response && response.content.length < 10) {
                console.log('마지막페이지입니다.')
                setHasMorePages(false); // 데이터가 10개 미만이면 마지막 페이지로 간주
                setIsLoading(false);
            }
            setMembers(prev => {
                const updatedMembers = [...prev, ...response.content];
                const uniqueMembers = Array.from(new Set(updatedMembers.map(a => a.memberTicketId)))
                    .map(id => {
                        return updatedMembers.find(a => a.memberTicketId === id)
                    });
                return uniqueMembers;
            });
            setPage(page + 1);
        } catch (error) {
            console.error('Failed to fetch members:11', error);
            setHasMorePages(false);
        } finally {
            setIsLoading(false);
        }
    }, [hasMorePages, isLoading, lessonId, page]); 
    //  }, [hasMore, isLoading, lessonId, members, page]);

    const reservationBtn = async(lessonId,memberTicketId) => {
        if (isProcessing) return;
        setIsClickBtn(true)
        setIsProcessing(true);
        if(routerType ==='ableclass'){
            console.log('callll123123')
            const selected = selectData.find(member => member.memberTicketId === memberTicketId);
            setSelectedMember(selected);
            onAssignMember()
            navigation.navigate('CreateClass', { selectedMember: selected, type:'PERSONAL' });
            setIsProcessing(false);
        }else if(routerType ==='class'){
            console.log('callll')
            setIsProcessing(false);
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
                        "에러",
                        "USE_USING_SOON_TICKET_FAILED.",
                        [
                          { text: "확인", onPress: () => navigation.goBack()}
                        ]
                      );
                }
            } finally {
                setIsProcessing(false);
                setIsClickBtn(false);
            }
        }
    }

    const nextIcon = require('../../assets/img/rightIcon.png');
    const renderItem = useCallback(({ item }) => (
        <MemberItem 
        disabled={isClickBtn?true:false}
        onPress={() => reservationBtn(lessonId, item.memberTicketId)}>
            <ContentContainer>
                <NameText>{item.name || '알 수 없음'}</NameText>
                <PhoneText>{formatPhoneNumber(item.phone)}</PhoneText>
            </ContentContainer>
            <AddNextIcon source={nextIcon}/>
        </MemberItem>
    ), [isClickBtn,lessonId]);


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
                    data={members}
                    // keyExtractor={item => item.memberTicketId}
                    keyExtractor={item => item.memberTicketId.toString()}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    // onEndReached={routerType ==='ableclass'?()=>classMembers():()=>loadMembers()}
                    onEndReached={() => {
                        if (!isLoading && hasMorePages) {
                          if (routerType === 'ableclass') {
                            classMembers();
                          } else {
                            loadMembers();
                          }
                        }
                      }}
                    onEndReachedThreshold={0.5} 
                    ListFooterComponent={() => isLoading && (
                    <CenteredView>
                    <ActivityIndicator size="small" color={COLORS.sub} />
                    </CenteredView>)
                     }
                    renderItem={renderItem}
                    />
                    </>
                )
            }
        </SelectContainer>
    );
}

export default React.memo(MemberSelectScreen);;

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

const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
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