import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import { BG_COLOR } from "./Constants";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG_COLOR
    },
    imgandinputcontainer: {
      flex: 5,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    btncontainer: {
      flex: 1,
      justifyContent: "flex-end",
      marginBottom: wp(5)
    },
    image: {
      width: wp(80),
      height: wp(100),
    },
    inptcontainer: {
      flex: 1,
      width: "100%",
    },
    input: {
      width: "95%",
      backgroundColor: "black",
      alignSelf: "center",
      borderRadius: 50,
      color: "white",
      fontSize: wp(3),
      paddingHorizontal: wp(4),
      fontFamily: "Poppins-Regular",
      paddingBottom: 5,
    },
    inputplaceholder: {
      fontSize: wp(3.5),
      fontFamily: "Poppins-Regular",
      marginLeft: wp(6),
      marginBottom: wp(1)
    },
    topheading: {
      textAlign: "center",
      fontSize: wp(7),
      fontFamily: "Poppins-Regular",
      color: "black",
      fontWeight:"bold",
    },
    pswrdInptContainer: {
      position: "relative",
    },
    eyeiconContainer: {
      position: "absolute",
      right: wp(8),
      bottom: 12,
    },
    dontworrytext:{
      fontFamily: "Poppins-Regular",
      fontSize:wp(3),
      marginHorizontal:wp(3),
      alignSelf:"center",
      textAlign:"center",
      marginVertical:wp(4)
    },
    frgtpswrdcontainer:{
      flex:1,
    }
  })