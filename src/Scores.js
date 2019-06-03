import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";
import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from 'firebase'
import { Logo } from './images';

export default class Scores extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser: null,
      data: [],
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()

    this.setData()
  }

  setData = () => {
    const scoreRef = firebase.database().ref('posts');

    scoreRef.on("value", childSnapshot => {

      let scores = childSnapshot.val();

      let newState = [];

      for(let score in scores){
        newState.push({
          scores: scores[score].score,
          course: scores[score].course,
          handicap: scores[score].handicap,
        });
      }

      this.setState({
        data: newState
      });
    });
 }
 

    render() {
    const { navigation } = this.props;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Your Courses</Text>
          {this.state.data.map((item, index) => <Text key={index}>{item.course}</Text>)}
          <Text>Your Scores</Text>
          {this.state.data.map((item, index) => <Text key={index}>{item.scores}</Text>)}
          <Text>Your Handicaps</Text>
          {this.state.data.map((item, index) => <Text key={index}>{item.handicap}</Text>)}
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