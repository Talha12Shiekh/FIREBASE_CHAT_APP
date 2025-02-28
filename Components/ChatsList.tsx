import {FlatList, Text, View} from 'react-native';
import React from 'react';
import ChatItem from './ChatItem';
import {UserDataType} from '../Screens/Home';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import EmptyChatsScreen from '../Screens/EmptyChatsScreen';

interface ChatsListProps {
  users: UserDataType[];
}

// Talha3@gmail.com
// Talha3

export type ChatRoomNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'ChatRoom'
>;

const ChatsList = ({users}: ChatsListProps) => {
  const navigation = useNavigation<ChatRoomNavigationProps>();

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
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

export default ChatsList;
