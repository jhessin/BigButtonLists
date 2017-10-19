/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import List from '../../components/List';

export default class NavListsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the NavListsScreen component</Text>
        <List />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
