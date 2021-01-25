import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
//
import Colors from '../constants/Colors';

const WelcomeStack = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
    },
    Onboarding: {
      screen: OnboardingScreen,
    },
  },
  {
    // mode: 'modal',
    headerMode: 'none',
    // cardStyle: {
    //   backgroundColor: Colors.white,
    // },
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
  },
);

export default WelcomeStack;
