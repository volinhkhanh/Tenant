import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import _ from 'lodash';
//
import ImageProgress from '../ImageProgress';
//
import {Colors, Fonts, ApplicationStyles} from '../../themes';
//
import dateFormat from '../../utils/dateFormat';
import {MyTicket} from '../../components/MyTicket';
import {useTranslation} from '../../context/LanguageContext';
//
//
export const ChatMessageItem = ({channel, item, userId}) => {
  const {
    message,
    createdAt,
    _sender,
    thumbnails,
    isAdmin,
    isTicket,
    isAuthor,
    isFile,
    status,
  } = item;
  const {
    i18nLiveChatJ
  } = useTranslation();

  // console.log('🥰', JSON.stringify(item, null, 2));
  // isFile &&
  //   setTimeout(() => {
  //     console.log('🥵', JSON.stringify(item, null, 2));
  //   }, 3000);
  // console.log(item)

  // console.log('🥵', JSON.stringify(item, null, 2));
  // console.log('🥵', item);

  if (isAdmin) {
    if (isTicket) {
      const updated_at = JSON.parse(item.data)?.updated_at?.value || null;
      return (
        <View style={{paddingVertical: 15}}>
          <View
            style={{
              height: 0.5,
              backgroundColor: Colors.gray4,
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                position: 'absolute',
                top: -9,
                paddingHorizontal: 15,
                fontSize: 14,
                color: Colors.gray6,
                backgroundColor: '#F2F2F2',
              }}>
              {updated_at ? dateFormat.formatDate(updated_at) : ''}
            </Text>
          </View>
          {item?.data && <MyTicket data={item?.data} message={message} />}
          <Text
            style={{
              color: Colors.gray2,
              textAlign: 'right',
              fontSize: 10,
              bottom: -8,
            }}>
            {status} {dateFormat.formatTime(createdAt)}
          </Text>
        </View>
      );
    }
    const newMessage = message.replace('The channel is created.', '').replace('joined.', i18nLiveChatJ)
    return (
      <View style={{paddingVertical: 8}}>
        <Text style={{textAlign: 'center', color: Colors.gray7, fontSize: 14}}>
          {newMessage}
        </Text>
      </View>
    );
  }

  if (isAuthor) {
    return (
      <View style={{paddingBottom: 8}}>
        <View
          style={[
            styles.container,
            {
              alignSelf: 'flex-end',
            },
          ]}>
          {isFile ? (
            <View>
              <ImageProgress
                style={{
                  width: '100%', //its same to '20%' of device width
                  aspectRatio: 1, // <-- this
                  resizeMode: 'contain', //optional
                  borderRadius: 30,
                  overflow: 'hidden',
                }}
                source={{uri: item?.plainUrl}}
              />
            </View>
          ) : (
            <View
              style={{
                backgroundColor: Colors.mainColor,
                borderRadius: 10,
                padding: 14,
              }}>
              <Text
                style={{
                  ...Fonts.style.captionRegular,
                  color: Colors.white,
                  fontSize: 16,
                }}>
                {message}
              </Text>
            </View>
          )}
          <Text
            style={{
              color: Colors.gray2,
              textAlign: 'right',
              fontSize: 10,
              bottom: -8,
            }}>
            {status} {dateFormat.formatTime(createdAt)}
          </Text>
        </View>
      </View>
    );
  }
  //
  return (
    <View style={{paddingBottom: 8}}>
      {_sender?.nickname && (
        <Text
          style={{
            color: Colors.gray1,
            paddingBottom: 4,
          }}>
          {_sender?.nickname}
        </Text>
      )}
      <View
        style={[
          styles.container,
          {
            alignSelf: 'flex-start',
          },
        ]}>
        {isFile ? (
          <View>
            <ImageProgress
              style={{
                width: '100%', //its same to '20%' of device width
                aspectRatio: 1, // <-- this
                resizeMode: 'contain', //optional
                borderRadius: 30,
                overflow: 'hidden',
              }}
              source={{uri: item?.plainUrl}}
            />
          </View>
        ) : (
          <View
            style={{
              backgroundColor: Colors.whiteGray,
              borderRadius: 10,
              padding: 14,
            }}>
            <Text
              style={{
                ...Fonts.style.captionRegular,
                color: Colors.gray2,
                fontSize: 16,
              }}>
              {message}
            </Text>
          </View>
        )}
      </View>
      <Text
        style={{
          color: Colors.gray7,
          textAlign: 'left',
          fontSize: 10,
          // bottom: -8,
          left: 4,
        }}>
        {dateFormat.formatTime(createdAt)}
      </Text>
    </View>
  );
};
//
const styles = StyleSheet.create({
  container: {
    maxWidth: ApplicationStyles.utils.resizeWidth(231),
    // padding: 14,
    marginVertical: 10,
    // backgroundColor: Colors.whiteGray,
  },
});
