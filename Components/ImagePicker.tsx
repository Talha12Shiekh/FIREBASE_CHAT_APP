import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CameraIcon from 'react-native-vector-icons/Entypo';
import ImagePickerPackage from 'react-native-image-crop-picker';
import ProfileImage from '../assets/images/profile.png';
import {useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useAuth} from '../Context/AuthContext';
import {Userimage} from './ImagePickerContainer';
import firestore from '@react-native-firebase/firestore';

type TopImagetypes = {
  topimage: ImageSourcePropType | undefined | string | {uri: string};
  setuserimage: React.Dispatch<React.SetStateAction<Userimage | null>>;
  userimage: Userimage | null;
  isProfileScreen: boolean;
};

const ImagePicker = ({
  topimage,
  setuserimage,
  userimage,
  isProfileScreen = false,
}: TopImagetypes) => {
  const [imguploaded, setimguploaded] = useState(false);
  const {setimageofuser, updateUser, user, handleUpdateUserInFirebase} =
    useAuth();

  // async function handleUpdateUserInFirebase(userimg: string) {
  //   try {
  //     const querysnapshot = await firestore()
  //       .collection('Users')
  //       .where('userId', '==', user?.uid)
  //       .get();

  //     if (!querysnapshot.empty) {
  //       console.log('hello again');
  //       const userDoc = querysnapshot.docs[0];

  //       await firestore().collection('Users').doc(userDoc.id).update({
  //         userimage: userimg,
  //       });
  //     }

  //     setimguploaded(false);
  //   } catch (error) {
  //     setimguploaded(false);
  //     console.log(error);
  //   }
  // }

  async function handleImagePicking() {
    setimguploaded(true);
    try {
      const image = await ImagePickerPackage.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
      });

      const data = new FormData();

      data.append('file', {
        uri: image.path,
        type: image.mime,
        name: `upload.${image.mime.split('/')[1]}`, // Set a valid filename
      });
      data.append('upload_preset', 'images');
      data.append('cloud_name', 'dtxzwfyas');

      const uploadResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dtxzwfyas/image/upload',
        {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data', // Ensure correct headers
          },
        },
      );

      const result = await uploadResponse.json();
      if (result.secure_url) {
        if (!isProfileScreen) setuserimage({uri: result.secure_url});

        setimageofuser(result.secure_url);

        if (isProfileScreen) {
          await handleUpdateUserInFirebase(user, {
            userimage: result.secure_url,
          });

          setuserimage({uri: result.secure_url});

          await updateUser({
            photoURL: result.secure_url,
          });

          setimguploaded(false);
          ToastAndroid.show('Profile Photo Updated !', ToastAndroid.SHORT);
        }
      } else {
        setimguploaded(false);
        Alert.alert('Upload Failed', 'Something went wrong while uploading.');
      }
    } catch (error) {
      console.log(error);
      setimguploaded(false);
    }
  }

  const route = useRoute();

  let imagetoshow = topimage || userimage || ProfileImage;

  return (
    <View style={[styles.pickercontainer, {backgroundColor: 'transparent'}]}>
      <Image
        source={imagetoshow}
        resizeMode="cover"
        style={{
          width: wp(50),
          height: wp(50),
          borderRadius: wp(25),
          transform: [
            {
              scale: userimage == null ? 1.6 : 1,
            },
          ],
        }}
      />
      {(route.name == 'SignUp' || route.name == 'Profile') && (
        <TouchableOpacity style={styles.camerabtn} onPress={handleImagePicking}>
          <View style={styles.cameraContainer}>
            {imguploaded ? (
              <ActivityIndicator color="rgba(255,255,255,.6)" size={wp(8)} />
            ) : (
              <CameraIcon name="camera" size={25} color="white" />
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  pickercontainer: {
    marginVertical: wp(10),
  },
  cameraContainer: {
    width: wp(12),
    aspectRatio: 1,
    backgroundColor: 'green',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camerabtn: {
    position: 'absolute',
    right: 0,
    bottom: wp(5),
  },
});
