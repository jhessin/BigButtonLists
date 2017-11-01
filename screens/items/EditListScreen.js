/* @flow */

import React, { Component } from 'react';
import { Keyboard } from 'react-native';
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

import { actions } from '../../redux';

class EditListScreen extends Component {
  static navigationOptions = {
    // TODO: show the ListName here!
    title: 'Edit'
  }

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {
      newItemName: '',
      currentItemName: '',
    };
    this.itemFields = [];
  }

  submit = (id, index, checked) => () => {
    if (this.state.currentItemName.length > 0) {
      this.props.update(id, index, this.state.currentListName, checked);
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
      this.props.add(this.state.newItemName);
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
          autoCorrect={false}
          defaultValue={name}
          onChangeText={currentItemName =>
            this.setState({ currentItemName })}
          onEndEditing={this.cancel(index, name)}
          onSubmitEditing={this.submit(id, index, checked)}
        />
        <Button
          transparent
          full
          onPress={() => this.props.delete(index)}
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

const dispatchToProps = dispatch => {
  return {
    update: (id, index, name, checked) =>
      dispatch(actions.UpdateItem(id, index, name, checked)),
    delete: index => dispatch(actions.RemoveItem(index)),
    add: name => dispatch(actions.AddItem(name))
  };
};

export default connect(stateToProps, dispatchToProps)(EditListScreen);
