import React, {useState} from 'react';
import ImageAndInputScreen from './ImageAndInputScreen';

interface CredentialsType {
  name: string;
  email: string;
  password: string;
  image?: string;
}

const SignUp = () => {
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

  return (
    <ImageAndInputScreen
      toptext="Sign Up"
      btntext="Sign Up"
      handleActionofButtonClick={() => {}}
      credentials={credentials}
      handleChangeCredentials={handleChangeCredentials}
      topimage={''}
    />
  );
};

export default SignUp;
