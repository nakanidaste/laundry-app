import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import { AuthProvider } from './loginscreen/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
          <Router />
      </NavigationContainer>
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({})
