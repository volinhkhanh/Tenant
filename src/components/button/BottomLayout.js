import React from 'react';
import PropTypes from 'prop-types';
import { View, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { Colors, ApplicationStyles } from '../../themes';

const BottomLayout = _props => {
  const { white, children, statusbar = 'dark', backgroundColor = white ? Colors.white : '#F9F9F9', overlay, onTouchOverlay, ...props } = _props;
  return (
    <View style={[styles.mainContainer, { backgroundColor }]} {...props}>
      <StatusBar barStyle="default" />
      <StatusBar barStyle={statusbar === 'dark' ? 'dark-content' : 'light-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

BottomLayout.propTypes = {
  children: PropTypes.any,
};

export default BottomLayout;

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
  },
});
