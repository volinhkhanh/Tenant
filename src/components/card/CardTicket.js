import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import {Badge} from 'react-native-elements';
//
import {Colors, Fonts, Images} from '../../themes';
//
import {DividerDot} from '../../components/divider';
import {
  ProcessIcon,
  InOutIcon,
  BuildSVG,
  BusinessSVG,
  AssignmentSVG,
  ProcessingSVG,
  CompletedSVG,
  WarningSVG,
} from '../../components/icons';
import {capitalizeFirstLetter} from '../../utils/capitalize';
import {useTranslation} from '../../context/LanguageContext';
//
import DateFormat from '../../utils/dateFormat';
//
const COLOR_STATUS = {
  Processing: Colors.mainColor,
  Completed: Colors.greenMedium,
  Submitted: Colors.gray7,
  Canceled: Colors.red,
  Visitor: Colors.mainColor,
};
const CardTicket = (props) => {
  const {t} = useTranslation();
  const {
    // imageUrl = Images.chair1,
    first_ticket_image,
    title,
    status,
    submitted_date,
    hashtag,
    is_notify,
  } = props;
  const timeWork = DateFormat.formatDate(submitted_date);
  // const formatStatus = status === 'NEW' ? 'SUBMITTED' : status;
  const statusText = capitalizeFirstLetter(status);
  const colorStatus = {
    color: COLOR_STATUS[statusText],
  };
  const IconTitle = (status) =>
    status === 'personal' ? (
      <View style={{paddingRight: 5}}>
        <InOutIcon width={16} height={16} />
      </View>
    ) : (
      <ProcessIcon size={16} style={{paddingRight: 5}} />
    );
  const IconStatus = () => {
    switch (statusText) {
      case 'Submitted':
        return <AssignmentSVG size={16} style={{marginRight: 5}} />;
      case 'Canceled':
        return <WarningSVG size={16} style={{marginRight: 5}} />;
      case 'Completed':
        return <CompletedSVG size={16} style={{marginRight: 5}} />;
      case 'Processing':
        return <ProcessingSVG size={16} style={{marginRight: 5}} />;
    }
  };
  //
  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'ios' && {
          shadowColor: '#ccc',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.7,
          shadowRadius: 3.84,
          elevation: 10,
        },
      ]}>
      <ImageBackground source={Images.intersectSmall} style={styles.image}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {is_notify && (
            <Badge
              textStyle={{fontSize: 12, textAlign: 'center'}}
              value={'!'}
              badgeStyle={{
                backgroundColor: Colors.red,
                height: 15,
                minWidth: 15,
              }}
              containerStyle={{
                position: 'absolute',
                top: 20,
                right: 30,
              }}
            />
          )}
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <DividerDot />
        <View
          style={{flexDirection: 'row', paddingVertical: 10, marginTop: 10}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 25,
            }}>
            <Image
              source={{uri: first_ticket_image}}
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
              <BuildSVG size={16} style={{marginRight: 5}} />
              <Text style={[styles.statusText, colorStatus]}>
                {/* {t(statusText)} */}
                {t(`src.screens.tickers.TicketScreen.${statusText}`)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <BusinessSVG size={16} style={{marginRight: 5}} />
              <Text numberOfLines={1} style={styles.descText}>
                {hashtag?.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              {IconStatus()}
              <Text style={styles.descText}>{timeWork}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
//
export default memo(CardTicket);
//
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  image: {
    width: '100%',
    minWidth: 200,
    minHeight: 60,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 0,
    borderWidth: 0,
  },
  content: {
    backgroundColor: 'white',
    borderTopColor: 'transparent',
    width: '100%',
    paddingBottom: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 15,
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
});
