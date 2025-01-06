/**
 * 1. **프로젝트명**: 핏에이블 강사앱
 * 2. **파일명**: ContractAgreementScreen.js
 * 3. **설명**:
 *    - 계약서를 작성하기 전에 이용약관, 개인정보 이용 동의서, 광고성 정보 이용 동의서를 확인하고 동의 여부를 설정하는 화면입니다.
 * 4. **주요 로직**:
 *    - **계약서 약관 데이터 호출**:
 *      - API를 통해 약관 및 템플릿 데이터를 불러와 상태에 저장합니다.
 *    - **체크박스 상태 관리**:
 *      - 약관별 개별 동의 및 전체 동의를 설정하고 상태를 연동합니다.
 *    - **모달 열기**:
 *      - 선택된 약관의 상세 내용을 모달을 통해 확인할 수 있습니다.
 *    - **다음 단계로 이동**:
 *      - 모든 약관에 동의했을 경우 다음 화면으로 이동합니다.
 * 5. **주요 기능**:
 *    - 이용약관, 개인정보 이용 동의서, 광고성 정보 이용 동의서 확인 및 동의 여부 설정.
 *    - 전체 동의 체크박스 제공.
 *    - 약관 상세 내용을 확인할 수 있는 모달 UI 제공.
 *    - 모든 동의 완료 시 다음 단계로 이동 버튼 활성화.
 */


import CheckBox from '@react-native-community/checkbox';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {useRecoilState} from 'recoil';
import styled, {css} from 'styled-components/native';
import {
  getContractAgreement,
  getIntergrateTemplate,
} from '../../api/contractApi';
import GobackGrid from '../../components/grid/GobackGrid';
import ContractAgreementModal from '../../components/modal/ContractAgreementModal';
import {COLORS} from '../../constants/color';
import {contractState} from '../../store/atom';
import {MainContainer} from '../../style/gridStyled';

function ContractAgreementScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => {
    navigation.goBack();
  };

  const {memberId} = route.params;

  const [contract, setContract] = useRecoilState(contractState);

  const [templateData, setTemplateData] = useState();

  const goSignContract = () => {
    navigation.navigate('SignContract', {memberId});
  };

  const [isTotalAgreement, setIsTotalAgreement] = useState(false);
  const [isTermsAgree, setIsTermsAgree] = useState(false);
  const [isPrivateAgree, setIsPrivateAgree] = useState(false);
  const [isAdvertisementAgree, setIsAdverTisementAgree] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [detailData, setDetailData] = useState('');

  const [currentAgreement, setCurrentAgreement] = useState('');

  const openAgreementModal = async agreement => {
    setCurrentAgreement(agreement);
    setModalVisible(true);
  };



  //계약서 약관
  useEffect(() => {
    const getData = async () => {
      const response = await getContractAgreement(contract.contractTemplate.id);
      if (response) {
        setDetailData(response);
      }
    };

    getData();
  }, []);

  //계약서 템플릿 호출 api
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getIntergrateTemplate({
          templateId: contract.contractTemplate.id,
        });
        if (response) {
          setTemplateData(response);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    getData();
  }, []);

  //체크박스
  useEffect(() => {
    if (isActive) {
      setIsTotalAgreement(true);
    } else {
      setIsTotalAgreement(false);
    }
  }, [isTermsAgree, isPrivateAgree, isAdvertisementAgree]);

  //이용약관
  const isTermsAgreement = () => {
    if (!templateData?.isTermsAgreement) {
      return true;
    } else {
      return isTermsAgree;
    }
  };

  //개인정보 이용 동의서
  const isPrivateAgreement = () => {
    if (!templateData?.isPrivateAgreement) {
      return true;
    } else {
      return isPrivateAgree;
    }
  };

  //광고성 정보 이용 동의서
  const isAdvertisingAgreement = () => {
    if (!templateData?.isAdvertisingAgreement) {
      return true;
    } else {
      return isAdvertisementAgree;
    }
  };

  const isActive =
    templateData &&
    isTermsAgreement() &&
    isPrivateAgreement() &&
    isAdvertisingAgreement();

  const getTitle = () => {
    if (currentAgreement === 'termsAgreement') {
      return '이용약관';
    }

    if (currentAgreement === 'privateAgreement') {
      return '개인정보 이용 동의서';
    }

    if (currentAgreement === 'advertisingAgreement') {
      return '광고성 정보 이용 동의서';
    }
  };

  const getDetailData = () => {
    if (currentAgreement === 'termsAgreement') {
      return detailData.termsAgreement;
    }

    if (currentAgreement === 'privateAgreement') {
      return detailData.privateAgreement;
    }

    if (currentAgreement === 'advertisingAgreement') {
      return detailData.advertisingAgreement;
    }
  };

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{marginBottom: 100}}>
        <ContractAgreementModal
          title={getTitle()}
          detailData={getDetailData()}
          modalVisible={modalVisible}
          closeModal={() => {
            setModalVisible(false);
          }}
        />

        <View
          style={{
            flexDirection: 'column',
          }}>
          <View>
            <TotalAgreement.Container
              onPress={() => {
                setIsTermsAgree(!isTotalAgreement);
                setIsPrivateAgree(!isTotalAgreement);
                setIsAdverTisementAgree(!isTotalAgreement);
                setIsTotalAgreement(!isTotalAgreement);
              }}>
              <TotalAgreement.Text isActive={isActive}>
                약관 전체동의
              </TotalAgreement.Text>

              <CheckBoxBtn
                isChecked={isTotalAgreement}
                setIsChecked={setIsTotalAgreement}
                onPress={() => {
                  setIsTermsAgree(!isTotalAgreement);
                  setIsPrivateAgree(!isTotalAgreement);
                  setIsAdverTisementAgree(!isTotalAgreement);
                  setIsTotalAgreement(!isTotalAgreement);
                }}
                style={{
                  backgroundColor: 'none',
                }}
                checkBoxStyle={{
                  width: 20,
                  height: 20,
                }}
              />
            </TotalAgreement.Container>
          </View>

          <View
            style={{
              paddingVertical: 30,
              paddingHorizontal: 20,
              gap: 24,
            }}>
            {templateData?.isTermsAgreement && (
              <Agreement.Container
                onPress={() => openAgreementModal('termsAgreement')}>
                <Agreement.Text>이용약관 동의</Agreement.Text>

                <CheckBoxBtn
                  isChecked={isTermsAgree}
                  setIsChecked={setIsTermsAgree}
                  handleCheckboxChange={() => {
                    setIsTermsAgree(!isTermsAgree);
                  }}
                />
              </Agreement.Container>
            )}

            {templateData?.isPrivateAgreement && (
              <Agreement.Container
                onPress={() => openAgreementModal('privateAgreement')}>
                <Agreement.Text>개인정보 이용 동의서</Agreement.Text>

                <CheckBoxBtn
                  isChecked={isPrivateAgree}
                  setIsChecked={setIsPrivateAgree}
                  handleCheckboxChange={() => {
                    setIsPrivateAgree(!isPrivateAgree);
                  }}
                />
              </Agreement.Container>
            )}

            {templateData?.isAdvertisingAgreement && (
              <Agreement.Container
                onPress={() => openAgreementModal('advertisingAgreement')}>
                <Agreement.Text>광고성 정보 이용 동의서</Agreement.Text>

                <CheckBoxBtn
                  isChecked={isAdvertisementAgree}
                  setIsChecked={setIsAdverTisementAgree}
                  handleCheckboxChange={() => {
                    setIsAdverTisementAgree(!isAdvertisementAgree);
                  }}
                />
              </Agreement.Container>
            )}
          </View>
        </View>
      </ScrollView>

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          disabled={!isActive}
          isActive={isActive}
          onPress={() => goSignContract(memberId)}>
          <BasicMainBtnNextBtnNextText isActive={isActive}>
            다음
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default ContractAgreementScreen;

const BasicMainBtnContainer = styled.View`
  position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
  height: 80px;
  background-color: ${COLORS.white};
  /* align-items: center; */
  /* justify-content: center;     */
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

const TotalAgreement = styled`
`;

TotalAgreement.Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 44px;
  height: 60px;

  border-radius: 13px;
  background-color: ${COLORS.sub};
  padding: 19px 20px;
`;

TotalAgreement.Text = styled.Text`
  font-size: 16px;
  color: ${COLORS.gray_300};
  line-height: 21.2px;

  ${props =>
    props.isActive &&
    css`
      color: ${COLORS.main};
    `};
`;

const Agreement = styled``;

Agreement.Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

Agreement.Text = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${COLORS.sub};
  line-height: 21.2px;
  text-decoration-line: underline;
`;

function CheckBoxBtn({
  isChecked,
  handleCheckboxChange,
  style = {
  },
  checkBoxStyle = {},
  ...props
}) {

  return (
    <>
      <CheckBoxStyle
        value={isChecked}
        onPress={handleCheckboxChange}
        isActive={isChecked}
        style={{...style}}
        {...props}>
        <CheckImage
          source={require('../../../src/assets/img/check-2.png')}
          resizeMode="contain"
          tintColor={isChecked ? COLORS.main : COLORS.gray_300}
          style={{...checkBoxStyle}}
        />
      </CheckBoxStyle>
    </>
  );
}

const CheckImage = styled(Image)`
  width: 15px;
  height: 15px;
`;

const CheckBoxStyle = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 26px;
  height: 26px;
  ${props =>
    props.isActive
      ? css`
          background-color: ${COLORS.sub};
        `
      : css`
          background-color: ${COLORS.gray_200};
        `}
`;