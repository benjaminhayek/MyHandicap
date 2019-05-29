import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Form, Button, Item, Label, Input } from 'react-native'
import firebase from 'firebase'
import { Logo } from './images';

export default class Main extends React.Component {
  state = { 
      currentUser: null,
      course: '',
      score: '',
      courseRating: '',
      slope: '',
      divisor: 113 
    }

  componentDidMount() {
    const { currentUser } = firebase.auth()

    this.setState({ currentUser })
  }

  postScore = (currentUser, course, score, courseRating, slope, divisor) => {
    alert(currentUser, course, score, courseRating, slope, divisor)
  };

  render() {
    const { currentUser, course, score, courseRating, slope, divisor } = this.state

    return (
      <View style={styles.container}>
        <Image source={ Logo } style={{width: 250, height: 250, }}/>
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
            <Label>Course Rating</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={courseRating => this.setState({ courseRating })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Slope</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={slope => this.setState({ slope })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Score</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={score => this.setState({ score })}
            />
          </Item>
          <Button
            full
            rounded
            success
            style={{ marginTop: 20 }}
            onPress={() => this.postScore(this.state.email, this.state.password)}
          >
            <Text>Post Score</Text>
          </Button>
        </Form>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})