/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import {
  Content, Form,
  Item, Label, Input,
  Button, Text
} from 'native-base';

import { types } from '../../redux';

export default connect(
  state => state,
  dispatch => { return { dispatch }; }
)(class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to Big Button Lists',
    headerBackTitle: 'Cancel'
  }

  constructor(props) {
    super(props);
    this.navigate = props.navigation.navigate;
    this.dispatch = props.dispatch;

    this.dispatch({
      type: types.AUTH_LISTEN,
      nav: this.navigate,
      inScreen: 'Lists',
      outScreen: 'Main'
    });
  }

  state = {
    username: '',
    password: ''
  }

  login = () => {
    this.dispatch({
      type: types.AUTH_LOGIN,
      uname: this.state.username,
      pass: this.state.password
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
      </Content>
    );
  }
});
