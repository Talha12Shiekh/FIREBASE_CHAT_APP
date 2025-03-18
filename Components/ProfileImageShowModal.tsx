import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ProfileImage from '../assets/images/profile.png';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
interface ProfileModalProps {
  modalvisible: boolean;
  image: ImageSourcePropType | undefined | string;
  setmodalvisible: React.Dispatch<React.SetStateAction<boolean>>;
  modaltext: string;
}

const ProfileImageShowModal = ({
  modalvisible,
  image,
  setmodalvisible,
  modaltext,
}: ProfileModalProps) => {
  let modalimage = ProfileImage;
  if (image != '') modalimage = {uri: image};

  type ProfileImageViewScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    'ProfileImageView'
  >;

  const navigation = useNavigation<ProfileImageViewScreenProps>();

  function handleNavigatetoViewScreen() {
    setmodalvisible(false);
    navigation.navigate('ProfileImageView', {
      title: modaltext,
      profileimage: modalimage,
      imageexists: image != '',
    });
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalvisible}
        onRequestClose={() => setmodalvisible(false)}>
        <Pressable
          style={styles.backdrop}
          onPress={() => setmodalvisible(false)}
        />
        <TouchableOpacity onPress={handleNavigatetoViewScreen}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.chatnamecontainer}>
                <Text style={styles.chatnametext}>{modaltext}</Text>
              </View>
              <Image
                source={modalimage}
                style={{
                  width: '100%',
                  height: '100%',
                  transform: [{scale: image != '' ? 1 : 1.5}],
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default ProfileImageShowModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: wp(30),
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp(65),
    aspectRatio: 1,
  },
  chatnamecontainer: {
    backgroundColor: 'rgba(0,0,0,.5)',
    width: '100%',
    position: 'absolute',
    zIndex: 999999,
    padding: wp(2),
  },
  chatnametext: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});
