import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RootStackParamList} from '../App';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import ChatRoomTopBar from '../Components/ChatRoomTopBar';
import MessagesPortion from '../Components/MessagesPortion';
import SendMessageInput, {MessageType} from '../Components/SendMessageInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useAuth} from '../Context/AuthContext';
import {getRoomId} from '../Constants';
import firestore, {Timestamp} from '@react-native-firebase/firestore';

// type ChatRoomProps = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>; // can be done by this way aslo

type ChatRoomProps = RouteProp<RootStackParamList, 'ChatRoom'>;

const ChatRoom = ({route}: {route: ChatRoomProps}) => {
  const [messages, setmessages] = useState<MessageType[]>([]);

  const {item} = route.params; // user whose chat is clicked

  const {user} = useAuth(); // currently logged in user

  useEffect(() => {
    createChatRoomIfNotExists();

    let roomId = getRoomId(user?.uid, item?.userId);
    let docRef = firestore().collection('Rooms').doc(roomId);
    let messagesRef = docRef.collection('Messages');
    // sorting the messgages in ascending order

    const unsub = messagesRef
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        let messagesData: MessageType[] = [];

        snapshot.forEach(s => {
          let data = s.data() as MessageType;
          messagesData.push({...data});
        });

        setmessages(messagesData);
      });

    return unsub;
  }, []);

  async function createChatRoomIfNotExists() {
    let roomId = getRoomId(user?.uid, item?.userId);

    let roomRef = firestore().collection('Rooms').doc(roomId);

    let doc = roomRef.get();

    let docexists = (await doc).exists;

    if (!docexists) {
      roomRef.set({
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
      });
    }
  }

  return (
    <View style={{flex: 1}}>
      <ChatRoomTopBar item={item} />
      <MessagesPortion messages={messages} />
      <View
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          paddingBottom: wp(3),
        }}>
        <KeyboardAwareScrollView>
          <View>
            <SendMessageInput currentuser={item} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
