import React, {memo} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
//
import {ReadMoreIcon, DateIcon} from '../icons';
//
import {Colors, Fonts, Images} from '../../themes';
const tagRE = new RegExp(/<\/?.+?>/g)
export const EventListItem = memo(props => {
  const {item, style} = props;
  // console.log(JSON.stringify(item.image.image.url, null, 2));
  const textContent = item?.desc?.replace(tagRE, "")
  const text = textContent.length > 100 ? textContent.slice(0, 90) + '...' : textContent
  return (
    <View
      style={{
        paddingVertical: 7,
        ...style,
      }}>
      <View
        style={{
          backgroundColor: item.unread ? '#F7F0CF' : Colors.white,
          paddingLeft: 26,
          paddingVertical: 14,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 16,
          }}>
          <Image
            source={{uri: item?.files[0]?.url}}
            style={{width: 94, height: 83}}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Text
            numberOfLines={2}
            style={styles.desc}>
            {text}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            {/* <Text
              style={{
                ...Fonts.style.otherLight,
                color: Colors.black,
                paddingVertical: 5,
              }}>
              <DateIcon size={16} /> {item.date}
            </Text> */}
            <ReadMoreIcon
              size={24}
              color={Colors.black}
              style={{paddingRight: 24}}
            />
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  title: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  desc: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.regular,
    color: Colors.gray7,
    paddingVertical: 5,
  },
});
