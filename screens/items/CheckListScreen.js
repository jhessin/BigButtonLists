/* @flow */

import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Button,
} from 'native-base';
import { connect } from 'react-redux';

import { db } from '../../firebase';
import styles from '../styles';

const tabIcon = require('../../assets/icons/check.png');

class CheckListScreen extends Component {
  static navigationOptions = {
    title: 'Checklist',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={tabIcon}
        style={[styles.icon, { tintColor }]}
      />
    )
  }

  toggleChecked = item => {
    const { checked } = item;
    db.setItem({
      ...item,
      checked: !checked
    });
  }

  renderRow = item => {
    const { name, checked } = item;

    return (
      <ListItem>
        <Button
          transparent
          onPress={() => this.toggleChecked(item)}
        >
          <Icon
            name={checked ? 'md-checkbox-outline' : 'md-square-outline'}
          />
        </Button>
        <Text>{name}</Text>
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
  dataArray: state.items
});

export default connect(stateToProps)(CheckListScreen);
