import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {MinusIcon, PlusIcon} from './icons';
import {Colors, Fonts} from '../themes';

function QuantityChosen1(props) {
  const {style, value, onChange, onBlur, errorText} = props;
  const [_active, _setActive] = useState(false);

  // console.log(value);

  function _onPress(operator) {
    if (_active === false) _setActive(true);
    switch (operator) {
      case 'add':
        onChange(`${+value + 1}`);
        break;
      case 'sub':
        onChange(`${+value - 1}`);
        break;
    }
  }

  return (
    <View
      style={[
        styles.container,
        _active && styles.activeContainer,
        errorText && {borderColor: Colors.red},
        style,
      ]}>
      <Ripple
        activeOpacity={0.7}
        style={styles.subBox}
        disabled={+value < 1}
        onPress={() => _onPress('sub')}
        onBlur={onBlur}>
        <MinusIcon color={value === 0 ? Colors.cloud : Colors.blackInactive} />
      </Ripple>
      <View style={styles.numberBox}>
        <Text style={[styles.number, value !== 0 && styles.activeNumber]}>
          {value}
        </Text>
      </View>
      <Ripple
        activeOpacity={0.7}
        style={styles.plusBox}
        disabled={+value === 10}
        onPress={() => _onPress('add')}
        onBlur={onBlur}>
        <PlusIcon color={value === 10 ? Colors.cloud : Colors.blackInactive} />
      </Ripple>
    </View>
  );
}

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
    borderColor: Colors.gray2,
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

export default QuantityChosen1;
