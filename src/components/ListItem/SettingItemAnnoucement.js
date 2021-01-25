import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import _ from 'lodash';
import Ripple from 'react-native-material-ripple';
//
import {ChevronRight} from '../icons';
//
import {Fonts, Colors, ApplicationStyles} from '../../themes';
//
export const SettingItemAnnoucement = memo((props) => {
  const {
    type = 'default',
    title = 'Help',
    leftIcon,
    children,
    onPress,
    totalNotRead,
  } = props;
  const itemStyle = {
    paddingVertical: type === 'default' ? 26 : 15,
    paddingLeft:
      type === 'default'
        ? ApplicationStyles.utils.resizeLimitedWidth(26)
        : ApplicationStyles.utils.resizeLimitedWidth(70),
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View>
      <Ripple
        style={[styles.item, itemStyle]}
        activeOpacity={children ? 1 : 0.7}
        onPress={() => {
          // children && setIsOpen(!isOpen);
          onPress && onPress();
        }}>
        <View style={styles.left}>
          {leftIcon &&
            leftIcon({
              fill: isOpen ? Colors.purplePink : Colors.black,
            })}
          <Text>{'   '}</Text>
          <Text
            style={[
              styles.title,
              // {color: isOpen ? Colors.purplePink : Colors.black},
            ]}>
            {title}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {totalNotRead > 0 && (
          <View
            style={{
              height: 25,
              width: 25,
              borderRadius: 25,
              backgroundColor: '#F0443C',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.title, {color: Colors.white, fontSize: Fonts.size.h5,}]}>
              {totalNotRead}
            </Text>
          </View>
          )}
          <Image style={[
            styles.image,
              {transform: [{rotate: isOpen ? '90deg' : '0deg'}]}
            ]}
            source={ChevronRight}
          />
        </View>
      </Ripple>
      {isOpen && children}
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
    backgroundColor: Colors.white,

    borderBottomColor: Colors.gray5,
    borderBottomWidth: 1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  image: {
    width: 10,
    height: 15,
    marginLeft: 20,
  }
});
