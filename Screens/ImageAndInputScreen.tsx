import { ActivityIndicator, ImageSourcePropType, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SingleButton from '../Components/SingleButton'
import BackButton from '../Components/BackButton';
import EyeIcon from "react-native-vector-icons/Entypo";
import ProfileIcon from "react-native-vector-icons/Ionicons";
import MailIcon from "react-native-vector-icons/AntDesign";
import LockIcon from "react-native-vector-icons/AntDesign";
import { styles } from "../styles";
import ImagePickerContainer from '../Components/ImagePickerContainer';

interface ImageAndInputScreenPropsTypes {
  toptext: string,
  btntext: string,
  handleActionofButtonClick: () => void,
  credentials: { email: string, password: string,name: string, image?: string },
  handleChangeCredentials: (field: string, value: string) => void,
  setcredentials: React.Dispatch<React.SetStateAction<{
    email: string,
    password: string,
    name:string,
    image?: string
  }>>,
  topimage?: ImageSourcePropType | undefined | string
}

const ImageAndInputScreen = ({ toptext, btntext, handleActionofButtonClick, credentials, handleChangeCredentials, setcredentials, topimage }: ImageAndInputScreenPropsTypes) => {

  const [showpswrd, setshowpswrd] = useState(true);

  const [isKeyboardVisible, setisKeyboardVisible] = useState(false);

  const { email, password } = credentials;


  function handleButtonClick() {
    handleActionofButtonClick()
    setcredentials({
      email: "",
      password: "",
      image: "",
      name:""
    });
  }



  return (

    <View style={styles.container}>
      <View>
        <BackButton />
      </View>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>

          <View style={styles.imgandinputcontainer}>
            <ImagePickerContainer
              isKeyboardVisible={isKeyboardVisible}
              setisKeyboardVisible={setisKeyboardVisible}
              topimage={topimage}
            />
            <Text style={styles.topheading}>{toptext}</Text>
            <View style={[styles.inptcontainer, { justifyContent: isKeyboardVisible ? "center" : "flex-start" }]}>
              <View style={styles.singleinput}>
                <View style={styles.inpticoncontainer}>
                  <ProfileIcon
                    size={20}
                    color="grey"
                    name='person-outline'
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={t => handleChangeCredentials("email", t)}
                  value={email}
                  placeholder='Username'
                  placeholderTextColor={"grey"}
                />
              </View>
              <View style={styles.singleinput}>
              <View style={styles.inpticoncontainer}>
                  <MailIcon
                    size={20}
                    color="grey"
                    name='mail'
                  />
                </View>
                <TextInput
                  keyboardType="email-address"
                  style={styles.input}
                  onChangeText={t => handleChangeCredentials("email", t)}
                  value={email}
                  placeholder='Email address'
                  placeholderTextColor={"grey"}
                />
              </View>

              <View style={styles.singleinput}>
              <View style={styles.inpticoncontainer}>
                  <LockIcon
                    size={25}
                    color="grey"
                    name='lock'
                  />
                </View>
                <TextInput
                  style={styles.input}
                  secureTextEntry={showpswrd}
                  value={password}
                  placeholder='Password'
                  placeholderTextColor={"grey"}
                  onChangeText={p => handleChangeCredentials("password", p)}
                />
                <TouchableOpacity onPress={() => setshowpswrd(p => !p)} style={styles.eyeiconContainer}>

                  <View >
                    <EyeIcon
                      name={showpswrd ? "eye" : "eye-with-line"}
                      color="white"
                      size={15}
                    />
                  </View>
                </TouchableOpacity>

              </View>

              <View style={styles.btncontainer}>
                {false ? <ActivityIndicator
                  size="large"
                  color={"green"}
                /> : <SingleButton
                  text={btntext}
                  onPress={handleButtonClick}
                />}
              </View>
              {/* <View style={styles.frgtpswrdcontainer}>

                {route.name === "SignIn" && <View style={{ alignSelf: "flex-end", marginRight: wp(5), marginTop: wp(5) }}>
                  <TouchableOpacity onPress={() => []}>
                    <Text >Forget Password ?</Text>
                  </TouchableOpacity>
                </View>}
              </View> */}

            </View>

          </View>


        </View>

      </KeyboardAvoidingView>
    </View>
  )
}

export default ImageAndInputScreen
