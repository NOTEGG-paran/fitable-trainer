import React from 'react';
import MemberInfoCard from '../card/MemberInfoCard';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

function MemberInfoListCard({ userList, type }) {
    return (
        <ListContainer>
            <FlatList
                data={userList}
                renderItem={({ item }) => <MemberInfoCard userInfo={item} type={type} />}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </ListContainer>
    );
}

export default MemberInfoListCard;

const ListContainer = styled.View`
    flex: 1;
`;
