/* @flow */

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, List, ListItem, Text, Icon, Button } from 'native-base';
import { connect } from 'react-redux';

import { db } from '../../firebase';
import styles from '../styles';

const tabIcon = require('../../assets/icons/nav.png');

class NavListsScreen extends Component {
  static navigationOptions = {
      title: 'Nav',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={tabIcon}
          style={[styles.icon, { tintColor }]}
        />
      )
  }

  constructor(props) {
    super(props);
    this.navigate = props.navigation.navigate;
  }

  onPress = index => () => {
    db.select(index);
    this.navigate('List');
  }

  renderRow = (item, section, index) => {
    return (
      <ListItem
        onPress={this.onPress(index)}
      >
        <Text style={styles.text}>{item && item.name}</Text>
        <Icon
          style={styles.text}
          name="ios-arrow-dropright"
        />
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

export default connect(stateToProps)(NavListsScreen);
