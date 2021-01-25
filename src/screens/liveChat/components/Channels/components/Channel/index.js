import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {SvgUri} from 'react-native-svg';

import {formatLastTime} from '../../../../../../utils';
import TrashSvg from '../../../../../../assets/images/liveChat/trash.svg';
import Avatar from '../../../../../../assets/images/liveChat/avatar.png';
import {useSendBird} from '../../../../../../context';
import {useTranslation} from '../../../../../../context/LanguageContext';

export function Channel({
  channel = {},
  handleDelete = () => {},
  handleJoin = () => {},
  navigation,
}) {
  const {getChannel} = useSendBird();
  const swipeableRef = useRef(null);
  const [channelSB, setChannelSB] = useState({});
  const {
    t,
    i18nLiveChatST,
  } = useTranslation();

  // console.log(JSON.stringify(channel, null, 2));

  useLayoutEffect(() => {
    (async function () {
      const channelData = await getChannel(channel.channel_url);
      // console.log('🥶channelSB', channelData);
      setChannelSB(channelData);
    })();
  }, [channelSB]);
  useEffect(() => {
    navigation.addListener('willBlur', () => {
      swipeableRef?.current?.close();
    });
  }, [])

  const deleteChannel = (channel) => {
    handleDelete(channel.channel_url);
    // swipeableRef.current.close();
  };

  const joinChannel = (channel) => {
    // console.log('🥶', channel);
    handleJoin({
      channelUrl: channel.channel_url,
      channelName: channel.channel_name,
    });
  };

  // console.log('🤬', JSON.stringify(channel, null, 2));

  const avatar = channel.channel_image ?? 'xxx.svg';
  const avatarType = avatar.split('.')[avatar.split('.').length - 1];
  const svgAvatar = '';
  const title = channel.channel_name || '';
  const lastMessage = channel?.last_message || '';
  const lastMessageCreatedAt = formatLastTime(
    channel?.last_message_at || new Date(),
  );
  const isUnread = channel?.unread_messages_count > 0;
  const lastMessageUnreadCount =
    channel?.unread_messages_count > 99
      ? '99+'
      : channel?.unread_messages_count;

  // console.log(loadMoreLoading);
  // const svgAvatar =
  //   'https://urbanos-bucket.s3-ap-southeast-1.amazonaws.com/apt_1/Vector.svg';

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
          }}>
          <TouchableWithoutFeedback onPress={() => deleteChannel(channel)}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 36 / 2,
                backgroundColor: '#F6CA13',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TrashSvg />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}>
      <TouchableOpacity onPress={() => joinChannel(channel)}>
        <View style={styles.channelBox}>
          {avatarType === 'png' ? (
            <Image style={styles.image} source={{uri: avatar}} />
          ) : (
            <View style={styles.image}>
              <SvgUri width="100%" height="100%" uri={avatar} />
            </View>
          )}

          <View
            style={{
              flexDirection: 'column',
              marginLeft: 20,
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: isUnread ? '600' : '400',
                fontSize: 16,
                color: '#000',
              }}
              numberOfLines={1}>
              {title === 'Support Team' ? i18nLiveChatST : title}
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: isUnread ? '600' : '300',
                fontSize: 12,
              }}
              numberOfLines={1}>
              {lastMessage}
            </Text>
          </View>
          <View style={{flexDirection: 'column', flex: 1}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: isUnread ? '600' : '300',
                  fontSize: 14,
                  color: '#4E5053',
                }}>
                {lastMessageCreatedAt}
              </Text>
              {isUnread && (
                <View
                  style={{
                    backgroundColor: '#F0443C',
                    borderRadius: 15 / 2,
                    // width: 15,
                    height: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 15 / 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                      fontWeight: isUnread ? '600' : '300',
                      fontSize: 12,
                      color: '#FFF',
                    }}>
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
    height: 0.5,
    width: '100%',
    backgroundColor: '#CACACA',
  },
});
