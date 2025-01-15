import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { AuthContextProvider, useAuth } from './Context/AuthContext';

const AppContent = () => {
  const { userAuthenticated } = useAuth();

  useEffect(() => {
    if (userAuthenticated) {
      // navigate to home
    } else {
      // navigate back to sign in
    }
  }, [userAuthenticated])

  return <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
    <Text>{userAuthenticated ? "HomeScreen" : "Sign in Screen"}</Text>
  </View>
}

const App = () => {
  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  )
}

export default App