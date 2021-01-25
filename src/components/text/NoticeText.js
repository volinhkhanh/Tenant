import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
//
import { Colors, Fonts } from '../../themes/';
import { EmergencyIcon } from '../icons';
//
const NoticeText = props => {
  const { text } = props;
  return (
    <View style={styles.content}>
      <Text style={[styles.subtitle, { color: Colors.red }]}>{text} </Text>
      <EmergencyIcon size={16} color={Colors.red} style={{ paddingLeft: 2 }} />
    </View>
  );
};
//
export default NoticeText;
//
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingTop: 5,
  },
  subtitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.gray4,
  },
});
