import { ActivityIndicator, Animated, Image, ImageSourcePropType, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import SingleButton  from '../Components/SingleButton'
import BackButton from '../Components/BackButton'
import ImagePicker from "../Components/ImagePicker";
import EyeIcon from "react-native-vector-icons/Entypo";
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from "../styles";
import ImagePickerContainer from '../Components/ImagePickerContainer';

interface ImageAndInputScreenPropsTypes {
    toptext:string,
    btntext:string,
    handleActionofButtonClick:() => void,
    credentials:{email:string,password:string,image?:string},
    handleChangeCredentials:(field:string,value:string) => void,
    setcredentials:React.Dispatch<React.SetStateAction<{
        email:string,
        password:string,
        image?:string
    }>>,
    topimage?:ImageSourcePropType | undefined | string
}

const ImageAndInputScreen = ({ toptext, btntext, handleActionofButtonClick, credentials, handleChangeCredentials, setcredentials, topimage }:ImageAndInputScreenPropsTypes) => {

  const [showpswrd, setshowpswrd] = useState(true);

  const [isKeyboardVisible, setisKeyboardVisible] = useState(false);

  const navigation = useNavigation();

  const route = useRoute();

//   const userloading = useGetUserLoading();

  const { email, password } = credentials;


  function handleButtonClick() {
    handleActionofButtonClick()
    setcredentials({
      email: "",
      password: "",
      image: ""
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
            <View style={[styles.inptcontainer, {justifyContent: isKeyboardVisible ? "center" : "flex-start"}]}>
              <View style={{marginBottom:wp(8)}}>

                <Text style={styles.inputplaceholder}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={t => handleChangeCredentials("email", t)}
                  value={email}
                  placeholder='xyz@gmail.com'
                />
              </View>
              <View style={styles.pswrdInptContainer}>

                <Text style={styles.inputplaceholder}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={showpswrd}
                  value={password}
                  placeholder='••••••••'
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
              <View style={styles.frgtpswrdcontainer}>

                {route.name === "SignIn" && <View style={{ alignSelf: "flex-end", marginRight: wp(5), marginTop: wp(5) }}>
                  <TouchableOpacity onPress={() => []}>
                    <Text >Forget Password ?</Text>
                  </TouchableOpacity>
                </View>}
              </View>
            </View>
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
        </View>

      </KeyboardAvoidingView>
    </View>
  )
}

export default ImageAndInputScreen
