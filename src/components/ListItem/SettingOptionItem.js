import React, { memo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import _ from 'lodash';
import Ripple from 'react-native-material-ripple';
//
import { ArrowForwardIcon, CheckedIcon } from '../icons';
//
import { Fonts, Colors, ApplicationStyles } from '../../themes';
//
export const SettingOptionItem = memo((props) => {
  const { data = [], title = 'Help', leftIcon, children } = props;
  const itemStyle = {
    paddingVertical: 15,
    paddingLeft: ApplicationStyles.utils.resizeLimitedWidth(70),
  };
  const [isOpen, setIsOpen] = useState(false);
  const [dataList, setDataList] = useState(data);
  const itemChecked = _.find(dataList, (item) => item.checked);
  //
  return (
    <View>
      <Ripple style={styles.item} activeOpacity={children ? 1 : 0.7} onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.left}>
          {leftIcon && leftIcon({ fill: isOpen ? Colors.purplePink : Colors.gray2 })}
          <Text>{'   '}</Text>
          <Text style={[styles.title, { color: isOpen ? Colors.purplePink : Colors.black }]}>{title}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.title, { color: Colors.gray2, paddingRight: 10 }]}>{itemChecked.name}</Text>
          <ArrowForwardIcon
            size={25}
            color={isOpen ? Colors.gray2 : Colors.gray4}
            style={{
              transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
            }}
          />
        </View>
      </Ripple>
      {isOpen &&
        dataList.map((item) => {
          return (
            <Ripple
              key={item.id}
              style={[styles.item, itemStyle]}
              activeOpacity={children ? 1 : 0.7}
              onPress={() => {
                const newData = _.map(dataList, (_item) => {
                  if (_item.id === item.id) {
                    return { ..._item, checked: true };
                  }
                  return { ..._item, checked: false };
                });
                setDataList(newData);
              }}>
              <View style={styles.left}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
              {item.checked && <CheckedIcon size={25} color={Colors.gray1} />}
            </Ripple>
          );
        })}
    </View>
  );
});
//
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 26,
    paddingRight: 21,
    paddingVertical: 26,
    paddingLeft: ApplicationStyles.utils.resizeLimitedWidth(26),
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.white
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Fonts.style.bodySemibold,
    color: Colors.black,
  },
});
