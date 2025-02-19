import React, {useState} from 'react';
import ImageAndInputScreen from './ImageAndInputScreen';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../Context/AuthContext';
import {Alert} from 'react-native';

interface CredentialsType {
  name: string;
  email: string;
  password: string;
  image?: string;
}

const SignUp = () => {
  const [loadinguser, setloadinguser] = useState(false);
  const {register} = useAuth();

  const [credentials, setcredentials] = useState<CredentialsType>({
    name: '',
    email: '',
    password: '',
    image: '',
  });

  const {name, email, password, image} = credentials;

  function handleChangeCredentials(
    name: keyof typeof credentials,
    value: string,
  ) {
    setcredentials(p => ({
      ...p,
      [name]: value,
    }));
  }

  async function handleButtonClick() {
    try {
      setloadinguser(true);

      await auth().createUserWithEmailAndPassword(email, password);

      setloadinguser(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ImageAndInputScreen
      toptext="Sign Up"
      btntext="Sign Up"
      handleActionofButtonClick={handleButtonClick}
      credentials={credentials}
      handleChangeCredentials={handleChangeCredentials}
      topimage={''}
      btnloading={loadinguser}
    />
  );
};

export default SignUp;
