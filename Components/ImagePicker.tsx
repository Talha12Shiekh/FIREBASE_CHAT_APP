import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CameraIcon from 'react-native-vector-icons/Entypo';
import ImagePickerPackage from 'react-native-image-crop-picker';
import ProfileImage from '../assets/images/profile.png';
import {useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useAuth} from '../Context/AuthContext';
import {Userimage} from './ImagePickerContainer';

type TopImagetypes = {
  topimage: ImageSourcePropType | undefined | string | {uri: string};
  setuserimage: React.Dispatch<React.SetStateAction<Userimage | null>>;
  userimage: Userimage | null;
};

const ImagePicker = ({topimage, setuserimage, userimage}: TopImagetypes) => {
  const [imguploaded, setimguploaded] = useState(false);
  const {setimageofuser} = useAuth();

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
      setimguploaded(false);
      if (result.secure_url) {
        setuserimage({uri: result.secure_url});
        setimageofuser(result.secure_url);
      } else {
        Alert.alert('Upload Failed', 'Something went wrong while uploading.');
      }
    } catch (error) {
      console.log(error);
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
              <ActivityIndicator size={wp(8)} />
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
