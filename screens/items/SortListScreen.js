/* @flow */

import React, { Component } from 'react';
import { Keyboard, Image } from 'react-native';
import {
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';

import { db } from '../../firebase';
import styles from '../styles';

const tabIcon = require('../../assets/icons/sort.png');

class SortListScreen extends Component {
  static navigationOptions = {
    title: 'Sort',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={tabIcon}
        style={[styles.icon, { tintColor }]}
      />
    )
  }

  renderRow = (item) => {
    const { index, name } = item;
    const upButton = (
      <Button
        transparent
        full
        disabled={index === 0}
        onPress={() => db.upItem(index)}
      >
        <Icon
          style={styles.text}
          active name="md-arrow-round-up"
        />
      </Button>
    );

    const downButton = (
      <Button
        transparent
        full
        disabled={index === this.props.dataLength - 1}
        onPress={() => db.downItem(index)}
      >
        <Icon
          style={styles.text}
          active name="md-arrow-round-down"
        />
      </Button>
    );

    return (
      <ListItem>
        {upButton}
        {downButton}
        <Text style={styles.text}>{name}</Text>
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

const stateToProps = state => ({
  dataArray: state.items,
  dataLength: state.items.length,
});

export default connect(stateToProps)(SortListScreen);
