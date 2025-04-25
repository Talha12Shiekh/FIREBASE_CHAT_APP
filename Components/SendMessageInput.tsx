import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SendIcon from 'react-native-vector-icons/Feather';
import {getRoomId} from '../Constants';
import {useAuth} from '../Context/AuthContext';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {UserDataType} from '../Screens/Home';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export interface MessageType {
  userId: string;
  text: string;
  profileURL: string;
  senderName: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const SendMessageInput = ({currentuser}: {currentuser: UserDataType}) => {
  const [singlemessage, setsinglemessage] = useState('');

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  const {user} = useAuth();

  async function getToken() {
    const token = await messaging().getToken();
    console.log(token);
  }

  useEffect(() => {
    getToken();
  }, []);

  async function handleSendMessage() {
    let message = singlemessage.trim();

    if (message.length > 0) {
      try {
        let roomId = getRoomId(user?.uid, currentuser.userId);
        const docRef = firestore().collection('Rooms').doc(roomId);
        const messagesRef = docRef.collection('Messages');

        setsinglemessage('');

        // when we are sending the message we should send the information of sender ( who is sending the message )

        await messagesRef.add({
          userId: user?.uid,
          text: singlemessage,
          profileURL: user?.photoURL,
          senderName: user?.displayName,
          createdAt: Timestamp.fromDate(new Date()),
        });
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('Error', error.message);
        }
      }
    } else {
      Alert.alert('Alert !', 'You can not send an empty message');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inptcontainer}>
        <TextInput
          onChangeText={text => setsinglemessage(text)}
          value={singlemessage}
          placeholderTextColor="grey"
          placeholder="Type Message..."
          multiline
          style={styles.input}
        />
        <View style={styles.sendiconcontainer}>
          <TouchableOpacity onPress={handleSendMessage}>
            <View style={styles.sendicon}>
              <SendIcon name="send" color="grey" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendMessageInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inptcontainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    position: 'relative',
    alignSelf: 'flex-end',
  },
  input: {
    width: '100%',
    borderRadius: 20,
    color: 'black',
    paddingHorizontal: wp(3),
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: 'grey',
    paddingTop: wp(3),
    paddingRight: wp(5),
    maxHeight: heightPercentageToDP(30),
  },
  sendiconcontainer: {
    position: 'absolute',
    right: 20,
    bottom: 7,
  },
  sendicon: {
    width: wp(9),
    aspectRatio: 1,
    backgroundColor: 'rgba(0,0,0,.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
