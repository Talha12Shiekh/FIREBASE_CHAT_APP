import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ImageAndInputScreen from './ImageAndInputScreen'

const SignUp = () => {

  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  function handleChangeCredentials(name:string, value:string) {
    setcredentials(p => ({
      ...p,
      [name]: value
    }))
  }
  
  return <ImageAndInputScreen
  toptext="Sign Up" 
  btntext='Sign Up'
  handleActionofButtonClick={() => {}}
  credentials={credentials}
  handleChangeCredentials={handleChangeCredentials}
  setcredentials={setcredentials}
  topimage={""}
  />
}

export default SignUp

const styles = StyleSheet.create({
  container: { flex: 1 }
})