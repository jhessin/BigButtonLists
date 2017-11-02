import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import React from 'react';
import { Button, Text } from 'native-base';
import { auth } from '../firebase';

import store, { actions } from '../redux';

import EditAllListsScreen from '../screens/lists/EditAllListsScreen';
import SortAllListsScreen from '../screens/lists/SortAllListsScreen';
import NavListsScreen from '../screens/lists/NavListsScreen';
import EditListScreen from '../screens/items/EditListScreen';
import CheckListScreen from '../screens/items/CheckListScreen';
import SortListScreen from '../screens/items/SortListScreen';

const tabNavConfig = {
  tabBarComponent: TabBarBottom,
  tabBarOptions: {
    showLabel: false
  }
};

const ListModeNavigator = TabNavigator(
  {
    EditLists: {
      screen: EditAllListsScreen
    },
    NavLists: {
      screen: NavListsScreen
    },
    SortLists: {
      screen: SortAllListsScreen
    },
  }, tabNavConfig
);

const ItemModeNavigator = TabNavigator(
  {
    Edit: {
      screen: EditListScreen
    },
    Check: {
      screen: CheckListScreen
    },
    Sort: {
      screen: SortListScreen
    }
  },
  {
    backBehavior: 'none',
    ...tabNavConfig,
  }
);

export default StackNavigator(
  {
    All: {
      screen: ListModeNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Button
              small
              onPress={auth.signOut}
            >
              <Text>Logout</Text>
            </Button>
          )
        };
      }
    },
    List: {
      screen: ItemModeNavigator
    }
  }
);
