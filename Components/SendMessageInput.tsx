import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SendIcon from 'react-native-vector-icons/Feather';

const SendMessageInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inptcontainer}>
        <TextInput
          placeholderTextColor="grey"
          placeholder="Type Message..."
          multiline
          style={styles.input}
        />
        <View style={styles.sendiconcontainer}>
          <TouchableOpacity>
            <View style={styles.sendicon}>
              <SendIcon name="send" color="grey" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendMessageInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inptcontainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    position: 'relative',
    alignSelf: 'flex-end',
  },
  input: {
    width: '100%',
    borderRadius: 20,
    color: 'black',
    paddingHorizontal: wp(3),
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: 'grey',
    paddingTop: wp(3),
  },
  sendiconcontainer: {
    position: 'absolute',
    right: 20,
  },
  sendicon: {
    width: wp(9),
    aspectRatio: 1,
    backgroundColor: 'rgba(0,0,0,.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
