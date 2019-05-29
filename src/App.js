import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import Main from './Main';

export default createAppContainer(createSwitchNavigator(
  {
    Login,
  },
  {
    initialRouteName: 'Login'
  }   
));
