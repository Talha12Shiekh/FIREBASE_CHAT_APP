import {
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

type TopImagetypes = {
  topimage: ImageSourcePropType | undefined | string;
};

type Userimage = {
  uri: string;
};

const ImagePicker = ({topimage}: TopImagetypes) => {
  const [userimage, setuserimage] = useState<Userimage | null>(null);
  const {setuserimageandname} = useAuth();

  async function handleImagePicking() {
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
        setuserimage({uri: result.secure_url});
        setuserimageandname(p => ({...p, image: result.secure_url}));
      } else {
        Alert.alert('Upload Failed', 'Something went wrong while uploading.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const route = useRoute();

  let imagetoshow = undefined;

  if (route.name !== 'SignUp') imagetoshow = topimage;
  else if (userimage == null) imagetoshow = ProfileImage;
  else imagetoshow = userimage;

  return (
    <View style={[styles.pickercontainer, {backgroundColor: 'transparent'}]}>
      <Image
        source={imagetoshow}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 100,
          transform: [
            {
              scale:
                route.name == 'SignUp' ? (userimage == null ? 1.6 : 1) : 1.3,
            },
          ],
        }}
      />
      {route.name == 'SignUp' && (
        <TouchableOpacity style={styles.camerabtn} onPress={handleImagePicking}>
          <View style={styles.cameraContainer}>
            <CameraIcon name="camera" size={25} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  pickercontainer: {
    width: wp(50),
    aspectRatio: 1,
    borderRadius: 100,
    marginVertical: wp(10),
    position: 'relative',
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
