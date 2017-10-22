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
  }

  renderRow = (item, section, index) => {
    const { name, checked } = item;
    return (
      <ListItem>
        <Input
          value={name}
          onChangeText={text => this.props.update(index, text, checked)}
          onSubmitEditing={() => Keyboard.dismiss()}
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
        <Button
          full
          transparent
          onPress={() => this.props.add()}
        >
          <Icon
            name="md-add-circle"
          />
        </Button>
      </Content>
    );
  }
}

const stateToProps = state => {
  return {
    dataArray: state.items.data
  };
};

const dispatchToProps = dispatch => {
  return {
    update: (index, name, checked) =>
      dispatch(actions.UpdateItem(index, name, checked)),
    delete: index => dispatch(actions.RemoveItem(index)),
    add: name => dispatch(actions.AddItem(name))
  };
};

export default connect(stateToProps, dispatchToProps)(EditListScreen);
