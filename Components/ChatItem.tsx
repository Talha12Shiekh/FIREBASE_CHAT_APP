import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import {CHAT_HEIGHT, TAB_PRESS_ACTIVE_WHITE_COLOR} from '../Constants';
import ProfileImage from '../assets/images/profile.png';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function initTitle() {
  return (
    <Text style={styles.title}>
      {/* {name?.length > 18 ? name.slice(0, 19) : name} */}
      Name
    </Text>
  );
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

const ChatItem = ({noBorder, item, index}) => {
  return (
    <>
      <TouchableNativeFeedback
        onPress={() => {}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.1)', false)}>
        <View
          style={[
            styles.chat,
            {
              height: CHAT_HEIGHT,
              borderBottomWidth: noBorder ? 0 : 0.5,
            },
          ]}>
          <TouchableOpacity onPress={() => {}}>
            <View>
              <Image
                source={ProfileImage}
                style={{
                  height: wp(18),
                  aspectRatio: 1,
                  borderRadius: 50,
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.chatTextContainer,
              {alignItems: 'center', marginTop: wp(1)},
            ]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.titleContainer}>{initTitle()}</View>
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
