import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import { Colors, ApplicationStyles } from '../../themes';
//
import { ArrowForwardIcon } from '../icons';
//
export default function CardAnnouncement2(props) {
  const {
    type = 'default',
    style,
    children,
    contentStyle,
    onPress,
    overdue,
  } = props;
  const disabled = type === 'disable';
  //
  return (
    <Ripple activeOpacity={0.3} style={[styles.container, style]} onPress={onPress}>
      <View style={styles.box}>
        <View style={[styles.left, !overdue && { backgroundColor: Colors.mainColor }, disabled && { backgroundColor: 'transparent' }]} />
        <View style={[styles.center, contentStyle]}>{children}</View>
      </View>
      <View style={styles.right}>
        {!disabled && <View style={styles.rightBox} />}
        <ArrowForwardIcon
          size={disabled ? 24 : 18}
          color={disabled ? Colors.black : Colors.white}
          style={{ paddingHorizontal: disabled ? 8 : 2 }}
        />
      </View>
    </Ripple>
  );
}
//
const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: 90,
    // marginVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    ...ApplicationStyles.boxShadow,
  },
  box: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  left: {
    paddingHorizontal: 3,
    backgroundColor: Colors.bloodOrange,
  },
  center: {
    flex: 1,
    marginRight: 40,
    paddingVertical: 20,
  },
  right: {
    position: 'absolute',
    height: '100%',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBox: {
    position: 'absolute',
    right: -12,
    width: 50,
    height: 50,
    backgroundColor: Colors.mainColor,
    borderRadius: 5,
  },
});
