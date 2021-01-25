import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {StyleSheet, View, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import {MinusIcon, PlusIcon} from './icons/';
//
import {Colors, Fonts} from '../themes/';
//
function QuantityChoosen(props) {
  const {style, value, onChange, error, disabled} = props;
  const [active, setActive] = useState(true);
  const [_value, _setValue] = useState(value);
  const subValue = () => {
    const value1 = _.max([_value - 1, 0]);
    if (!!onChange) {
      onChange(value1);
      // _setValue(value1);
    }
  };
  const addValue = () => {
    const value1 = _.max([_value + 1, 0]);
    if (!!onChange) {
      onChange(value1);
      // _setValue(value1);
    }
  };
  //
  useEffect(() => {
    _setValue(value);
  }, [value]);
  //
  return (
    <View
      style={[
        styles.container,
        active && styles.activeContainer,
        style,
        error && {borderColor: Colors.red},
      ]}>
      <Ripple
        activeOpacity={0.7}
        style={[styles.subBox, disabled && {opacity: 0.5}]}
        onPress={subValue}
        disabled={_value === 0 || disabled}>
        <MinusIcon color={Colors.blackInactive} />
      </Ripple>
      <View style={styles.numberBox}>
        <Text
          style={[
            styles.number,
            active && _value !== 0 && styles.activeNumber,
          ]}>
          {_value}
        </Text>
      </View>
      <Ripple
        activeOpacity={0.7}
        style={[styles.plusBox, disabled && {opacity: 0.5}]} onPress={addValue}
        disabled={disabled}
      >
        <PlusIcon color={Colors.blackInactive} />
      </Ripple>
    </View>
  );
}
//
export default QuantityChoosen;
//
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray4,
    overflow: 'hidden',
  },
  activeContainer: {
    borderColor: Colors.gray6,
  },
  subBox: {
    paddingHorizontal: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray5,
  },
  sub: {
    fontSize: 24,
  },
  plusBox: {
    paddingHorizontal: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray5,
  },
  numberBox: {
    padding: 14,
  },
  number: {
    ...Fonts.style.bodySemibold,
    color: Colors.gray4,
  },
  activeNumber: {
    color: Colors.gray1,
  },
});
