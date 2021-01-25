import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import SpinnerView from '../../../../components/SpinnerView';
import {Channel} from './components';

export function Channels({
  channels = [],
  handleDelete = () => {},
  handleJoin = () => {},
  refreshLoading = false,
  handleRefresh = () => {},
  handleLoadMore = () => {},
  page = 1,
  limit = 10,
  showLoadMoreIndicator = true,
  navigation,
}) {
  const onRefresh = () => {
    // console.log('onRefresh');
    handleRefresh();
  };

  const onEndReached = () => {
    // console.log('onEndReached');
    handleLoadMore();
  };

  // const itemWidth = 84;
  // const separatorWidth = 0.5;
  // const totalItemWidth = itemWidth + separatorWidth;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListBox}
        data={channels}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => {
          return (
            <Channel
              channel={item}
              handleDelete={handleDelete}
              handleJoin={handleJoin}
              navigation={navigation}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separatorLine} />}
        onRefresh={onRefresh}
        refreshing={refreshLoading}
        windowSize={10}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        updateCellsBatchingPeriod={10}
        ListFooterComponent={() => {
          return (
            showLoadMoreIndicator && (
              <View style={{height: 84}}>
                <SpinnerView />
              </View>
            )
          );
        }}
        initialNumToRender={limit}
        maxToRenderPerBatch={limit * page}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // paddingBottom: 206,
  },
  flatListBox: {paddingBottom: 30},
  image: {
    width: 47,
    height: 47,
    borderRadius: 47 / 2,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#4E5053',
  },
  channelBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 18,
  },
  separatorLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#CACACA',
  },
});
