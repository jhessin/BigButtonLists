import { Notifications } from 'expo';
import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import { auth } from '../firebase';
import LoginNav from './LoginNav';
import ListNav from './ListNav';

const RootNavOptions = {
  navigationOptions: ({ navigation }) => {
    auth.listen({
      nav: navigation.navigate
    });
    return {
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      tabBarVisible: false
    };
  },
};

const RootStackNavigator = TabNavigator(
  {
    Main: {
      screen: LoginNav,
    },
    Lists: {
      screen: ListNav
    }
  },
  RootNavOptions
);

export default class RootNav extends Component {

  render() {
    return <RootStackNavigator />;
  }
}
