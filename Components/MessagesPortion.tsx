import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const MessagesPortion = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding: wp(4)}}>
        <View style={{flex: 1}}></View>
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
