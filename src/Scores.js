import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";
import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from 'firebase'
import { Logo } from './images';

export default class Scores extends React.Component {

    render() {
    const { navigation } = this.props;
    const score = navigation.getParam('score', 'no score');
    const course = navigation.getParam('course', 'no course');
    const handicap = navigation.getParam('handicap', 'no handicap');
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
          <Text>course: {JSON.stringify(course)}</Text>
          <Text>score: {JSON.stringify(score)}</Text>
          <Text>handicap: {JSON.stringify(handicap)}</Text>
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 10
      },
})