import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";
import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from 'firebase'
import { Logo } from './images';

export default class Scores extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { 
    currentUser: null,
    courses: [],
    scores: [],
    handicaps: [],
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()

    this.getUserData()
  }

  getUserData = () => {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('posts').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        alert(childData.score)
      });
    })
  }

    render() {
    const { navigation } = this.props;
    const score = navigation.getParam('score', 'no score');
    const course = navigation.getParam('course', 'no course');
    const handicap = navigation.getParam('handicap', 'no handicap');
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Your Handicaps</Text>
          <Text>course: {this.state.courses}</Text>
          <Text>score: {this.state.scores}</Text>
          <Text>handicap: {this.state.handicaps}</Text>
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