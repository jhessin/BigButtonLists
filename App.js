import React, { Component } from 'react';
import {
  Container
} from 'native-base';

import RootNav from './nav';


export default class App extends Component {
  render() {
    return (
      <Container>
        <RootNav />
      </Container>
    );
  }
}
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
