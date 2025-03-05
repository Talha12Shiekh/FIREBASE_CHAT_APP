import {Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {MessageType} from './SendMessageInput';
import MessageItem from './MessageItem';

const MessagesPortion = ({messages}: {messages: MessageType[]}) => {
  const messagesViewRef = useRef<ScrollView | null>(null);

  function scrollMessagesTopBottom() {
    setTimeout(() => {
      messagesViewRef?.current?.scrollToEnd({animated: true});
    }, 100);
  }

  useEffect(() => {
    const keyboardlistener = Keyboard.addListener(
      'keyboardDidShow',
      scrollMessagesTopBottom,
    );
    scrollMessagesTopBottom();
    return () => keyboardlistener.remove();
  }, [messages]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={messagesViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: wp(4)}}>
        {messages.map(msg => (
          <MessageItem message={msg} key={msg.createdAt.seconds} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MessagesPortion;

const styles = StyleSheet.create({
  container: {
    flex: 9,
  },
});
