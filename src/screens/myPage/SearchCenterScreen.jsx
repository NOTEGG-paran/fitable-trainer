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