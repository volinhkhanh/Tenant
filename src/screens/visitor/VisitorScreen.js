import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Platform} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import Button from '../../components/button';
import CardTicket from '../../components/card/CardTicket1';
import MainHeader from '../../components/MainHeader';
import BackgroundImage from '../../components/BackgroundImage';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
import {useTranslation} from '../../context/LanguageContext';
//
const VisitorScreen = props => {
  const {
    navigation,
    getVisitors,
    getVisitorsData,
    getVisitorsProgress,
    getGeneralInformationData,
  } = props;
  const {
    t,
    i18nVisitorVi,
    i18nVisitorLOVI,
    i18nVisitorHi,
    i18nVisitorMa,
    i18nVisitorVis,
    i18nVisitorDe,
    i18nVisitorAV,
    i18nVisitorNI,
    i18nMovingListLGS,
  } = useTranslation();
  const [dataList, setDataList] = useState(DATA);

  const [visitors, setVisitors] = useState(null);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    navigation.addListener('willFocus', () => {
      if (page > 0) {
        setVisitors(null);
        setPage(1);
        setTotalItem(0);
        fetch(1);
      }
    });
    fetch(page);
  }, [page]);

  useEffect(() => {
    setVisitors(preState =>
      page === 1
        ? getVisitorsData?.items
        : preState.concat(getVisitorsData?.items),
    );
    setTotalItem(getVisitorsData?.total_pages);
  }, [getVisitorsData]);

  async function fetch() {
    getVisitors({
      unit_id: getGeneralInformationData?.unit_id,
      page,
    });
  }
  //
  async function handleLoadMore() {
    if (page < totalItem) setPage(page + 1);
  }
  //
  const renderStatus = item => {
    switch (item) {
      case 'Maintenance':
        return i18nVisitorMa;
      case 'Visit':
        return i18nVisitorVis;
      default:
        return i18nVisitorDe;
    }
  };
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
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('Visitor')
          i18nVisitorVi
        }
      />
      {
        visitors?.length > 0 &&
        <BackgroundImage />
      }
      <View style={{flex: 1}}>
        <View style={styles.textBox}>
          <Text style={styles.textDesc}>
            {/* {t('ListOfVisitorInformation')} */}
            {i18nVisitorLOVI}
          </Text>
          <Text style={styles.textTitle}>
            {/* {t('History')} */}
            {i18nVisitorHi}
          </Text>
        </View>
        <FlatList
          ListEmptyComponent={() =>
            visitors?.length === 0 ? (
              <View style={{flex: 1, paddingBottom: 50, alignItems: 'center', justifyContent: 'center'}}>
                <Images.NoInformation />
                <Text style={[styles.textEmpty, {paddingTop: 15}]}>{i18nVisitorNI}</Text>
                <Text style={styles.textEmpty}>{i18nMovingListLGS}</Text>
              </View>
            ) : null
          }
          // style={{flex: 1}}
          contentContainerStyle={styles.contentScroll}
          data={visitors || []}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => {
            // console.log(item?.reason);
            // const status = renderStatus(item?.reason);
            const status = t(`src.screens.visitor.VisitorScreen.${item?.reason}`);
            const color = COLOR_STATUS[item.reason];

            return (
              <Ripple
                style={[{marginVertical: 10},
                  Platform.OS === 'android' && {
                    width: '100%',
                    minHeight: 160,
                    backgroundColor: '#dfdfdf',
                    borderRadius: 10,
                    shadowColor: Colors.black,
                    shadowOpacity: 0.7,
                    shadowOffset: {
                      width: 2,
                      height: 2,
                    },
                    shadowRadius: 3,
                    elevation: 10,
                }]}
                onPress={() =>
                  navigation.navigate('VisitorDetail', {uuid: item.uuid})
                }>
                <CardTicket
                  type={'visitor'}
                  {...item}
                  title={item.name}
                  status={status}
                  color={color}
                  timeWork={item.check_in}
                  description={item.note}
                />
              </Ripple>
            );
          }}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          initialNumToRender={10}
          ListFooterComponent={
            getVisitorsProgress &&
            totalItem > 0 && (
              <View style={styles.footerLoad}>
                <DimSpinnerView />
              </View>
            )
          }
        />
      </View>
      <View style={styles.button}>
        <Button
          text={
            // t('AddVisitor')
            i18nVisitorAV
          }
          onPress={() => navigation.navigate('VisitorCreate')}
        />
      </View>
      {getVisitorsProgress && totalItem === 0 && <DimSpinnerView />}
    </View>
  );
};
//
export default memo(VisitorScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
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
    ...Fonts.style.bodyMedium,
    paddingTop: 26,
    paddingHorizontal: ApplicationStyles.utils.resizeLimitedWidth(28),
    color: Colors.gray1,
    lineHeight: 30,
  },
  buttonBox: {
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 0.3,
  },
  title: {
    ...Fonts.style.subtitleSemibold,
    color: Colors.gray2,
  },
  button: {
    backgroundColor: 'white',
    ...ApplicationStyles.boxShadow,
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  contentScroll: {
    // flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  textEmpty: {
    fontSize: 16,
    color: Colors.gray6,
    paddingTop: 7,
  },
});

const DATA = [
  {
    id: '1',
    imageUrl: Images.visitor,
    title: 'Nguyen Lan Anh',
    status: 'Visitor',
    statusText: 'Visit',
    timeText: '08:00 02/03/2020',
    description: 'My friend is coming.',
  },
  {
    id: '2',
    imageUrl: Images.visitor,
    title: 'Tran Minh Hung',
    status: 'Visitor',
    statusText: 'Maintenance',
    timeText: '08:00 02/03/2020',
    description: "He's here to fix the electricity.",
  },
];
