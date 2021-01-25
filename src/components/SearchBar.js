import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { Input } from 'react-native-elements';
//
import { Colors, Fonts } from '../themes';
//
import { SearchIcon } from './icons';
//
function SearchBar(props) {
  const {
    value,
    placeholder = 'Search',
    style,
    isLeftIcon = true,
    isRightIcon = false,
    onChangeText,
    containerStyle,
    ..._props
  } = props;
  const [activeText, setActiveText] = useState(!!value);
  const _onChangeText = value => {
    onChangeText && onChangeText(value);
    if (value === '') {
      setActiveText(false);
    } else {
      setActiveText(true);
    }
  };
//
  const inputProps = {
    ..._props,
    leftIcon: isLeftIcon && <SearchIcon size={24} color={activeText ? Colors.mainColor : Colors.gray2} />,
    leftIconContainerStyle: isLeftIcon && {
      marginLeft: 8,
    },
    rightIcon: isRightIcon && <SearchIcon size={24} color={activeText ? Colors.mainColor : Colors.gray2} />,
    rightIconContainerStyle: isRightIcon && {
      marginRight: 8,
    },
  };
//
  return (
    <View style={{ minHeight: 40, width: '100%' }}>
      <Input
        placeholder={placeholder}
        placeholderTextColor={Colors.textColor.gray7}
        inputStyle={[styles.placeholder, activeText && styles.activeText]}
        inputContainerStyle={[styles.inputContainer, style, activeText && styles.activeContainer]}
        onChangeText={_onChangeText}
        containerStyle={{ paddingHorizontal: 0, borderWidth: 0, ...containerStyle }}
        value={value}
        {...inputProps}
      />
    </View>
  );
}
//
SearchBar.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
};
//
export default SearchBar;
//
const styles = StyleSheet.create({
  inputContainer: {
    backfaceVisibility: 'hidden',
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray4,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
  placeholder: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  activeContainer: {
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: Colors.gray1,
  },
  activeLeftIcon: {},
  activeText: {
    color: Colors.textColor.black,
  },
});
