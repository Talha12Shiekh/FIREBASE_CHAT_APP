import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EMPTY_SCREEN_IMAGE from '../assets/images/EMPTY_SCREEN_IMAGE.jpg';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const EmptyChatsScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={{
          width: widthPercentageToDP(10),
          aspectRatio: 1,
        }}
        source={EMPTY_SCREEN_IMAGE}
      />
    </View>
  );
};

export default EmptyChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
