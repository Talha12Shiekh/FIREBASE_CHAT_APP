import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAuth} from '../Context/AuthContext';

const Home = () => {
  const {logout} = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
