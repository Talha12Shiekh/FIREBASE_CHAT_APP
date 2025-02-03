import React, {useState} from 'react';
import ImageAndInputScreen from './ImageAndInputScreen';
import auth from '@react-native-firebase/auth';

interface CredentialsType {
  name: string;
  email: string;
  password: string;
  image?: string;
}

const SignUp = () => {
  const [loadinguser, setloadinguser] = useState(false);

  const [credentials, setcredentials] = useState<CredentialsType>({
    name: '',
    email: '',
    password: '',
    image: '',
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

  async function handleButtonClick() {
    setloadinguser(true);
    await auth().createUserWithEmailAndPassword(
      credentials.email,
      credentials.password,
    );
    setloadinguser(false);
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
