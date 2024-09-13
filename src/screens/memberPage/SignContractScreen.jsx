import {useNavigation, useRoute,useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState,useCallback} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {
  getCenterSign,
  getIntergrateTemplate,
  postNewIntegrateContract,
} from '../../api/contractApi';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import {centerIdState, contractState} from '../../store/atom';
import {MainContainer} from '../../style/gridStyled';

function SignContractScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => {
    navigation.goBack();
  };

  const {memberId} = route.params;

  const [centerId, setCenterId] = useRecoilState(centerIdState);

  const [contract, setContract] = useRecoilState(contractState);

  const [templateData, setTemplateData] = useState();
  const [isReceipt, setIsReceipt] = useState(false)


    // 계약서 템플릿 호출 API
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await getIntergrateTemplate({
            templateId: contract.contractTemplate.id,
          });
          if (response) {
            setTemplateData(response);
            setIsReceipt(response.isReceipt);
          }
        } catch (error) {
          console.log('error', error);
        }
      };
  
      if (centerId && memberId) {
        getData();
      }
    }, [centerId, memberId, contract.contractTemplate.id]);
  
    // 센터 서명 호출 API (초기화 방지 로직 추가)
    useFocusEffect(
      useCallback(() => {
        const getData = async () => {
          try {
            // API 호출을 조건부로 실행 (이미 centerSignImage가 있는 경우 호출하지 않음)
            if (!contract.centerSignImage?.uri) {
              const response = await getCenterSign(centerId);
              if (response) {
                setContract(prev => ({
                  ...prev,
                  centerSignImage: { uri: response.imagePath, file: null },
                }));
              }
            }
          } catch (error) {
            console.log('Error getting center sign:', error);
          }
        };
  
        if (centerId) {
          getData();
        }
      }, [centerId, contract.centerSignImage?.uri, setContract])
    );


  //계약서 템플릿 호출 api
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await getIntergrateTemplate({
  //         templateId: contract.contractTemplate.id,
  //       });
  //       console.log('response영수증유므',response.isReceipt)
  //       if (response) {
  //         setTemplateData(response);
  //         setIsReceipt(response.isReceipt)
  //       }
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };

  //   if (centerId && memberId) {
  //     getData();
  //   }
  // }, []);

  //센터 서명 호출 api
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await getCenterSign(centerId);
  //     console.log('responses나센터서명 호출',response)
  //     if (response) {
  //       setContract(prev => {
  //         return {
  //           ...prev,
  //           ['centerSignImage']: {uri: response.imagePath, file: null},
  //         };
  //       });
  //     }
  //   };

  //   getData();
  // }, []);


  const addReciptBtn = () =>{
    // navigation.navigate('AddReceipt');
    navigation.navigate('AddReceipt', {memberId});
  }

  const registerNewContract = async () => {
    try {
      const formData = new FormData();

      const requestDto = {
        templateId: contract.contractTemplate.id,
        memberId: memberId,
        memberName: contract.memberName,
        trainerName: contract.trainerName,
        centerId: centerId,
        centerName: contract.centerName,
        ticketList: contract.updatedSelectedTickets,
        termsAgreement: true,
        privateAgreement: true,
        advertisingAgreement: true,
      };

      //회원 서명을 사용하는 계약서일 경우
      if (templateData.isMemberSignature) {
        if (contract['memberSignImage']?.file) {
          formData.append('memberSignImage', {
            name: 'memberSignImage.png',
            type: 'image/png',
            uri: contract['memberSignImage']?.uri,
          });
        }
      }

      //담당자 서명을 사용하는 계약서일 경우
      if (templateData.isAdminSignature) {
        if (contract['adminSignImage']?.file) {
          formData.append('adminSignImage', {
            name: 'adminSignImage.png',
            type: 'image/png',
            uri: contract['adminSignImage']?.uri,
          });
        }
      }

      //센터 서명을 사용하는 계약서일 경우
      if (templateData.isCenterSignature) {
        if (contract['centerSignImage']?.file) {
          formData.append('centerSignImage', {
            name: 'centerSignImage.png',
            type: 'image/png',
            uri: contract['centerSignImage']?.uri,
          });
        } else {
          requestDto.centerSignatureImagePath = contract['centerSignImage'].uri;
        }
      }
      //센터서명 사용 안하는 계약서일 경우
      else {
        requestDto.centerSignatureImagePath = null;
      }

      formData.append('requestDto', JSON.stringify(requestDto));

      const response = await postNewIntegrateContract(formData);

      if (response) {
        navigation.navigate('ContractSuccess', {memberId});
      }
    } catch (error) {
      console.log('error',error.response)
      Alert('서명 실패');
    }
  };

  const updateName = (key, value) => {
    setContract(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const goEditSign = currentView => {
    navigation.navigate('Sign', {currentView});
  };

  const isCenterSignature = () => {
    if (!templateData?.isCenterSignature) {
      return true;
    } else {
      return !!contract.centerName && !!contract['centerSignImage'].uri;
    }
  };

  const isMemberSignature = () => {
    if (!templateData?.isMemberSignature) {
      return true;
    } else {
      return !!contract.memberName && !!contract['memberSignImage'].uri;
    }
  };

  const isAdminSignature = () => {
    if (!templateData?.isAdminSignature) {
      return true;
    } else {
      return !!contract.trainerName && !!contract['adminSignImage'].uri;
    }
  };

  let isActive =
    isCenterSignature() && isMemberSignature() && isAdminSignature();
    console.log('templateData?.centerSignImage11111111');
  console.log('templateData?.centerSignImage',contract.centerSignImage);
  console.log('templateData?.centerSignImage3333333');
  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{marginBottom: 100}}>
          <GridMarginContainer>
        <View style={{gap: 24}}>
          {templateData?.isMemberSignature && (
            <Container style={{gap: 14}}>
              <SignedDashedBorder onPress={() => goEditSign('memberSignImage')}>
                {contract['memberSignImage']?.uri ? (
                  <SignedImage
                    source={{uri: contract['memberSignImage'].uri}}
                    resizeMode="contain"
                  />
                ) : (
                  <SignedDashedBorder.Text>서명(인)</SignedDashedBorder.Text>
                )}
              </SignedDashedBorder>

              <SigendInputContainer>
                <InfoTitleText>회원</InfoTitleText>
                <InfoTextInput
                  placeholder="입력해주세요"
                  value={contract.memberName}
                  onChangeText={text => {
                    updateName('memberName', text);
                  }}
                />
              </SigendInputContainer>
            </Container>
          )}

          {templateData?.isAdminSignature && (
            <Container style={{gap: 14}}>
              <SignedDashedBorder onPress={() => goEditSign('adminSignImage')}>
                {contract['adminSignImage']?.uri ? (
                  <SignedImage
                    source={{uri: contract['adminSignImage'].uri}}
                    resizeMode="contain"
                  />
                ) : (
                  <SignedDashedBorder.Text>서명(인)</SignedDashedBorder.Text>
                )}
              </SignedDashedBorder>

              <SigendInputContainer>
                <InfoTitleText>강사</InfoTitleText>
                <InfoTextInput
                  placeholder="입력해주세요"
                  value={contract.trainerName}
                  onChangeText={text => {
                    updateName('trainerName', text);
                  }}
                />
              </SigendInputContainer>
            </Container>
          )}

          {templateData?.isCenterSignature && (
            <Container style={{gap: 14}}>
              <SignedDashedBorder onPress={() => goEditSign('centerSignImage')}>
                {contract['centerSignImage']?.uri ? (
                  <SignedImage
                    source={{uri: contract['centerSignImage'].uri}}
                    resizeMode="contain"
                  />
                ) : (
                  <SignedDashedBorder.Text>서명(인)</SignedDashedBorder.Text>
                )}
              </SignedDashedBorder>

              <SigendInputContainer>
                <InfoTitleText>센터</InfoTitleText>
                <InfoTextInput
                  placeholder="입력해주세요"
                  value={contract.centerName}
                  onChangeText={text => {
                    updateName('centerName', text);
                  }}
                />
              </SigendInputContainer>
            </Container>
          )}
        </View>
        </GridMarginContainer>
      </ScrollView>

      {/* <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          disabled={!isActive}
          isActive={isActive}
          onPress={() => registerNewContract()}>
          <BasicMainBtnNextBtnNextText isActive={isActive}>
            계약서 저장
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer> */}

      <BasicMainBtnContainer1>
      {
        isActive && isReceipt && (
          <BasicMainBtnNextAddBtn
          disabled={!isActive}
          isActive={isActive&&isReceipt}
          onPress={() => addReciptBtn()}
          >
          <BasicMainBtnNextBtnNextAddText isActive={isActive}>
            영수증 추가
          </BasicMainBtnNextBtnNextAddText>
        </BasicMainBtnNextAddBtn>
        )
      }
        <BasicMainBtnNextBtn
          disabled={!isActive}
          isActive={isActive}
          onPress={() => registerNewContract()}>
          <BasicMainBtnNextBtnNextText isActive={isActive}>
            계약서 저장
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>

      </BasicMainBtnContainer1>

    </MainContainer>
  );
}

export default SignContractScreen;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

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

const BasicMainBtnContainer1 = styled.View`
  /* position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
  height: 80px; */
  background-color: ${COLORS.white};
  /* align-items: center; */
  /* justify-content: center;     */
`;
const GridMarginContainer = styled.View`
  margin-top: 44px;
`;

const BasicMainBtnNextAddBtn = styled.TouchableOpacity`
  background-color: ${props => (props.isActive ? COLORS.main : COLORS.gray_100)};
  margin-bottom: 14px;
  border-radius: 90px;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  width: 100%;
`;

const BasicMainBtnNextBtn = styled.TouchableOpacity`
  background-color: ${props => (props.isActive ? COLORS.sub : COLORS.gray_100)};
  margin-bottom: 20px;
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

const BasicMainBtnNextBtnNextAddText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  color: ${COLORS.sub};
`;

const InfoTitleText = styled.Text`
  color: ${COLORS.gray_400};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 4px;
`;

const InfoTextInput = styled.TextInput`
  height: 50px;
  font-size: 14px;
  color: ${COLORS.sub};
  font-weight: 400;
  background-color: ${COLORS.gray_100};
  border-radius: 10px;
  padding: 14px 16px;
`;

const SignedDashedBorder = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  width: 70px;
  height: 70px;
  border-radius: 10px;
  border: 1px dashed ${COLORS.gray_300};
  background: ${COLORS.white};
  
  
`;

SignedDashedBorder.Text = styled.Text`
  color: ${COLORS.gray_300};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.35px;
`;

const SigendInputContainer = styled.View`
  flex: 1;
`;

const SignedImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;
