import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
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

export const Divider = () => {
  return <View style={styles.divider} />;
};

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

const HomeHeader = () => {
  const {logout} = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <View style={styles.topHeader}>
      <View>
        <Text style={styles.lefttext}>Chats</Text>
      </View>

      <Menu>
        <MenuTrigger>
          <View>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/ogw/AF2bZyjgB91ELP7yyhHM_AlDZMXQ2xFy_2xbXEoVqsT5LkW8xg=s32-c-mo',
              }}
              resizeMode="cover"
              style={styles.profilecontainer}
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
            onSelect={() => {}}
          />
          <Divider />
          <MenuItem
            text="Logout"
            icon={<LogoutIcon name="logout" color="grey" size={wp(5)} />}
            onSelect={handleLogout}
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
