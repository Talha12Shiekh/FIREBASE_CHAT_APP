import React, {useState} from 'react';
import ImageAndInputScreen from './ImageAndInputScreen';
import SigninImage from '../assets/images/SIGN-IN-IMAGE.jpg';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../Context/AuthContext';
import {Alert} from 'react-native';

interface CredentialsType {
  name?: string;
  email: string;
  password: string;
}

const SignIn = () => {
  const [userloading, setuserloading] = useState(false);

  const {login} = useAuth();

  const [credentials, setcredentials] = useState<CredentialsType>({
    email: '',
    password: '',
  });

  const {email, password} = credentials;

  function handleChangeCredentials(
    name: keyof typeof credentials,
    value: string,
  ) {
    setcredentials(p => ({
      ...p,
      [name]: value,
    }));
  }

  async function handleSignIn() {
    setuserloading(true);

    try {
      const loginresponse = await login(email, password);

      if (!loginresponse.success) {
        Alert.alert('Sign Up', loginresponse?.message);
      }
    } catch (error) {
      console.log(error);
    }

    setuserloading(false);
  }

  return (
    <ImageAndInputScreen
      toptext="Sign In"
      btntext="Sign In"
      handleActionofButtonClick={handleSignIn}
      credentials={credentials}
      handleChangeCredentials={handleChangeCredentials}
      topimage={SigninImage}
      btnloading={userloading}
    />
  );
};

export default SignIn;
