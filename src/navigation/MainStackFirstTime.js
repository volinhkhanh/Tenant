import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import WelcomeStack from './WelcomeStack';

const MainStackFirstTime = createAppContainer(
  createStackNavigator (
    {
      Welcome: {
        screen: WelcomeStack,
      },
      Auth: {
        screen: AuthStack,
      },
      Home: {
        screen: HomeStack,
      },
    },
    {
      // mode: 'modal',
      headerMode: 'none',
      defaultNavigationOptions: {
        gesturesEnabled: false
      }
    },
  )
);

export default MainStackFirstTime;
