import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {Text, StyleSheet, ScrollView, FlatList, View} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import {Colors, Fonts} from '../../themes';
//
import {EventListItem} from '../../components/ListItem';
import MainHeader from '../../components/MainHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {useTranslation} from '../../context/LanguageContext';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import dateFormat from '../../utils/dateFormat';
//
function EventScreen(props) {
  const {navigation, getEvents, getEventsData, getEventsProgress} = props;
  const {t, i18nEventEv} = useTranslation();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    getEventsData && setEvents(getEventsData.items);
  }, [getEventsData]);
  async function fetch() {
    const result = await AsyncStorage.getItem('unit_id');
    await getEvents();
  }
  const onPress = id => {
    setEvents(
      events.map(item => (item.uuid === id ? {...item, is_read: 1} : item)),
    );
    navigation.navigate('EventDetail', {uuid: id});
  };
  // console.log(events);
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('Event')
          i18nEventEv
        }
      />
      <ScrollView>
        <FlatList
          scrollEnabled={false}
          style={{paddingVertical: 20}}
          data={events || []}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Ripple
              onPress={() => {
                onPress(item.uuid);
              }}>
              <EventListItem
                item={{
                  ...item,
                  imageUrl: item.files.url,
                  unread: !item.is_read,
                  desc: item.content,
                  date:
                    item?.from_date !== null
                      ? `${dateFormat.formatDate(
                          item?.from_date,
                        )} - ${dateFormat.formatDate(item?.to_date)}`
                      : `${dateFormat.formatDate(item?.publish_date)}`,
                }}
              />
            </Ripple>
          )}
        />
      </ScrollView>
      {getEventsProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default EventScreen;
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
    ...Fonts.style.title2Semibold,
    color: Colors.purplePink,
    paddingVertical: 10,
  },
  date: {
    ...Fonts.style.otherMedium,
    paddingVertical: 5,
    color: Colors.gray2,
  },
  desc: {
    ...Fonts.style.otherLight,
    paddingVertical: 16,
    color: Colors.gray2,
  },
});
