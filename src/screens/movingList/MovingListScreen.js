import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//
import Button from '../../components/button';
import {TableListItem} from '../../components/ListItem';
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
import SpinnerView from '../../components/SpinnerView';
//
import {Colors, ApplicationStyles, Fonts} from '../../themes';
//
import Util from '../../utils/dateFormat';
//
import Layouts from '../../constants/Layouts';
//
import {useTranslation} from '../../context/LanguageContext';
import {capitalizeFirstLetter} from '../../utils/capitalize';
//
const MovingListScreen = props => {
  const {
    navigation,
    getMovingListData,
    getMovingListProgress,
    getMovingList,
    setMovingListData,
    getGeneralInformationData,
  } = props;
  //
  const {
    i18nMovingListML,
    i18nMovingListPLTITY,
    i18nMovingListCr,
    i18nMovingListDa,
    i18nMovingListIt,
    i18nMovingListSt,
    i18nMovingListAp,
    i18nMovingListSu,
    i18nMovingListRe,
    i18nMovingListBo,
    i18nMovingListCed,
  } = useTranslation();
  //
  const [movingList, setMovingList] = useState([]);
  const [movingListArray, setMovingListArray] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [locale, setLocale] = useState('en');
  //
//   BOOKED
// ADMIN_CONFIRMED
// DONE
// SUBMITTED
// APPROVED
// REJECTED
  const renderMovingItem = ({item}) => {
    let statusColor = '';
    let status = '';
    switch (item.status) {
      case 'APPROVED':
        statusColor = 'default';
        status = i18nMovingListAp;
        break;
      case 'REJECTED':
        statusColor = 'warning';
        status = i18nMovingListRe;
        break;
      case 'BOOKED':
        statusColor = 'primary';
        status = i18nMovingListBo;
        break;
      case 'ADMIN_CONFIRMED':
        statusColor = 'gray';
        status = i18nMovingListCed;
        break;
      case 'DONE':
        statusColor = 'warning';
        status = 'Done';
        break;
      default:
        statusColor = 'white';
        status = i18nMovingListSu;
        break;
    }
    return (
      <TableListItem
        date={
          locale === 'vi'
            ? Util.formatDayMonthVi(item.move_out_date)
            : Util.formatDayMonth(item.move_out_date)
        }
        type={item?.item}
        buttonText={status}
        buttonColor={statusColor}
        onPressStatusButton={() => {
          item?.status === "ADMIN_CONFIRMED" ?
            navigation.navigate('MovingBookingConfirm', {uuidConfirm: item.uuid})
          : navigation.navigate('MovingDetail', item.uuid)
        }}
      />
    );
  };
  //
  const handleLoadMore = () => {
    const page = getMovingListData?.page;
    const size = getMovingListData?.size;
    const total_items = getMovingListData?.total_items;
    if (!getMovingListProgress) {
      if (page * size < total_items) {
        getMovingList({
          page: page + 1,
        });
      }
    }
  };
  //
  useEffect(() => {
    getLocale();
    getMovingList({
      page: 1,
    });
    return () => {
      setMovingListData(null);
    };
  }, []);
  //
  useEffect(() => {
    if (getMovingListData) {
      setTotalItem(getMovingListData.total_items);
      setMovingList(getMovingListData);
      setMovingListArray([...movingListArray, ...getMovingListData.items]);
    }
  }, [getMovingListData]);
  //
  async function getLocale() {
    const localeStorage = await AsyncStorage.getItem('locale');
    setLocale(localeStorage);
  }
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('MovingListTitle')
          i18nMovingListML
        }
      />
      <BackgroundImage noHeader={true} />
      <View>
        <View style={styles.textBox}>
          <Text style={styles.textDesc}>
            {/* {t('MovingDetail')} */}
            {i18nMovingListPLTITY}
          </Text>
          <Text style={styles.textTitle}>
            {/* {t('MovingList')} */}
            {i18nMovingListML}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.headerList}>
            <Text style={styles.headerText}>
              {/* {t('Date')} */}
              {i18nMovingListDa}
            </Text>
            <Text style={styles.headerText}>
              {/* {t('Item')} */}
              {i18nMovingListIt}
            </Text>
            <Text style={styles.headerText}>
              {/* {t('Status')} */}
              {i18nMovingListSt}
            </Text>
          </View>
          <FlatList
            data={movingListArray || []}
            renderItem={renderMovingItem}
            keyExtractor={({id}) => id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.bodyList}
            removeClippedSubViews={true}
            windowSize={5}
            initialNumToRender={movingList?.size}
            maxToRenderPerBatch={movingList?.size * movingList?.page}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              handleLoadMore();
            }}
            ListFooterComponent={
              getMovingListProgress &&
              totalItem > 0 && (
                <View style={styles.footerLoad}>
                  <SpinnerView />
                </View>
              )
            }
          />
        </View>
        <View style={styles.button}>
          <Button
            text={
              // t('Create')
              i18nMovingListCr
            }
            onPress={() => navigation.navigate('MovingCreate')}
          />
        </View>
      </View>
      {getMovingListProgress && totalItem == 0 && <DimSpinnerView />}
    </View>
  );
};
//
export default memo(MovingListScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  image: {
    height: ApplicationStyles.utils.resizeHeight(250),
    width: ApplicationStyles.utils.resizeWidth(240),
  },
  textDesc: {
    ...Fonts.style.bodyRegular,
    paddingTop: 14,
    paddingHorizontal: ApplicationStyles.utils.resizeLimitedWidth(28),
    color: Colors.gray2,
    lineHeight: 30,
  },
  textTitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    paddingTop: 16,
    paddingHorizontal: ApplicationStyles.utils.resizeLimitedWidth(28),
    color: Colors.gray1,
    lineHeight: 30,
    marginBottom: 10,
  },
  table: {
    marginLeft: 27,
    marginRight: 27,
    // paddingVertical: 20,
    backgroundColor: Colors.white,
    borderRadius: 15,
    height: Layouts.height / 2.3,
    ...ApplicationStyles.boxShadow,
  },
  headerList: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomColor: 'rgba(78, 80, 83, 0.2)',
    borderBottomWidth: 1,
  },
  headerText: {
    ...Fonts.style.bodySemibold,
    flex: 1,
    textAlign: 'center',
  },
  bodyList: {
    paddingTop: 15,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  footerLoad: {
    marginBottom: 20,
  },
});
