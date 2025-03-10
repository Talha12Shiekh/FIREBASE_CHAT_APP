import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EMPTY_SCREEN_IMAGE from '../assets/images/EMPTY-SCREEN-IMG.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const EmptyChatsScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={{
          width: wp(60),
        }}
        source={EMPTY_SCREEN_IMAGE}
      />
      <Text style={[styles.emptytext, {fontSize: wp(5)}]}>
        No users to chat !{' '}
      </Text>
      <Text style={styles.emptytext}>
        Register some users to start doing chatting
      </Text>
    </View>
  );
};

export default EmptyChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: wp(10),
  },
  emptytext: {
    fontFamily: 'Poppins-Regular',
  },
});
