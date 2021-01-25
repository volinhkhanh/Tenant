import React, {memo, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import _ from 'lodash';
import Ripple from 'react-native-material-ripple';
//
import {ArrowForwardIcon, ChevronRight} from '../icons';
//
import {Fonts, Colors, ApplicationStyles} from '../../themes';
//
export const SettingItem = memo((props) => {
  const {type = 'default', title = 'Help', leftIcon, children, onPress, isOpen} = props;
  const itemStyle = {
    paddingVertical: type === 'default' ? 26 : 15,
    paddingLeft:
      type === 'default'
        ? ApplicationStyles.utils.resizeLimitedWidth(26)
        : ApplicationStyles.utils.resizeLimitedWidth(70),
  };
  // const [isOpen, setIsOpen] = useState(false);
  //
  return (
    <View>
      <Ripple
        style={[styles.item, itemStyle]}
        activeOpacity={children ? 1 : 0.7}
        onPress={() => {
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
            ]}>
            {title}
          </Text>
        </View>
        <Image style={[
          styles.image,
            {transform: [{rotate: isOpen ? '90deg' : '0deg'}]}
          ]}
          source={ChevronRight}
        />
        {/* <ArrowForwardIcon
          size={20}
          color={isOpen && children ? Colors.gray2 : Colors.gray5}
          style={{
            transform: [{rotate: isOpen && children ? '90deg' : '0deg'}],
          }}
        /> */}
      </Ripple>
      {/* {isOpen && children} */}
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
