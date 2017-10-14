import React from 'react';
import {
  Container, Header, Content,
  Text
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header />
          <Grid>
            <Row />
            <Row>
                <Text>Open up App.js to start working on your app!</Text>
            </Row>
            <Row />
          </Grid>
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
