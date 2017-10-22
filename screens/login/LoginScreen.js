/* @flow */
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import {
  Content, Form,
  Item, Label, Input,
  Button, Text
} from 'native-base';

require('firebase/firestore');

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to Big Button Lists',
    headerBackTitle: 'Cancel'
  }

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore().collection('users').doc(user.uid);
        db.get()
          .then(doc => {
            if (doc && doc.exists) {
              this.data = doc.data();
            } else {
              db.set({
                test: 'somedata'
              });
            }
          });
        this.navigate('Lists');
      }
    });
  }

  state = {
    username: '',
    password: ''
  }

  login = () => {
    const { username, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(username, password)
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <Content>
        <Form>
          <Item floatingLabel >
            <Label>
              Username
            </Label>
            <Input
              autoCorrect={false}
              returnKeyType="next"
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              onSubmitEditing={() => this.passwordField._root.focus()}
            />
          </Item>
          <Item floatingLabel last>
            <Label> Password </Label>
            <Input
              secureTextEntry
              getRef={(input) => { this.passwordField = input; }}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                this.login();
              }}
            />
          </Item>
        </Form>
        <Button
          full
          onPress={this.login}
        >
          <Text>Login</Text>
        </Button>
        <Button
          full
          onPress={() => this.navigate('Create')}
        >
          <Text>Create Account</Text>
        </Button>
        <Text>{JSON.stringify(this.data)}</Text>
      </Content>
    );
  }
}
