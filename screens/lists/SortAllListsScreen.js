/* @flow */

import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import {
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon,
} from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import { actions } from '../../redux';

class SortAllListsScreen extends Component {
  static navigationOptions = {
    title: 'Sort'
  }

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
  }

  renderRow = (item, section, index) => {
    const upButton = (
      <Button
        transparent
        full
        disabled={index == 0}
        onPress={() => this.props.up(index)}
      >
        <Icon
          active
          name="md-arrow-round-up"
        />
      </Button>
    );

    const downButton = (
      <Button
        transparent
        full
        disabled={index == this.props.dataLength - 1}
        onPress={() => this.props.down(index)}
      >
        <Icon
          active
          name="md-arrow-round-down"
        />
      </Button>
    );

    return (
      <ListItem>
        <Grid>
          <Text>
            {item ? item.name : index}
          </Text>
          <Col size={3} />
          <Col size={1} />
          {upButton}
          {downButton}
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
    dataArray: state.lists,
    dataLength: state.lists.length
  };
};

const dispatchToProps = dispatch => {
  return {
    up: index => dispatch(actions.ListUp(index)),
    down: index => dispatch(actions.ListDown(index))
  };
};

export default connect(stateToProps, dispatchToProps)(SortAllListsScreen);
