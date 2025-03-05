import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CHAT_HEIGHT, formatDate, getRoomId} from '../Constants';
import ProfileImage from '../assets/images/profile.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {UserDataType} from '../Screens/Home';
import {ChatRoomNavigationProps} from './ChatsList';
import {MessageType} from './SendMessageInput';
import {useAuth} from '../Context/AuthContext';
import firestore from '@react-native-firebase/firestore';

function initTitle(name: string) {
  return (
    <Text style={styles.title}>
      {name?.length > 18 ? name.slice(0, 19) : name}
    </Text>
  );
}

function initTime(tme: string) {
  return <Text style={[styles.time, {color: 'grey'}]}>{tme}</Text>;
}

let lastmsglimit = 'Lorem ipsum dolor sit amet fdaskl ';

function initLastMessage(lstmsg: string) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View>
        <Text style={{color: 'grey', fontFamily: 'Poppins-Regular'}}>
          {lstmsg.length > lastmsglimit.length
            ? lstmsg.slice(0, lastmsglimit.length - 1) + '...'
            : lstmsg}
        </Text>
      </View>
    </View>
  );
}

interface ChatItemProps {
  noBorder: boolean;
  item: UserDataType;
  navigation: ChatRoomNavigationProps;
}

const ChatItem = ({noBorder, item, navigation}: ChatItemProps) => {
  const {username, userimage} = item;

  const {user} = useAuth();

  const [lastmessage, setlastmessage] = useState<
    MessageType | undefined | null
  >(undefined);

  useEffect(() => {
    let roomId = getRoomId(user?.uid, item?.userId);
    let docRef = firestore().collection('Rooms').doc(roomId);
    let messagesRef = docRef.collection('Messages');

    // sorting the messgages in descending order so that the first message becomes the last message

    const unsub = messagesRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        let messagesData: MessageType[] = [];

        snapshot.forEach(s => {
          let data = s.data() as MessageType;
          messagesData.push({...data});
        });

        setlastmessage(messagesData[0] ? messagesData[0] : null);
      });

    return unsub;
  }, []);

  function generateTime() {
    if (lastmessage) {
      let date = lastmessage?.createdAt;
      return formatDate(new Date(date.seconds * 1000));
    } else {
      return '';
    }
  }

  let lastmessagetimetoshow = generateTime();

  function generateLastMessage() {
    let lstmsg = '';
    if (lastmessage == undefined) lstmsg = 'Loading...';
    if (lastmessage != null) {
      if (user?.uid == lastmessage.userId) lstmsg = 'You: ' + lastmessage.text;
      else lstmsg = lastmessage.text;
    } else {
      lstmsg = 'Say Hi 👋';
    }
    return lstmsg;
  }

  const lastmessagetoshow = generateLastMessage();

  return (
    <>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate('ChatRoom', {item})}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.1)', false)}>
        <View
          style={[
            styles.chat,
            {
              height: CHAT_HEIGHT,
              borderBottomWidth: noBorder ? 0 : 0.5,
              paddingLeft: wp(4),
            },
          ]}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                height: hp(5.5),
                aspectRatio: 1,
                borderRadius: 50,
                marginRight: wp(3),
                overflow: 'hidden',
              }}>
              <Image
                source={userimage ? {uri: userimage} : ProfileImage}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                  transform: [
                    {
                      scale: userimage == '' ? 1.5 : 1,
                    },
                  ],
                }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.chatTextContainer,
              {alignItems: 'center', marginTop: wp(1)},
            ]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.titleContainer}>{initTitle(username)}</View>
              <View style={styles.timeContainer}>
                {initTime(lastmessagetimetoshow)}
              </View>
            </View>
            <View style={{flex: 1, marginTop: wp(2), flexDirection: 'row'}}>
              <View style={{flex: 3, justifyContent: 'flex-start'}}>
                {initLastMessage(lastmessagetoshow)}
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  chat: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: wp(4),
    borderBottomColor: 'grey',
  },
  chatsContainer: {
    flex: 1,
  },
  title: {
    fontSize: wp(4),
    fontFamily: 'Poppins-Regular',
  },
  time: {
    fontWeight: '500',
    fontSize: wp(3),
    marginRight: wp(5),
    fontFamily: 'Poppins-Regular',
  },
  chatTextContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  timeContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});
