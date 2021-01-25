import React, {memo, useState} from 'react';
import moment from 'moment';
import {StyleSheet, View, ScrollView} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Ripple from 'react-native-material-ripple';
//
import {TrashOutlinedIcon} from '../../components/icons';
import {ChatTextItem} from '../../components/ListItem';
import SearchBar from '../../components/SearchBar';
import MainHeader from '../../components/MainHeader';
import BottomTabBar from '../../components/BottomTabBar';
//
import {Images, Colors} from '../../themes';

const ChatBoxScreen = props => {
  const {navigation} = props;
  //
  const toChattingBoxScreen = chatboxType =>
    navigation.navigate('ChattingBoxScreen', {chatboxType});
  const [dataList, setDataList] = useState(DATA);
  const scrollEnabled = dataList.length > 0;
  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={'Event'} />
      <ScrollView>
        <View style={styles.searchBarBox}>
          <SearchBar style={styles.searchBar} />
        </View>
        {!scrollEnabled ? (
          <ListEmptyComponent />
        ) : (
          <SwipeListView
            data={dataList}
            contentContainerStyle={{paddingVertical: 20}}
            keyExtractor={item => item.id}
            scrollEnabled={scrollEnabled}
            renderItem={({item}) => (
              <ChatTextItem
                item={item}
                onPress={() => toChattingBoxScreen(item.type)}
              />
            )}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />
        )}
      </ScrollView>
      <BottomTabBar name="ChatBox" navigation={navigation} />
    </View>
  );
};

const ListEmptyComponent = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Images.IllustrationNoChat />
    </View>
  );
};

const renderHiddenItem = (data, rowMap) => {
  return (
    <View style={styles.rowBack}>
      <Ripple style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <View style={[styles.trash]}>
          <TrashOutlinedIcon />
        </View>
      </Ripple>
    </View>
  );
};
//
export default memo(ChatBoxScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  searchBarBox: {
    marginTop: 15,
    paddingHorizontal: 28,
    paddingBottom: 5,
    minHeight: 45,
  },
  searchBar: {},

  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.whiteGray,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
  trash: {
    height: 42,
    width: 42,
    backgroundColor: Colors.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
});

const DATA = [
  {
    id: '1',
    title: 'Cleaning',
    type: 'cleaning',
    unread: 1,
    message: 'It’s sound good 👍👍👍',
    timeText: moment().format('HH:mm a'),
  },
  {
    id: '2',
    title: 'Moving',
    type: 'moving',
    unread: 0,
    message: 'Thank you for your support',
    timeText: moment().format('HH:mm a'),
  },
  {
    id: '3',
    title: 'Laundry',
    type: 'laundry',
    message: 'I got them. Thanks ❤️',
    timeText: moment().format('HH:mm a'),
  },
  {
    id: '4',
    title: 'Delivery',
    type: 'delivery',
    message: "You're welcome",
    timeText: moment().format('HH:mm a'),
  },
  {
    id: '5',
    title: 'Ticket Support',
    type: 'ticket',
    message: 'Check it as soon as possible',
    timeText: moment().format('HH:mm a'),
  },
  {
    id: '6',
    title: 'General',
    type: 'general',
    message: 'Thank you for your support',
    timeText: moment().format('HH:mm a'),
  },
];
