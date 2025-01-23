import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import { BG_COLOR, INPUT_BG_COLOR } from "./Constants";

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
      justifyContent: "flex-start",
      marginBottom: wp(5),
      width:"100%",
      marginVertical:wp(5)
    },
    image: {
      width: wp(80),
      height: wp(100),
    },
    inptcontainer: {
      flex: 1,
      width: "100%",
      marginVertical:wp(9)
    },
    input: {
      width:"100%", 
      color:"grey",
      fontSize: wp(3.5),
      paddingHorizontal: wp(4),
      fontFamily: "Poppins-Regular",
      paddingTop:15,
      paddingLeft:wp(9)
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
      color: "black",
      fontFamily: "Poppins-Regular",
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
    },
    singleinput:{
      marginVertical:wp(2),
      width:"95%",
      backgroundColor:INPUT_BG_COLOR,
      alignSelf:"center",
      padding:wp(1),
      borderRadius:10,
      position:"relative"
    },
    inpticoncontainer:{
      position:"absolute",
      left:0,
      justifyContent:"center",
      alignItems:"center",
      width:"10%",
      bottom:0,
      top:0,
      borderRadius:10
    }
  })