import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CameraIcon from "react-native-vector-icons/Entypo";
import ImagePickerPackage from 'react-native-image-crop-picker';
import ProfileImage from "../assets/images/profile.png";
import { useRoute } from '@react-navigation/native';

type TopImagetypes = {
    topimage:ImageSourcePropType | undefined | string
}

const ImagePicker = ({ topimage }:TopImagetypes) => {

    function handleImagePicking() {
        ImagePickerPackage.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            cropperCircleOverlay: true
        }).then(({ path }) => {
            // setuserimage({ uri: path });
        });
    }

    const route = useRoute();

    let imagetoshow = undefined;

    let userimage = null;

    if (route.name !== "SignUp") imagetoshow = topimage;
    else if (userimage == null) imagetoshow = ProfileImage;
    else imagetoshow = userimage;

    return (
        <View style={[styles.pickercontainer, { backgroundColor: "transparent" }]}>
            <Image
                source={imagetoshow}
                resizeMode='cover'
                style={{ width: "100%", height: "100%", borderRadius: 100, transform: [{ scale: route.name == "SignUp" ? (userimage == null ? 1.6 : 1) : 1.3 }] }}
            />
            {route.name == "SignUp" && <TouchableOpacity style={styles.camerabtn} onPress={handleImagePicking}>

                <View style={styles.cameraContainer}>
                    <CameraIcon
                        name="camera"
                        size={25}
                        color="white"
                    />
                </View>
            </TouchableOpacity>}
        </View>
    )
}

export default ImagePicker

const styles = StyleSheet.create({
    pickercontainer: {
        width: wp(50),
        aspectRatio: 1,
        borderRadius: 100,
        marginVertical: wp(10),
        position: "relative",
    },
    cameraContainer: {
        width: wp(12),
        aspectRatio: 1,
        backgroundColor: "green",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    camerabtn: {
        position: "absolute",
        right: 0,
        bottom: wp(5)
    }
})