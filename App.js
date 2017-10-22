import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Container
} from 'native-base';

import { firebaseConfig } from './keys';
import store from './redux';
import RootNav from './nav';

export default class App extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(firebaseConfig);
  }

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
