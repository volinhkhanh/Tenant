import React from 'react';
import {View} from 'react-native';
import {CheckBox} from 'react-native-elements';
//
import {CheckedIcon as Checked} from '../icons';
//
import {Colors} from '../../themes';
//
const UncheckedIcon = () => (
  <View
    style={{
      borderColor: Colors.gray6,
      height: 20,
      width: 20,
      borderWidth: 0.5,
    }}
  />
);

const CheckedIcon = () => (
  <View
    style={{
      borderColor: Colors.gray6,
      height: 20,
      width: 20,
      borderWidth: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Checked size={20} color={Colors.mainColor} />
  </View>
);
//
const SquareCheckBox = props => {
  const {checked, setChecked} = props;
  return (
    <CheckBox
      checked={checked}
      containerStyle={{
        borderWidth: 0,
        backgroundColor: 'transparent',
        marginLeft: 0,
        padding: 10,
      }}
      checkedIcon={<CheckedIcon />}
      uncheckedIcon={<UncheckedIcon />}
      onPress={() => {
        setChecked && setChecked(checked);
      }}
      {...props}
    />
  );
};
//
export default SquareCheckBox;
//
