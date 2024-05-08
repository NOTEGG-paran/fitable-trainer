import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { GridLineOne } from '../../style/gridStyled';
import {formatPhoneNumber} from '../../utils/CustomUtils';
import { useRecoilState } from 'recoil';
import { centerIdState } from '../../store/atom';
import { useNavigation } from '@react-navigation/native';
import {getMemberDetail} from '../../api/memberApi';
import FastImage from 'react-native-fast-image';

function MemberInfoCard({ userInfo,type,index }) {

    const navigation = useNavigation();
    const nextIcon = require('../../assets/img/rightIcon.png');
    const [centerId, setCenterId] = useRecoilState(centerIdState);

    const memberDetailScreen = async(id,memberId) => {
        console.log('memberDetailScreen',id,memberId,type);
        try{
            const response = await getMemberDetail({id,memberId});
            console.log('회원 상세 응답@@',response)
            if(response){
                navigation.navigate('ClassMemberDetail',{
                    detailData: response,
                    screenType:'memberDetail',
                    memberId:memberId,
                    ...(type === 'POTENTIAL' && { isPotential: true })
                })
            }

        }catch(error){
            console.log('error',error);
        }finally{
            console.log('finally')
        }
    }

    return (
        <>
        <CardContainer onPress={()=>memberDetailScreen(centerId,userInfo.id)}isFirst={index === 0}>
            <BtnGridBox>
            <UserName>{userInfo.name}</UserName>
            <UserPhone>{formatPhoneNumber(userInfo.phone)}</UserPhone>
            </BtnGridBox>
            <BtnNextIcon source={nextIcon} />
        </CardContainer>
            <GridLineOne />
        </>
    );
}

export default MemberInfoCard;

const CardContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: ${({ isFirst }) => isFirst ? '18px' : '0'};
`;

const UserName = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 600;
line-height: 22.40px;
margin-bottom: 8px;
`;

const UserPhone = styled.Text`
      font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 400;
line-height: 22.40px;
`;
const BtnGridBox = styled.View``

const BtnNextIcon = styled(FastImage)`
    width: 20px;
    height: 20px;
`;