import {
  ActivityIndicator,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SingleButton from '../Components/SingleButton';
import EyeIcon from 'react-native-vector-icons/Entypo';
import ProfileIcon from 'react-native-vector-icons/Ionicons';
import MailIcon from 'react-native-vector-icons/AntDesign';
import LockIcon from 'react-native-vector-icons/AntDesign';
import {styles} from '../styles';
import ImagePickerContainer from '../Components/ImagePickerContainer';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {BTN_COLOR} from '../Constants';

interface ImageAndInputScreenPropsTypes {
  toptext: string;
  btntext: string;
  handleActionofButtonClick: () => void;
  credentials: {email: string; password: string; name?: string; image?: string};
  handleChangeCredentials: (
    name: keyof ImageAndInputScreenPropsTypes['credentials'],
    value: string,
  ) => void;
  topimage?: ImageSourcePropType | undefined | string;
}

interface SingleInputProps extends TextInputProps {
  icon: React.ReactNode;
  onChangeText: (t: string) => void;
  value: string;
  placeholder: string;
  setshowpswrd?: React.Dispatch<React.SetStateAction<boolean>>;
  showpswrd?: boolean;
}

type BottomTextComponentProps = {
  text: string;
  onPress: () => void;
  screentonavigate: string;
};

type SignInNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn',
  'ForgotPassword'
>;

export const SingleInput = ({
  icon,
  onChangeText,
  value,
  placeholder,
  setshowpswrd,
  showpswrd,
  ...rest
}: SingleInputProps) => {
  return (
    <View style={styles.singleinput}>
      <View style={styles.inpticoncontainer}>{icon}</View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        {...rest}
      />
      {placeholder == 'Password' && setshowpswrd && (
        <TouchableOpacity
          onPress={() => setshowpswrd(p => !p)}
          style={styles.eyeiconContainer}>
          <View>
            <EyeIcon
              name={showpswrd ? 'eye' : 'eye-with-line'}
              color={'grey'}
              size={20}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const BottomTextComponent = ({
  text,
  onPress,
  screentonavigate,
}: BottomTextComponentProps) => {
  return (
    <View>
      <Text style={styles.alrdyacnttext}>
        {text}
        <TouchableWithoutFeedback onPress={onPress}>
          <Text style={styles.signintext}>{screentonavigate}</Text>
        </TouchableWithoutFeedback>
      </Text>
    </View>
  );
};

const ImageAndInputScreen = ({
  toptext,
  btntext,
  handleActionofButtonClick,
  credentials,
  handleChangeCredentials,
  topimage,
}: ImageAndInputScreenPropsTypes) => {
  const [showpswrd, setshowpswrd] = useState(true);

  const route = useRoute();

  const navigation = useNavigation<SignInNavigationProps>();

  const [isKeyboardVisible, setisKeyboardVisible] = useState(false);

  const {email, password, name} = credentials;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            paddingTop: isKeyboardVisible ? widthPercentageToDP(15) : 0,
          }}>
          <View style={[styles.imgandinputcontainer]}>
            <ImagePickerContainer
              isKeyboardVisible={isKeyboardVisible}
              setisKeyboardVisible={setisKeyboardVisible}
              topimage={topimage}
            />
            <Text style={styles.topheading}>{toptext}</Text>
            <View
              style={[
                styles.inptcontainer,
                {justifyContent: isKeyboardVisible ? 'center' : 'flex-start'},
              ]}>
              {route.name == 'SignUp' && (
                <SingleInput
                  icon={
                    <ProfileIcon size={20} color="grey" name="person-outline" />
                  }
                  onChangeText={t => handleChangeCredentials('name', t)}
                  value={name}
                  placeholder="Username"
                />
              )}
              <SingleInput
                icon={<MailIcon size={20} color="grey" name="mail" />}
                onChangeText={t => handleChangeCredentials('email', t)}
                value={email}
                placeholder="Email address"
                keyboardType="email-address"
              />
              <SingleInput
                icon={<LockIcon size={25} color="grey" name="lock" />}
                onChangeText={p => handleChangeCredentials('password', p)}
                value={password}
                placeholder="Password"
                setshowpswrd={setshowpswrd}
                showpswrd={showpswrd}
                secureTextEntry={showpswrd}
              />
              {route.name == 'SignIn' && (
                <View style={{width: '95%'}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.frgtpswrdstyles}>
                      Forgot Passowrd ?
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.btncontainer}>
                {false ? (
                  <ActivityIndicator size="large" color={BTN_COLOR} />
                ) : (
                  <SingleButton
                    text={btntext}
                    onPress={handleActionofButtonClick}
                  />
                )}
              </View>
              {route.name == 'SignUp' ? (
                <BottomTextComponent
                  text="Already have an account? "
                  onPress={() => navigation.navigate('SignIn')}
                  screentonavigate="Sign In"
                />
              ) : (
                <BottomTextComponent
                  text="Don't have an account? "
                  onPress={() => navigation.navigate('SignUp')}
                  screentonavigate="Sign Up"
                />
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ImageAndInputScreen;
