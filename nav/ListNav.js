import { StackNavigator, TabNavigator } from 'react-navigation';

import EditAllListsScreen from '../screens/lists/EditAllListsScreen';
import SortAllListsScreen from '../screens/lists/SortAllListsScreen';
import NavListsScreen from '../screens/lists/NavListsScreen';
import EditListScreen from '../screens/items/EditListScreen';
import CheckListScreen from '../screens/items/CheckListScreen';
import SortListScreen from '../screens/items/SortListScreen';

const ListModeNavigator = TabNavigator(
  {
    NavLists: {
      screen: NavListsScreen
    },
    EditLists: {
      screen: EditAllListsScreen
    },
    // SortLists: {
    //   screen: SortAllListsScreen
    // },
  }
);

const ItemModeNavigator = TabNavigator(
  {
    Check: {
      screen: CheckListScreen
    },
    // Edit: {
    //   screen: EditListScreen
    // },
    // Sort: {
    //   screen: SortListScreen
    // }
  }
);

export default StackNavigator(
  {
    All: {
      screen: ListModeNavigator
    },
    List: {
      screen: ItemModeNavigator
    }
  }
);
