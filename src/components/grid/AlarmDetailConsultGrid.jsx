/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: AlarmDetailConsultGrid.js
 * 3. **설명**:
 *    - 상담 알림 상세 내용을 표시하는 그리드 컴포넌트.
 *    - 상담 정보와 회원 정보를 보기 쉽게 분리하여 표시하며, 회원 정보를 클릭 시 상세 정보로 이동.
 *
 * 4. **주요 로직**:
 *    - **상담 세부 정보 표시**:
 *      - `consultDetail` 데이터를 사용해 상담 신청, 요청 날짜, 희망 시간, 운동 목적, 유의사항 등을 렌더링.
 *    - **회원 정보 연결**:
 *      - 상담 정보에 포함된 회원 ID를 통해 회원 상세 정보 API 호출.
 *      - 성공적으로 데이터를 가져오면 `ClassMemberDetail` 화면으로 이동.
 *
 * 5. **주요 기능**:
 *    - **상담 상세 정보 표시**:
 *      - `consultDetail` 객체를 사용해 상담과 관련된 정보를 표시.
 *    - **회원 상세 정보 이동**:
 *      - `detailConsultScreen` 함수로 회원 ID를 기반으로 상세 정보 호출 후 화면 전환.
 *
 * 6. **주요 상태 및 로직**:
 *    - **상태**:
 *      - `centerId`: 현재 선택된 센터의 ID(Recoil로 관리).
 *    - **로직**:
 *      - `detailConsultScreen`: `getMemberDetail` API 호출을 통해 회원 상세 정보를 가져오고, 데이터를 기반으로 `ClassMemberDetail` 화면으로 이동.
 *      - `onPress`: 회원 정보가 있는 경우 버튼을 눌러 `ClassMemberDetail`로 이동.
 *
 */

import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { GridLineOne } from '../../style/gridStyled';
import FastImage from 'react-native-fast-image';
import { useRecoilState } from 'recoil';
import { centerIdState } from '../../store/atom';
import { useNavigation } from '@react-navigation/native';
import {getMemberDetail} from '../../api/memberApi';
function AlarmDetailConsultGrid({ consultDetail }) {
    // console.log('consultDetail:', consultDetail);
    const navigation = useNavigation();
    const nextIcon = require('../../assets/img/rightIcon.png');
    const [centerId, setCenterId] = useRecoilState(centerIdState);

    const detailConsultScreen = async (id, memberId) => {
        console.log('memberDetailScreen',id,memberId);
        try{
            const response = await getMemberDetail({id,memberId});
            console.log('회원 상세 응답@@',response)
            if(response){
                navigation.navigate('ClassMemberDetail',{
                    detailData: response,
                    screenType:'memberDetail',
                    memberId:memberId
                })
            }

        }catch(error){
            console.log('error',error);
        }finally{
            console.log('finally')
        }
    }
console.log('consultDetail',consultDetail)
    return (
        <Container>
            <GridContainer>
            <ContentsContainer>
                <TitleText>상담 신청</TitleText>
                {
                    consultDetail.trainerName === null ? 
                    (<ContentText>센터 상담</ContentText>) :
                    (<ContentText>{consultDetail.trainerName}</ContentText>)
                }
            </ContentsContainer>
                </GridContainer>

            <GridLineOne />

            <ContentsContainer>
                <TitleText>요청 날짜</TitleText>
             <ContentText>{consultDetail?.createAt || "—"}</ContentText>
            </ContentsContainer>

            <GridLineOne />

            <ContentsContainer>
                <TitleText>희망 시간</TitleText>
                <ContentText>{
                    consultDetail?.time && consultDetail.time.length > 0 ? 
                    consultDetail.time.join(', ') : 
                    "—"
                }</ContentText>
            </ContentsContainer>

            <GridLineOne />

            <ContentsContainer>
                <TitleText>운동 목적</TitleText>
                <ContentText>{
                consultDetail?.purpose && consultDetail.purpose.length > 0 ? 
                consultDetail.purpose.join(', ') : 
                 "—"}</ContentText>
            </ContentsContainer>

            <GridLineOne />

             <ContentsContainer>
                 <TitleText>질병 및 유의사항</TitleText>
             <ContentText>{consultDetail?.caution || "—"}</ContentText>
            </ContentsContainer>

            <GridLineOne />

                    <TitleText>회원정보</TitleText>
            <BtnContainer 
                onPress={()=>detailConsultScreen(centerId, consultDetail.memberInfo.id)}
            >

                <BtnGridBox>
                    {
                        consultDetail?.memberInfo?.name === null ?
                        (<TitleText>회원정보 없음</TitleText>) : (<TitleText>{consultDetail.memberInfo.name}</TitleText>)
                    }
                    <ContentText>
                                {consultDetail?.memberInfo?.phone}
                                {consultDetail?.memberInfo?.generation && ` • ${consultDetail.memberInfo.generation}대`}
                    </ContentText>
                </BtnGridBox>
                <BtnNextIcon source={nextIcon} />

            </BtnContainer>
        </Container>
    );
}

export default AlarmDetailConsultGrid;

const Container = styled.View`
`;

const ContentsContainer = styled.View`
    
`;

const GridContainer = styled.View`
    margin-top: 44px;
`

const TitleText = styled.Text`
    font-size: 16px;
color: ${COLORS.sub};
font-weight: 600;
line-height: 22.40px;
margin-bottom: 8px;
`;

const ContentText = styled.Text`
  font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 400;
line-height: 22.40px;
`;

const BtnContainer = styled.TouchableOpacity`
margin-top: 16px;
    background-color: ${COLORS.gray_100};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 13px;
    padding: 16px;
    `
const BtnGridBox = styled.View``
const BtnNextIcon = styled(FastImage)`
width:20px;
height:20px;
`;