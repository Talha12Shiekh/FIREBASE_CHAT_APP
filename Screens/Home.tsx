import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAuth} from '../Context/AuthContext';
import HomeHeader from '../Components/HomeHeader';

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1},
});
