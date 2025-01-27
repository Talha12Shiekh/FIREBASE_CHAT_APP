import React, { useState } from 'react'
import ImageAndInputScreen from './ImageAndInputScreen'

interface CredentialsType {
  email:string,
  password:string,
}

const SignIn = () => {

  const [credentials, setcredentials] = useState<CredentialsType>({
    email: "",
    password: "",
  });


  function handleChangeCredentials(name:keyof typeof credentials, value:string) {
    setcredentials(p => ({
      ...p,
      [name]: value
    }))
  }
  
  return <ImageAndInputScreen
  toptext="Sign In" 
  btntext='Sign In'
  handleActionofButtonClick={() => {}}
  credentials={credentials}
  handleChangeCredentials={handleChangeCredentials}
  topimage={""}
  />
}

export default SignIn;