import React, {useEffect} from 'react';
import {AuthContextProvider, useAuth} from './Context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home, {UserDataType} from './Screens/Home';
import SignUp from './Screens/SignUp';
import SignIn from './Screens/SignIn';
import ForgotPassword from './Screens/ForgotPassword';
import {MenuProvider} from 'react-native-popup-menu';
import ChatRoom from './Screens/ChatRoom';
import Profile from './Screens/Profile';
import ProfileImageViewScreen from './Screens/ProfileImageViewScreen';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  ChatRoom: {item: UserDataType};
  Profile: undefined;
  ProfileImageView: {
    title: string;
    profileimage: string;
    imageexists: boolean;
  };
};

//https://www.figma.com/design/QP6EMSkbS7c1L1d9BPIdI1/Empty-State-Illustrations-Freebies-%E2%AD%90-(Community)?node-id=1-440&t=we4kgQRXjvsilI6s-0

// Fun
// Fun@gmail.com
// fun123

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const {userAuthenticated, getUserFromStorage, setuserAuthenticated} =
    useAuth();

  useEffect(() => {
    async function getUser() {
      try {
        const storedUser = await getUserFromStorage();

        if (storedUser) {
          setuserAuthenticated(true);
        } else {
          setuserAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  if (userAuthenticated) {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          options={{headerShown: true}}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen
          name="ProfileImageView"
          options={({route}) => ({
            headerShown: true,
            title: route.params.title,
          })}
          component={ProfileImageViewScreen}
        />
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
