import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Colors, Fonts} from '../../themes';

export function MyRadioButton({
  checked = false,
  label = '',
  onPress = () => {},
}) {
  const CheckedRadioButton = ({onPress}) => (
    <TouchableWithoutFeedback onPress={onPress} style={styles.radioContent}>
      <View>
        <View style={styles.checkedRadio} />
        <View style={styles.miniCheckedRadio} />
      </View>
    </TouchableWithoutFeedback>
  );

  const UncheckedRadioButton = ({onPress}) => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.uncheckedRadio} />
    </TouchableWithoutFeedback>
  );

  const renderRadio = (checked = false, onPress = () => {}) => {
    if (!!checked) {
      return <CheckedRadioButton onPress={onPress} />;
    }

    return <UncheckedRadioButton onPress={onPress} />;
  };

  return (
    <View style={styles.container}>
      {renderRadio(checked, onPress)}
      <Text onPress={onPress} style={[styles.label, checked && {color: '#F6CA13'}]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioContent: {
    justifyContent: 'center',
  },
  checkedRadio: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: '#FFF',
    borderColor: '#F6CA13',
    borderWidth: 1,
  },
  miniCheckedRadio: {
    position: 'absolute',
    backgroundColor: '#F6CA13',
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    top: 8 / 2,
    left: 8 / 2,
  },
  uncheckedRadio: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: '#FFF',
    borderColor: '#8A8A8A',
    borderWidth: 1,
  },
  label: {
    marginLeft: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: Colors.black,
  },
});
