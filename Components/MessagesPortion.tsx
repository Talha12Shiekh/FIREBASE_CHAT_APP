import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {MessageType} from './SendMessageInput';
import MessageItem from './MessageItem';

const MessagesPortion = ({messages}: {messages: MessageType[]}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: wp(4)}}>
        {messages.map(msg => (
          <MessageItem message={msg} key={msg.createdAt} />
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
