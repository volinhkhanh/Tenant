import React from 'react';
import _ from 'lodash';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import {CallIcon, SupportEmailIcon} from '../../components/icons';
//
import {Colors, Fonts} from '../../themes';
//
import {useTranslation} from '../../context/LanguageContext';
//
function CsSupportScreen(props) {
  const {navigation} = props;
  const {
    t,
    i18nCsSupportScreenHO,
    i18nCsSupportScreenHL,
    i18nCsSupportScreenEm,
  } = useTranslation();
  // console.log(props);
  //
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {/* {t('HeadOffice')} */}
          {i18nCsSupportScreenHO}
        </Text>
        <Text style={styles.subtitle}>
          52 Thrale Street, London, SE19HW, UK
        </Text>
        <Text style={styles.desc}>Working hours: 8AM - 5PM Mon - Fri</Text>
        <Text style={styles.desc}>Phone: 84864321</Text>
        <Text style={styles.desc}>Tax: 56894</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
          }}>
          <View>
            <Text style={styles.title}>
              {/* {t('Hotline')} */}
              {i18nCsSupportScreenHL}
            </Text>
            <Text style={styles.subtitle}>1900 1486</Text>
          </View>
          <Ripple onPress={() => props.onChangeMess()}>
            <CallIcon />
          </Ripple>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <View>
            <Text style={styles.title}>
              {/* {t('Email')} */}
              {i18nCsSupportScreenEm}
            </Text>
            <Text style={styles.subtitle}>buildingmanager@gmail.com</Text>
          </View>
          <Ripple onPress={() => props.onChangeCall()}>
            <SupportEmailIcon />
          </Ripple>
        </View>
      </ScrollView>
    </View>
  );
}
//
export default CsSupportScreen;
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentScroll: {
    paddingVertical: 10,
    paddingHorizontal: 27,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingLeft: 26,
    paddingRight: 21,

    borderBottomColor: Colors.gray5,
    borderBottomWidth: 0.5,
  },
  title: {
    ...Fonts.style.bodySemibold,
    color: Colors.gray4,
    paddingVertical: 10,
  },
  subtitle: {
    ...Fonts.style.bodyMedium,
    color: Colors.gray2,
    paddingVertical: 5,
  },
  desc: {
    ...Fonts.style.captionRegular,
    color: Colors.gray4,
  },
});
