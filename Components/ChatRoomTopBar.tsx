import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackIcon from 'react-native-vector-icons/Ionicons';
import CallIcon from 'react-native-vector-icons/Ionicons';
import VideoIcon from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {UserDataType} from '../Screens/Home';
import {useNavigation} from '@react-navigation/native';
import ProfileImage from '../assets/images/profile.png';

const ChatRoomTopBar = ({item}: {item: UserDataType}) => {
  const navigation = useNavigation();

  let chatuserimage = null;
  if (item.userimage) chatuserimage = {uri: item.userimage};

  return (
    <View>
      <View style={styles.topbar}>
        <View style={styles.profileandnamecontainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backicon}>
              <BackIcon name="chevron-back" color="grey" size={22} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.profileandnamecontainer, {gap: wp(3)}]}>
              <View style={styles.profilecontainer}>
                <View style={styles.profileimage}>
                  <Image
                    source={
                      chatuserimage == null ? ProfileImage : chatuserimage
                    }
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: [
                        {
                          scale: chatuserimage == null ? 1.5 : 1,
                        },
                      ],
                    }}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View>
                <Text style={styles.username}>{item.username}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.calliconscontainer}>
          <TouchableOpacity>
            <CallIcon name="call" color="grey" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <VideoIcon name="video" color="grey" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatRoomTopBar;

const styles = StyleSheet.create({
  topbar: {
    width: '100%',
    justifyContent: 'space-between',
    padding: wp(3),
    paddingTop: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  },
  profileimage: {
    width: wp(9),
    aspectRatio: 1,
    backgroundColor: 'white',
  },
  profileandnamecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(5),
  },
  calliconscontainer: {
    flexDirection: 'row',
    gap: wp(8),
    paddingRight: wp(2),
  },
  backicon: {},
  profilecontainer: {
    borderRadius: '50%',
    overflow: 'hidden',
  },
  username: {
    fontSize: wp(4),
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },
});
