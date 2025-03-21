import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {BTN_COLOR} from '../Constants';
import {styles} from '../styles';

type SingleButtonProps = {
  text: string;
  onPress: () => void;
};

const SingleButton = ({text, onPress}: SingleButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.singlebtn}>
      <Text style={styles.btntext}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default SingleButton;
