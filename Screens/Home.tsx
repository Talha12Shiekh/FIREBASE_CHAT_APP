import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../Components/HomeHeader';
import ChatsList from '../Components/ChatsList';
import {TOP_BAR_COLOR} from '../Constants';
import {useAuth} from '../Context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import EmptyChatsScreen from './EmptyChatsScreen';
import SkeletonLoader from '../Components/SkeletonLoader';

export interface UserDataType {
  username: string;
  userimage: string;
  userId: string;
}

const Home = () => {
  const [users, setusers] = useState<UserDataType[]>([]);
  const [usersloaded, setusersloaded] = useState(false);

  const {user} = useAuth();

  async function getUsers() {
    setusersloaded(true);
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

    setusersloaded(false);
    setusers(userdata);
  }

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);

  if (usersloaded) {
    return (
      <>
        <HomeHeader />
        <SkeletonLoader />
      </>
    );
  } else {
    return (
      <>
        <HomeHeader />
        {users.length > 0 ? <ChatsList users={users} /> : <EmptyChatsScreen />}
      </>
    );
  }
};

export default Home;
