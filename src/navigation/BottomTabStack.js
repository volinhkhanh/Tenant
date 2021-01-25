import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

import HomeContainer from '../containers/ContainerHome';
import {ContainerLiveChat} from '../screens/liveChat';
import ContainerSetting from '../containers/ContainerSetting';
import {
  HomeIcon,
  ActiveHomeIcon,
  BubbleChatIcon1,
  ActiveBubbleChatIcon,
  MoreIcon,
  ActiveMoreIcon,
} from '../components/icons';
import IconWithBadge from '../components/IconWithBadge';
import {View, Animated, Dimensions} from 'react-native';
import {Colors} from '../themes';
import {useSendBird} from '../context';
const ChatIcon = props => {
  const {focused, screenProps} = props;
  const {getTotalUnreadMessageCount} = useSendBird();
  const {unreadMessage, setUnreadMessage} = screenProps;
  // console.log('🎲', screenProps);

  useEffect(() => {
    async function fetchUnreadMessageCount() {
      const totalUnreadMessageCount = await getTotalUnreadMessageCount();
      // console.log('🎲', totalUnreadMessageCount);
      setUnreadMessage(totalUnreadMessageCount);
    }
    fetchUnreadMessageCount();
  });

  return (
    <IconWithBadge
      {...props}
      icon={focused ? <ActiveBubbleChatIcon /> : <BubbleChatIcon1 />}
      badgeCount={unreadMessage}
    />
  );
};

const TabBarComponent = props => <BottomTabBar {...props} />;

const BottomTabStack = createBottomTabNavigator(
  {
    // other screens
    Home: HomeContainer,
    Chatting: ContainerLiveChat,
    Setting: ContainerSetting,
  },
  {
    defaultNavigationOptions: ({screenProps, navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = ActiveMoreIcon;

        if (routeName === 'Home') {
          IconComponent = focused ? ActiveHomeIcon : HomeIcon;
        }

        if (routeName === 'Chatting') {
          IconComponent = props => (
            <ChatIcon
              {...props}
              focused={focused}
              navigation={navigation}
              screenProps={screenProps}
            />
          );
        }

        if (routeName === 'Setting') {
          IconComponent = focused ? ActiveMoreIcon : MoreIcon;
        }

        // You can return any component that you like here!
        return <IconComponent size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
    },
    tabBarComponent: props => {
      const {current: translateValue} = useRef(new Animated.Value(0));
      const totalWidth = Dimensions.get('window').width;
      const tabWidth = totalWidth / 3;
      const heightDivider = 4;

      Animated.spring(translateValue, {
        toValue: props?.navigation?.state?.index * tabWidth,
        velocity: 10,
        useNativeDriver: true,
      }).start();

      return (
        <View>
          <Animated.View
            style={[
              {
                height: heightDivider,
                borderRadius: heightDivider / 2,
                backgroundColor: Colors.mainColor,
                position: 'absolute',
                top: -heightDivider,
              },
              {
                transform: [{translateX: translateValue}],
                left: tabWidth / 4,
                width: tabWidth / 2,
              },
            ]}
          />

          <TabBarComponent {...props} />
        </View>
      );
    },
  },
);

export default BottomTabStack;
