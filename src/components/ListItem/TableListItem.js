import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Colors, ApplicationStyles, Fonts } from '../../themes';
//
export const TableListItem = props => {
  const { date, type, buttonText, buttonColor, onPressStatusButton, buttonType = 'default' } = props;
  const typeConvert = type?.replace('_', ' ')
  return (
    <Ripple style={styles.item} onPress={onPressStatusButton}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.itemText}>{date}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.itemText} numberOfLines={1}>{typeConvert}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {buttonType === 'default' && buttonText && (
          <StatusButton text={buttonText} color={buttonColor} onPress={onPressStatusButton} />
        )}
      </View>
    </Ripple>
  );
};
//
const StatusButton = props => {
  const { text, color = 'default', onPress, style = {} } = props;
  const COLORS = {
    default: Colors.mainColor,
    primary: Colors.blue,
    warning: Colors.red,
    white: Colors.white,
    gray: Colors.gray6,
  };
  const backgroundColor = COLORS[color];
  return (
    <Ripple
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        borderRadius: 3,
        minWidth: 80,
        ...ApplicationStyles.boxShadow,
        ...style,
      }}>
      <Text
        style={{
          fontFamily: Fonts.type.light,
          fontSize: 12,
          color: color === 'white' ? Colors.mainColor : Colors.white,
          paddingHorizontal: 8,
          paddingVertical: 5,
        }}>
        {text}
      </Text>
    </Ripple>
  );
};
//
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.h4,
    color: Colors.gray7,
  },
});
