import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../App';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import ChatRoomTopBar from '../Components/ChatRoomTopBar';
import MessagesPortion from '../Components/MessagesPortion';
import SendMessageInput from '../Components/SendMessageInput';
import CustomKeyBoardView from '../Components/CustomKeyBoardView';

// type ChatRoomProps = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>; // can be done by this way aslo

type ChatRoomProps = RouteProp<RootStackParamList, 'ChatRoom'>;

const ChatRoom = ({route}: {route: ChatRoomProps}) => {
  const {item} = route.params;

  return (
    <CustomKeyBoardView>
      <View style={{flex: 1}}>
        <ChatRoomTopBar item={item} />
        <MessagesPortion />
        <SendMessageInput />
      </View>
    </CustomKeyBoardView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
