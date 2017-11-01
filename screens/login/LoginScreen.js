/* @flow */

import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import {
  Content, Form,
  Item, Label, Input,
  Button, Text
} from 'native-base';

import { auth } from '../../firebase';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to Big Button Lists',
    headerBackTitle: 'Cancel'
  }

  state = {
    username: '',
    password: ''
  }

  login = () => {
    auth.login({ email: this.state.username, pass: this.state.password });
  }

  render() {
    return (
      <Content>
        <Form>
          <Item floatingLabel >
            <Label>
              Email
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
          onPress={() => this.props.navigation.navigate('Create')}
        >
          <Text>Create Account</Text>
        </Button>
      </Content>
    );
  }
}
