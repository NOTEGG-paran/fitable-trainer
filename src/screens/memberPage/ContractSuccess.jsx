import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useRecoilState, useResetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {getMemberDetail} from '../../api/memberApi';
import {COLORS} from '../../constants/color';
import {centerIdState, contractState} from '../../store/atom';
import {MainContainer} from '../../style/gridStyled';

function ContractSuccess(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [memberDetail, setMemberDetail] = useState({
    detailData: '',
    screenType: 'memberDetail',
    memberId: '',
  });

  const {memberId} = route.params;

  const [centerId, setCenterId] = useRecoilState(centerIdState);

  //계약서 작성 데이터 삭제
  const resetList = useResetRecoilState(contractState);

  const goClassMemberDetailScreen = () => {
    navigation.navigate('ClassMemberDetail', memberDetail);
  };

  useEffect(() => {
    const memberDetailScreen = async () => {
      try {
        const response = await getMemberDetail({id: centerId, memberId});
        if (response) {
          setMemberDetail({
            detailData: response,
            screenType: 'memberDetail',
            memberId: memberId,
          });
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        console.log('finally');
      }
    };

    memberDetailScreen();
    resetList();
  }, []);

  return (
    <MainContainer>
      <TitleText>계약서 작성</TitleText>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{marginBottom: 100}}>
        <ContainerCenterView
         style={{gap: 12, paddingVertical: 50,
        }}
         >
          <CompleteText>계약서를 저장했습니다</CompleteText>
          <SubTextContainer>
          <SubText>핏에이블 관리자 페이지에서</SubText>
          <SubText>계약서를 확인하실 수 있습니다</SubText>
          </SubTextContainer>
        </ContainerCenterView>
      </ScrollView>

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          isActive={true}
          onPress={() => goClassMemberDetailScreen()}>
          <BasicMainBtnNextBtnNextText isActive={true}>
            계약서 작성 마치기
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default ContractSuccess;

const BasicMainBtnContainer = styled.View`
  position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
  height: 80px;
  background-color: ${COLORS.white};
`;

const BasicMainBtnNextBtn = styled.TouchableOpacity`
  background-color: ${props => (props.isActive ? COLORS.sub : COLORS.gray_100)};

  border-radius: 90px;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  width: 100%;
`;

const BasicMainBtnNextBtnNextText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  color: ${COLORS.white};
`;

const ContainerCenterView = styled.View`
  margin-top: 150px;
  justify-content: center;
  align-items: center;
`

const TitleText = styled.Text`
  color: ${COLORS.sub};
  font-size: 20px;
  font-weight: 600;
`;

const CompleteText = styled.Text`
  color: ${COLORS.sub};
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.7px;
  margin-bottom: 12px;
`;

const SubTextContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SubText = styled.Text`
  color: ${COLORS.gray_400};
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.5px;
  line-height: 28px;
`;
