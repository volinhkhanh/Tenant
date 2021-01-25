import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
//
import { Colors, ApplicationStyles } from '../../themes';

const BottomLayout = _props => {
  const { white, children, statusbar = 'dark', backgroundColor = white ? Colors.white : '#F9F9F9', overlay, onTouchOverlay, ...props } = _props;
  return (
    <View style={[styles.mainContainer, { backgroundColor }]} {...props}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>{children}</View>
      </SafeAreaView>
    </View>
  );
};
//
export default BottomLayout;
//
const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
  },
});
