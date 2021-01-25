import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  BallIndicator,
} from 'react-native-indicators';
//
import { ApplicationStyles, Colors, Fonts } from '../themes';
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//
const SpinnerView = () => (
  <View style={styles.container}>
    {/* <ActivityIndicator size={40} color={Colors.mainColor} /> */}
    <BallIndicator size={25} color={Colors.mainColor} />
  </View>
);
//
export default SpinnerView;
