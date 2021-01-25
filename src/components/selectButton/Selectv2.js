import React, { useState, memo } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  ViewPropTypes,
  FlatList,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import { ApplicationStyles, Colors, Fonts } from '../../themes/';
//
import { CheckedIcon, ArrowDropDownv2 } from '../icons';
//
function Selectv2(props) {
  const {
    data,
    style,
    tableStyle,
    headerText,
    headerTextStyle,
    onPressSelectItem,
    selectedItem = {
      id: '0',
    },
  } = props;
  const [active, setActive] = useState(false);
  const invisible = !!selectedItem && _.find(data, i => i.id === selectedItem.id);
  const [_selectedItem, _setSelectedItem] = useState(selectedItem);
  const [viewLayout, setViewLayout] = useState([100, 45]);
  const onLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout;
    setViewLayout([width, height]);
  };
  const _onPressSelectItem = item => {
    !!onPressSelectItem && onPressSelectItem(item);
    _setSelectedItem(item);
    setActive(false);
  };
  //
  return (
    <View style={[style, !invisible && styles.invisibleStyle]} activeOpacity={0.5} onLayout={onLayout}>
      <Ripple onPress={() => setActive(!active)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text style={[styles.headerText, headerTextStyle, !invisible && styles.invisibleHeaderTextStyle]}>
            {_selectedItem.name || headerText}
          </Text>
          <ArrowDropDownv2 fill={Colors.mainColor} />
        </View>
      </Ripple>
      {active && (
        <Ripple
          onPress={() => setActive(false)}
          activeOpacity={1}
          style={{
            position: 'absolute',
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
      {active && (
        <View style={[styles.table, tableStyle, { top: viewLayout[1], width: viewLayout[0] }]}>
          <FlatList
            data={data}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <Ripple onPress={() => _onPressSelectItem(item)} style={styles.item} key={item.id}>
                  <View style={styles.left}>
                    <Text style={Fonts.style.bodyRegular}>{item.name}</Text>
                  </View>
                  {_selectedItem.id === item.id && <CheckedIcon size={18} color={Colors.gray2} />}
                </Ripple>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
//
Selectv2.propTypes = {
  data: PropTypes.array,
  style: ViewPropTypes.style,
  tableStyle: ViewPropTypes.style,
  headerTextStyle: ViewPropTypes.style,
  headerText: PropTypes.string,
  onPressSelectItem: PropTypes.any,
  selectedItem: PropTypes.object,
};
//
export default memo(Selectv2);
//
const styles = StyleSheet.create({
  table: {
    position: 'absolute',
    zIndex: 3,
    backgroundColor: 'white',
    left: 0,
    top: 30,
    borderRadius: 5,
    ...ApplicationStyles.shadow.dynamicOffset(2, 3, undefined, 0.15, 9),
  },
  headerText: {
    ...Fonts.style.subtitleSemibold,
    color: Colors.gray2,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    paddingVertical: 10,
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 0.5,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  circle: {
    width: 5,
    height: 5,
    backgroundColor: 'red',
    marginHorizontal: 6,
    borderRadius: 999,
  },
  invisibleStyle: {
    borderWidth: 0.5,
    borderColor: Colors.gray4,
  },
  invisibleHeaderTextStyle: {
    color: Colors.gray4,
  },
});
