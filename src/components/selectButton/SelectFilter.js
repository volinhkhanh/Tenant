import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Images, ApplicationStyles, Colors, Fonts } from '../../Themes/';
import { FilterIcon, CheckedIcon } from '../Icons';

const SelectFilter = props => {
  const { data = [], selectedItem, onSelectItem } = props;
  const [active, setActive] = useState(false);
  const [_selectedItem, _setSelectedItem] = useState(selectedItem || data[0]);

  const onPressSelectItem = item => {
    !!onSelectItem && onSelectItem(item);
    setActive(false);
    _setSelectedItem(item);
  };

  return (
    <View style>
      <Ripple onPress={() => setActive(!active)} style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <Text style={{ ...Fonts.style.captionRegular, paddingHorizontal: 12 }}>{_selectedItem.name}</Text>
        <FilterIcon size={18} />
      </Ripple>
      {/*  */}
      {active && (
        <View style={styles.table}>
          {data &&
            data.length > 0 &&
            data.map(item => (
              <Ripple style={styles.item} key={item.id} onPress={() => onPressSelectItem(item)}>
                <View style={styles.left}>
                  <View style={[styles.circle, { backgroundColor: item.color || 'white' }]} />
                  <Text style={Fonts.style.otherMedium}>{item.name}</Text>
                </View>
                {_selectedItem.id === item.id && <CheckedIcon size={18} color={Colors.purplePink} />}
              </Ripple>
            ))}
        </View>
      )}
      {active && (
        <Ripple
          onPress={() => setActive(false)}
          activeOpacity={1}
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            height: 9999,
            width: 9999,
            marginLeft: -5000,
            marginTop: -5000,
          }}
        />
      )}
    </View>
  );
};

export default SelectFilter;

const styles = StyleSheet.create({
  table: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 0,
    top: 30,
    zIndex: 3,
    width: 150,
    borderRadius: 5,
    ...ApplicationStyles.shadow.dynamicOffset(2, 3, undefined, 0.15, 9),
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 0.5,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  circle: {
    width: 5,
    height: 5,
    backgroundColor: 'red',
    marginHorizontal: 6,
    borderRadius: 999,
  },
});
