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

class EditAllListsScreen extends Component {
  static navigationOptions = {
    title: 'Edit'
  }

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {
      newListName: '',
      currentListName: ''
    };
    this.listFields = [];
  }

  submit = (id, index) => () => {
    if (this.state.currentListName.length > 0) {
      this.props.update(id, index, this.state.currentListName);
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
      this.props.add(this.state.newListName);
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

  renderRow = (item) => {
    const { id, index, name } = item;

    return (
      <ListItem>
        <Input
          ref={input => {
            if (input) {
              this.listFields[index] = input._root;
            }
          }}
          autoCorrect={false}
          defaultValue={name}
          onChangeText={currentListName =>
            this.setState({ currentListName })}
          onEndEditing={this.cancel(index, name)}
          onSubmitEditing={this.submit(id, index)}
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

const dispatchToProps = dispatch => {
  return {
    update: (id, index, name) => dispatch(actions.UpdateList(id, index, name)),
    delete: index => dispatch(actions.RemoveList(index)),
    add: name => dispatch(actions.AddList(name))
  };
};

export default connect(stateToProps, dispatchToProps)(EditAllListsScreen);
