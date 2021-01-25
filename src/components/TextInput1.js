import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
//
import {Colors, Fonts} from '../themes';
//
import {hexToRGBA} from '../services/utils';
//
function TextInput(props) {
  const {
    noBorder,
    placeholder,
    style,
    containerStyle,
    value,
    onChangeText,
    errorText,
  } = props;

  return (
    <Input
      placeholder={placeholder}
      placeholderTextColor={Colors.textColor.gray6}
      inputStyle={styles.placeholder}
      inputContainerStyle={[
        styles.inputContainer,
        style,
        value !== '' && styles.activeBottom,
        errorText && styles.errorBottom,
        {borderBottomWidth: noBorder ? 0 : 0.5},
      ]}
      containerStyle={{
        paddingHorizontal: 0,
        ...containerStyle,
      }}
      value={value}
      onChangeText={text => onChangeText(text)}
      {...props}
    />
  );
}

export default TextInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray4,
  },
  errorPassword: {
    ...Fonts.style.h6,
    fontFamily: Fonts.type.light,
  },
  placeholder: {
    ...Fonts.style.bodySemibold,
    color: Colors.textColor.black,
    minHeight: 37,
    paddingBottom: 17,
  },
  activeBottom: {
    borderBottomWidth: 1,
    borderBottomColor: hexToRGBA(Colors.mainColor, 0.4),
  },
  errorBottom: {
    borderBottomWidth: 1,
    borderBottomColor: hexToRGBA(Colors.red, 0.4),
  },
});
