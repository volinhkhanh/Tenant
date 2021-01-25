import React, {
  useContext,
  createContext,
  useRef,
  useLayoutEffect,
  useState,
} from 'react';
import {Platform, AppState} from 'react-native';
import SendBird from 'sendbird';
import {SENDBIRD_APP_ID} from 'react-native-dotenv';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

import {uuidv4} from '../utils';
import AsyncStorage from '@react-native-community/async-storage';

const UNIQUE_HANDLER_ID = uuidv4();
// const REACT_APP_SB_APP_ID = '7AE1264D-2D61-4D37-A25C-AEDF55FD631D';

const SendBirdContext = createContext();

export function SendBirdProvider({children}) {
  return (
    <SendBirdContext.Provider value={SendBirdValue()}>
      {children}
    </SendBirdContext.Provider>
  );
}

export const useSendBird = () => useContext(SendBirdContext);

function SendBirdValue() {
  const sbRef = useRef(null);
  const channelHandler = useRef(null);
  const userEventHandler = useRef(null);
  const connectionHandler = useRef(null);

  const [userId, setUserId] = useState(null);
  const [totalUnreadMessageCount, setTotalUnreadMessageCount] = useState(0);

  const appState = useRef(AppState.currentState);

  useLayoutEffect(() => {
    async function fetchUserId() {
      sbRef.current = new SendBird({
        appId: SENDBIRD_APP_ID,
      });

      if (Platform.OS === 'android') {
        //Push notification in background
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          const text = remoteMessage?.data?.message || '';
          const payload = JSON.parse(remoteMessage?.data?.sendbird);
          // console.log(remoteMessage)
          PushNotification.localNotification({
            title: payload?.channel?.name || '',
            message: text,
            autoCancel: true,
            largeIcon: 'ic_launcher',
            smallIcon: 'ic_launcher',
            vibrate: true,
            invokeApp: true,
            messageId: remoteMessage?.messageId,
          });
        });
        //Push notification in foreground
        messaging().onMessage(async (remoteMessage) => {
          const text = remoteMessage?.data?.message || '';
          const payload = JSON.parse(remoteMessage?.data?.sendbird);
          // console.log(remoteMessage)
          // console.log(payload)
          PushNotification.localNotification({
            title: payload?.type || '',
            message: text,
            autoCancel: true,
            largeIcon: 'ic_launcher',
            smallIcon: 'ic_launcher',
            vibrate: true,
            messageId: remoteMessage?.messageId,
          });
        });
      } else {
        messaging().onMessage(async (remoteMessage) => {
          const text = remoteMessage?.data?.message || '';
          const payload = JSON.parse(remoteMessage?.data?.sendbird);
          PushNotification.localNotification({
            title: payload?.channel?.name || '',
            message: text,
            autoCancel: true,
            vibrate: true,
            invokeApp: true,
            messageId: remoteMessage?.messageId,
          });
        });
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          const text = remoteMessage?.data?.message || '';
          const payload = JSON.parse(remoteMessage?.data?.sendbird);
          PushNotification.localNotification({
            title: payload?.type || '',
            message: text,
            autoCancel: true,
            vibrate: true,
            invokeApp: true,
            messageId: remoteMessage?.messageId,
          });
        });
      }

      channelHandler.current = new sbRef.current.ChannelHandler();
      userEventHandler.current = new sbRef.current.UserEventHandler();
      connectionHandler.current = new sbRef.current.ConnectionHandler();

      sbRef.current.addChannelHandler(
        UNIQUE_HANDLER_ID,
        channelHandler.current,
      );
      sbRef.current.addUserEventHandler(
        UNIQUE_HANDLER_ID,
        userEventHandler.current,
      );
      sbRef.current.addConnectionHandler(
        UNIQUE_HANDLER_ID,
        connectionHandler.current,
      );
    }

    fetchUserId();
    async function connectSendBird() {
      const user_id = await AsyncStorage.getItem('userId');
      const nick_name = await AsyncStorage.getItem('displayName');
      if (user_id) {
        setUserId(user_id);
        connect(user_id, nick_name);
      }
    }
    connectSendBird();
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      sbRef.current.removeChannelHandler(UNIQUE_HANDLER_ID);
      sbRef.current.removeUserEventHandler(UNIQUE_HANDLER_ID);
      sbRef.current.removeConnectionHandler(UNIQUE_HANDLER_ID);
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    appState.current = nextAppState;
    const user_id = await AsyncStorage.getItem('userId');
    const nick_name = await AsyncStorage.getItem('displayName');
    if (appState.current === 'background') {
      // disconnect();
    } else {
      if (user_id) {
        setUserId(user_id);
        connect(user_id, nick_name);
      }
    }
  };

  function connect(USER_ID = null, NICK_NAME = null) {
    return new Promise((resolve, reject) => {
      sbRef.current.connect(USER_ID, async (user, error) => {
        if (error) reject(error);
        // console.log('connect', user);
        setUserId(USER_ID);
        NICK_NAME && (await updateCurrentUserInfo(NICK_NAME));
        // console.log('🥶', Platform);
        pushNotification();
        const sb = SendBird.getInstance();
        async function pushNotification() {
          if (Platform.OS === 'ios') {
            messaging()
              .getToken()
              .then((token) => {
                sb.registerAPNSPushTokenForCurrentUser(token, function (
                  response,
                  error,
                ) {
                  console.log(response);
                });
              })
              .catch((error) => {});
          } else {
            messaging()
              .getToken()
              .then((token) => {
                sb.registerGCMPushTokenForCurrentUser(token, function (
                  response,
                  error,
                ) {
                  // console.log(response);
                });
              })
              .catch((error) => {});
          }
        }
        resolve(user);
      });
    });
  }

  function disconnect() {
    return new Promise((resolve, reject) => {
      sbRef.current.disconnect(() => {
        console.log('disconnect');
        // A current user is discconected from Sendbird server.
        resolve(true);
      });
    });
  }

  function onMessageReceived() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onMessageReceived = (channel, message) => {
        console.log('onMessageReceived');
        resolve({channel, message});
      };
    });
  }

  function onMessageUpdated() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onMessageUpdated = (channel, message) => {
        console.log('onMessageUpdated');
        resolve({channel, message});
      };
    });
  }

  function onMessageDeleted() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onMessageDeleted = (channel, message) => {
        console.log('onMessageDeleted');
        resolve({channel, message});
      };
    });
  }

  function onMentionReceived() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onMentionReceived = (channel, message) => {
        console.log('onMentionReceived');
        resolve({channel, message});
      };
    });
  }

  function onChannelChanged() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onChannelChanged = (channel) => {
        console.log('onChannelChanged');
        resolve({channel});
      };
    });
  }

  function onChannelDeleted() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onChannelDeleted = (channelUrl, channelType) => {
        console.log('onChannelDeleted');
        resolve({channelUrl, channelType});
      };
    });
  }

  function onChannelFrozen() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onChannelFrozen = (channel) => {
        console.log('onChannelFrozen');
        resolve({channel});
      };
    });
  }

  function onChannelUnfrozen() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onChannelUnfrozen = (channel) => {
        console.log('onChannelUnfrozen');
        resolve({channel});
      };
    });
  }

  function onMetaDataCreated() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onMetaDataCreated = (channel, metaData) => {
        console.log('onMetaDataCreated');
        resolve({channel, metaData});
      };
    });
  }

  function onMetaDataUpdated() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onMetaDataUpdated = (channel, metaData) => {
        console.log('onMetaDataUpdated');
        resolve({channel, metaData});
      };
    });
  }

  function onMetaDataDeleted() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onMetaDataDeleted = (channel, metaDataKeys) => {
        console.log('onMetaDataDeleted');
        resolve({channel, metaDataKeys});
      };
    });
  }

  function onMetaCountersCreated() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onMetaCountersCreated = (channel, metaCounter) => {
        console.log('onMetaCountersCreated');
        resolve({channel, metaCounter});
      };
    });
  }

  function onMetaCountersUpdated() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onMetaCountersUpdated = (channel, metaCounter) => {
        console.log('onMetaCountersUpdated');
        resolve({channel, metaCounter});
      };
    });
  }

  function onMetaCountersDeleted() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onMetaCountersDeleted = (
        channel,
        metaCounterKeys,
      ) => {
        console.log('onMetaCountersDeleted');
        resolve({channel, metaCounterKeys});
      };
    });
  }

  function onChannelHidden() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onChannelHidden = (groupChannel) => {
        console.log('onChannelHidden');
        resolve({groupChannel});
      };
    });
  }

  function onUserReceivedInvitation() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onUserReceivedInvitation = (
        groupChannel,
        inviter,
        invitees,
      ) => {
        console.log('onUserReceivedInvitation');
        resolve({groupChannel, inviter, invitees});
      };
    });
  }

  function onUserDeclinedInvitation() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onUserDeclinedInvitation = (
        groupChannel,
        inviter,
        invitee,
      ) => {
        console.log('onUserDeclinedInvitation');
        resolve({groupChannel, inviter, invitee});
      };
    });
  }

  function onUserJoined() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onUserJoined = (groupChannel, user) => {
        console.log('onUserJoined');
        resolve({groupChannel, user});
      };
    });
  }

  function onUserLeft() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onUserLeft = (groupChannel, user) => {
        console.log('onUserLeft');
        resolve({groupChannel, user});
      };
    });
  }

  function onDeliveryReceiptUpdated() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onDeliveryReceiptUpdated = (groupChannel) => {
        console.log('onDeliveryReceiptUpdated');
        resolve({groupChannel});
      };
    });
  }

  function onReadReceiptUpdated() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onReadReceiptUpdated = (groupChannel) => {
        console.log('onReadReceiptUpdated');
        resolve({groupChannel});
      };
    });
  }

  function onTypingStatusUpdated() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onTypingStatusUpdated = (groupChannel) => {
        console.log('onTypingStatusUpdated');
        resolve({groupChannel});
      };
    });
  }

  function onUserEntered() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onUserEntered = (openChannel, user) => {
        console.log('onUserEntered');
        resolve({openChannel, user});
      };
    });
  }

  function onUserExited() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onUserExited = (openChannel, user) => {
        console.log('onUserExited');
        resolve({openChannel, user});
      };
    });
  }

  function onUserMuted() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onUserMuted = (channel, user) => {
        console.log('onUserMuted');
        resolve({channel, user});
      };
    });
  }

  function onUserUnmuted() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onUserUnmuted = (channel, user) => {
        console.log('onUserUnmuted');
        resolve({channel, user});
      };
    });
  }

  function onUserBanned() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onUserBanned = (channel, user) => {
        console.log('onUserBanned');
        resolve({channel, user});
      };
    });
  }

  function onUserUnbanned() {
    return new Promise((resolve, reject) => {
      channelHandler.current.onUserUnbanned = (channel, user) => {
        console.log('onUserUnbanned');
        resolve({channel, user});
      };
    });
  }

  //TODO:

  function onFriendsDiscovered() {
    return new Promise((resolve, reject) => {
      userEventHandler.current.onFriendsDiscovered = (users) => {
        resolve({users});
      };
    });
  }

  function onTotalUnreadMessageCountUpdated() {
    return new Promise((resolve, reject) => {
      userEventHandler.current.onTotalUnreadMessageCountUpdated = (
        totalCount,
        countByCustomTypes,
      ) => {
        setTotalUnreadMessageCount(totalCount);
        resolve({totalCount, countByCustomTypes});
      };
    });
  }

  function onReconnectStarted() {
    return new Promise((resolve, reject) => {
      connectionHandler.current.onReconnectStarted = () => {
        resolve();
      };
    });
  }

  function onReconnectSucceeded() {
    return new Promise((resolve, reject) => {
      connectionHandler.current.onReconnectSucceeded = () => {
        resolve();
      };
    });
  }

  function onReconnectFailed() {
    return new Promise((resolve, reject) => {
      connectionHandler.current.onReconnectFailed = () => {
        resolve();
      };
    });
  }

  function updateCurrentUserInfo(NICKNAME = null, PROFILE_URL = null) {
    return new Promise((resolve, reject) => {
      sbRef.current.updateCurrentUserInfo(
        NICKNAME,
        PROFILE_URL,
        (response, error) => {
          if (error) reject(error);

          // console.log('updateCurrentUserInfo', response)
          resolve(response);
        },
      );
    });
  }

  function updateCurrentUserInfoWithProfileImage(
    NICKNAME = null,
    PROFILE_FILE = null,
  ) {
    return new Promise((resolve, reject) => {
      sbRef.current.updateCurrentUserInfoWithProfileImage(
        NICKNAME,
        PROFILE_FILE,
        (response, error) => {
          if (error) reject(error);

          // console.log(
          //     'updateCurrentUserInfoWithProfileImage',
          //     response
          // )
          resolve(resolve);
        },
      );
    });
  }

  function userListQuery() {
    return new Promise((resolve, reject) => {
      // Retrieving all users
      var applicationUserListQueryByIds = sbRef.current.createApplicationUserListQuery();
      applicationUserListQueryByIds.next((users, error) => {
        if (error) {
          reject(error);
        }

        resolve(users);
      });
    });
  }

  function blockedUserListQuery() {
    return new Promise((resolve, reject) => {
      // Retrieving all users
      var blockedUserListQuery = sbRef.current.createBlockedUserListQuery();
      blockedUserListQuery.next((users, error) => {
        if (error) {
          reject(error);
        }

        resolve(users);
      });
    });
  }

  function connectionStatus(userIds) {
    return new Promise((resolve, reject) => {
      var applicationUserListQuery = sbRef.current.createApplicationUserListQuery();
      applicationUserListQuery.userIdsFilter = userIds;
      applicationUserListQuery.next((users, error) => {
        if (error) {
          reject(error);
        }

        if (users[0].connectionStatus === sbRef.current.User.ONLINE) {
          // User.connectionStatus consists of NON_AVAILABLE, ONLINE, and OFFLINE.
        }
      });
    });
  }

  function inviteWithUserIds(groupChannel = null, userIds = []) {
    return new Promise((resolve, reject) => {
      groupChannel.inviteWithUserIds(userIds, (response, error) => {
        if (error) {
          reject(error);
        }

        resolve(response);
      });
    });
  }

  function leave(groupChannel = null) {
    return new Promise((resolve, reject) => {
      groupChannel.leave(function (response, error) {
        if (error) {
          reject(error);
        }

        resolve(response);
      });
    });
  }

  function createChannelWithUserIds(
    userIds = [userId],
    NAME = null,
    COVER_IMAGE_OR_URL = null,
    DATA = null,
  ) {
    // When 'distinct' is false
    sbRef.current.GroupChannel.createChannelWithUserIds(
      userIds.concat(userId),
      false,
      NAME,
      COVER_IMAGE_OR_URL,
      DATA,
      (groupChannel, error) => {
        if (error) return console.log(error);

        console.log('createChannelWithUserIds', groupChannel);
      },
    );
  }

  function channelListQuery({channelUrlsFilter = []}) {
    return new Promise((resolve, reject) => {
      var channelListQuery = sbRef.current.GroupChannel.createMyGroupChannelListQuery();
      channelListQuery.includeEmpty = true;
      channelListQuery.order = 'latest_last_message'; // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
      channelListQuery.limit = 15; // The value of pagination limit could be set up to 100.
      channelListQuery.channelUrlsFilter = channelUrlsFilter;

      if (channelListQuery.hasNext) {
        channelListQuery.next((channelList, error) => {
          if (error) {
            reject(error);
          }

          resolve(channelList);
        });
      }
    });
  }

  function getChannel(CHANNEL_URL = null) {
    return new Promise((resolve, reject) => {
      sbRef.current.GroupChannel.getChannel(
        CHANNEL_URL,
        (groupChannel, error) => {
          if (error) {
            reject(error);
          }

          // console.log('🇾🇪', groupChannel);
          resolve(groupChannel);
          // TODO: Implement what is needed with the contents of the response in the groupChannel parameter.
        },
      );
    });
  }

  function getTotalUnreadChannelCount() {
    return new Promise((resolve, reject) => {
      sbRef.current.getTotalUnreadChannelCount(function (count, error) {
        if (error) {
          reject(error);
        }

        resolve(count);
      });
    });
  }

  function sendUserMessage(
    groupChannel = null,
    TEXT_MESSAGE = null,
    CUSTOM_TYPE = null,
    DATA = null,
  ) {
    return new Promise((resolve, reject) => {
      const params = new sbRef.current.UserMessageParams();

      params.message = TEXT_MESSAGE;
      // params.customType = CUSTOM_TYPE;
      // params.data = DATA;
      // params.mentionType = "users"; // Either 'users' or 'channel'
      // params.mentionedUserIds = ["Jeff", "Julia"]; // Or mentionedUsers = Array<User>;
      // params.metaArrayKeys = ["linkTo", "itemType"];
      // params.translationTargetLanguages = ["fe", "de"]; // French and German
      // params.pushNotificationDeliveryOption = "default"; // Either 'default' or 'suppress'

      groupChannel.sendUserMessage(params, (message, error) => {
        if (error) {
          reject(error);
        }

        resolve(message);
      });
    });
  }

  function sendFileMessage(
    groupChannel = null,
    FILE = null,
    FILE_NAME = null,
    FILE_SIZE = null,
    MIME_TYPE = null,
    CUSTOM_TYPE = null,
    DATA = null,
  ) {
    return new Promise((resolve, reject) => {
      const params = new sbRef.current.FileMessageParams();

      params.file = FILE; // Or .fileUrl = FILE_URL (You can also send a file message with a file URL.)
      params.fileName = FILE_NAME;
      params.fileSize = FILE_SIZE;
      params.thumbnailSizes = [
        {maxWidth: 100, maxHeight: 100},
        {maxWidth: 200, maxHeight: 200},
      ]; // Add the maximum sizes of thumbnail images (allowed number of thumbnail images: 3).
      params.mimeType = MIME_TYPE;
      // params.customType = CUSTOM_TYPE
      // params.data = DATA
      // params.mentionType = 'users' // Either 'users' or 'channel'
      // params.mentionedUserIds = ['Jeff', 'Julia'] // Or mentionedUsers = Array<User>;
      // params.metaArrayKeys = ['linkTo', 'itemType']
      // params.translationTargetLanguages = ['fe', 'de'] // French and German
      // params.pushNotificationDeliveryOption = 'default' // Either 'default' or 'suppress'

      groupChannel.sendFileMessage(params, function (fileMessage, error) {
        if (error) {
          reject(error);
        }

        // var thumbnailFirst = fileMessage.thumbnails[0]
        // var thumbnailSecond = fileMessage.thumbnails[1]

        // var maxHeightFirst = thumbnailFirst.maxHeight // 100
        // var maxHeightSecond = thumbnailSecond.maxHeight // 200

        // var urlFirst = thumbnailFirst.url // The URL of first thumbnail file.
        // var urlSecond = thumbnailSecond.url // The URL of second thumbnail file

        resolve(fileMessage);
      });
    });
  }

  function createPreviousMessageListQuery(
    groupChannel = null,
    LIMIT = 10,
    REVERSE = false,
  ) {
    return new Promise((resolve, reject) => {
      if (!groupChannel) {
        console.log('Channel not init!!!');
        return;
      }

      var prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
      prevMessageListQuery.limit = LIMIT;
      prevMessageListQuery.reverse = REVERSE;
      prevMessageListQuery.includeMetaArray = true; // Retrieve a list of messages along with their metaarrays.
      prevMessageListQuery.includeReaction = true; // Retrieve a list of messages along with their reactions.

      resolve(prevMessageListQuery);

      // Retrieving previous messages.
      // prevMessageListQuery.load(function (messages, error) {
      //   if (error) {
      //     reject(error);
      //   }
      //   resolve(messages);
      // });
    });
  }

  function getTotalUnreadMessageCount() {
    return new Promise((resolve, reject) => {
      sbRef.current.getTotalUnreadMessageCount(function (count, error) {
        if (error) {
          reject(error);
        }

        resolve(count);
      });
    });
  }

  function refresh(groupChannel = null) {
    return new Promise((resolve, reject) => {
      groupChannel.refresh(function (response, error) {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  }

  function getPreviousMessagesByTimestamp(
    groupChannel = null,
    TIMESTAMP = null,
    IS_INCLUSIVE = null,
    PREV_RESULT_SIZE = null,
    REVERSE = null,
    MESSAGE_TYPE = null,
    CUSTOM_TYPE = null,
    SENDER_USER_IDS = null,
    INCLUDE_META_ARRAY = null,
    INCLUDE_REACTION = null,
  ) {
    return new Promise((resolve, reject) => {
      groupChannel.getPreviousMessagesByTimestamp(
        TIMESTAMP,
        IS_INCLUSIVE,
        PREV_RESULT_SIZE,
        REVERSE,
        MESSAGE_TYPE,
        CUSTOM_TYPE,
        SENDER_USER_IDS,
        INCLUDE_META_ARRAY,
        INCLUDE_REACTION,
        (messages, error) => {
          if (error) {
            reject(error);
          }

          // A list of messages sent before the specified timestamp is successfully retrieved.
          resolve(messages);
        },
      );
    });
  }

  function markAsDelivered(CHANNEL_URL = null) {
    sbRef.current.markAsDelivered(CHANNEL_URL);
    // sbRef.current.GroupChannel.getChannel(CHANNEL_URL, (channel, err) => {
    //     channel.markAsDelivered()
    // })
  }

  return {
    userId,

    sbRef,
    connect,
    disconnect,

    channelHandler,

    onMessageReceived,
    onMessageUpdated,
    onMessageDeleted,

    onMentionReceived,
    onChannelChanged,
    onChannelDeleted,
    onChannelFrozen,
    onChannelUnfrozen,

    onMetaDataCreated,
    onMetaDataUpdated,
    onMetaDataDeleted,
    onMetaCountersCreated,
    onMetaCountersUpdated,
    onMetaCountersDeleted,

    onChannelHidden,
    onUserReceivedInvitation,
    onUserDeclinedInvitation,

    onUserJoined,
    onUserLeft,
    onDeliveryReceiptUpdated,
    onReadReceiptUpdated,
    onTypingStatusUpdated,

    onUserEntered,
    onUserExited,
    onUserMuted,
    onUserUnmuted,
    onUserBanned,
    onUserUnbanned,

    onFriendsDiscovered,
    onTotalUnreadMessageCountUpdated,

    onReconnectStarted,
    onReconnectSucceeded,
    onReconnectFailed,

    updateCurrentUserInfo,
    updateCurrentUserInfoWithProfileImage,
    userListQuery,
    blockedUserListQuery,
    connectionStatus,
    inviteWithUserIds,
    leave,

    createChannelWithUserIds,
    channelListQuery,
    getChannel,
    getTotalUnreadChannelCount,
    sendUserMessage,
    sendFileMessage,
    createPreviousMessageListQuery,
    getTotalUnreadMessageCount,
    refresh,
    getPreviousMessagesByTimestamp,
    markAsDelivered,
  };
}
