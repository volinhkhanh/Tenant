import React, {memo, useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import Ripple from 'react-native-material-ripple';
//
import Toast from 'react-native-simple-toast';
import {AnnouncementListItem} from '../../components/ListItem';
import MainHeader from '../../components/MainHeader';
import * as serviceRest from '../../services/serviceRest';
//
import {Colors, Fonts} from '../../themes';
//
import {useTranslation} from '../../context/LanguageContext';
const Announcement = props => {
  const {t, i18nAnnounceNo, i18nAnnounceMAAR} = useTranslation();
  let {
    navigation,
    listAnnoucemnent,
    readingAnnoucement,
    readAnnoucementAll,
    deleteOneAnnoucement,
    getGeneralInformationData,
    getListAnnoucement,
  } = props;
  const getData = () => {
    getListAnnoucement({
      // unit_id: getGeneralInformationData?.unit_id,
    });
  };
  useEffect(() => {
    getData();
    navigation.addListener('willFocus', () => {
      getData();
    });
  }, []);
  // useEffect(() => {
  //   console.log(listAnnoucemnent)
  // }, [totalReadAnnoucement])
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('Notifications')
          i18nAnnounceNo
        }
      />
      <View style={{alignItems: 'flex-end'}}>
        <Ripple
          style={{marginRight: 27, marginTop: 27, marginBottom: 10}}
          onPress={async () => {
            try {
              // let unit_id = await AsyncStorage.getItem('unit_id');
              let data = await serviceRest.markAllAsRead();
              readAnnoucementAll();
            } catch (err) {
              console.log(err.data.message);
              // Toast.show(err.data.message);
            }
          }}>
          <Text style={{...Fonts.style.bodySemibold, color: Colors.mainColor}}>
            {/* {t('txtMarkAllAsRead')} */}
            {i18nAnnounceMAAR}
          </Text>
        </Ripple>
      </View>
      <FlatList
        contentContainerStyle={{
          paddingVertical: 22,
          paddingBottom: 40,
          paddingHorizontal: 25,
        }}
        data={listAnnoucemnent}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <AnnouncementListItem
            item={item}
            onPress={() => {
              navigation.navigate('NewsDetail', item.uuid);
            }}
            onDelete={async id => {
              try {
                let unit_id = await AsyncStorage.getItem('unit_id');
                await serviceRest.deleteAnnoucement(id, unit_id);
                deleteOneAnnoucement(id);
              } catch (err) {
                Toast.show(err.data.message);
              }
            }}
          />
        )}
      />
    </View>
  );
};
//
export default memo(Announcement);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
});
