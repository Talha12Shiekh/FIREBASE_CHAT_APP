import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../Components/HomeHeader';
import ChatsList from '../Components/ChatsList';
import {TOP_BAR_COLOR} from '../Constants';
import {useAuth} from '../Context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import EmptyChatsScreen from './EmptyChatsScreen';

export interface UserDataType {
  username: string;
  userimage: string;
  userId: string;
}

const Home = () => {
  const [users, setusers] = useState<UserDataType[]>([]);

  const {user} = useAuth();

  async function getUsers() {
    let userdata: UserDataType[] = [];

    // getting all the users that are logged in instead of the current user

    const querysnapshot = await firestore()
      .collection('Users')
      .where('userId', '!=', user?.uid)
      .get();

    querysnapshot.forEach(q => {
      let data = q.data() as UserDataType;
      userdata.push({...data});
    });

    setusers(userdata);
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
