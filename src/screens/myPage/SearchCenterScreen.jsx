/**
 * 1. 프로젝트명: 핏에이블 강사앱
 * 2. 파일명: SearchCenterScreen.js
 * 3. **설명**:
 *    - 사용자가 연동 가능한 센터를 검색하고 추가할 수 있는 화면.
 *    - 검색된 센터 목록에서 선택하여 연동 센터에 추가 가능.
 *
 * 4. **주요 로직**:
 *    - **센터 검색**:
 *      - `searchCenterList` API 호출로 사용자가 입력한 검색어에 해당하는 센터 목록을 가져옴.
 *      - 검색 결과를 `searchData` 상태로 저장.
 *    - **센터 추가**:
 *      - 사용자가 선택한 센터를 `addCenterList` API로 연동 센터에 추가.
 *      - 성공 시 알림 메시지를 표시하고 센터 목록을 업데이트.
 *    - **연동 센터 자동 설정**:
 *      - 연동 센터 목록 길이에 따라 `centerId` 상태 자동 설정.
 *      - 연동 센터가 하나만 남은 경우 자동으로 해당 센터를 선택.
 *    - **기본 데이터 로드**:
 *      - `recentDataList` 함수로 초기 화면에 연동 가능한 센터 목록을 불러옴.
 *
 * 5. **주요 기능**:
 *    - **검색 기능**:
 *      - 사용자가 입력한 검색어에 따라 센터 목록 필터링.
 *    - **센터 추가 기능**:
 *      - 선택한 센터를 연동 센터 목록에 추가.
 *    - **UI 상태 관리**:
 *      - 검색 중 또는 데이터 로드 중 로딩 상태 표시.
 *    - **조건부 렌더링**:
 *      - 검색 결과가 없을 경우 기본 메시지 표시.
 *    - **실시간 검색 및 상태 업데이트**:
 *      - 검색 입력값 변경 시 `isTyping` 상태를 활용해 UI 반응.
 *
 * 6. **코드 주요 포인트**:
 *    - **Recoil 상태 관리**:
 *      - `centerListState`와 `centerIdState`를 사용해 연동 센터 목록과 선택된 센터 ID를 관리.
 *    - **API 호출**:
 *      - `searchCenterList` 및 `addCenterList` API로 센터 검색 및 추가 처리.
 */

import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import CenterSearch from '../../components/input/CenterSearch';
import { COLORS } from '../../constants/color';
import { styled } from 'styled-components/native';
import SearchListGridCard from '../../components/card/SearchListGridCard';
import { useEffect, useState } from 'react';
import {searchCenterList,addCenterList} from '../../api/trainersApi';
import { ScrollView , Alert, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { centerListState,centerIdState } from '../../store/atom';
import NoListCard from '../../components/card/NoListCard';
function SearchCenterScreen(props) {

    const navigation = useNavigation();

    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [centerId, setCenterId] = useRecoilState(centerIdState);

    const [isTyping, setIsTyping] = useState(false);
    const [searchData, setSearchData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    // useEffect를 활용해서 센터리스트길이가 하나면 그 센터값이 센터아이디

    useEffect(() => {
        if (centerList.length === 0) {
            setCenterId(null);
        } else if(centerList.length ===1){
            setCenterId(centerList[0].id);
        }
    }
    , [centerList]);
    

    const handleSearchQueryChange = (text) => {
        setSearchQuery(text);
      };

    const handleTextInputFocus = () => {
        setIsTyping(true);
      };
    
      const handleTextInputBlur = () => {
        setIsTyping(false);
      };


      const handleSearch = async () => {
        setIsLoading(true);
        try {
          const response = await searchCenterList(searchQuery);
        //   console.log('검색결과',response)
          const filteredList = response.content.map((item) => ({
              id: item.id,
              name: item.name,
              address: item.address,
              mainImage: item.mainImage,
              programs: item.programs,
            }));
             setSearchData(filteredList);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
        setIsLoading(false);
        setIsTyping(true);
      };


      const recentDataList = async () => {
        const response = await searchCenterList();
        setSearchData(response.content);
      }

      const addCenterBtn = async(id) => {
        console.log('센터추가',id)

        try{
            const response = await addCenterList(id);
            console.log('response11',response)
            if(response){
                setCenterList([...centerList,response])
                Alert.alert("센터 추가","센터가 추가되었습니다",
                [{ text: "확인", onPress: () => navigation.goBack()}]);}
        }catch(error){
            console.log(error)
            if(error.code === 30102){
                Alert.alert("센터 추가","이미 추가된 센터입니다",
                [{ text: "확인", onPress: () => console.log('ddd')}]);
            }
        }
      }

      useEffect(() => {
        recentDataList();
      },[])



    const goBack = () => {
        navigation.goBack();
    }

    return (
        <MainContainer>
            <GobackGrid onPress={goBack}>연동센터 설정</GobackGrid>
            <CenterSearch 
              onFocus={handleTextInputFocus}
              onBlur={handleTextInputBlur}
              onChangeText={handleSearchQueryChange}
              onSubmitEditing={handleSearch}
            />
    
            {
                searchData.length === 0 ? (
                    <NoListCard>연동할 수 있는 센터가 없습니다</NoListCard>
                ):(
                    <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    overScrollMode="never"
                    >
                    <View>
                    {searchData.map((item) => (
                        <SearchListGridCard 
                        key={item.id}
                        searchListData={item}
                        onPress={()=>addCenterBtn(item.id)}
                        />
                    ))}
                    </View>
                    </ScrollView>
                )
            }
           
        </MainContainer>
    );
}

export default SearchCenterScreen;