/* @flow */

import React, { Component } from 'react';
import { Keyboard, Image, StyleSheet } from 'react-native';
import {
  Content,
  List,
  ListItem,
  Item,
  Label,
  Input,
  Button,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';

import { db } from '../../firebase';

const tabIcon = require('../../assets/icons/edit.png');

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});

class EditAllListsScreen extends Component {
  static navigationOptions = {
    title: 'Edit',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={tabIcon}
        style={[styles.icon, { tintColor }]}
      />
    )
  }

  state = {
    newListName: '',
    currentListName: ''
  };

  listFields = [];

  submit = (list) => () => {
    if (this.state.currentListName.length > 0) {
      db.setList({
        ...list,
        name: this.state.currentListName
      });
      this.setState({ currentListName: '' });
    }
    Keyboard.dismiss();
  }

  cancel = (index, name) => () => {
    // This should reset the value to the name
    this.setState({ currentListName: '' }, () => {
      try {
        this.listFields[index].setNativeProps({ text: name });
      } catch (e) {
        console.log(e.message,
          `index = ${index}; listFields[index] = ${this.listFields[index]}`);
      }
    });
  }

  refocus = () => {
    if (this.state.newListName.length > 0) {
      db.setList({
        name: this.state.newListName
      });
      this.setState({ newListName: '' }, () => {
        try {
          this.newListField.focus();
        } catch (e) {
          console.log(e.message,
            `this.newListField = ${this.newListField}`);
        }
      });
    }
  }

  renderRow = (list) => {
    const { id, index, name } = list;

    return (
      <ListItem>
        <Input
          ref={input => {
            if (input) {
              this.listFields[index] = input._root;
            }
          }}
          style={styles.text}
          autoCorrect={false}
          defaultValue={name}
          onChangeText={currentListName =>
            this.setState({ currentListName })}
          onEndEditing={this.cancel(index, name)}
          onSubmitEditing={this.submit(list)}
        />
        <Button
          transparent
          full
          onPress={() => db.deleteList({ index })}
        >
          <Icon
            active
            style={styles.text}
            name="trash"
            ios="ios-trash"
            android="delete-forever"
            style={[styles.text, { color: 'maroon' }]}
          />
        </Button>
      </ListItem>
    );
  }

  render() {
    const { dataArray } = this.props;
    return (
      <Content>
        <List
          dataArray={dataArray}
          renderRow={this.renderRow}
        />
        <ListItem>
          <Item floatingLabel >
            <Label>
              New List
            </Label>
            <Input
              getRef={input => {
                if (input) {
                  this.newListField = input._root;
                }
              }}
              style={styles.text}
              autoCorrect={false}
              value={this.state.newListName}
              onChangeText={newListName => this.setState({ newListName })}
              onSubmitEditing={this.refocus}
            />
          </Item>
        </ListItem>
      </Content>
    );
  }
}

const stateToProps = state => {
  return {
    dataArray: state.lists
  };
};

export default connect(stateToProps)(EditAllListsScreen);
