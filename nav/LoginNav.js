import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/login/LoginScreen';
import CreateAccountScreen from '../screens/login/CreateAccountScreen';

export default StackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Create: {
      screen: CreateAccountScreen
    }
  }
);
