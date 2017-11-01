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

import { actions } from '../../redux';

class CheckListScreen extends Component {
  static navigationOptions = {
    title: 'Checklist'
  }

  renderRow = item => {
    const { name, checked } = item;

    return (
      <ListItem>
        <Button
          transparent
          onPress={() => this.props.toggleChecked(item)}
        >
          <Icon name={checked ? 'md-checkbox-outline' : 'md-square-outline'} />
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

const dispatchToProps = dispatch => ({
  toggleChecked: item => {
    const { checked } = item;
    dispatch(actions.UpdateItem({
      ...item,
      checked: !checked
    }));
  }
});

export default connect(stateToProps, dispatchToProps)(CheckListScreen);
