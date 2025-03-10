import {StyleSheet, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SkeletonLoader = () => {
  const NUM_OF_SKELETONS = 3;
  const ARRAY = Array(NUM_OF_SKELETONS).fill('');
  return (
    <>
      {ARRAY.map((e, i) => (
        <View key={`skeleton-${i}`} style={styles.skeletonContainer}>
          <SkeletonPlaceholder highlightColor={'#757575'}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.profileskeleton} />
              <View style={styles.chatnameandtimeskeleton}>
                <View style={styles.headerContainer}>
                  <View style={styles.nameskeleton} />
                  <View style={styles.timeskeleton} />
                </View>
                <View style={styles.secondskeleton} />
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    marginHorizontal: wp(4),
    paddingVertical: wp(4),
  },
  profileskeleton: {
    height: hp(5.5),
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: wp(3),
  },
  chatnameandtimeskeleton: {
    width: '82%',
    flexDirection: 'column',
    marginTop: wp(1.5),
    height: hp(7),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameskeleton: {
    width: '40%',
    borderRadius: 100,
    height: hp(2),
  },
  secondskeleton: {
    width: '50%',
    borderRadius: 100,
    height: hp(1.5),
    marginTop: hp(1),
  },
  timeskeleton: {
    width: '15%',
    borderRadius: 100,
    height: hp(2),
  },
});

export default SkeletonLoader;
