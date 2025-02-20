import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Feather';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.backbtn}
      onPress={() => navigation.goBack()}>
      <View style={styles.container}>
        <BackIcon color="white" size={20} name="arrow-left" />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    width: wp(10),
    aspectRatio: 1,
    position: 'absolute',
    top: wp(3),
    left: wp(5),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backbtn: {
    zIndex: 999999999999,
  },
});
