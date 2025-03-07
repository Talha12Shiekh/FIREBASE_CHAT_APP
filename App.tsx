import React from 'react';
import {AuthContextProvider, useAuth} from './Context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home, {UserDataType} from './Screens/Home';
import SignUp from './Screens/SignUp';
import SignIn from './Screens/SignIn';
import ForgotPassword from './Screens/ForgotPassword';
import {MenuProvider} from 'react-native-popup-menu';
import ChatRoom from './Screens/ChatRoom';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  ChatRoom: {item: UserDataType};
};

// Talha shiekh
// tk.shiekh4567@gmail.com
// Talhashiekh_5

// Talha2
// tshiekh119@gmail.com
// Talha2

//https://www.figma.com/design/QP6EMSkbS7c1L1d9BPIdI1/Empty-State-Illustrations-Freebies-%E2%AD%90-(Community)?node-id=1-440&t=we4kgQRXjvsilI6s-0

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const {userAuthenticated} = useAuth();

  if (userAuthenticated) {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'SignUp'}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    );
  }
};

const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <AuthContextProvider>
          <AppContent />
        </AuthContextProvider>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
