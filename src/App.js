import React from 'react'

import { StyleSheet, Platform, Image, Text, View } from 'react-native'

import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import Loading from './Loading'
import SignUp from './Signup'
import Login from './Login'
import Main from './Main'

export default createAppContainer(createSwitchNavigator(

{
  Loading,
  SignUp,
  Login,
  Main
},
{
  initialRouteName: 'Loading'
}

));