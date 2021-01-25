import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';
//
import { Colors, Fonts } from '../../themes';
//
export const TextListItem = (props) => {
  const { children } = props;
  return (
    <View style={styles.container}>
      {/* <View style={styles.circle} /> */}
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};
//
const styles = StyleSheet.create({
  container: {
    paddingTop: 6,
    flexDirection: 'row',
  },
  circle: {
    borderRadius: 999,
    width: 8,
    height: 8,
    backgroundColor: Colors.mainColor,
    marginRight: 12,
    marginLeft: 5,
    marginTop: 12
  },
  text: {
    lineHeight: 30,
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
});
