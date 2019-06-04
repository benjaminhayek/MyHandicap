import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";
import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from 'firebase'
import { Course } from './images';

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
        <View style={{ flex: 1 }}>
          <Image source={ Course } style={{ width: '100%', height: 400 }}/>
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 150, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', }}>Scores</Text>
          </View>
          <View style={styles.scores}>
            <View style={{ flex: 2 }}>
              <Text style={{ marginBottom: 20, fontSize: 15, color: 'green' }}>Course</Text>
              {this.state.data.map((item, index) => <Text key={index} style={{ marginBottom: 10, fontSize: 12 }}>{item.course}</Text>)}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 20, fontSize: 15, color: 'green' }}>Score</Text>
              {this.state.data.map((item, index) => <Text key={index} style={{ marginBottom: 10, fontSize: 12 }}>{item.scores}</Text>)}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 20, fontSize: 15, color: 'green' }}>Handicap</Text>
              {this.state.data.map((item, index) => <Text key={index} style={{ marginBottom: 10, fontSize: 12 }}>{item.handicap}</Text>)}
            </View>
          </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    scores: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
      },
})