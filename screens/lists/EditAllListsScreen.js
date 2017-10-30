/* @flow */

import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import {
  Content,
  List,
  ListItem,
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
  }

  renderRow = (item, section) => {
    const { id, index, name } = item;
    const dismiss = () => {
      console.log(this.state.currentListName.length);
      if (this.state.currentListName.length > 0) {
        this.props.update(id, index, this.state.currentListName);
        this.setState({ currentListName: '' });
      }
      Keyboard.dismiss();
    };
    const cancel = () => {
      this.setState({ currentListName: '' });
    };

    return (
      <ListItem>
        <Input
          autoCorrect={false}
          defaultValue={name}
          onChangeText={currentListName => this.setState({ currentListName })}
          // This should reset the value to the item.name
          onEndEditing={cancel}
          onSubmitEditing={dismiss}
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
    if (this.newListField) {
      this.newListField._root.focus();
    }
    return (
      <Content>
        <List
          dataArray={dataArray}
          renderRow={this.renderRow}
          extraData={this.state}
        />
        <ListItem>
          <Input
            autoCorrect={false}
            getRef={input => {
              this.newListField = input;
              input._root.focus();
            }}
            value={this.state.newListName}
            onChangeText={newListName => this.setState({ newListName })}
            onSubmitEditing={() => {
              if (this.state.newListName.length > 0) {
                this.props.add(this.state.newListName);
                this.setState({ newListName: '' });
              }
            }}
          />
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
