import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../App';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import ChatRoomTopBar from '../Components/ChatRoomTopBar';

// type ChatRoomProps = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>; // can be done by this way aslo

type ChatRoomProps = RouteProp<RootStackParamList, 'ChatRoom'>;

const ChatRoom = ({route}: {route: ChatRoomProps}) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <ChatRoomTopBar />
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
