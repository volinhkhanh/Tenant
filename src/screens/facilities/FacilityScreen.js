import React, {memo, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import Ripple from 'react-native-material-ripple';
//
import Card from '../../components/card';
import {RecentBookingItem} from '../../components/ListItem';
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
import {
  TennisIcon,
  BasketballIcon,
  BadmintonIcon,
} from '../../components/icons';
//
import DimSpinnerView from '../../components/DimSpinnerView';
import {Images, Colors, Fonts} from '../../themes';
import NoInformation from '../../images/no_data.svg';
//
import {useTranslation} from '../../context/LanguageContext';
//
const FacilityScreen = props => {
  const {
    navigation,
    getFacilityCategories,
    dataFacilityCategories,
    // loading,
    getGeneralInformationData,
    getRecentBooking,
    dataRecentBooking,
    getMemberData,
  } = props;
  //
  const {
    t,
    i18nFacility,
    i18nFacilityDes,
    i18nRecentBooking,
    i18nFaNB,
    i18nFaLGS,
  } = useTranslation();
  //
  const [loading, setLoading] = useState(false);
  const onPressToBookingConfirmDoneScreen = item => {
    navigation.navigate('BookingConfirmDone', {
      create_at: item?.created_at,
      categoryName: item?.facility_category,
      name: item?.facility,
      dateStart: item?.start,
      isCancel: item?.is_cancel,
      dataInfo: getGeneralInformationData,
      idBooking: item?.uuid,
      isReady: item?.is_active,
      building: item?.facility?.building,
      onDayPress: () => onRefreshDay(),
      durationCancel: item.free_cancel_before,
    });
  };
  const onRefreshDay = async () => {
    try {
      setLoading(true);
      await getRecentBooking();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        await getFacilityCategories();
        await getRecentBooking();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getData();
    navigation.addListener('willFocus', () => {
      getData();
    });
  }, []);
  // useEffect(() => {
  //   console.log(dataRecentBooking)
  // }, [dataRecentBooking])

  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nFacility} />
      <BackgroundImage />
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionTitle}>
          {i18nFacilityDes}
        </Text>
      </View>
      <View style={styles.buttonBox}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dataFacilityCategories?.items?.length > 0 &&
            dataFacilityCategories?.items.map((value, index) => {
              return (
                <Card
                  key={index}
                  size="M"
                  Icon={value?.files[0]?.url}
                  label={t(`src.screens.facilities.${value?.name}`)}
                  img={true}
                  fixedWidth
                  style={index == 0 && {marginLeft: 28}}
                  onPress={() =>
                    {
                      navigation.navigate('FacilityTennis', {
                        title: value?.name,
                        dataItem: value,
                        name: getGeneralInformationData?.full_name,
                        img: value?.files[1]?.url,
                      })
                    }
                  }
                />
              );
            })}
        </ScrollView>
      </View>
      <View style={styles.listTitleBox}>
        <Text style={styles.listTitle}>{i18nRecentBooking}</Text>
      </View>
      <FlatList
        // data={dataRecentBooking?.items || []}
        data={[]}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentScroll}
        ListEmptyComponent={() => (
          <View style={{paddingTop: 40, alignItems: 'center'}}>
            <NoInformation />
            <Text style={[styles.noDataText, {paddingTop: 15}]}>{i18nFaNB}</Text>
            <Text style={styles.noDataText}>{i18nFaLGS}</Text>
            {/* <Image source={Images.noData} style={{width: 119, height: 127}} /> */}
          </View>
        )}
        renderItem={({item}) => (
          <Ripple
            key={item.id}
            onPress={() => onPressToBookingConfirmDoneScreen(item)}>
            <RecentBookingItem
              item={item}
              getGeneralInformationData={getGeneralInformationData}
            />
          </Ripple>
        )}
      />
      {loading ? <DimSpinnerView /> : null}
    </View>
  );
};
//
export default memo(FacilityScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 28,
  },
  descriptionBox: {
    paddingVertical: 20,
    paddingHorizontal: 28,
  },
  descriptionTitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
  listTitleBox: {
    marginTop: 40,
    marginBottom: 20,
  },
  listTitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
    paddingHorizontal: 28,
    paddingBottom: 10,
  },
  contentScroll: {
    paddingVertical: 10,
  },
  noDataText: {
    fontFamily: Fonts.type.medium,
    fontSize: 16,
    color: '#CACACA',
    paddingTop: 7,
  },
});
//
const DATA = [
  {
    id: '1',
    userName: 'A.01-02',
    name: 'Tennis',
    yardName: 'Tennis yard A1',
    date: moment().format('YYYY/MM/DD HH:mm a'),
  },
  {
    id: '2',
    userName: 'A.01-02',
    name: 'Badminton',
    yardName: 'Tennis yard A1',
    date: moment().format('YYYY/MM/DD HH:mm a'),
  },
  {
    id: '3',
    userName: 'A.01-02',
    name: 'Basketball',
    yardName: 'Tennis yard A1',
    date: moment().format('YYYY/MM/DD HH:mm a'),
  },
  {
    id: '4',
    userName: 'A.01-02',
    name: 'Tennis',
    yardName: 'Tennis yard A1',
    date: moment().format('YYYY/MM/DD HH:mm a'),
  },
  {
    id: '5',
    userName: 'A.01-02',
    name: 'Basketball',
    yardName: 'Tennis yard A1',
    date: moment().format('YYYY/MM/DD HH:mm a'),
  },
  {
    id: '6',
    userName: 'A.01-02',
    name: 'Badminton',
    yardName: 'Tennis yard A1',
    date: moment().format('YYYY/MM/DD HH:mm a'),
  },
  {
    id: '7',
    userName: 'A.01-02',
    name: 'Tennis',
    yardName: 'Tennis yard A1',
    date: moment().format('YYYY/MM/DD HH:mm a'),
  },
];
