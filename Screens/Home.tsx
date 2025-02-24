import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../Components/HomeHeader';
import ChatsList from '../Components/ChatsList';
import {TOP_BAR_COLOR} from '../Constants';
import {useAuth} from '../Context/AuthContext';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const [users, setusers] = useState([1, 2, 3]);

  const {user} = useAuth();

  async function getUsers() {
    // getting all the users that are logged in instead of the current user
    let data = await firestore()
      .collection('Users')
      .where('userId', '!=', user?.uid)
      .get();

    console.log(data);
  }

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader />
      {users.length > 0 ? (
        <ChatsList users={users} />
      ) : (
        <View style={styles.loadingcontainer}>
          <ActivityIndicator color={TOP_BAR_COLOR} size="large" />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1},
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
