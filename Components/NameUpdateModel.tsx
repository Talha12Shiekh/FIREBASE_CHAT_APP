import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {RefObject} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface NameUpdateModelPropsTypes {
  modalopen: boolean;
  setmodalopen: React.Dispatch<React.SetStateAction<boolean>>;
  onSavePress: () => void;
  value: string;
  setnamevalue: React.Dispatch<React.SetStateAction<string>>;
  inputref: RefObject<TextInput>;
}

const NameUpdateModel = ({
  modalopen,
  setmodalopen,
  onSavePress,
  value,
  setnamevalue,
  inputref,
}: NameUpdateModelPropsTypes) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalopen}
      onRequestClose={() => setmodalopen(false)}>
      <Pressable
        style={{...StyleSheet.absoluteFillObject}}
        onPress={() => setmodalopen(false)}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modaltext}>Enter Your name</Text>
          <View style={styles.textinputcontainer}>
            <TextInput
              value={value}
              onChangeText={t => setnamevalue(t)}
              placeholder="Name"
              style={styles.input}
              ref={inputref}
              selectTextOnFocus
            />
          </View>
          <View style={styles.btnscontainer}>
            <Pressable onPress={() => setmodalopen(false)}>
              <Text style={styles.btntext}>Cancel</Text>
            </Pressable>
            <Pressable onPress={onSavePress}>
              <Text style={styles.btntext}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NameUpdateModel;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp(90),
    height: hp(20),
    padding: wp(5),
    justifyContent: 'space-between',
    marginBottom: wp(2),
  },
  modaltext: {
    color: 'black',
    fontSize: wp(3),
    fontFamily: 'Poppins-Regular',
  },
  textinputcontainer: {
    width: '100%',
    height: hp(5),
  },
  input: {
    width: '100%',
    fontFamily: 'Poppins-Regular',
    paddingBottom: -2,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: wp(3),
  },
  btnscontainer: {
    flexDirection: 'row',
    gap: wp(10),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btntext: {
    fontFamily: 'Poppins-Regular',
    marginBottom: -wp(2),
    color: 'black',
  },
});
