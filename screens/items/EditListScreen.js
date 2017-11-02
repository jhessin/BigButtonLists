/* @flow */

import React, { Component } from 'react';
import { Keyboard, Image } from 'react-native';
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
import styles from '../styles';

const tabIcon = require('../../assets/icons/edit.png');

class EditListScreen extends Component {
  static navigationOptions = {
    // TODO: show the ListName here!
    title: 'Edit',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={tabIcon}
        style={[styles.icon, { tintColor }]}
      />
    )
  }

  state = {
    newItemName: '',
    currentItemName: '',
  };

  itemFields = [];

  submit = (item) => () => {
    if (this.state.currentItemName.length > 0) {
      db.setItem({
        ...item,
        name: this.state.currentListName
      });
      this.setState({ currentListName: '' });
    }
    Keyboard.dismiss();
  }

  cancel = (index, name) => () => {
    this.setState({ currentItemName: '' }, () => {
      try {
        this.itemFields[index].setNativeProps({ text: name });
      } catch (e) {
        console.log(e.message,
          `index = ${index}; itemFields[index] = ${this.itemFields[index]}`);
      }
    });
  }

  refocus = () => {
    if (this.state.newItemName.length > 0) {
      db.setItem({
        name: this.state.newItemName
      });
      this.setState({ newItemName: '' }, () => {
        try {
          this.newItemField.focus();
        } catch (e) {
          console.log(e.message,
            `this.newItemField = ${this.newItemField}`);
        }
      });
    }
  }

  renderRow = (item) => {
    const { id, index, name, checked } = item;

    return (
      <ListItem>
        <Input
          ref={input => {
            if (input) {
              this.itemFields[index] = input._root;
            }
          }}
          style={styles.text}
          autoCorrect={false}
          defaultValue={name}
          onChangeText={currentItemName =>
            this.setState({ currentItemName })}
          onEndEditing={this.cancel(index, name)}
          onSubmitEditing={this.submit(item)}
        />
        <Button
          transparent
          full
          onPress={() => db.deleteItem({ index })}
        >
          <Icon
            active
            name="trash"
            ios="ios-trash"
            android="delete-forever"
            style={{ color: 'maroon' }}
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
          <Item floatingLabel>
            <Label>
              New Item
            </Label>
            <Input
              getRef={input => {
                if (input) {
                  this.newItemField = input._root;
                }
              }}
              style={styles.text}
              autoCorrect={false}
              value={this.state.newItemName}
              onChangeText={newItemName => this.setState({ newItemName })}
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
    dataArray: state.items
  };
};

export default connect(stateToProps)(EditListScreen);
