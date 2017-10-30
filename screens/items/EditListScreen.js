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

class EditListScreen extends Component {
  static navigationOptions = {
    title: 'Edit'
  }

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {
      newItemName: '',
      currentItemName: '',
    };
  }

  renderRow = (item, section) => {
    const { id, index, name, checked } = item;
    const dismiss = () => {
      if (this.state.currentItemName.length > 0) {
        this.props.update(id, index, this.state.currentItemName, checked);
        this.setState({ currentItemName: '' });
      }
      Keyboard.dismiss();
    };
    return (
      <ListItem>
        <Input
          autoCorrect={false}
          defaultValue={name}
          onChangeText={currentItemName =>
            this.setState({ currentItemName })}
          // This should reset the value to name
          onSubmitEditing={dismiss}
          onEndEditing={dismiss}
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
          <Input
            autoCorrect={false}
            getRef={(input) => { this.newItemField = input; }}
            value={this.state.newItemName}
            onChangeText={newItemName => this.setState({ newItemName })}
            onSubmitEditing={() => {
              this.props.add(this.state.newItemName);
              this.setState({ newItemName: '' });
            }}
          />
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
