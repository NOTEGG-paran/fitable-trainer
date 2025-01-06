/**
 * 1. **프로젝트명**: 핏에이블 강사앱
 * 2. **파일명**: MemberMainScreen.js
 * 3. **설명**:
 *    - 센터별 회원 관리 화면으로, 개인 회원, 그룹 회원 등 다양한 조건의 회원 목록을 조회하고 검색할 수 있는 화면입니다.
 * 4. **주요 로직**:
 *    - **회원 목록 조회**:
 *      - 센터 ID와 선택된 회원 타입(PERSONAL, GROUP 등)에 따라 API를 호출하여 회원 데이터를 가져옵니다.
 *    - **총 회원 수 조회**:
 *      - 다양한 회원 타입별 총 회원 수를 API를 통해 가져와 상태로 관리합니다.
 *    - **검색 기능**:
 *      - 이름 및 전화번호의 마지막 4자리로 회원 검색이 가능합니다.
 *    - **상세 검색**:
 *      - 모달을 통해 회원의 추가 조건(이용권, 상태 등)을 설정하여 상세 검색을 수행합니다.
 *    - **반응형 UI**:
 *      - iOS와 Android에서 UI 스타일이 달라지도록 처리합니다.
 * 5. **주요 기능**:
 *    - 회원 타입 변경 및 목록 조회.
 *    - 회원 이름 및 전화번호 검색.
 *    - 상세 검색 조건 모달을 통한 필터링.
 *    - 회원 정보 카드 형태의 UI로 표시.
 *    - 회원 데이터 없을 시, 안내 메시지 표시.
 */

import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {MainContainer} from '../../style/gridStyled'
import CenterListHeaderGrid from '../../components/grid/CenterListHeaderGrid';
import MemberBtnContents from '../../components/button/MemberBtnContents';
import MemberSearch from '../../components/input/MemberSearch';
import NoListCard from '../../components/card/NoListCard';
import MemberInfoListCard from '../../components/grid/MemberInfoListCard';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import {getMemberManage} from '../../api/memberApi';
import { useRecoilState } from 'recoil';
import { centerIdState,totalElementsState } from '../../store/atom';
import FastImage from 'react-native-fast-image';
import MemberDetailSearchModal from '../../components/modal/MemberDetailSearchModal';

function MemberMainScreen(props) {

    const detailSearchIcon = require('../../assets/img/detailsearch.png')
    const [type, setType] = useState('PERSONAL');
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [totalElements, setTotalElements] = useRecoilState(totalElementsState);
    const [userList, setUserList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [ticket, setTicket] = useState('ALL')
    const [member, setMember] = useState('ALL')
    const [leftTime, setLeftTime] = useState('');
    const closeModal = () => {
      setModalVisible(false);
      setTicket('ALL');
        setMember('ALL');
        setLeftTime('');
    };

    const saveCloseModal = () => {
        setModalVisible(false);
    };


    const handleSearch = (text) => {
        setSearchText(text);
    }

    const getMemberManageData = async () => {
        try {
            const response = await getMemberManage({ centerId, type });
            // console.log('response', response)
            setTotalElements(prevState => ({
                ...prevState,
                [type]: response.totalElements
              }));
            return response.content;
        } catch (error) {
            console.error(error);
        }
    }

    const getTotalElementsData = async (type) => {
        const response = await getMemberManage({ centerId, type });
        return [type, response.totalElements];
    }

    const fetchAllTotalElements = async () => {
        const types = ['PERSONAL', 'GROUP', 'ATTENDANCE', 'MANAGING', 'POTENTIAL'];
        const promises = types.map(type => getTotalElementsData(type));
        const results = await Promise.all(promises);
        
        const totalElements = results.reduce((acc, [type, count]) => {
            acc[type] = count;
            return acc;
        }, {});
        
        setTotalElements(totalElements);
    }

    const openDetailSearch = (centerId) => {
        // console.log('dkldldkdkdmk',centerId)
        setModalVisible(true);
    }

    useEffect(() => {
        setSearchText('');
    }, [type]);



// console.log('ticktickettictypetypeketet',type)
    // useEffect(() => {
    //     fetchAllTotalElements();
    // }, [centerId]);

    useFocusEffect(
        useCallback(() => {
            if(centerId){
                fetchAllTotalElements();
            }
        },[centerId]));


    // useEffect(() => {
    //     if(centerId){
    //         getMemberManageData().then((response) => {
    //             setUserList(response);
               
    //         });
    //     }
    // }, [centerId, type]);
    
    useFocusEffect(
        useCallback(() => {
            if(centerId){
                getMemberManageData().then((response) => {
                    setUserList(response);
                });
            }
        },[centerId,type]));

    // console.log('type',type,totalElements)


    const UIComponent = 
    Platform.OS === 'ios' ?
    IosStyled : AndroidStyled;

    return (
        <>
    <MainContainer>
    <UIComponent>
        <CenterListHeaderGrid />
    </UIComponent>
        <MemberBtnContents 
        type={type} setType={setType} setSearchText={setSearchText}/>
        <MemberSearch onChange={handleSearch}searchText={searchText}/>

        <DetailSearchContainer>
            <DetailSearchText>상세조건을 선택해주세요</DetailSearchText>
            <DetailSearchBtn onPress={()=>openDetailSearch(centerId)}>
                <DetailIcon source={detailSearchIcon} />
                <DetailSearchBtnText>상세조건</DetailSearchBtnText>
            </DetailSearchBtn>
        </DetailSearchContainer>

        <GridLine />
            {
                centerId && userList && userList?.length > 0 ? (
            <MemberInfoListCard
            type={type}
            userList={userList?.map(user => ({
             ...user,
             name: user?.name || "알수없음",
            })).filter(user => user?.name?.includes(searchText) || user?.phone?.slice(-4).includes(searchText))}/>
                ):(
                <NoListCard>회원이 없습니다</NoListCard>
                )
            }
    </MainContainer>
        {
            <MemberDetailSearchModal 
            modalVisible={modalVisible}
            closeModal={closeModal}
            ticket={ticket} setTicket={setTicket}
            member={member} setMember={setMember}
            setUserList={setUserList}
            type={type}
            centerId={centerId}
            leftTime={leftTime}
            setLeftTime={setLeftTime}
            saveCloseModal={saveCloseModal}
            />
        }
        </>
    );
}

export default MemberMainScreen;

const DetailSearchContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
    
const DetailSearchText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_300};
font-weight: 500;
line-height: 22.40px;
`
    
const DetailSearchBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const DetailIcon = styled(FastImage)`
    margin-right: 8px;
    width: 20px;
    height: 20px;
`
const DetailSearchBtnText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 500;
line-height: 22.40px;
`


const AndroidStyled = styled.View`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`

const IosStyled = styled.View`
`

export const GridLine = styled.View`
     width: 100%;
    height: 1px;
    background-color: ${COLORS.gray_200};
    margin-top: 15px;
`