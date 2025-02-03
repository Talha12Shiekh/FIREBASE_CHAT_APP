import React, {useState} from 'react';
import ImageAndInputScreen from './ImageAndInputScreen';
import SigninImage from '../assets/images/SIGN-IN-IMAGE.jpg';
import auth from '@react-native-firebase/auth';

interface CredentialsType {
  name?: string;
  email: string;
  password: string;
}

const SignIn = () => {
  const [userloading, setuserloading] = useState(false);

  const [credentials, setcredentials] = useState<CredentialsType>({
    email: '',
    password: '',
  });

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
    await auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    );
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
