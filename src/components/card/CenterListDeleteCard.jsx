import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import CenterAddGrayBtn from '../button/CenterAddGrayBtn';
import {deleteCenterList} from '../../api/trainersApi';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function CenterListDeleteCard({centerList,setCenterList,goSearchScreen,setCenterId,centerId}) {


    // const deleteCenterBtn = async(id) => {
    //     console.log('센터삭제',id)
    //     try{
    //         const response = await deleteCenterList(id);
    //         if(response){
    //             Alert.alert("센터 삭제","센터가 삭제되었습니다",
    //             [{ text: "확인", onPress: () => {setCenterList(centerList.filter(center => center.id !== id))}
    //             }]);
    //         }
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    const deleteCenterBtn = async (id) => {
        const response = await deleteCenterList(id); // 센터 삭제 API 호출
        if (response) {
            const updatedCenterList = centerList.filter(center => center.id !== id);
            setCenterList(updatedCenterList); // Recoil 상태 업데이트
            Alert.alert('센터 삭제', '센터가 삭제되었습니다', [{ text: '확인', onPress: () => {} }]);
            if (centerId === id) { // 삭제된 센터가 현재 선택된 센터라면
                const newSelectedId = updatedCenterList.length > 0 ? updatedCenterList[0].id : null;
                setCenterId(newSelectedId); // 새로운 센터 선택 또는 null 설정
                AsyncStorage.setItem('centerId', newSelectedId ?? ''); // 새로운 센터 ID를 AsyncStorage에 저장
            }
        }
    };
    

    return (
        <ScrollContainer
        bounces={false}
        showsVerticalScrollIndicator={false}   
        showsHorizontalScrollIndicator={false}
        overScrollMode="never">
         {centerList && centerList.map(center => (
             <CenterListContaniner key={center.id}>
             <CenterName>{center.name}</CenterName>
             <DeleteContainer key={center.id} onPress={()=>deleteCenterBtn(center.id)}>
             <CenterDeleteText>삭제</CenterDeleteText>
             </DeleteContainer>
             </CenterListContaniner>
         ))}
         <CenterAddGrayBtn onPress={goSearchScreen}>센터 추가</CenterAddGrayBtn>
         </ScrollContainer>
    );
}

export default CenterListDeleteCard;


const CenterListContaniner = styled.View`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 12px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const CenterName = styled.Text`
 font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`;

const CenterDeleteText = styled.Text`
color: ${COLORS.gray_300};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`;


const ScrollContainer = styled.ScrollView`
flex:1;
`

const DeleteContainer = styled.TouchableOpacity`
width: 28px;
`
