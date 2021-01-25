import React, {forwardRef, useRef, useEffect, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import _ from 'lodash';
import Ripple from 'react-native-material-ripple';
import {ApplicationStyles, Colors, Fonts} from '../../themes';
import {CheckedIcon, ArrowDropDownv2 as ArrowDropDown2} from '../icons';
import Arrow_down_open from '../../components/icons/images/arrow_down_open.png';
import Layouts from '../../constants/Layouts'

const ITEM_HEIGHT = 45;

export const SelectLanguage = forwardRef(
  ({selectedId, selectedList, onSelect}, ref) => {
    return (
      <View>
        <Ripple
          style={{flexDirection: 'row'}}
          onPress={() => {
            ref.current.open();
          }}>
          <Text style={{fontSize: 16}}>
            {selectedList.find(item => item.id === selectedId).name}
          </Text>
          <View style={styles.arrowDown}>
            <ArrowDropDown2 fill={Colors.black} />
          </View>
        </Ripple>

        <RBSheet
          ref={ref}
          height={Layouts.height / 3}
          openDuration={300}
          customStyles={{
            container: {
              padding: 20,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
          }}>
          {/* <ScrollView style={styles.content} showsVerticalScrollIndicator={false}> */}
            <FlatList
              style={styles.content}
              showsVerticalScrollIndicator={false}
              data={selectedList || []}
              renderItem={({item}) => (
                <Ripple
                  style={styles.itemContent}
                  onPress={() => {
                    onSelect(item.id);
                    ref.current.close();
                  }}>
                  <Text>{item.name}</Text>
                  {item.id === selectedId && (
                    <CheckedIcon size={18} color={Colors.mainColor} />
                  )}
                </Ripple>
              )}
              keyExtractor={item => item.id}
            />
          {/* </ScrollView> */}
        </RBSheet>
      </View>
    );
  },
);

export const SelectType = forwardRef(
  (
    {initValue, selectedId, selectedIndex, selectedList, onSelect, onSelectIndex, height = Layouts.height / 3, error},
    ref
  ) => {
    const getItemLayout = (data, index) => (
      { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
    )
    return (
      <View>
        <Ripple
          style={[styles.selector, error && {borderColor: Colors.red}]}
          onPress={() => {
            ref.current.open();
          }}>
          <Text
            style={[
              styles.textSelector,
              {
                color: selectedId === 0 ? Colors.textColor.gray7 : Colors.black,
              },
            ]}>
            {selectedId === 0
              ? initValue
              : selectedList?.find(item => item.id === selectedId)?.name}
          </Text>
          <Image
            source={Arrow_down_open}
            style={[
              styles.imageArrowDown,
              {
                tintColor:
                  selectedId === 0 ? Colors.grayArrow : Colors.mainColor,
              },
            ]}
          />
        </Ripple>

        <RBSheet
          ref={ref}
          height={ApplicationStyles.utils.resizeHeight(height)}
          openDuration={300}
          customStyles={{
            container: {
              padding: 20,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
          }}>
          {/* <ScrollView style={styles.content} showsVerticalScrollIndicator={false}> */}
            <FlatList
              showsVerticalScrollIndicator={false}
              // getItemLayout={getItemLayout}
              initialScrollIndex={selectedIndex || 0}
              removeClippedSubviews={false}
              onScrollToIndexFailed={() => {}}
              getItemLayout={getItemLayout || {}}
              style={styles.content}
              data={selectedList || []}
              renderItem={({item, index}) => (
                <Ripple
                  style={styles.itemContent}
                  onPress={() => {
                    onSelect(item.id);
                    onSelectIndex && onSelectIndex(index);
                    ref.current.close();
                  }}>
                  <Text>{item.name}</Text>
                  {item.id === selectedId && (
                    <CheckedIcon size={18} color={Colors.mainColor} />
                  )}
                </Ripple>
              )}
              keyExtractor={item => item.id}
            />
          {/* </ScrollView> */}
        </RBSheet>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 5,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray6,
    height: ITEM_HEIGHT,
  },
  arrowDown: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  textSelector: {
    fontSize: Fonts.size.h4,
    color: Colors.textColor.gray3,
    fontFamily: Fonts.type.base,
  },
  imageArrowDown: {
    width: 25,
    height: 25,
  },
});
