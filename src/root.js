import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//
import MainStack from './navigation/MainStack';
import MainStackFirstTime from './navigation/MainStackFirstTime';
//
import OS from './constants/Platform';
import Layouts from './constants/Layouts';
import {Colors} from './themes';
import {useSendBird} from './context';
//
import {connect} from 'react-redux';
import {setChannel} from './actions/actionCommon';

const {statusBarHeight} = Layouts;

const styles = StyleSheet.create({
  container: {
    paddingTop: OS === 'ios' ? statusBarHeight : 0,
    flex: 1,
  },
});

const mapStateToProps = ({reducerCommon: {channelData}}) => ({
  channelData,
});

const ContainerRoot = connect(
  mapStateToProps,
  {
    setChannel,
  },
)(Root);

function Root(props) {
  const {display, setChannel, channelData} = props;
  // const {display} = props;
  const [status, setStatus] = useState(false);
  useEffect(() => {
    getWelComeStatus();
  }, []);
  //
  const getWelComeStatus = async () => {
    const welComeStatus = await AsyncStorage.getItem('welComeStatus');
    // console.log(welComeStatus);
    setStatus(welComeStatus);
  };
  //
  const [unreadMessage, setUnreadMessage] = useState(0);

  const {getTotalUnreadMessageCount, onChannelChanged} = useSendBird();

  useLayoutEffect(() => {
    async function listenOnChannelChanged() {
      const {channel: groupChannel} = await onChannelChanged();
      // console.log('🤬😀', JSON.stringify(groupChannel, null, 2));
      if (groupChannel) {
        setChannel(groupChannel);
        const totalUnreadMessageCount = await getTotalUnreadMessageCount();
        setUnreadMessage(totalUnreadMessageCount);
      }
    }
    listenOnChannelChanged();
  });

  // useEffect(() => {
  //   console.log(channelData)
  // }, [channelData])
  return (
    <View style={[styles.container, {display: display}]}>
      <StatusBar
        backgroundColor={Colors.mainColor}
        barStyle="dark-content"
      />
      {status != false ? (
        status === 'noWelcome' ? (
          <MainStack screenProps={{unreadMessage, setUnreadMessage}} />
        ) : (
          <MainStackFirstTime />
        )
      ) : null}
    </View>
  );
}

export default ContainerRoot;
