import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {MyInputText} from '../../components/MyInputText';
import SearchSvg from '../../assets/images/liveChat/search.svg';
import SearchHighLightSvg from '../../assets/images/liveChat/search-highlight.svg';

import {EmptyChat, Channels} from './components';
import DimSpinnerView from '../../components/DimSpinnerView';
import {useSendBird} from '../../context';
import {getTicketChannels} from '../../services/serviceRest';
import {useDebounce} from '../../hooks';

import {connect} from 'react-redux';
import {setChannel} from '../../actions/actionCommon';

import {useTranslation} from '../../context/LanguageContext';

const height = Dimensions.get('window').height;

// const mockAPI = 'https://5f0ea5f8faef3500160b8663.mockapi.io';

const mapStateToProps = ({reducerCommon: {channelData, channelStorageData, pageChannels}}) => ({
  channelData,
  channelStorageData,
  pageChannels,
});

export const ContainerLiveChat = connect(mapStateToProps, {
  setChannel,
})(LiveChatScreen);

function LiveChatScreen(props) {
  const {i18nLiveChat, i18nLiveChatSe} = useTranslation();
  const {channelListQuery, onUserReceivedInvitation} = useSendBird();
  // console.log('🥵', props?.navigation?.navigate);
  const {channelData, channelStorageData, pageChannels, navigation} = props;

  const [search, setSearch] = useState('');
  const debouncedSearchText = useDebounce(search, 500);
  const [channels, setChannels] = useState(channelStorageData);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(pageChannels);
  const [limit, setLimit] = useState(10);

  // const itemsTotal = 50;
  // console.log(channels.length, limit, page * limit, total);
  const isLoadedAll = channels?.length < limit || page * limit > total;

  const fetchChannels = async () => {
    if (!!search) {
      // const response = await fetch(
      //   `${mockAPI}/channels?name=${debouncedSearchText}`,
      // );
      // const data = await response.json();
      const response1 = await getTicketChannels({
        keyword: debouncedSearchText,
      });
      const data1 = response1.data;
      const channelUrlsFilter = data1?.items?.map((item) => item.channel_url);
      const sendBirdChannels = await channelListQuery({channelUrlsFilter});
      const concatChannels = data1?.items?.map((element) => {
        const channelData = sendBirdChannels.find(
          (element2) => element2.url === element.channel_url,
        );
        return {
          ...element,
          unread_messages_count: channelData?.unreadMessageCount,
          last_message: channelData?.lastMessage?.message,
          last_message_at: channelData?.lastMessage?.createdAt,
        };
      });
      setChannels(concatChannels);
      setChannelsLoading(false);
    } else {
      // const response = await fetch(
      //   `${mockAPI}/channels?p=${page}&l=${limit}`,
      // );
      // const data = await response.json();
      // let channelsStorage = await AsyncStorage.getItem('channels');
      // const parsedChannelsStorage = JSON.parse(channelStorageData);
      if (channels?.length > 0) {
        const response1 = await getTicketChannels({
          page: 1,
          size: 1,
        });
        const data1 = response1.data;
        setTotal(data1.total_items);
        await saveCache();
      } else {
        channels?.length === 0 && setChannelsLoading(true);
        const response1 = await getTicketChannels({
          page: page,
          size: limit,
        });
        const data1 = response1.data;
        await AsyncStorage.setItem('pages', JSON.stringify(data1.page));
        setTotal(data1.total_items);
        const channelUrlsFilter = data1?.items?.map(
          (item) => item.channel_url,
        );
        const sendBirdChannels = await channelListQuery({channelUrlsFilter});
        const concatChannels = data1?.items?.map((element) => {
          const channelData = sendBirdChannels.find(
            (element2) => element2.url === element.channel_url,
          );
          // console.log('😀', channelData?.unreadMessageCount);
          return {
            ...element,
            unread_messages_count: channelData?.unreadMessageCount,
            last_message: channelData?.lastMessage?.message,
            last_message_at: channelData?.lastMessage?.createdAt,
          };
        });
        await AsyncStorage.setItem(
          'channels',
          JSON.stringify(concatChannels),
        );
        if (page > 1) {
          setChannels((prevState) => [...prevState, ...concatChannels]);
          setChannelsLoading(false);
        } else {
          setChannels(concatChannels);
          setChannelsLoading(false);
        }
      }
    }
  };

  const fetchChannelsFocus = async () => {
    channels?.length === 0 && setChannelsLoading(true);
    const response1 = await getTicketChannels({
      page: page,
      size: limit,
    });
    const data1 = response1.data;
    await AsyncStorage.setItem('pages', JSON.stringify(data1.page));
    setTotal(data1.total_items);
    const channelUrlsFilter = data1?.items?.map(
      (item) => item.channel_url,
    );
    const sendBirdChannels = await channelListQuery({channelUrlsFilter});
    const concatChannels = data1?.items?.map((element) => {
      const channelData = sendBirdChannels.find(
        (element2) => element2.url === element.channel_url,
      );
      return {
        ...element,
        unread_messages_count: channelData?.unreadMessageCount,
        last_message: channelData?.lastMessage?.message,
        last_message_at: channelData?.lastMessage?.createdAt,
      };
    });
    await AsyncStorage.setItem(
      'channels',
      JSON.stringify(concatChannels),
    );
    if (page > 1) {
      setChannels((prevState) => [...prevState, ...concatChannels]);
      setChannelsLoading(false);
    } else {
      setChannels(concatChannels);
      setChannelsLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
    navigation.addListener('willFocus', () => {
      fetchChannelsFocus();
    });
  }, [debouncedSearchText, search]);

  useEffect(() => {
    const listenOnChannelChanged = async () => {
      // console.log(channelData)
      // const {channel} = await onChannelChanged();
      // console.log('🥰😍🥰😍', JSON.stringify(channelData, null, 2));
      if (channelData) {
        setChannels((prevState) => {
          // const latestChannel = prevState?.find(
          //   element.channel_url === channelData.url,
          // );
          // console.log(latestChannel);
          const cloneChannels = prevState?.map((element) => {
            if (element.channel_url === channelData.url) {
              // const formatChannel = channelDto(channel);
              return {
                ...element,
                unread_messages_count: channelData?.unreadMessageCount,
                last_message: channelData?.lastMessage?.message,
                last_message_at: channelData?.lastMessage?.createdAt,
              };
            }
            return element;
          });

          // cloneChannels.forEach(function (element, i) {
          //   if (element.channel_url === channelData.url) {
          //     console.log(element)
          //     console.log(i)
          //     cloneChannels.splice(i, 1);
          //     cloneChannels.unshift(element);
          //   }
          // });

          return cloneChannels;
        });
        await saveCache();
      }
    };

    listenOnChannelChanged();
    listenOnUserReceivedInvitation();

    return () => {
      listenOnChannelChanged();
      listenOnUserReceivedInvitation();
    };
  }, [channelData?.unreadMessageCount || channelData?.lastMessage?.messageId]);

  // useEffect(() => {
  //   console.log(channels)
  // }, [channels])

  const saveCache = async () => {
    const response1 = await getTicketChannels({
      page: page,
      size: 100,
    });
    // console.log('🤬', response1?.data);
    const data1 = response1.data;
    await AsyncStorage.setItem('pages', JSON.stringify(data1.page));
    // console.log('🍉', JSON.stringify(data1, null, 2));

    const channelUrlsFilter = data1?.items?.map((item) => item.channel_url);
    const sendBirdChannels = await channelListQuery({channelUrlsFilter});
    const concatChannels = data1?.items?.map((element) => {
      const channelData = sendBirdChannels.find(
        (element2) => element2.url === element.channel_url,
      );
      // console.log('😀', channelData?.unreadMessageCount);
      return {
        ...element,
        unread_messages_count: channelData?.unreadMessageCount,
        last_message: channelData?.lastMessage?.message,
        last_message_at: channelData?.lastMessage?.createdAt,
      };
    });

    // console.log(data1.items[0]);
    // console.log('🤬', concatChannels);

    await AsyncStorage.setItem('channels', JSON.stringify(concatChannels));
  };

  const listenOnUserReceivedInvitation = async () => {
    const {groupChannel, inviter, invitees} = await onUserReceivedInvitation();
    // console.log(groupChannel, inviter, invitees);
    await handleRefresh();
    await saveCache();
  };

  const handleSearch = (text) => {
    setSearch(text);
  };

  const handleDelete = (channelUrl) => {
    // setChannels(prevState =>
    //   prevState.filter(item => item.channel_url !== channelUrl),
    // );
  };

  const handleJoin = ({channelUrl, channelName}) => {
    navigation?.navigate('ChattingBox', {channelUrl, channelName});
  };

  const handleRefresh = async () => {
    setRefreshLoading(true);
    setTimeout(async () => {
      // const response = await fetch(`${mockAPI}/channels?p=1&l=10`);
      // const data = await response.json();

      const response1 = await getTicketChannels();
      const data1 = response1.data;
      await AsyncStorage.setItem('pages', JSON.stringify(data1.page));
      const channelUrlsFilter = data1?.items?.map((item) => item.channel_url);
      const sendBirdChannels = await channelListQuery({channelUrlsFilter});
      const concatChannels = data1?.items?.map((element) => {
        const channelData = sendBirdChannels.find(
          (element2) => element2.url === element.channel_url,
        );
        // console.log('😀', channelData?.unreadMessageCount);
        return {
          ...element,
          unread_messages_count: channelData?.unreadMessageCount,
          last_message: channelData?.lastMessage?.message,
          last_message_at: channelData?.lastMessage?.createdAt,
        };
      });
      await AsyncStorage.setItem(
        'channels',
        JSON.stringify(concatChannels),
      );
      setChannels(concatChannels);
      setSearch('');
      setChannelsLoading(false);
      setRefreshLoading(false);
      setPage(1);
      setLimit(10);
    }, 1000);
  };

  const handleLoadMore = async () => {
    // if (channels?.length >= 10 && !isLoadedAll && channelsLoading === false) {
    if (page*limit < total && !isLoadedAll && channelsLoading === false) {
      search.length > 0 && setSearch(null);
      setPage((prevState) => ++prevState);
      channels?.length === 0 && setChannelsLoading(true);
      const response1 = await getTicketChannels({
        page: page + 1,
        size: limit,
      });
      const data1 = response1.data;
      await AsyncStorage.setItem('pages', JSON.stringify(data1.page));
      setTotal(data1.total_items);
      const channelUrlsFilter = data1?.items?.map(
        (item) => item.channel_url,
      );
      const sendBirdChannels = await channelListQuery({channelUrlsFilter});
      const concatChannels = data1?.items?.map((element) => {
        const channelData = sendBirdChannels.find(
          (element2) => element2.url === element.channel_url,
        );
        // console.log('😀', channelData?.unreadMessageCount);
        return {
          ...element,
          unread_messages_count: channelData?.unreadMessageCount,
          last_message: channelData?.lastMessage?.message,
          last_message_at: channelData?.lastMessage?.createdAt,
        };
      });
      await AsyncStorage.setItem(
        'channels',
        JSON.stringify([...channels, ...concatChannels]),
      );
      setChannels((prevState) => [...prevState, ...concatChannels]);
      setChannelsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{i18nLiveChat}</Text>
        </View>
        <View style={styles.searchBox}>
          <MyInputText
            style={{
              backgroundColor: !search.length > 0 ? '#F0F0F0' : '#FFF',
            }}
            placeholderText={i18nLiveChatSe}
            onChangeText={handleSearch}
            value={search}
            suffix={search.length > 0 ? <SearchHighLightSvg /> : <SearchSvg />}
          />
        </View>
      </View>
      <View style={styles.body}>
        {channels?.length > 0 ? (
          <Channels
            channels={channels}
            handleDelete={handleDelete}
            handleJoin={handleJoin}
            refreshLoading={refreshLoading}
            handleRefresh={handleRefresh}
            handleLoadMore={handleLoadMore}
            page={page}
            limit={limit}
            navigation={navigation}
            showLoadMoreIndicator={!isLoadedAll}
          />
        ) : (
          <EmptyChat />
        )}
      </View>

      {channelsLoading && <DimSpinnerView />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerBox: {paddingHorizontal: 24},
  titleBox: {marginTop: height / 10},
  title: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 28,
    lineHeight: 40,
  },
  searchBox: {
    marginTop: 30,
  },
  body: {
    flex: 1,
    marginTop: 20,
  },
});
