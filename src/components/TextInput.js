import React, {useState} from 'react';
import PropTypes from 'prop-types';
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
    placeholder = 'Phone',
    style,
    containerStyle,
    value,
    onChangeText,
    errorText,
    setRef,
    ..._props
  } = props;
  const [_value, setValue] = useState(value);
  const [activeText, setActiveText] = useState(false);
  const _onChangeText = value => {
    onChangeText && onChangeText(value);
    setValue(value);
    if (value === '') {
      setActiveText(false);
    } else {
      setActiveText(true);
    }
  };

  return (
    <Input
      ref={setRef}
      placeholder={placeholder}
      placeholderTextColor={Colors.textColor.gray6}
      inputStyle={styles.placeholder}
      inputContainerStyle={[
        styles.inputContainer,
        style,
        activeText && styles.activeBottom,
        {borderBottomWidth: noBorder ? 0 : 0.5},
        errorText && styles.errorBottom,
      ]}
      containerStyle={{
        paddingHorizontal: 0,
        ...containerStyle,
      }}
      onChangeText={_onChangeText}
      value={value}
      {..._props}
    />
  );
}

TextInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  onChangeText: PropTypes.func,
  containerStyle: PropTypes.object,
};

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
