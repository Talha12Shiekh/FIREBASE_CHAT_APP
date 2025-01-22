import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BTN_COLOR } from "../Constants";

type SingleButtonProps = {
    text: string,
    onPress: () => void
}

const SingleButton = ({ text, onPress }: SingleButtonProps) => <TouchableOpacity onPress={onPress}>
    <View style={styles.singlebtn}>
        <Text style={styles.btntext}>{text}</Text>
    </View>
</TouchableOpacity>;

const styles = StyleSheet.create({
    singlebtn: {
        width: "90%",
        backgroundColor: BTN_COLOR,
        padding: wp(2.5),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        alignSelf: "center",
        flexDirection: "row"
    },
    btntext: {
        fontFamily: "Poppins-Regular",
        color: "white",
        fontSize: wp(5),
    },
})

export default SingleButton;