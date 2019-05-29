import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from './Login'

// create our app’s navigation stack

export default createAppContainer(createSwitchNavigator(
  {
    Login,
  },
  {
    initialRouteName: 'Login'
  }   
));
