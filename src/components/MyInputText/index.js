import React from 'react';
import {StyleSheet, View, TextInput, Dimensions} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get(
  'window',
);

export function MyInputText({
  style,
  placeholderText,
  value,
  onChangeText,
  prefix,
  suffix,
}) {
  return (
    <>
      <View style={[styles.inputContainer, style]}>
        {prefix && <View style={styles.prefixIcon}>{prefix}</View>}
        <TextInput
          style={styles.input}
          width={SCREEN_WIDTH - 94 - (!!prefix && 20) - (!!suffix && 20)}
          height={40}
          inputStyle
          placeholderTextColor="#CACACA"
          placeholder={placeholderText}
          value={value}
          onChangeText={onChangeText}
        />
        {suffix && <View style={styles.suffixIcon}>{suffix}</View>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 8,
  },
  input: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    textAlignVertical: 'center',
  },
  prefixIcon: {
    marginRight: 8,
  },
  suffixIcon: {
    marginLeft: 8,
  },
});
