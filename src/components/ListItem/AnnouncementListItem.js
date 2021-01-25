import React, { memo } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Ripple from 'react-native-material-ripple';
import HTML from 'react-native-render-html'
//
import { NewsIcon, AsseccTimeIcon, ReadMoreIcon,TrashIcon,RingAnnoucement } from '../icons';
//
import { Colors, Fonts, ApplicationStyles, } from '../../themes';
import dateFormat from '../../utils/dateFormat'

const tagRE = new RegExp(/<\/?.+?>/g)

export const AnnouncementListItem = memo((props) => {
  const { item = { is_read }, style, onPress, onDelete } = props;
  let idAnnoucement =item?.id;
  var swipeoutBtns = [
    {
      text: 'Button',
      component:
      <View style={{ justifyContent:"center", alignItems:"center", flex:1, backgroundColor: Colors.whiteGray}}>
          <TrashIcon width={30} height={30}/>
      </View>,
      onPress: () => onDelete(idAnnoucement)
    }
  ]
  let date = dateFormat.formatDate(item?.created_at) || '';
  const textContent = item?.content?.replace(tagRE, "")
  const text = textContent.length > 100 ? textContent.slice(0, 90) + '...' : textContent
  return (
    <Swipeout right={swipeoutBtns} style={{marginBottom:10, borderRadius: 7}}>
      <Ripple style={style} onPress={() => onPress()}>
        <View
          style={{
            backgroundColor: !item.is_read ? "#F7F0CF" : Colors.white,
            paddingHorizontal: 12,
            paddingVertical: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ alignItems: 'center', paddingRight: 10 }}>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.white,
                borderRadius: 10,
                ...ApplicationStyles.shadow.dynamicOffset(2, 4, undefined, 0.15, 10),
              }}>
               <NewsIcon width={31} height={31} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={[Fonts.style.otherMedium,{color:"#000000", paddingBottom: 5}]}>{item.title}</Text>
            <HTML
              html={`${text}`}
              tagsStyles={{p: {color: Colors.gray7, fontSize: 12, fontFamily: Fonts.type.regular}}}
              baseFontStyle={{color: Colors.gray7, fontSize: 12, fontFamily: Fonts.type.regular}}
            />
          {/* <Text style={{ ...Fonts.style.otherLight, color: Colors.gray3, paddingVertical: 5 }}>{text}</Text> */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={styles.date}>
                <AsseccTimeIcon size={12} /> {date}
              </Text>
              <ReadMoreIcon
                size={24}
                color={Colors.black}
              />
            </View>
          </View>
        </View>
      </Ripple>
    </Swipeout>
  );
});

const styles = StyleSheet.create({
  date: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.regular,
    color: Colors.gray7,
  },
});
