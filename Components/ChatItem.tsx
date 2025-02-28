import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import {CHAT_HEIGHT} from '../Constants';
import ProfileImage from '../assets/images/profile.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {UserDataType} from '../Screens/Home';
import {ChatRoomNavigationProps} from './ChatsList';

function initTitle(name: string) {
  console.log(name);
  return <Text style={styles.title}>{name}</Text>;
}

function initTime() {
  return <Text style={[styles.time, {color: 'grey'}]}>Time</Text>;
}

function initDescription() {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View>
        <Text style={{color: 'grey', fontFamily: 'Poppins-Regular'}}>
          Helllo world
        </Text>
      </View>
    </View>
  );
}

interface ChatItemProps {
  noBorder: boolean;
  item: UserDataType;
  navigation: ChatRoomNavigationProps;
}

const ChatItem = ({noBorder, item, navigation}: ChatItemProps) => {
  console.log(item);
  const {username, userimage} = item;
  return (
    <>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate('ChatRoom', {item})}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.1)', false)}>
        <View
          style={[
            styles.chat,
            {
              height: CHAT_HEIGHT,
              borderBottomWidth: noBorder ? 0 : 0.5,
              paddingLeft: wp(4),
            },
          ]}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                height: hp(5.5),
                aspectRatio: 1,
                borderRadius: 50,
                marginRight: wp(3),
                overflow: 'hidden',
              }}>
              <Image
                source={userimage ? {uri: userimage} : ProfileImage}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                  transform: [
                    {
                      scale: userimage == '' ? 1.5 : 1,
                    },
                  ],
                }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.chatTextContainer,
              {alignItems: 'center', marginTop: wp(1)},
            ]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.titleContainer}>{initTitle(username)}</View>
              <View style={styles.timeContainer}>{initTime()}</View>
            </View>
            <View style={{flex: 1, marginTop: wp(2), flexDirection: 'row'}}>
              <View style={{flex: 3, justifyContent: 'flex-start'}}>
                {initDescription()}
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  chat: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: wp(4),
    borderBottomColor: 'grey',
  },
  chatsContainer: {
    flex: 1,
  },
  title: {
    fontSize: wp(4),
    fontFamily: 'Poppins-Regular',
  },
  time: {
    fontWeight: '500',
    fontSize: wp(3),
    marginRight: wp(5),
    fontFamily: 'Poppins-Regular',
  },
  chatTextContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  timeContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});
