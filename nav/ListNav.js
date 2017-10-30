import { StackNavigator, TabNavigator } from 'react-navigation';

import EditAllListsScreen from '../screens/lists/EditAllListsScreen';
import SortAllListsScreen from '../screens/lists/SortAllListsScreen';
import NavListsScreen from '../screens/lists/NavListsScreen';
import EditListScreen from '../screens/items/EditListScreen';
import CheckListScreen from '../screens/items/CheckListScreen';
import SortListScreen from '../screens/items/SortListScreen';

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
  }
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
