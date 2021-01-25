import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import SendBird from 'sendbird';
// import firebase from 'react-native-firebase';
//
import Root from './root';
//
import store from './reducers/createStore';
import {LanguageProvider} from './context/LanguageContext';
//
import {SendBirdProvider} from './context';
//
console.disableYellowBox = true;
//
export default class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  // componentDidMount() {
  // setTimeout(
  //   () => {
  //     SplashScreen.hide();
  //   },
  //   OS === 'ios' ? 1000 : 500,
  // );
  // }

  // componentWillUnmount() {
  //   console.log('app is killed');
  //   AppState.removeEventListener('change', this._handleAppStateChange);
  // }

  _handleAppStateChange = (nextAppState) => {
    const sb = SendBird.getInstance();
    if (sb) {
      if (nextAppState === 'active') {
        if (Platform.OS === 'ios') {
          // PushNotificationIOS.setApplicationIconBadgeNumber(0);
        }
        // console.log('app is into foreground');
        sb.setForegroundState();
        this.appStateHandler.notify();
      } else if (nextAppState === 'background') {
        // console.log('app is into background');
        sb.setBackgroundState();
      }
    }
  };

  render() {
    return (
      <Provider store={store}>
        <SendBirdProvider>
          <NavigationContainer>
            <LanguageProvider>
              <Root />
            </LanguageProvider>
          </NavigationContainer>
        </SendBirdProvider>
      </Provider>
    );
  }
}
