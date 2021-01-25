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
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  button: {
    borderRadius: ApplicationStyles.utils.resizeHeight(10),
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.mainColor,
  },
});
//
export default class FullButton extends Component {
  render() {
    const { title, onPress, style, textStyle = {}, disabled } = this.props;
    return (
      <Ripple disabled={disabled} onPress={onPress} style={[style, _styles.button]}>
        <Text style={[_styles.text, textStyle]}>{title}</Text>
      </Ripple>
    );
  }
}