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
        <View style={styles.imagecontainer}>
          <Image
            resizeMode="cover"
            source={profileimage}
            style={styles.image}
          />
        </View>
      ) : (
        <Text style={styles.text}>No Profile Photo</Text>
      )}
    </View>
  );
};

export default ProfileImageViewScreen;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  imagecontainer: {
    height: '50%',
    width: '100%',
    backgroundColor: 'red',
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
