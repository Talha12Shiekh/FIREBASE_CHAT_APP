import {FlatList, Text, View} from 'react-native';
import React from 'react';
import ChatItem from './ChatItem';
import {UserDataType} from '../Screens/Home';

interface ChatsListProps {
  users: UserDataType[];
}

// Talha3@gmail.com
// Talha3

const ChatsList = ({users}: ChatsListProps) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={users}
        showsVerticalScrollIndicator={false}
        keyExtractor={u => u.userId}
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
