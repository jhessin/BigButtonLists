/* @flow */

import React, { Component } from 'react';
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

class CheckListScreen extends Component {
  static navigationOptions = {
    title: 'Checklist'
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
