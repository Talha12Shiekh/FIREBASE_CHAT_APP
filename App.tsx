import React, {useEffect} from 'react';
import {AuthContextProvider, useAuth} from './Context/AuthContext';
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home, {UserDataType} from './Screens/Home';
import SignUp from './Screens/SignUp';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
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

type HomeAndSignUpScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Home',
  'SignUp'
>;
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const {userAuthenticated} = useAuth();
  const navigation = useNavigation<HomeAndSignUpScreenNavigationProps>();

  useEffect(() => {
    if (userAuthenticated) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('SignUp');
    }
  }, [userAuthenticated]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={userAuthenticated ? 'Home' : 'SignUp'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
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
