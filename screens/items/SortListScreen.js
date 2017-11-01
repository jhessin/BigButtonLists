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

class SortListScreen extends Component {
  static navigationOptions = {
    title: 'Sort'
  }

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
  }

  renderRow = (item) => {
    const { index, name } = item;
    const upButton = (
      <Button
        transparent
        full
        disabled={index == 0}
        onPress={() => this.props.up(index)}
      >
        <Icon active name="md-arrow-round-up" />
      </Button>
    );

    const downButton = (
      <Button
        transparent
        full
        disabled={index == this.props.dataLength - 1}
        onPress={() => this.props.down(index)}
      >
        <Icon active name="md-arrow-round-down" />
      </Button>
    );

    return (
      <ListItem>
        <Grid>
          <Text>{name}</Text>
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

const stateToProps = state => ({
  dataArray: state.items,
  dataLength: state.items.length,
});

const dispatchToProps = dispatch => ({
  up: index => dispatch(actions.ItemUp(index)),
  down: index => dispatch(actions.ItemDown(index)),
});

export default connect(stateToProps, dispatchToProps)(SortListScreen);
