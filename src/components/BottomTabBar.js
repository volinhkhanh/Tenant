import React from 'react';
import {View, StyleSheet} from 'react-native';
//
import {
  HomeIcon,
  ActiveHomeIcon,
  BubbleChatIcon,
  ActiveBubbleChatIcon,
  MoreIcon,
  ActiveMoreIcon,
} from '../components/icons';
import Ripple from 'react-native-material-ripple';
//
import {Colors} from '../themes/';
//
import Layouts from '../constants/Layouts';
//
const {bottomTabHeight} = Layouts;
//
export default function MyTabBar({name, navigation, joinChannel}) {
  //
  return (
    <View style={styles.container}>
      <Ripple
        accessibilityRole="button"
        style={[styles.button, name === 'Home' && styles.activeButton]}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        {name === 'Home' ? <ActiveHomeIcon /> : <HomeIcon />}
      </Ripple>
      <Ripple
        accessibilityRole="button"
        style={[styles.button, name === 'ChatBox' && styles.activeButton]}
        onPress={joinChannel}>
        {name === 'ChatBox' ? <ActiveBubbleChatIcon /> : <BubbleChatIcon />}
      </Ripple>
      <Ripple
        accessibilityRole="button"
        style={[styles.button, name === 'Other' && styles.activeButton]}
        onPress={() => {
          navigation.navigate('Setting');
        }}>
        {name === 'Other' ? <ActiveMoreIcon /> : <MoreIcon />}
      </Ripple>
    </View>
  );
}
//
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    shadowColor: Colors.gray3,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowRadius: 14,
    elevation: 30,
    height: bottomTabHeight,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    minWidth: 30,
  },
  activeButton: {
    borderTopWidth: 3,
    borderTopColor: Colors.mainColor,
  },
});
