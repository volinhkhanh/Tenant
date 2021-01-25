import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import HTML from 'react-native-render-html'
//
import {DateIcon, TimeIcon, PlacesIcon} from '../../components/icons';
import MainHeader from '../../components/MainHeader';
//
import {Images, Colors, Fonts} from '../../themes/';
import {useTranslation} from '../../context/LanguageContext';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import dateFormat from '../../utils/dateFormat';
//
function EventDetailScreen(props) {
  const {navigation, getEvent, getEventData, getEventProgress} = props;
  const {uuid} = navigation?.state?.params;
  const {t, i18nEventDetailED} = useTranslation();
  const [event, setEvent] = useState(null);
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    setEvent(!event || getEventData);
  }, [getEventData]);
  async function fetch() {
    await getEvent(uuid);
  }
  //
  // console.log(getEventData?.data?.annoucement);
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('EventDetail')
          i18nEventDetailED
        }
      />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleContent}>
          <Text style={styles.title}>{event?.title}</Text>
          <Text style={styles.date}>{dateFormat.formatTimeDate(event?.created_at) || ''}</Text>
        </View>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <DateIcon size={16} color={Colors.black} />
          <Text style={styles.date}>
            {event?.from_date === null
              ? ` ${
                  event.release_date
                    ? dateFormat.formatDate(event.release_date)
                    : ''
                }`
              : ` ${
                  event?.from_date ? dateFormat.formatDate(event.from_date) : ''
                } - ${
                  event?.to_date ? dateFormat.formatDate(event.to_date) : ''
                }`}
          </Text>
        </View> */}
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TimeIcon size={16} color={Colors.black} />
          <Text style={styles.date}>
            {event?.from_date === null
              ? ` ${
                  event.release_date
                    ? dateFormat.formatTime(event.release_date)
                    : ''
                }`
              : ` ${
                  event?.from_date ? dateFormat.formatTime(event.from_date) : ''
                }`}
          </Text>
        </View> */}
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 15,
          }}>
          <PlacesIcon width={16} height={16} color={Colors.black} />
          <Text style={styles.date}>
            {` ${
              getEventData?.apartment?.name ? getEventData?.apartment?.name : ''
            }, ${
              getEventData?.apartment?.area ? getEventData?.apartment?.area : ''
            }`}
          </Text>
        </View> */}
        <HTML
          source={{ html: event?.content }}
          baseFontStyle={{color: Colors.gray7, fontSize: 12, fontFamily: Fonts.type.regular}}
        />
        {/* <Image
          source={Images.divider}
          style={{alignSelf: 'center', width: '100%'}}
        /> */}
        {/* {
          event?.files?.length > 0 &&
          <Image
            resizeMode="contain"
            source={{
              uri: event?.files?.[0]?.image?.url,
            }}
            style={{
              alignSelf: 'center',
              width: '100%',
              height: 300,
              marginVertical: 15,
            }}
          />
        }
        <Text style={styles.desc}>{event?.content}</Text> */}
      </ScrollView>
      {getEventProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default EventDetailScreen;
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingVertical: 10,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.medium,
    color: Colors.mainColor,
    paddingVertical: 10,
  },
  date: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.light,
    color: Colors.black,
    paddingVertical: 10,
    paddingBottom: 25,
  },
  desc: {
    ...Fonts.style.otherLight,
    paddingVertical: 16,
    color: Colors.gray2,
    lineHeight: 22,
  },
  titleContent: {
    borderBottomWidth: 0.5,
    borderColor: Colors.gray7,
    marginBottom: 10,
  },
});
