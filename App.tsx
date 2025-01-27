import React, { useEffect } from 'react'
import { AuthContextProvider, useAuth } from './Context/AuthContext';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import SignUp from './Screens/SignUp';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SignIn from './Screens/SignIn';

export type RootStackParamList = {
  Home: undefined,
  SignUp: undefined,
  SignIn: undefined
};

type HomeAndSignUpScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, "Home", "SignUp">;

const AppContent = () => {

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const navigation = useNavigation<HomeAndSignUpScreenNavigationProps>();

  const { userAuthenticated } = useAuth();

  useEffect(() => {
    if (userAuthenticated) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("SignUp");
    }
  }, [userAuthenticated]);

  return <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
}

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <AppContent />
      </AuthContextProvider>
    </NavigationContainer>
  )
}

export default App