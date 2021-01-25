import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Input } from 'react-native-elements';
import { VisibilityIcon, VisibilityOffIcon } from './icons';
import { Colors, Fonts } from '../themes';
import { hexToRGBA } from '../services/utils';

function PasswordInput(props) {
  const { onPress, setRef, value, placeholder = 'Password', ..._props } = props;
  const [_value, setValue] = useState(value);
  const [activeText, setActiveText] = useState(false);
  const onChangeText = value => {
    setValue(value)
    if (value === '') {
      setActiveText(false);
    } else {
      setActiveText(true);
    }
    onPress(value)
  };

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const onPressRightIcon = () => setHiddenPassword(!hiddenPassword);

  return (
    <Input
      ref={setRef}
      placeholder={placeholder}
      placeholderTextColor={Colors.textColor.lightTiny}
      inputStyle={styles.placeholder}
      inputContainerStyle={[styles.inputContainer, activeText && styles.activeBottom]}
      onChangeText={onChangeText}
      returnKeyType="go"
      errorStyle={styles.errorPassword}
      secureTextEntry={hiddenPassword}
      multiline={false}
      value={_value}
      rightIcon={() => (
        <Ripple onPress={onPressRightIcon}>
          {hiddenPassword ? <VisibilityOffIcon size={24} color={Colors.gray5} /> : <VisibilityIcon size={24} color={Colors.gray1} />}
        </Ripple>
      )}
      rightIconContainerStyle={{
        height: 37,
        justifyContent: 'flex-start',
      }}
      {..._props}
    />
  );
}

export default PasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
  },
  errorPassword: {
    ...Fonts.style.otherLight,
    color: Colors.red,
  },
  placeholder: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.textColor.black,
    minHeight: 37,
    paddingBottom: 17,
  },
  activeBottom: {
    borderBottomWidth: 1,
    borderBottomColor: hexToRGBA(Colors.mainColor, 0.4),
  },
});
