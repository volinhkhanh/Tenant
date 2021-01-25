import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {
  Colors,
  Fonts,
} from '../../themes';
//
export default function Button(props) {
  const { disabled, backgroundColor, type = 'default', size = 'default', text, style = {}, textstyle = {}, onPress } = props;
  const _style = {...style };
  return (
    <Ripple
      style={[styles.container, _style, {backgroundColor: disabled ? Colors.gray6 : (backgroundColor ? backgroundColor : Colors.mainColor)}]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          size === 'small' ? styles.smallLabel : styles.label,
          type === 'white' && { color: Colors.white } ,
          type === 'main' && { color: Colors.mainColor },
          disabled == true && { color: Colors.white, opacity: 0.6 },
          textstyle,
        ]}>
        {text}
      </Text>
    </Ripple>
  );
}
//
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  label: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.h3,
    color: Colors.black,
    paddingVertical: 15,
  },
  smallLabel: {
    ...Fonts.style.captionBold,
    color: Colors.white,
    padding: 14,
  },
});
