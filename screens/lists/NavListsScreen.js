/* @flow */

import React, { Component } from 'react';
import { Content, List, ListItem, Text } from 'native-base';
import { connect } from 'react-redux';

import { actions } from '../../redux';

class NavListsScreen extends Component {
  onPress = index => () => {
    this.props.select(index);
    // TODO: navigate to items screen
  }

  renderRow = (item, section, index) => {
    return (
      <ListItem
        onPress={this.onPress(index)}
      >
        <Text>{item.name}</Text>
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
    select: actions.SelectList
  };
};

export default connect(stateToProps, dispatchToProps)(NavListsScreen);
