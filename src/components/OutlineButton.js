import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import { ApplicationStyles, Colors, Fonts } from '../themes';
//
const _styles = StyleSheet.create({
  text: {
    fontSize: Fonts.size.h3,
    letterSpacing: 0.3,
    fontFamily: Fonts.type.semiBold,
    color: Colors.mainColor,
  },
  button: {
    borderRadius: ApplicationStyles.utils.resizeHeight(10),
    alignItems: 'center',
    padding: 15,
    borderColor: Colors.mainColor,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
});
//
export default class OutlineButton extends Component {
  render() {
    const { title, onPress, style, textStyle = {}, disabled } = this.props;
    return (
      <Ripple onPress={onPress} style={[
          style, _styles.button,
          disabled && {backgroundColor: Colors.gray6, borderColor: Colors.gray6}
        ]}>
        <Text style={[_styles.text, textStyle, disabled && {color: Colors.backgroundGray}]}>{title}</Text>
      </Ripple>
    );
  }
}