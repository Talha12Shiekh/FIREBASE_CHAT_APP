import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {TOP_BAR_COLOR} from '../Constants';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ProfileIcon from 'react-native-vector-icons/Feather';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import {useAuth} from '../Context/AuthContext';
import ProfileImage from '../assets/images/profile.png';
import firestore from '@react-native-firebase/firestore';
import {UserDataType} from '../Screens/Home';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {Appearance} from 'react-native';

export const Divider = () => {
  return <View style={styles.divider} />;
};

Appearance.setColorScheme('light');

interface MenuItemProps {
  text: string;
  icon: React.JSX.Element;
  onSelect: () => void;
}

export const MenuItem = ({text, icon, onSelect}: MenuItemProps) => {
  return (
    <MenuOption onSelect={onSelect}>
      <View style={styles.menuitemcontainer}>
        <Text style={styles.menutext}>{text}</Text>
        {icon}
      </View>
    </MenuOption>
  );
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

const HomeHeader = () => {
  const {logout, user, updateUser, getUserFromStorage} = useAuth();

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [userData, setUserData] = useState<UserDataType | null>(null);

  const isFetching = useRef(false);

  useEffect(() => {
    if (!user?.uid || isFetching.current) return;

    try {
      const fetchUser = async () => {
        isFetching.current = true;
        const querysnapshot = await firestore()
          .collection('Users')
          .where('userId', '==', user?.uid)
          .get();

        querysnapshot.forEach(q => {
          let data = q.data() as UserDataType;
          setUserData(data);
        });
      };

      const getStoredUser = async () => {
        if (isFetching.current) return; // checking if the program has gone through fetchUser function if it has then do not execute this function

        const storedUser = await getUserFromStorage();

        let storedUserData = {
          username: storedUser?.displayName,
          userimage: storedUser?.photoURL,
          userId: storedUser?.uid,
        } as UserDataType;

        if (storedUser) {
          setUserData(storedUserData);
          isFetching.current = true;
        } else {
          await fetchUser();
        }
      };

      getStoredUser();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    if (!userData) return;
    try {
      async function handleUpdateUser() {
        await updateUser({
          displayName: userData?.username,
          photoURL: userData?.userimage,
        });
      }

      handleUpdateUser();
    } catch (error) {
      console.log(error);
    }
  }, [userData]);

  async function handleLogout() {
    await logout();
  }

  function handleLogoutButtonPress() {
    Alert.alert('Logout !', 'Are you sure do you want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'YES', onPress: handleLogout},
    ]);
  }

  let profileimage = null;
  if (user?.photoURL) profileimage = {uri: user?.photoURL};
  else profileimage = null;

  return (
    <View style={styles.topHeader}>
      <View>
        <Text style={styles.lefttext}>Chats</Text>
      </View>
      <Menu>
        <MenuTrigger>
          <View style={[styles.profilecontainer]}>
            <Image
              source={profileimage == null ? ProfileImage : profileimage}
              style={{
                width: '100%',
                height: '100%',
                transform: [{scale: profileimage == null ? 1.6 : 1}],
              }}
              resizeMode="cover"
            />
          </View>
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              marginTop: wp(10),
              marginLeft: wp(-2),
              borderRadius: 10,
              borderCurve: 'continuous',
              shadowColor: '#000',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 10,
            },
          }}>
          <MenuItem
            text="Profile"
            icon={<ProfileIcon name="user" color="grey" size={wp(5)} />}
            onSelect={() => navigation.navigate('Profile')}
          />
          <Divider />
          <MenuItem
            text="Logout"
            icon={<LogoutIcon name="logout" color="grey" size={wp(5)} />}
            onSelect={handleLogoutButtonPress}
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: TOP_BAR_COLOR,
    paddingTop: wp(8),
    paddingHorizontal: wp(5),
    paddingBottom: wp(5),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lefttext: {
    color: 'white',
    fontSize: wp(5),
    fontFamily: 'Poppins-Regular',
  },
  profilecontainer: {
    width: wp(10),
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
  },
  menuitemcontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: wp(1),
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  menutext: {
    fontFamily: 'Poppins-Regular',
    marginTop: wp(1),
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: 'grey',
  },
});
