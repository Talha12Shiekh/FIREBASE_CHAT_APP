import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MessageType} from './SendMessageInput';
import {useAuth} from '../Context/AuthContext';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {MESSAGE_BLUE_COLOR} from '../Constants';

[
  {
    createdAt: [Object],
    profileURL:
      'https://res.cloudinary.com/dtxzwfyas/image/upload/v1740742528/khpsijdccsexuighf0jr.jpg',
    senderName: 'Talha shiekh',
    text: 'Nnnnnnnnnm',
    userId: 'JKLkRo0Z4YcVzaiwDaWp5qklQHz2',
  },
  {
    createdAt: [Object],
    profileURL:
      'https://res.cloudinary.com/dtxzwfyas/image/upload/v1740742750/wrxf25gvnwwv2iww9vb7.jpg',
    senderName: 'Alon musk',
    text: 'Bbbbbnbb',
    userId: 'tbzmU6GknyLdDWao68xsLV8CWv53',
  },
  {
    createdAt: [Object],
    profileURL:
      'https://res.cloudinary.com/dtxzwfyas/image/upload/v1740742750/wrxf25gvnwwv2iww9vb7.jpg',
    senderName: 'Alon musk',
    text: 'Nnnn',
    userId: 'tbzmU6GknyLdDWao68xsLV8CWv53',
  },
];

const MessageItem = ({message}: {message: MessageType}) => {
  const {user} = useAuth();

  if (user?.uid == message.userId) {
    // the message that I have sent

    return (
      <View style={styles.usermessage}>
        <TouchableOpacity>
          <View style={styles.singlemessage}>
            <Text style={styles.messagetext}>{message.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={[styles.usermessage, {alignItems: 'flex-start'}]}>
        <TouchableOpacity>
          <View style={[styles.singlemessage, {backgroundColor: 'white'}]}>
            <Text style={styles.messagetext}>{message.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default MessageItem;

const styles = StyleSheet.create({
  usermessage: {
    alignItems: 'flex-end',
  },
  singlemessage: {
    backgroundColor: MESSAGE_BLUE_COLOR,
    alignItems: 'flex-end',
    padding: wp(2.5),
    borderRadius: 20,
    borderWidth: 0.3,
    marginBottom: wp(3),
    paddingHorizontal: wp(3.5),
    paddingTop: wp(3),
  },
  messagetext: {
    fontFamily: 'Poppins-Regular',
  },
});
