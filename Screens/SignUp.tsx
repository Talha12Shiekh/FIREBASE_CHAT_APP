import React, {useState} from 'react';
import ImageAndInputScreen from './ImageAndInputScreen';
import {useAuth} from '../Context/AuthContext';
import {Alert} from 'react-native';

interface CredentialsType {
  name: string;
  email: string;
  password: string;
}

// tkkh123@gmail.com
// tkh123

const SignUp = () => {
  const [loadinguser, setloadinguser] = useState(false);
  const {register} = useAuth();

  const [credentials, setcredentials] = useState<CredentialsType>({
    name: '',
    email: '',
    password: '',
  });

  const {name, email, password} = credentials;

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

      const response = await register(email, password, name);

      if (!response.success) {
        Alert.alert('Sign Up', response?.message);
      }

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
