/* @flow */

import React, { Component } from 'react';
import { Content, List, ListItem, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-native-easy-grid';

import { actions } from '../../redux';

class NavListsScreen extends Component {
  static navigationOptions = {
    title: 'Nav'
  }

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
  }

  componentWillMount() {
    this.props.select(null);
  }

  onPress = index => () => {
    this.props.select(index);
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

const dispatchToProps = dispatch => {
  return {
    select: index => actions.SelectList(dispatch, index)
  };
};

export default connect(stateToProps, dispatchToProps)(NavListsScreen);
