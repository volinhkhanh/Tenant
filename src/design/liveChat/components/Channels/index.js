import React from 'react';
import {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

import Avatar from '../../../../assets/images/liveChat/avatar.png';
import TrashSvg from '../../../../assets/images/liveChat/trash.svg';
import {formatLastTime} from '../../../../utils';
import SpinnerView from '../../../../components/SpinnerView';

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
}) {
  const Channel = ({channel}) => {
    const swipeableRef = useRef(null);

    const deleteChannel = channel => {
      handleDelete(channel.id);
      // swipeableRef.current.close();
    };

    const joinChannel = channel => {
      handleJoin(channel.id);
    };

    const avatar = channel.url || Avatar;
    const title = channel.name;
    const lastMessage = channel.lastMessage;
    const lastMessageCreatedAt = formatLastTime(new Date());
    const isUnread = channel.isUnread;
    const lastMessageUnreadCount = isUnread ? 1 : 0;

    // console.log(loadMoreLoading);

    return (
      <Swipeable
        ref={swipeableRef}
        renderRightActions={() => (
          <View
            style={{
              width: 88,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F9F9F9',
            }}
          >
            <TouchableWithoutFeedback onPress={() => deleteChannel(channel)}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 36 / 2,
                  backgroundColor: '#F6CA13',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TrashSvg />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      >
        <TouchableOpacity onPress={() => joinChannel(channel)}>
          <View style={styles.channelBox}>
            <Image style={styles.image} source={{uri: avatar}} />
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 20,
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: '#000',
                }}
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: isUnread ? '600' : '300',
                  fontSize: 12,
                }}
                numberOfLines={1}
              >
                {lastMessage}
              </Text>
            </View>
            <View style={{flexDirection: 'column', flex: 1}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: isUnread ? '600' : '300',
                    fontSize: 14,
                    color: '#4E5053',
                  }}
                >
                  {lastMessageCreatedAt}
                </Text>
                {isUnread && (
                  <View
                    style={{
                      backgroundColor: '#F0443C',
                      borderRadius: 15 / 2,
                      width: 15,
                      height: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: isUnread ? '600' : '300',
                        fontSize: 12,
                        color: '#FFF',
                      }}
                    >
                      {lastMessageUnreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const onRefresh = () => {
    // console.log('onRefresh');
    handleRefresh();
  };

  const onEndReached = () => {
    // console.log('onEndReached');
    handleLoadMore();
  };

  const itemWidth = 84;
  const separatorWidth = 0.5;
  const totalItemWidth = itemWidth + separatorWidth;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListBox}
        data={channels}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => {
          return <Channel channel={item} />;
        }}
        ItemSeparatorComponent={() => <View style={styles.separatorLine} />}
        onRefresh={onRefresh}
        refreshing={refreshLoading}
        windowSize={10}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
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
    paddingBottom: 206,
  },
  flatListBox: {},
  image: {
    width: 47,
    height: 47,
    borderRadius: 47 / 2,
  },
  channelBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 18,
  },
  separatorLine: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#CACACA',
  },
});
