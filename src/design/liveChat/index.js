import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {MyInputText} from '../../components/MyInputText';
import SearchSvg from '../../assets/images/liveChat/search.svg';

import {EmptyChat, Channels} from './components';
import DimSpinnerView from '../../components/DimSpinnerView';

const mockAPI = 'https://5f0ea5f8faef3500160b8663.mockapi.io';

export function LiveChatScreen() {
  const [search, setSearch] = useState('');
  const [channels, setChannels] = useState([]);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const itemsTotal = 50;
  const isLoadedAll = page * limit === itemsTotal;

  useEffect(() => {
    const fetchChannels = async () => {
      if (!!search) {
        const response = await fetch(`${mockAPI}/channels?name=${search}`);
        const data = await response.json();
        setChannels(data);
        setChannelsLoading(false);
      } else {
        const response = await fetch(
          `${mockAPI}/channels?p=${page}&l=${limit}`,
        );
        const data = await response.json();
        if (page > 1) {
          setChannels(prevState => [...prevState, ...data]);
          setChannelsLoading(false);
        } else {
          setChannels(data);
          setChannelsLoading(false);
        }
      }
    };

    channels.length === 0 && setChannelsLoading(true);
    fetchChannels();
  }, [search, page]);

  const handleSearch = text => {
    setSearch(text);
  };

  const handleDelete = id => {
    setChannels(prevState => prevState.filter(item => item.id !== id));
  };

  const handleJoin = id => {
    alert(id);
  };

  const handleRefresh = async () => {
    setRefreshLoading(true);
    setTimeout(async () => {
      const response = await fetch(`${mockAPI}/channels?p=1&l=10`);
      const data = await response.json();
      setChannels(data);
      setChannelsLoading(false);
      setRefreshLoading(false);
      setPage(1);
      setLimit(10);
    }, 1000);
  };

  const handleLoadMore = async () => {
    if (channels.length >= 10 && !isLoadedAll && channelsLoading === false) {
      search.length > 0 && setSearch(null);
      setPage(prevState => ++prevState);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Live Chat</Text>
        </View>
        <View style={styles.searchBox}>
          <MyInputText
            placeholderText="Search"
            onChangeText={handleSearch}
            value={search}
            suffix={<SearchSvg />}
          />
        </View>
      </View>
      <View style={styles.body}>
        {channels.length > 0 ? (
          <Channels
            channels={channels}
            handleDelete={handleDelete}
            handleJoin={handleJoin}
            refreshLoading={refreshLoading}
            handleRefresh={handleRefresh}
            loadMoreLoading={loadMoreLoading}
            handleLoadMore={handleLoadMore}
            page={page}
            limit={limit}
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
  titleBox: {marginTop: 94},
  title: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 28,
    lineHeight: 40,
  },
  searchBox: {marginTop: 30},
  body: {marginTop: 27},
});
