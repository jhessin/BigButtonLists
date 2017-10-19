/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ListItem } from 'native-base';

export default class Cell extends Component {
  render() {
    return (
      <ListItem>
        <Text>I'm the {this.props.index} Cell component</Text>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
