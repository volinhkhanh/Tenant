import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, Platform} from 'react-native';
//
import {ApplicationStyles, Colors, Fonts, Images} from '../../themes';
//
import {DividerDot} from '../divider';
import {
  ProcessIcon,
  TimeIcon,
  InOutIcon,
  BusinessCenter,
  AssignmentReturned,
  Description,
  InOutSVG,
} from '../icons';
import DateFormat from '../../utils/dateFormat';
import {capitalizeFirstLetter} from '../../utils/capitalize';
import {useTranslation} from '../../context/LanguageContext';
import dateFormat from '../../utils/dateFormat';
//
const COLOR_STATUS = {
  Processing: Colors.mainColor,
  Completed: Colors.greenMedium,
  Submitted: Colors.red,
  Canceled: Colors.gray7,
  Visitor: Colors.mainColor,
  Visit: Colors.mainColor,
  Maintenance: Colors.mainColor,
  Delivery: Colors.mainColor,
};
const CardTicket1 = props => {
  const {t} = useTranslation();
  const {
    // imageUrl = Images.chair1,
    image,
    full_name,
    status,
    color,
    timeWork,
    description,
    type,
  } = props;
  const statusText = capitalizeFirstLetter(status);
  const colorStatus = {
    color,
  };
  const IconTitle = status =>
    status === 'personal' ? (
      <View style={{paddingRight: 5}}>
        <InOutIcon width={16} height={16} />
      </View>
    ) : (
      <ProcessIcon size={16} style={{paddingRight: 5}} />
    );
  //
  return (
    <View style={
      Platform.OS === 'ios' && {
        shadowColor: '#ccc',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3.84,
        elevation: 10,
      }
    }>
      <ImageBackground source={Images.intersectSmall} style={styles.image}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.title}>{full_name}</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <DividerDot />
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 25,
            }}>
            <Image
              source={image ? {uri: image} : Images.visitor}
              style={{height: 88, width: 88}}
            />
          </View>
          <View style={{flex: 2, paddingLeft: 13}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <InOutSVG size={16} style={{marginRight: 5}} />
              <Text style={[styles.statusText, colorStatus]}>
                {/* {t(`src.screens.visitor.VisitorCreateScreen.${statusText}`)} */}
                {statusText}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              {type === 'visitor' ? (
                <TimeIcon size={16} style={{marginRight: 5}} />
              ) : (
                <AssignmentReturned size={16} style={{marginRight: 5}} />
              )}
              <Text style={styles.descText}>
                {dateFormat.formatDateTime(timeWork)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <View style={{paddingRight: 5}}>
                <Description width={16} height={16} />
              </View>
              <Text numberOfLines={1} style={styles.descText}>
                {description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
//
export default memo(CardTicket1);
//
const styles = StyleSheet.create({
  image: {
    width: '100%',
    minWidth: 200,
    minHeight: 60,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // shadowColor: '#ccc',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 10,
  },
  content: {
    backgroundColor: 'white',
    borderTopColor: 'transparent',
    width: '100%',
    paddingBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // shadowColor: '#ccc',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 10,
  },
  statusText: {
    ...Fonts.style.bodyMedium,
  },
  descText: {
    fontSize: Fonts.size.h5,
    color: Colors.gray1,
    fontFamily: Fonts.type.base,
    paddingRight: 20,
  },
  title: {
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
});
