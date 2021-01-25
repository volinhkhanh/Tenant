import React, {memo, useState, useEffect, useLayoutEffect} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ripple from 'react-native-material-ripple';
import AsyncStorage from '@react-native-community/async-storage';

import {ChatMessageItem} from '../../components/ListItem';
import DimSpinnerView from '../../components/DimSpinnerView';
import {AddPhotoIcon, SendIcon} from '../../components/icons';
import ChatHeader from '../../components/ChatHeader';
import SpinnerView from '../../components/SpinnerView';

import {Colors, ApplicationStyles} from '../../themes';
import {useTranslation} from '../../context/LanguageContext';
import {useSendBird} from '../../context';
import {formatTypingUsers} from '../../utils';

const ChattingBoxScreen = ({navigation}) => {
  const {
    userId,
    getChannel,
    createPreviousMessageListQuery,
    sendUserMessage,
    sendFileMessage,
    onMessageReceived,
    onTypingStatusUpdated,
    onReadReceiptUpdated,
    onDeliveryReceiptUpdated,
  } = useSendBird();

  const [channel, setChannel] = useState(null);

  const [messages, setMessages] = useState([]);
  const [loadingListMessages, setLoadingListMessages] = useState(false);

  const [prevMessageListQuery, setPrevMessageListQuery] = useState(null);
  const [typingMembers, setTypingMembers] = useState('');

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {t, i18nLiveChatST} = useTranslation();
  const i18nChoosePhotoSAP = t('src.utils.choosePhoto.SAP');
  const i18nChoosePhotoCa = t('src.utils.choosePhoto.Ca');
  const i18nChoosePhotoTAP = t('src.utils.choosePhoto.TAP');
  const i18nChoosePhotoCFL = t('src.utils.choosePhoto.CFL');

  /**
   * SendBird - fetchChannel - Effect
   */
  useEffect(() => {
    fetchCachedChannel();

    async function fetchCachedChannel() {
      // const cachedMessages = await AsyncStorage.getItem('messages');

      // if (cachedMessages) {
      //   // console.log('cache');

      //   fetchChannel();

      //   setMessages(JSON.parse(cachedMessages));
      // } else {
      //   // console.log('no-cache');

      //   setLoadingListMessages(true);
      //   fetchChannel();
      // }

      setLoadingListMessages(true);
      fetchChannel();

      async function fetchChannel() {
        // console.log(
        //   '😤',
        //   navigation?.state?.params?.channelUrl,
        //   navigation?.state?.params?.channelName,
        // );
        // const url = await AsyncStorage.getItem('channelUrl');
        const url = navigation?.state?.params?.channelUrl;
        // console.log('😡', url);
        try {
          const channel = await getChannel(url);
          // console.log('🎲', JSON.stringify(channel, null, 2));
          setChannel(channel);
          /**
           * SendBird - fetchMessages
           */
          fetchMessages();
          async function fetchMessages() {
            const prevMessageListQuery = await createPreviousMessageListQuery(
              channel,
              10,
              true,
            );
            setPrevMessageListQuery(prevMessageListQuery);
            prevMessageListQuery.load(async function (messages, error) {
              if (error) {
                return console.log(error);
              }
              // console.log(channel);
              if (channel.channelType === 'group') {
                channel.markAsRead();
              }
              // console.log(JSON.stringify(messages, null, 2));
              // await AsyncStorage.setItem('messages', JSON.stringify(messages));
              setMessages(messages);
              setLoadingListMessages(false);
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return () => {};
  }, [userId, getChannel, channel, createPreviousMessageListQuery]);

  useEffect(() => {
    navigation.addListener('willFocus', () => {
      listenOnMessageReceived();
      listenOnTypingStatusUpdated();
      listenOnDeliveryReceiptUpdated();
      listenOnReadReceiptUpdated();
      // listenOnChannelChanged();
      // listenOnUserReceivedInvitation();
      // listenOnUserLeft();
    });
    listenOnMessageReceived();
    listenOnTypingStatusUpdated();
    listenOnDeliveryReceiptUpdated();
    listenOnReadReceiptUpdated();
  });

  useEffect(() => {
    return () => { navigation.state.params.dontRead = true }
  }, []);

  async function listenOnTypingStatusUpdated() {
    const {groupChannel} = await onTypingStatusUpdated();

    // console.log(channel.url, groupChannel.url)
    if (channel && channel.url === groupChannel.url) {
      var members = groupChannel.getTypingMembers();

      // console.log(members)

      members = members.map((member) => member.nickname);
      const typingUsers = formatTypingUsers(members);

      setTypingMembers(typingUsers);
    }
  }

  async function listenOnMessageReceived() {
    // console.log(navigation)
    const {channel: groupChannel, message} = await onMessageReceived();

    // console.log('🤔', groupChannel);
    if (channel.url === groupChannel.url) {
      // AsyncStorage.setItem('messages', JSON.stringify([message, ...messages]));
      setMessages((prevState) => [message, ...prevState]);
      // AsyncStorage.setItem('messages', JSON.parse(messages));
      if (channel.channelType === 'group' && !navigation.state.params.dontRead) {
        channel.markAsRead();
      }
    }
  }

  async function listenOnDeliveryReceiptUpdated() {
    const {groupChannel} = await onDeliveryReceiptUpdated();

    // console.log('delivered', groupChannel)

    if (groupChannel.url === channel?.url) {
      setMessages((prevState) =>
        prevState.map((message) => {
          if (message.messageId === groupChannel.lastMessage.messageId) {
            return groupChannel.lastMessage;
          }
          return message;
        }),
      );
      // AsyncStorage.setItem('messages', JSON.parse(messages));
    }
  }

  async function listenOnReadReceiptUpdated() {
    const {groupChannel} = await onReadReceiptUpdated();

    // console.log('read', groupChannel);

    if (groupChannel.url === channel?.url) {
      setMessages((prevState) =>
        prevState.map((message) => {
          if (message.messageId === groupChannel.lastMessage.messageId) {
            return {
              ...groupChannel.lastMessage,
              ...groupChannel.cachedReadReceiptStatus,
            };
          }
          return message;
        }),
      );
      // AsyncStorage.setItem('messages', JSON.parse(messages));
    }
  }

  const onSubmit = async () => {
    const formatInputMessage = inputMessage.replace(/^\s+|\s+$/g, '');
    try {
      const newMessage = await sendUserMessage(channel, formatInputMessage);
      channel.markAsRead();
      setInputMessage('');
      setMessages((prevState) => [newMessage, ...prevState]);
    } catch (error) {
      console.log(error);
    }
  };

  const onSendFile = async () => {
    const options = {
      title: i18nChoosePhotoSAP,
      cancelButtonTitle: i18nChoosePhotoCa,
      takePhotoButtonTitle: i18nChoosePhotoTAP,
      chooseFromLibraryButtonTitle: i18nChoosePhotoCFL,
      quality: 1.0,
      maxWidth: 1000,
      maxHeight: 1000,
    };
    // if (Platform.OS === 'android') {
    //   sb.enableStateChange();
    // }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        if (response.name) {
          source['name'] = response.fileName;
        } else {
          let paths = response.uri.split('/');
          source['name'] = paths[paths.length - 1];
        }

        if (response.type) {
          source['type'] = response.type;
        }

        const CHECK_IMAGE_URI_INTERVAL = Platform.OS === 'android' ? 300 : 100;

        // This is needed to ensure that a file exists
        setTimeout(async () => {
          console.log(source)
          const newMessage = await sendFileMessage(channel, source);
          console.log(newMessage)
          setMessages((prevState) => [newMessage, ...prevState]);
          // Use getSize as a proxy for when the image exists
          // Image.getSize(response.uri, async () => {
          //   try {
          //     const newMessage = await sendFileMessage(channel, source);
          //     setMessages((prevState) => [newMessage, ...prevState]);
          //   } catch (error) {
          //     console.log(error);
          //   }
          // });
        }, CHECK_IMAGE_URI_INTERVAL);
      }
    });
  };

  const handleLoadMore = () => {
    if (!loadingListMessages && !loading && prevMessageListQuery) {
      setLoading(true);
      prevMessageListQuery.load(function (messages, error) {
        if (error) {
          return console.log(error);
        }

        setMessages((prevState) => [...prevState, ...messages]);
      });
      setLoading(false);
    }
  };

  const format = (result) => {
    return result?.map(({_sender, ...rest}, i) => {
      if (_sender?.nickname === result[i + 1]?._sender?.nickname) {
        return {...rest, _sender: {..._sender, nickname: null}};
      }
      return {...rest, _sender};
    });
  };
  const title = navigation?.state?.params?.channelName
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      behavior={Platform.OS == 'ios' && 'padding'}
      enabled
      // keyboardVerticalOffset={138 + insets.bottom}
    >
      <ChatHeader
        navigation={navigation}
        title={
          // t('SupportTeam')
          title === 'Support Team' ? i18nLiveChatST : title
        }
      />
      <View style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          // ref={(c) => {
          //   scroll = c;
          // }}
          // onContentSizeChange={() => scroll.scrollToEnd({animated: true})}
          data={format(messages) || []}
          contentContainerStyle={{paddingHorizontal: 26, paddingVertical: 30}}
          keyExtractor={(item) => item.id}
          inverted
          initialNumToRender={15}
          renderItem={({item}) => {
            item.isAdmin = item?.messageType === 'admin';
            item.isTicket = item?.customType === 'ticket';
            item.isAuthor = item?._sender?.userId === userId;
            item.status = item?.isAuthor && channel && checkStatus();
            item.isFile = item?.messageType === 'file';
            // console.log(item?._sender?.userId, userId, item.isAuthor);

            function checkStatus() {
              // const unreadCount = channel?.getReadReceipt(item);
              // const undeliveredCount = channel?.getUndeliveredMemberCount(
              //   item,
              // );
              // console.log(
              //   unreadCount,
              //   undeliveredCount,
              // );
              // console.log(
              //   '⛽️',
              //   // channel,
              //   Object.values(channel?.cachedReadReceiptStatus),
              //   item.createdAt,
              //   item.message,
              //   channel?.cachedReadReceiptStatus[userId]
              // );
              let status = '';
              if (
                Object.keys(channel?.cachedReadReceiptStatus).length ===
                  channel?.joinedMemberCount &&
                Object.values(channel?.cachedReadReceiptStatus).filter(
                  (item1) => item1 >= item.createdAt,
                ).length > 1
              ) {
                status = 'seen';
              } else {
                if (
                  // Object.keys(channel?.cachedReadReceiptStatus).length === 1 &&
                  channel?.cachedReadReceiptStatus[userId] >= item.createdAt
                  // Object.values(channel?.cachedReadReceiptStatus).filter(
                  //   item1 => item1 >= item.createdAt,
                  // ).length === 1
                ) {
                  status = 'sent';
                }
                // status = 'delivered';
              }
              return status;
            }

            return (
              <ChatMessageItem channel={channel} item={item} userId={userId} />
            );
          }}
          ListFooterComponent={() => {
            return loading && <SpinnerView />;
          }}
          onEndReachedThreshold={1}
          onEndReached={() => {
            handleLoadMore();
          }}
        />
        {!channel?.isFrozen &&
          <View style={styles.typebox}>
            <Text
              style={{
                position: 'absolute',
                top: -25,
                paddingHorizontal: 15,
                color: Colors.gray1,
              }}>
              {typingMembers}
            </Text>
            <Ripple onPress={onSendFile} disabled={channel?.isFrozen}>
              <AddPhotoIcon
                size={30}
                style={{paddingHorizontal: 10}}
                color={Colors.gray5}
              />
            </Ripple>
            <TextInput
              placeholder="Type Something..."
              style={styles.typeInput}
              value={inputMessage}
              returnKeyType="default"
              multiline={true}
              editable={!channel?.isFrozen}
              onSubmitEditing={() => setInputMessage(inputMessage + '\n')}
              onChangeText={(value) => {
                setInputMessage(value);
              }}
              onFocus={() => channel?.startTyping()}
              onBlur={() => channel?.endTyping()}
            />
            <Ripple onPress={onSubmit} disabled={channel?.isFrozen}>
              <SendIcon size={21} style={{marginHorizontal: 13}} />
            </Ripple>
          </View>
        }
      </View>
      {loadingListMessages && <DimSpinnerView />}
    </KeyboardAvoidingView>
  );
};

export default memo(ChattingBoxScreen);

const styles = StyleSheet.create({
  typebox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingVertical: 12,
    paddingVertical: 20,
    backgroundColor: 'white',
    ...ApplicationStyles.shadow.dynamicOffset(0, -5, undefined, 0.1, 3),
  },
  typeInput: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    paddingTop: 8,
  },
});
