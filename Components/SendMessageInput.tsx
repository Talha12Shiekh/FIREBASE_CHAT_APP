import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import SendIcon from 'react-native-vector-icons/Feather';
import {getRoomId} from '../Constants';
import {useAuth} from '../Context/AuthContext';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {UserDataType} from '../Screens/Home';

export interface MessageType {
  userId: string;
  text: string;
  profileURL: string;
  senderName: string;
  createdAt: string;
}

const SendMessageInput = ({currentuser}: {currentuser: UserDataType}) => {
  const [singlemessage, setsinglemessage] = useState('');

  const {user} = useAuth();

  async function handleSendMessage() {
    let message = singlemessage.trim();

    if (message.length > 0) {
      try {
        let roomId = getRoomId(user?.uid, currentuser.userId);
        const docRef = firestore().collection('Rooms').doc(roomId);
        const messagesRef = docRef.collection('Messages');

        setsinglemessage('');

        await messagesRef.add({
          userId: currentuser?.userId,
          text: singlemessage,
          profileURL: currentuser?.userimage,
          senderName: currentuser?.username,
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
  },
  sendiconcontainer: {
    position: 'absolute',
    right: 20,
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
