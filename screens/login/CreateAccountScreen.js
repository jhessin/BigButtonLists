/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Keyboard
} from 'react-native';
import {
  Content, Form, Item,
  Label, Input,
  Button, Text
} from 'native-base';

import { actions } from '../../redux';

export default connect(
  state => state,
  dispatch => {
    return {
      create: (email, pass) =>
        dispatch(actions.AuthCreate(email, pass))
    };
  }
)(class CreateAccountScreen extends Component {
  static navigationOptions = {
    title: 'Create Your Account'
  }

  constructor(props) {
    super(props);

    this.create = props.create;
    this.navigate = props.navigation.navigate;
  }

  state = {
    username: '',
    password: '',
    confirmPass: '',
    recoveryEmail: ''
  }

  createAccount = () => {
    this.create(this.state.recoveryEmail, this.state.password);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              autoCorrect={false}
              returnKeyType='next'
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              onSubmitEditing={() => this.passwordField._root.focus()}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry
              returnKeyType='next'
              getRef={(input) => { this.passwordField = input; }}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              onSubmitEditing={() => this.confirmField._root.focus()}
            />
          </Item>
          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input
              secureTextEntry
              returnKeyType='next'
              getRef={(input) => { this.confirmField = input; }}
              value={this.state.confirmPass}
              onChangeText={(confirmPass) => this.setState({ confirmPass })}
              onSubmitEditing={() => this.emailField._root.focus()}
            />
          </Item>
          <Item floatingLabel >
            <Label>Recovery Email</Label>
            <Input
              autoCorrect={false}
              getRef={(input) => { this.emailField = input; }}
              value={this.state.recoveryEmail}
              onChangeText={(recoveryEmail) => this.setState({ recoveryEmail })}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                this.createAccount();
              }}
            />
          </Item>
        </Form>
        <Button
          full
          onPress={this.createAccount}
        >
            <Text>Create Account</Text>
          </Button>
      </Content>
    );
  }
});
