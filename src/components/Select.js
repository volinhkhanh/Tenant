import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { AppRegistry, Text, View } from 'react-native';
import DropdownMenu from '../Lib/react-native-dropdown-menu-fixed';
import { Fonts, Colors } from '../Themes/';

function Selects(props) {
  const [text, setText] = useState('');
  const { data = [['Furniture', 'Electricity', 'Equipment', 'Lighting']] } = props;
  const { type = 'default', style, textStyle } = props;

  const ACTIVITY_TINT_COLOR = {
    active: Colors.gray1,
    default: Colors.gray4,
  };

  return (
    <View style={style}>
      <DropdownMenu
        bgColor={'transparent'}
        tintColor={ACTIVITY_TINT_COLOR[type]}
        activityTintColor={ACTIVITY_TINT_COLOR[type]}
        containerStyle={{
          borderRadius: 5,
          borderColor: Colors.gray4,
          borderWidth: 0.5,
        }}
        optionTextStyle={{ color: Colors.gray2 }}
        titleStyle={{
          marginLeft: 10,
          paddingVertical: 6,
          ...Fonts.style.bodyMedium,
          color: ACTIVITY_TINT_COLOR[type],
          ...textStyle,
        }}
        maxHeight={200}
        handler={(selection, row) => setText(data[selection][row])}
        data={data}
      />
    </View>
  );
}

Selects.propTypes = {
  data: PropTypes.array,
  style: PropTypes.object,
  type: PropTypes.oneOf(['default', 'active']),
};

export default Selects;
