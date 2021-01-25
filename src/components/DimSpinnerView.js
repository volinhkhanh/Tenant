import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
//
import {ApplicationStyles, Colors, Fonts} from '../themes';
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // bottom: 100,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(122, 122, 122, 0.4)',
    // opacity: 0.3,
    zIndex: 100,
  },
});
//
const SpinnerView = () => (
  <View style={styles.container}>
    {/* <ActivityIndicator size={40} color={Colors.mainColor} /> */}
    <BallIndicator size={40} color={Colors.mainColor} />
  </View>
);
//
export default SpinnerView;
