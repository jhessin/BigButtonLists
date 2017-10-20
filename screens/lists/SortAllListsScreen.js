/* @flow */

import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import {
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';

import { actions } from '../../redux';

class SortAllListsScreen extends Component {
  static navigationOptions = {
    title: 'Edit'
  }

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
  }

  renderRow = (item, section, index) => {
    const upButton = (
      <Button
        transparent
        full
        onPress={() => this.props.up(index)}
      >
        <Icon
          active
          name="md-arrow-round-up"
        />
      </Button>
    );

    const downButton = (
      <Button
        transparent
        full
        onPress={() => this.props.down(index)}
      >
        <Icon
          active
          name="md-arrow-round-down"
        />
      </Button>
    );

    console.log(`index: ${index} index == 0: ${index == 0}`);

    return (
      <ListItem>
        <Text>
          {item ? item.name : index}
        </Text>
        {index == 0 ? null : upButton}
        {index == this.props.dataLength - 1 ? null : downButton}
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
        <Text>
          {JSON.stringify(dataArray)}
        </Text>
      </Content>
    );
  }
}

const stateToProps = state => {
  return {
    dataArray: state.lists,
    dataLength: state.lists.length
  };
};

const dispatchToProps = dispatch => {
  return {
    up: index => dispatch(actions.ListUp(index)),
    down: index => dispatch(actions.ListDown(index))
  };
};

export default connect(stateToProps, dispatchToProps)(SortAllListsScreen);
