import React, {memo, useState, useEffect, useRef} from 'react';
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
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import SendBird from 'sendbird';
import ImagePicker from 'react-native-image-picker';
import Ripple from 'react-native-material-ripple';
import AsyncStorage from '@react-native-community/async-storage';
//
import {ChatMessageItem} from '../../components/ListItem';
import DimSpinnerView from '../../components/DimSpinnerView';
import {AddPhotoIcon, SendIcon} from '../../components/icons';
import ChatHeader from '../../components/ChatHeader';
import SpinnerView from '../../components/SpinnerView';
//
import {Colors, ApplicationStyles} from '../../themes';
import {useTranslation} from '../../context/LanguageContext';
import { SENDBIRD_APP_ID } from 'react-native-dotenv'
//
var scroll = null;
//
const ChattingBoxScreen = props => {
  const {
    navigation,
    getSendBirdInfo,
    getSendBirdInfoProgress,
    getSendBirdInfoData,
    getMemberData,
    setMessageData,
    postMarkAsRead,
  } = props;
  const chatboxType = navigation.state.params
    ? navigation.state.params.chatboxType
    : '';
  //
  const insets = useSafeArea();
  const [dataMessage, setDataMessage] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [groupChannel, setGroupChannel] = useState(null);
  const [userId, setUserId] = useState(0);
  const [prevMessage, setPrevMessage] = useState(null);
  const [messageReceived, setMessageReceived] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingFirstTime, setLoadingFirstTime] = useState(false);
  const sb = SendBird.getInstance();
  const {t} = useTranslation();
  //
  useEffect(() => {
    // getSendBirdInfo({unit_id: getGeneralInformationData?.unit_id});
    setUserId(getMemberData?.person.user_id);
    // return () => {
    //   setSendBirdInfoData(null);
    // };
  }, []);

  const fetchSendBird = async () => {
    if (getSendBirdInfoData) {
      // setLoadingFirstTime(true);
      var prevMessageListQuery = null;
      sb.connect(getMemberData?.person.user_id.toString(), function(
        user,
        error,
      ) {
        if (error) {
          // console.log(error.response)
          setLoadingFirstTime(false);
        }
        // console.log(getSendBirdInfoData.channel.channel_url)
        sb.GroupChannel.getChannel(
          getSendBirdInfoData.channel.channel_url,
          function(groupChannel, error) {
            if (error) {
              console.log(error.response);
            }
            prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
            prevMessageListQuery.limit = 15;
            prevMessageListQuery.reverse = true;
            prevMessageListQuery.includeMetaArray = true;
            prevMessageListQuery.includeReaction = true;
            prevMessageListQuery.load(async function(messages, error) {
              if (error) {
                return;
              }

              await AsyncStorage.setItem('messages', JSON.stringify(messages));
            });
            setPrevMessage(prevMessageListQuery);
            setGroupChannel(groupChannel);
          },
        );
      });
    } else {
      setLoadingFirstTime(false);
    }
  };

  const fetchLocalMessages = async () => {
    const localMessages = await AsyncStorage.getItem('messages');

    // console.log('localMessages', localMessages);

    if (localMessages) {
      // console.log('🎯', localMessages);
      setDataMessage(JSON.parse(localMessages));

      fetchSendBird();
    } else {
      // console.log('🎯 not');
      setLoadingFirstTime(true);

      if (getSendBirdInfoData) {
        var prevMessageListQuery = null;
        sb.connect(getMemberData?.person.user_id.toString(), function(
          user,
          error,
        ) {
          if (error) {
            // console.log(error.response)
            setLoadingFirstTime(false);
          }
          // console.log(getSendBirdInfoData.channel.channel_url)
          sb.GroupChannel.getChannel(
            getSendBirdInfoData.channel.channel_url,
            function(groupChannel, error) {
              if (error) {
                console.log(error.response);
              }
              prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
              prevMessageListQuery.limit = 15;
              prevMessageListQuery.reverse = true;
              prevMessageListQuery.includeMetaArray = true;
              prevMessageListQuery.includeReaction = true;
              prevMessageListQuery.load(async function(messages, error) {
                if (error) {
                  setLoadingFirstTime(false);
                  return;
                }

                setDataMessage([...messages]);
                await AsyncStorage.setItem(
                  'messages',
                  JSON.stringify(messages),
                );

                setLoadingFirstTime(false);
              });
              setPrevMessage(prevMessageListQuery);
              setGroupChannel(groupChannel);
            },
          );
        });
      } else {
        setLoadingFirstTime(false);
      }
    }

    //
    var ChannelHandler = new sb.ChannelHandler();
    ChannelHandler.onMessageReceived = async function(channel, message) {
      setDataMessage(prevMessage => [message, ...prevMessage]);
      fetchSendBird();
    };
    sb.addChannelHandler('some', ChannelHandler);

    // console.log(messages);
  };
  //
  useEffect(() => {
    // console.log(getSendBirdInfoData)
    const application_id = SENDBIRD_APP_ID
    const channel_url = getSendBirdInfoData.channel.channel_url;
    const user_id = {user_id: getSendBirdInfoData.user.user_id};
    postMarkAsRead(application_id, channel_url, user_id);
    //

    fetchLocalMessages();
  }, [getSendBirdInfoData]);
  //
  const onSubmit = async () => {
    const params = new sb.UserMessageParams();
    params.message = inputMessage.replace(/^\s+|\s+$/g, '');
    groupChannel.sendUserMessage(params, async function(message, error) {
      if (error) {
        return;
      } else {
        setInputMessage('');
        setDataMessage([message, ...dataMessage]);
        fetchSendBird();
      }
    });
  };

  const onSendFile = async () => {
    const options = {
      title: t('SelectAPhoto'),
      cancelButtonTitle: t('Cancel'),
      takePhotoButtonTitle: t('TakePhoto'),
      chooseFromLibraryButtonTitle: t('ChooseFromLibrary'),
      quality: 1.0,
      maxWidth: 1000,
      maxHeight: 1000,
    };
    if (Platform.OS === 'android') {
      sb.enableStateChange();
    }
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        if (response.name) {
          source['name'] = response.fileName;
        } else {
          paths = response.uri.split('/');
          source['name'] = paths[paths.length - 1];
        }

        if (response.type) {
          source['type'] = response.type;
        }

        const CHECK_IMAGE_URI_INTERVAL = Platform.OS === 'android' ? 300 : 100;

        // This is needed to ensure that a file exists
        setTimeout(() => {
          // Use getSize as a proxy for when the image exists
          Image.getSize(response.uri, () => {
            groupChannel.sendFileMessage(source, async function(
              message,
              error,
            ) {
              if (error) {
                console.log(error);
                return;
              }
              setDataMessage([message, ...dataMessage]);
              fetchSendBird();
            });
          });
        }, CHECK_IMAGE_URI_INTERVAL);
      }
    });
  };
  //
  const handleLoadMore = () => {
    if (getSendBirdInfoData) {
      setLoading(true);
      if (prevMessage) {
        prevMessage?.load(function(messages, error) {
          if (error) {
            return;
          }
          if (messages.length > 0) {
            setDataMessage([...dataMessage, ...messages]);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  };
  //
  const format = result => {
    return result?.map(({_sender, ...rest}, i) => {
      if (_sender?.nickname === result[i + 1]?._sender?.nickname) {
        return {...rest, _sender: {..._sender, nickname: null}};
      }
      return {...rest, _sender};
    });
  };
  //
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      behavior={Platform.OS == 'ios' && 'height'}
      // enabled
      // keyboardVerticalOffset={138 + insets.bottom}
    >
      {/* <ChatHeader navigation={navigation} title={String(CHATBOX_TITLE[chatboxType])} /> */}
      <ChatHeader navigation={navigation} title={t('SupportTeam')} />
      <View style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          ref={c => {
            scroll = c;
          }}
          // onContentSizeChange={() => scroll.scrollToEnd({animated: true})}
          data={format(dataMessage) || []}
          contentContainerStyle={{paddingHorizontal: 26, paddingVertical: 30}}
          keyExtractor={item => item.id}
          inverted
          initialNumToRender={15}
          renderItem={({item}) => (
            <ChatMessageItem item={item} userId={userId} />
          )}
          ListFooterComponent={() => {
            return loading && <SpinnerView />;
          }}
          onEndReachedThreshold={1}
          onEndReached={() => {
            handleLoadMore();
          }}
        />
        <View style={styles.typebox}>
          <Ripple onPress={onSendFile}>
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
            onSubmitEditing={() => setInputMessage(inputMessage + '\n')}
            onChangeText={value => {
              setInputMessage(value);
            }}
          />
          <Ripple onPress={onSubmit}>
            <SendIcon size={21} style={{marginHorizontal: 13}} />
          </Ripple>
        </View>
      </View>
      {(getSendBirdInfoProgress || loadingFirstTime) && <DimSpinnerView />}
    </KeyboardAvoidingView>
  );
};
//
export default memo(ChattingBoxScreen);
//
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
//
const CHATBOX_TITLE = {
  cleaning: 'Cleaning',
  general: 'General',
  ticket: 'Ticket Support',
  delivery: 'Delivery',
  laundry: 'Laundry',
  moving: 'Moving',
  buildManager: 'Building Manager',
};
//
const DATA_CLEANING = [
  {
    id: '1',
    userId: '1',
    message: 'Which part of the apartment that needs cleaning?',
    time: moment()
      .subtract(50, 'm')
      .format('hh:mm a'),
  },
];
//
const DATA_MOVING = [
  {
    id: '1',
    userId: '1',
    message: 'Are you moving the item in or out?',
    time: moment()
      .subtract(50, 'm')
      .format('hh:mm a'),
  },
];
//
const DATA_DELIVERY = [
  {
    id: '1',
    userId: '1',
    message: 'Are you the sender or receiver?',
    time: moment()
      .subtract(50, 'm')
      .format('hh:mm a'),
  },
];
//
const DATA_TICKET = [
  {
    id: '1',
    userId: '1',
    message:
      'Send us any questions regarding your ticket. We will respond as soon as possible!',
    time: moment()
      .subtract(50, 'm')
      .format('hh:mm a'),
  },
];
//
const DATA_GENERAL = [
  {
    id: '1',
    userId: '1',
    message:
      'Please send us general questions only. For questions related to a specific service, please contact its proper support center.',
    time: moment()
      .subtract(50, 'm')
      .format('hh:mm a'),
  },
];
//
const DATA_LAUNDRY = [
  {
    id: '1',
    userId: '1',
    message: 'When can we pick up the laundry?',
    time: moment()
      .subtract(50, 'm')
      .format('hh:mm a'),
  },
  {
    id: '2',
    userId: '2',
    message: 'Hi, may I know how much it is per load?',
    time: moment()
      .subtract(40, 'm')
      .format('hh:mm a'),
  },
  {
    id: '3',
    userId: '1',
    message: "Hi, it's 20,000/kg. Clothes can be picked up 24 hours later.",
    time: moment()
      .subtract(30, 'm')
      .format('hh:mm a'),
  },
  {
    id: '4',
    userId: '2',
    message:
      "Thank you! Can you pick it up at my apartment at 7PM today? I'll leave it at the door for you.",
    time: moment()
      .subtract(10, 'm')
      .format('hh:mm a'),
  },
];
//
const DATA_BUILD_MANAGER = [
  {
    id: '1',
    userId: '2',
    message: 'Hello, I want to change the time visit to 09:00 AM.',
    time: moment()
      .subtract(50, 'm')
      .format('hh:mm a'),
  },
  {
    id: '1',
    userId: '1',
    message: 'Sure. We will update information.',
    time: moment()
      .subtract(50, 'm')
      .format('hh:mm a'),
  },
];
//
const DATA_CHATBOX_TYPE = {
  cleaning: DATA_CLEANING,
  general: DATA_GENERAL,
  ticket: DATA_TICKET,
  delivery: DATA_DELIVERY,
  laundry: DATA_LAUNDRY,
  moving: DATA_MOVING,
  buildManager: DATA_BUILD_MANAGER,
};
