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

import { actions } from '../../redux';
import { db } from '../../firebase';
import styles from '../styles';

const tabIcon = require('../../assets/icons/sort.png');

class SortAllListsScreen extends Component {
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
    const { index } = item;
    const upButton = (
      <Button
        transparent
        full
        disabled={index === 0}
        onPress={() => db.upList(index)}
      >
        <Icon
          active
          style={styles.text}
          name="md-arrow-round-up"
        />
      </Button>
    );

    const downButton = (
      <Button
        transparent
        full
        disabled={index === this.props.dataLength - 1}
        onPress={() => db.downList(index)}
      >
        <Icon
          active
          style={styles.text}
          name="md-arrow-round-down"
        />
      </Button>
    );

    return (
      <ListItem>
        {upButton}
        {downButton}
        <Text style={styles.text}>
          {item ? item.name : index}
        </Text>
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
    dataArray: state.lists,
    dataLength: state.lists.length
  };
};

export default connect(stateToProps)(SortAllListsScreen);
