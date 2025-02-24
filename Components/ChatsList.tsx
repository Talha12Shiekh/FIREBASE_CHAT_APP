import {FlatList, Text, View} from 'react-native';
import React from 'react';
import ChatItem from './ChatItem';

interface ChatsListProps {
  users: number[];
}

const ChatsList = ({users}: ChatsListProps) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={users}
        showsVerticalScrollIndicator={false}
        keyExtractor={_ => Math.random().toString()}
        renderItem={({item, index}) => (
          <ChatItem
            noBorder={index + 1 == users.length}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default ChatsList;
