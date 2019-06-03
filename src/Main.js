import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";
import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from 'firebase'
import { Logo } from './images';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.postScore = this.postScore.bind(this);
    }
  state = { 
      currentUser: null,
      course: '',
      score: 0,
      courseRating: 0,
      slope: 0,
      divisor: 113 
    }

  componentDidMount() {
    const { currentUser } = firebase.auth()

    this.setState({ currentUser })
  }

  uploadScore = (course, courseRating, handicap) => {
    var postData = {
      course: course,
      score: courseRating,
      handicap: handicap,
    };
    var uid = firebase.auth().currentUser.uid
    
    var newPostKey = firebase.database().ref().child('posts').push().key;
  
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
  }

  postScore = (course, score, courseRating, slope, divisor) => {
    const newScore = (score - courseRating) * divisor/slope
    const roundedScore = Math.round(newScore * 100) / 100
    const positiveScore = Math.abs(roundedScore)
    return positiveScore
  };

  navigateToScores = (course, score, courseRating, slope, divisor) => {
    let handicap = this.postScore(course, score, courseRating, slope, divisor)
    this.uploadScore(course, courseRating, handicap)
    this.props.navigation.navigate('Scores', {
        handicap: handicap,
        course: course,
        score: courseRating
    });
  }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
          <Button
            rounded
            style={{ marginTop: 10, backgroundColor: 'green', padding: 5 }}
            onPress={() => firebase.auth().signOut()} 
            >
            <Text>Sign Out</Text>
          </Button>
        <Image source={ Logo } style={{width: 250, height: 250, marginLeft: 50}}/>
        <Text>
          Hi {currentUser && currentUser.email}! Welcome to MyHandicap! Please enter your information below
        </Text>
        <Form>
          <Item floatingLabel>
            <Label>Course</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={course => this.setState({ course })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Score</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={score => this.setState({ score })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Course Rating</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={courseRating => this.setState({ courseRating })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Slope</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={slope => this.setState({ slope })}
            />
          </Item>
          <Button
            full
            rounded
            success
            style={{ marginTop: 20 }}
            onPress={() => this.navigateToScores(this.state.course, this.state.courseRating, this.state.score, this.state.slope, this.state.divisor)}
            >
            <Text>Post Score</Text>
          </Button>
          <Button
            full
            rounded
            success
            style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('Scores')}
            >
            <Text>Go To Scores</Text>
          </Button>
        </Form>
      </View>
    )
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