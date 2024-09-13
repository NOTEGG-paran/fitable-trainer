import React, {useEffect, useState} from 'react';
import {MainContainer} from '../../style/gridStyled';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import styled from 'styled-components/native';
import { Alert,FlatList,ScrollView } from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {centerIdState, contractState} from '../../store/atom';
import {
    getIntergrateTemplate,
    postNewIntegrateContract,
  } from '../../api/contractApi';
import SaveReceiptListGrid from '../../components/grid/SaveReceiptListGrid';
function SaveContractScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const {memberId} = route.params;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const goBack = () => {
        navigation.goBack();
      };

      useEffect(() => {
        const getData = async () => {
          try {
            const response = await getIntergrateTemplate({
              templateId: contract.contractTemplate.id,
            });
            console.log('response영수증유므',response)
            if (response) {
              setTemplateData(response);
            }
          } catch (error) {
            console.log('error', error);
          }
        };
    
        if (centerId && memberId) {
          getData();
        }
      }, []);

      const [templateData, setTemplateData] = useState();
      const [centerId, setCenterId] = useRecoilState(centerIdState);
      const [contract, setContract] = useRecoilState(contractState);

      // console.log('templateData',templateData)
      // console.log('contract',contract.adminSignImage)
      // console.log('contract',contract.memberSignImage)
      // console.log('contract',contract.centerSignImage)

      const registerNewContract = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        console.log('isSubmitting',isSubmitting)
        const receiptsWithoutId = contract.addReceipts.map(({ id, ...rest }) => rest);
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
            receipts:receiptsWithoutId
          };
          console.log('requestDto',requestDto)
       // 회원 서명을 사용하는 계약서일 경우
       if (templateData?.isMemberSignature) {
        if (contract['memberSignImage']?.file) {
            formData.append('memberSignImage', {
                name: 'memberSignImage.png',
                type: 'image/png',
                uri: contract['memberSignImage'].uri,
            });
        }
    }

    // 담당자 서명을 사용하는 계약서일 경우
    if (templateData?.isAdminSignature) {
        if (contract['adminSignImage']?.file) {
            formData.append('adminSignImage', {
                name: 'adminSignImage.png',
                type: 'image/png',
                uri: contract['adminSignImage'].uri,
            });
        }
    }

    // 센터 서명을 사용하는 계약서일 경우
    if (templateData?.isCenterSignature) {
        if (contract['centerSignImage']?.file) {
            formData.append('centerSignImage', {
                name: 'centerSignImage.png',
                type: 'image/png',
                uri: contract['centerSignImage'].uri,
            });
        } else {
            requestDto.centerSignatureImagePath = contract['centerSignImage'].uri;
        }
    } else {
        requestDto.centerSignatureImagePath = null;
    }

    formData.append('requestDto', JSON.stringify(requestDto));
    console.log('formDataformData두번찍히니?',formData)
    const response = await postNewIntegrateContract(formData);

    if (response) {
        navigation.navigate('ContractSuccess', { memberId });
    }
} catch (error) {
    console.error('post 실패', error.response.data.code);
    if(error.response.data.code === 40102){
      Alert.alert(
        '계약서 저장 실패',
        `${error.response?.data.message}\n\n
        에러코드 : ${error.response?.data.code}`,
        [
          { text: '확인' },
        ],
      );
    }else{
      Alert.alert(
        '계약서 저장 실패',
        `계약서 정보를 다시 확인해주세요`,
        [
          { text: '확인' },
        ],
      );
    }

}finally {
            setIsSubmitting(false);
        }
};

    const addReciptBtn = () =>{
      navigation.navigate('AddReceipt', {memberId});
    }
    // 수정하기
    const onEditReceipt = (receipt) => {
      navigation.navigate('AddReceipt', { receipt,memberId });
    };

    // 삭제하기
    const onDeleteReceipt = (id) => {
      Alert.alert(
        '영수증 기록을 삭제하시겠습니까?',
        '영수증 기록 삭제 후 되돌릴 수 없습니다.',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '삭제',
            onPress: () => {
              setContract((prevContract) => ({
                ...prevContract,
                addReceipts: prevContract.addReceipts.filter((receipt) => receipt.id !== id),
              }));
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    };
    
    return (
<>
        <MainContainer>
        <GobackGrid onPress={goBack}>영수증 기록</GobackGrid>
        <ListContainer>
        {contract.addReceipts.length === 0 ? (
          <NoReceiptsContainer>
            <NoReceiptsText>영수증 추가</NoReceiptsText>
            <NoReceiptsSubText>영수증 추가 버튼을 눌러</NoReceiptsSubText>
            <NoReceiptsSubText>영수증을 기록해주세요</NoReceiptsSubText>
          </NoReceiptsContainer>
        ) : (
          <FlatList
            data={contract.addReceipts}
            renderItem={({ item, index }) => (
              <SaveReceiptListGrid
                onEditReceipt={onEditReceipt}
                onDeleteReceipt={onDeleteReceipt}
                isLast={index === contract.addReceipts.length - 1}
                item={item}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            bounces={false}
          />
        )}
      </ListContainer>

  

      </MainContainer>
    <BasicMainBtnContainer>

    <BasicMainBtnNextAddBtn
     isActive={true}
    onPress={() => addReciptBtn()}
    >
    <BasicMainBtnNextBtnNextAddText isActive={true}>
      영수증 추가
    </BasicMainBtnNextBtnNextAddText>
  </BasicMainBtnNextAddBtn>
  

  <BasicMainBtnNextBtn
  isActive={true}
  disabled={isSubmitting}
    onPress={() => registerNewContract()}>
    <BasicMainBtnNextBtnNextText isActive={true}>
      계약서 저장
    </BasicMainBtnNextBtnNextText>
  </BasicMainBtnNextBtn>

</BasicMainBtnContainer>
</>
    );
}

export default SaveContractScreen;


const BasicMainBtnContainer = styled.View`
  padding: 0 10px;
  background-color: ${COLORS.white};
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

const ListContainer = styled.View`
  margin-bottom: 30px;
  margin-top: 40px;
`;

const NoReceiptsContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const NoReceiptsText = styled.Text`
  font-size: 28px;
  color: ${COLORS.sub};
  margin-bottom: 20px;
font-weight: 400;

`;

const NoReceiptsSubText = styled.Text`
  font-size: 16px;
  color: ${COLORS.sub};
  margin-bottom: 4px;
`;