import React, {useRef, useEffect, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {ApplicationStyles, Colors} from '../../themes/';
import {CheckedIcon} from '../icons';

const ITEM_HEIGHT = 45;
const renderItem = (props, item, index) => {
  const {checkData, setItem, modalVisible, keyword, translate, onSelectIndex} = props;
  return item.name !== '' ? (
    <TouchableOpacity
      style={styles.itemContent}
      onPress={() => {
        setItem(keyword, item);
        onSelectIndex && onSelectIndex(index)
        modalVisible.close();
      }}>
      <Text>{(item.name === "MALE" || item.name === "FEMALE") ? translate(item.name) : item.name}</Text>
      {checkData.id == item.id && (
        <CheckedIcon size={18} color={Colors.mainColor} />
      )}
    </TouchableOpacity>
  ) : null
};

const ModalSelector = props => {
  const {setModal, data, keyword, selectedIndex} = props;
  const getItemLayout = (data, index) => (
    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
  )
  return (
    <View style={styles.container}>
      <RBSheet
        ref={ref => {
          setModal(keyword, ref);
        }}
        height={ApplicationStyles.utils.resizeHeight(300)}
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
            initialScrollIndex={selectedIndex || 0}
            removeClippedSubviews={false}
            onScrollToIndexFailed={() => {}}
            getItemLayout={getItemLayout || {}}
            style={styles.content}
            data={data}
            renderItem={({item, index}) => renderItem(props, item, index)}
            keyExtractor={item => item.id}
            // initialScrollIndex={100}
          />
        {/* </ScrollView> */}
      </RBSheet>
    </View>
  );
};

export default ModalSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});
