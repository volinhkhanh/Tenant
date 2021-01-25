import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';

import MainHeader from '../../components/MainHeader';
import {MyProgressSteps} from '../../components/MyProgressSteps';
import {KeyboardAvoidingView} from '../utils';
import {MySection} from '../../components/MySection';
import Button from '../../components/button';
import dateFormat from '../../utils/dateFormat';
import {useTranslation} from '../../context/LanguageContext';
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
import CardImage from '../../components/card/CardImage';

export default function MovingBookingConfirmLOIScreen(props) {
  const {
    navigation,
  } = props;
  const {
    t,
    i18nMovingListIt,
    i18nMovingListQu,
    i18nMovingListUn,
    i18nMovingListMoOu,
    i18nMovingListMAF,
    i18nMovingListDa,
    i18nMovingListDe,
    i18nMovingListLOI,
  } = useTranslation();
  const stateParams = navigation?.state?.params
  // console.log(stateParams)
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={i18nMovingListLOI}
      />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        style={{marginBottom: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.mainTitle}>
              {stateParams?.type === 'MOVE_FURNITURE' ? i18nMovingListMAF : i18nMovingListMoOu}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 17,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.date}>
                {`${i18nMovingListUn}: ${stateParams?.unit}`}
              </Text>
              <Text style={styles.date}>
                {`${i18nMovingListDa}: ${dateFormat.formatDate(stateParams?.move_out_date)}`}
              </Text>
            </View>
          </View>
          {
            stateParams?.moving_request_items?.map(item => {
              return (
                <View style={[
                  styles.titleBox,
                  stateParams?.moving_request_items?.length > 1
                  && {borderBottomWidth: 0.5, borderColor: Colors.gray7}
                ]}>
                  <View style={styles.titleLabel}>
                    <View style={[styles.itemLabelTitle, {borderRightWidth: 0.75, borderColor: Colors.gray6}]}>
                      <Text style={styles.firstText}>
                        {i18nMovingListIt}
                      </Text>
                    </View>
                    <View style={styles.itemLabelTitle}>
                      <Text style={styles.firstText}>
                        {i18nMovingListQu}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={[styles.itemLabelInfo, {borderRightWidth: 0.75, borderColor: Colors.gray6}]}>
                      <Text style={styles.value}>
                        {item?.name}
                      </Text>
                    </View>
                    <View style={styles.itemLabelInfo}>
                      <Text style={styles.value}>
                        {item?.quantity | 0}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}>
                    <Text style={styles.label}>{i18nMovingListDe}</Text>
                    <Text
                      style={styles.value}>
                      {item?.description}
                    </Text>
                  </View>
                  <ScrollView
                    horizontal={true}
                    contentContainerStyle={styles.imageContent}
                    showsHorizontalScrollIndicator={false}>
                    {item?.files?.map((file) => {
                      return (
                        <View style={{paddingVertical: 10}}>
                          <CardImage
                            imageUrl={file?.url || ''}
                            disabled={true}
                            noDelete={true}
                            style={{marginHorizontal: 10}}
                            fixedWidth
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingBottom: 30,
  },
  stepBox: {marginHorizontal: 28},
  box: {
    marginTop: 24,
    paddingBottom: 10,
    marginHorizontal: 28,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderRadius: 10,
    ...ApplicationStyles.boxShadow,
  },
  headerBox: {
    paddingTop: 10,
    paddingBottom: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
    ...ApplicationStyles.boxShadow,
  },
  date: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  mainTitle: {
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.regular,
    color: Colors.black,
    paddingVertical: 12,
    textAlign: 'center',
    // textTransform: 'capitalize',
  },
  titleBox: {
    paddingTop: 16,
    marginHorizontal: 26,
  },
  titleLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.gray6,
  },
  imageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemLabelTitle: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  itemLabelInfo: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  label: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.gray6,
    paddingVertical: 10,
  },
  value: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.regular,
    color: Colors.black,
  },
});
