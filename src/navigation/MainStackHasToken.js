import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const MainStack = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: HomeStack,
      },
      Auth: {
        screen: AuthStack,
      },
    },
    {
      // mode: 'modal',
      headerMode: 'none',
      defaultNavigationOptions: {
        gesturesEnabled: false
      }
    },
  ),
);

export default MainStack;
