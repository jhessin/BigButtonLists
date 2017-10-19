/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { List as NBList } from 'native-base';
import { connect } from 'react-redux';

import Cell from './Cell';

class List extends Component {
  renderRow = (item, section, index) => {
    return (
      <Cell index={index} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the List component</Text>
        <NBList
          dataArray={this.props.dataArray}
          renderRow={this.renderRow}
        />
      </View>
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
