import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";
import { Container, Item, Form, Input, Button, Label } from "native-base";
import * as firebase from "firebase";
import {firebaseConfig} from './config'
import { Logo } from './images';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      currentUser: null,
    };
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser) {
            this.props.navigation.navigate('Main')
        } else {
            this.props.navigation.navigate('Login')
        }
    })
  }
  SignUp = (email, password) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password);
      this.props.navigation.navigate('Main')
    } catch (error) {
      alert(firebaseConfig);
    }
  };
  SignIn = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate('Main')
      })
} catch (error) {
      console.log(error.toString(error));
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <Image source={ Logo } style={{width: 250, height: 250, marginLeft: 50}}/>
        <Text style={styles.header}>
          Welcome to MyHandicap!
        </Text>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button
            full
            rounded
            style={{ marginTop: 20 }}
            onPress={() => this.SignIn(this.state.email, this.state.password)}
          >
            <Text>SignIn</Text>
          </Button>
          <Button
            full
            rounded
            success
            style={{ marginTop: 20 }}
            onPress={() => this.SignUp(this.state.email, this.state.password)}
          >
            <Text>Signup</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  header: {
    textAlign: 'center',
    fontSize: 25,
    color: 'green'
  }
});