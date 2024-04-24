import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { ScrollView,FlatList } from 'react-native';
import {getLessonDetail} from '../../api/lessonApi'
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
function LessonListGrid({lessonList,loadMore}) {

    const navigation = useNavigation();

    const detailLessonScreen = async(id) => {
        try{
            const response = await getLessonDetail(id);
            // console.log('상세 응답',response)
            if(response){
                navigation.navigate('LessonDetail', 
                {
                    lessonDetail: response,
                    
                });
            }
        }catch(error){
            console.log('error 뜸', error)
        }
    }
    console.log('lessonList',lessonList)
    const nextIcon = require('../../assets/img/rightIcon.png');
    const personal = require('../../assets/img/personal_s.png');
    const group = require('../../assets/img/group_s.png');


    const renderItem = ({ item }) => (
        <LessonListContainer>
        <LessonCard onPress={() => detailLessonScreen(item.id)}>
            <LessonIcon source={item.type === 'PERSONAL' ? personal : group} />
            <InnerLessonCard>
                <LessonInfo>
                    <LessonNameAndTrainer>{item.name} • {item.trainers.join(', ')} 강사</LessonNameAndTrainer>
                    <LessonTime>{item.startTime} ~ {item.endTime}</LessonTime>
                    <MembersInfoContainer>
                        <MembersInfoText>{item.reservationMembers.memberName || '알 수 없음 회원'} 회원</MembersInfoText>
                        {item.reservationMembers.max && (
                            <MembersInfoText>({item.reservationMembers.current}/{item.reservationMembers.max})</MembersInfoText>
                        )}
                        {item.location && (<MembersInfoText> | {item.location}</MembersInfoText>)}
                    </MembersInfoContainer>
                </LessonInfo>
                <LessonNextIcon source={nextIcon} />
            </InnerLessonCard>
        </LessonCard>
        </LessonListContainer>
    );



    // return (
    //     <FlatList
    //         data={lessonList}
    //         renderItem={renderItem}
    //         keyExtractor={item => item.id.toString()}
    //         showsVerticalScrollIndicator={false}
    //         // onEndReached={loadMore}
    //         // onEndReachedThreshold={0.1}
    //     />
    // );
    return (
      <>
            {
                lessonList.length === 0 ? (
                <NoListContainer>
                    <NoListText>일정이 없습니다</NoListText>
                </NoListContainer>
                ):(
                    <FlatList
                    data={lessonList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    overScrollMode="never">
                </FlatList>
                )
            }
       </>
    );
}

export default LessonListGrid;

const LessonListContainer = styled.View`
    padding: 0 20px;
    background-color: ${COLORS.white};
`;
// Image
const LessonIcon = styled(FastImage)`
    width: 56px;
    height: 70px;
margin-right: 20px;
`
const LessonNextIcon = styled(FastImage)`
    width:20px;
    height:20px;
`


const LessonCard = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 33px;
`;

const LessonNameAndTrainer = styled.Text`
    color: ${COLORS.gray_400};
    font-size: 12px;
    font-weight: 400;
`;

const LessonTime = styled.Text`
    color: ${COLORS.sub};
    font-size: 16px;
    font-weight: 600;
    margin-top: 4px;
    margin-bottom: 2px;
`;

const LessonInfo = styled.View`
    flex-direction: column;
`;

const InnerLessonCard = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex:1;
`;


const MembersInfoText = styled.Text`
    font-size: 14px;
font-weight: 400;
line-height: 22.40px;
    color: ${COLORS.gray_400};
`;
const NoListContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.white};
`;

const NoListText = styled.Text`
 font-size: 16px;
color: ${COLORS.gray_300};
font-weight: 500;
line-height: 22.40px;
`;

const MembersInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
`