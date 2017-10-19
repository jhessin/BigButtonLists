/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { List as NBList, ListItem, Text } from 'native-base';
import { connect } from 'react-redux';

class List extends Component {
  onPress = index => () => {
    // TODO: call selectList action.
    // TODO: navigate to items screen
  }

  renderRow = (item, section, index) => {
    return (
      <ListItem
        onPress={this.onPress(index)}
      >
        <Text>{item.name}</Text>
      </ListItem>
      //<Cell data={item} index={index} />
    );
  }

  render() {
    return (
      <NBList
        dataArray={this.props.dataArray}
        renderRow={this.renderRow}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const stateToProps = state => {
  return {
    dataArray: state.lists
  };
};

export default connect(stateToProps)(List);
