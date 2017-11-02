/* @flow */

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, List, ListItem, Text, Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-native-easy-grid';

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
        <Grid>
          <Text>{item && item.name}</Text>
          <Col size={3} />
          <Col size={1} />
          <Icon
            name="ios-arrow-dropright"
          />
        </Grid>
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
