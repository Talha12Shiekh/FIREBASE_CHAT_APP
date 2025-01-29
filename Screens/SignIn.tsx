import React, {useState} from 'react';
import ImageAndInputScreen from './ImageAndInputScreen';
import SigninImage from '../assets/images/SIGN-IN-IMAGE.jpg';

interface CredentialsType {
  name?: string;
  email: string;
  password: string;
}

const SignIn = () => {
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

  return (
    <ImageAndInputScreen
      toptext="Sign In"
      btntext="Sign In"
      handleActionofButtonClick={() => {}}
      credentials={credentials}
      handleChangeCredentials={handleChangeCredentials}
      topimage={SigninImage}
    />
  );
};

export default SignIn;
