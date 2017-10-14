import React, { Component } from 'react';
import {
  Container, Header, Content,
  Text
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

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
