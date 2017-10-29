/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import {
  Content, Form,
  Item, Label, Input,
  Button, Text
} from 'native-base';

import { actions } from '../../redux';

export default connect(
  null,
  dispatch => {
    return {
      listen: (nav, inScreen, outScreen) =>
        dispatch(actions.AuthListen(nav, inScreen, outScreen)),
      login: (uname, pass) =>
        dispatch(actions.AuthLogin(uname, pass))
    };
  }
)(class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to Big Button Lists',
    headerBackTitle: 'Cancel'
  }

  constructor(props) {
    super(props);
    this.navigate = props.navigation.navigate;
    this.listen = props.listen;

    this.listen(this.navigate, 'Lists', 'Main');
  }

  state = {
    username: '',
    password: ''
  }

  login = () => {
    this.props.login(this.state.username, this.state.password);
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
          onPress={() => this.navigate('Create')}
        >
          <Text>Create Account</Text>
        </Button>
      </Content>
    );
  }
});
