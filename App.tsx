import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { AuthContextProvider, useAuth } from './Context/AuthContext';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import SignUp from './Screens/SignUp';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home:undefined,
  SignUp:undefined,
};

type HomeAndSignUpScreenNavigationProps = NativeStackNavigationProp<RootStackParamList,"Home","SignUp">;

const AppContent = () => {

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const navigation = useNavigation<HomeAndSignUpScreenNavigationProps>();

  const { userAuthenticated } = useAuth();

  useEffect(() => {
    if (userAuthenticated) {
      navigation.navigate("Home")
    } else {
      navigation.navigate("SignUp");
    }
  }, [userAuthenticated]);

  return <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  </NavigationContainer>
}

const App = () => {
  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  )
}

export default App