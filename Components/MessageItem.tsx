import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {MessageType} from './SendMessageInput';
import {useAuth} from '../Context/AuthContext';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {MESSAGE_BLUE_COLOR, ReactionItems} from '../Constants';
import {Reaction} from 'react-native-reactions';

const SelectedMessageView = ({
  toggleselectedmsg,
}: {
  toggleselectedmsg: () => void;
}) => {
  return (
    <Pressable
      style={{
        position: 'absolute',
        zIndex: 9999999999999,
        backgroundColor: 'rgba(0,0,0,.2)',
        width: '100%',
        height: '100%',
      }}
      onPress={toggleselectedmsg}
    />
  );
};

interface SingleMessageBubbleProps {
  msgselected: boolean;
  toggleselectedmsg: () => void;
  alignItems: ViewStyle['alignItems'];
  msg: string;
  backgroundColor: ViewStyle['backgroundColor'];
}

const SingleMessageBubble = ({
  msgselected,
  toggleselectedmsg,
  alignItems,
  msg,
  backgroundColor,
}: SingleMessageBubbleProps) => {
  return (
    <View style={{flex: 1, marginBottom: wp(3)}}>
      {msgselected && (
        <SelectedMessageView toggleselectedmsg={toggleselectedmsg} />
      )}
      <View style={[styles.usermessage, {alignItems}]}>
        <TouchableOpacity onLongPress={toggleselectedmsg}>
          <View style={[styles.singlemessage, {backgroundColor}]}>
            <Text style={styles.messagetext}>{msg}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MessageItem = ({message}: {message: MessageType}) => {
  const {user} = useAuth();

  const [msgselected, setmsgselected] = useState(false);

  const [selectedEmoji, setSelectedEmoji] = useState();

  const toggleselectedmsg = () => setmsgselected(p => !p);

  if (user?.uid == message.userId) {
    // the message that I have sent

    return (
      <SingleMessageBubble
        msgselected={msgselected}
        toggleselectedmsg={toggleselectedmsg}
        alignItems="flex-end"
        msg={message.text}
        backgroundColor={MESSAGE_BLUE_COLOR}
      />
    );
  } else {
    return (
      <SingleMessageBubble
        msgselected={msgselected}
        toggleselectedmsg={toggleselectedmsg}
        alignItems="flex-start"
        msg={message.text}
        backgroundColor={'white'}
      />
    );
  }
};

export default MessageItem;

const styles = StyleSheet.create({
  usermessage: {
    alignItems: 'flex-end',
    paddingHorizontal: wp(4),
  },
  singlemessage: {
    backgroundColor: MESSAGE_BLUE_COLOR,
    alignItems: 'flex-end',
    padding: wp(2.5),
    borderRadius: 20,
    borderWidth: 0.3,
    paddingHorizontal: wp(3.5),
    paddingTop: wp(3),
  },
  messagetext: {
    fontFamily: 'Poppins-Regular',
  },
});
