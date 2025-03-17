import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ImagePicker from '../Components/ImagePicker';
import {Userimage} from '../Components/ImagePickerContainer';
import {useAuth} from '../Context/AuthContext';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {formatDate} from '../Constants';
import ProfileIcon from 'react-native-vector-icons/Ionicons';
import MailIcon from 'react-native-vector-icons/AntDesign';
import TimeIcon from 'react-native-vector-icons/Fontisto';
import NameUpdateModel from '../Components/NameUpdateModel';

interface UserInformationComponentProps {
  onPress?: () => void;
  icon: React.JSX.Element;
  heading: string;
  value: string | null | undefined;
}

export const UserInformationComponent = ({
  onPress,
  icon,
  heading,
  value,
}: UserInformationComponentProps) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.1)', false)}>
      <View style={styles.userinformationcontainer}>
        <View>{icon}</View>
        <View>
          <Text style={styles.userinformationtextheading}>{heading}</Text>
          <Text style={styles.userinformationtextvalue}>{value}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const Profile = () => {
  const ICON_SIZE = 25;

  const {user, handleUpdateUserInFirebase, updateUser} = useAuth();
  const [userimage, setuserimage] = useState<Userimage | null>(
    user?.photoURL ? {uri: user.photoURL} : null,
  );

  const [shownamemodal, setshownamemodal] = useState(false);

  const usercreatedtime = new Date(user?.metadata.creationTime ?? new Date());

  const [namevalue, setnamevalue] = useState<string>(user?.displayName ?? '');

  const [nameupdated, setnameupdated] = useState(false);

  async function handleSaveButtonPress() {
    try {
      setnameupdated(true);
      setshownamemodal(false);
      await handleUpdateUserInFirebase(user, {username: namevalue});
      await updateUser({displayName: namevalue});
      ToastAndroid.show('Name Updated Successfully !', ToastAndroid.SHORT);
      setnameupdated(false);
    } catch (error) {
      console.log(error);
    }
  }

  const nameInputRef = useRef<TextInput | null>(null);

  return (
    <View>
      <NameUpdateModel
        modalopen={shownamemodal}
        setmodalopen={setshownamemodal}
        onSavePress={handleSaveButtonPress}
        value={namevalue}
        setnamevalue={setnamevalue}
        inputref={nameInputRef}
      />
      <View style={{alignItems: 'center'}}>
        <ImagePicker
          setuserimage={setuserimage}
          userimage={userimage}
          topimage={undefined}
          isProfileScreen
        />
      </View>
      <UserInformationComponent
        onPress={() => {
          setshownamemodal(true);
          setnamevalue(user?.displayName ?? '');
          setTimeout(() => nameInputRef.current?.focus(), 200);
        }}
        icon={
          <ProfileIcon size={ICON_SIZE} color="grey" name="person-outline" />
        }
        heading="Name"
        value={nameupdated ? 'Updating...' : user?.displayName}
      />
      <UserInformationComponent
        icon={<MailIcon size={ICON_SIZE} color="grey" name="mail" />}
        heading="Email"
        value={user?.email}
      />
      <UserInformationComponent
        icon={<TimeIcon size={ICON_SIZE} color="grey" name="date" />}
        heading="Created At"
        value={
          formatDate(usercreatedtime) + ' ' + usercreatedtime.getFullYear()
        }
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userinformationcontainer: {
    paddingHorizontal: wp(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
    paddingVertical: wp(4),
  },
  userinformationtextheading: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp(3.5),
  },
  userinformationtextvalue: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp(2.5),
    color: 'grey',
  },
});
