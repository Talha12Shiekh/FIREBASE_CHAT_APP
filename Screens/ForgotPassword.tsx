import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../Components/BackButton';
import {styles} from '../styles';
import ImagePickerContainer from '../Components/ImagePickerContainer';
import topimage from '../assets/images/FORGOT-PSWRD-IMG.jpg';
import SingleButton from '../Components/SingleButton';
import {SingleInput} from './ImageAndInputScreen';
import ForgotPasswordIcon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../Context/AuthContext';

const ForgotPassword = () => {
  const [isKeyboardVisible, setisKeyboardVisible] = useState(false);
  const [email, setemail] = useState('');

  const {forgotpassword} = useAuth();

  const [loading, setloading] = useState(false);

  async function handleButtonClick() {
    if (email) {
      try {
        setloading(true);
        await forgotpassword(email);
        setloading(false);
        ToastAndroid.show('Email sent !', ToastAndroid.SHORT);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    } else {
      setloading(false);
    }

    setemail('');
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.imgandinputcontainer}>
            <ImagePickerContainer
              isKeyboardVisible={isKeyboardVisible}
              setisKeyboardVisible={setisKeyboardVisible}
              topimage={topimage}
            />
            <View
              style={[
                styles.inptcontainer,
                {justifyContent: isKeyboardVisible ? 'center' : 'flex-start'},
              ]}>
              <View>
                <Text style={styles.inputplaceholder}>Email</Text>
                <SingleInput
                  icon={
                    <ForgotPasswordIcon
                      name="password"
                      color="grey"
                      size={20}
                    />
                  }
                  onChangeText={e => setemail(e)}
                  value={email}
                  keyboardType="email-address"
                  placeholder={'xyz@gmail.com'}
                />
                <Text style={styles.dontworrytext}>
                  Don't worry, please enter your registered email, and we will
                  send an email to help you reset your password.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.btncontainer}>
            {loading ? (
              <ActivityIndicator size="large" color={'blue'} />
            ) : (
              <SingleButton text={'Send Email'} onPress={handleButtonClick} />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;
