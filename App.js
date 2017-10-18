import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Container
} from 'native-base';

import store from './redux';
import RootNav from './nav';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <RootNav />
        </Container>
      </Provider>
    );
  }
}
