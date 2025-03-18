import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

const ProfileImageViewScreen = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'ProfileImageView'>;
}) => {
  const {profileimage, imageexists} = route.params;
  return (
    <View style={styles.container}>
      {imageexists ? (
        <Image resizeMode="cover" source={profileimage} style={styles.image} />
      ) : (
        <Text style={styles.text}>No Profile Photo</Text>
      )}
    </View>
  );
};

export default ProfileImageViewScreen;

const styles = StyleSheet.create({
  image: {
    height: '50%',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
  },
});
