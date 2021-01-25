import React, {memo, useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, FlatList, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Ripple from 'react-native-material-ripple';
//
import Button from '../../components/button';
import CardTicket from '../../components/card/CardTicket';
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
import ModalSelector from '../../components/modal/ModalSelector';
//
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
import {useTranslation} from '../../context/LanguageContext';
import SpinnerView from '../../components/DimSpinnerView';
//
const TicketScreen = props => {
  const {
    navigation,
    getTickets,
    getTicketsProgress,
    getTicketsData,
    setTicketData,
    getTicketType,
    getTicketTypeData,
  } = props;

  const {
    t,
    i18nTicket,
    i18nTickReportIssue,
    i18nTickHistory,
    i18nTicketCreate,
    i18nTickIntroduce,
  } = useTranslation();

  const [tickets, setTickets] = useState(null);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [typeItem, setTypeItem] = useState({
    id: '',
    name: `${t('Type')}*`,
  });
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  const setModal = (keyword, val) => {
    setTypeModalVisible(val);
  };
  //
  const setValue = (keyword, val) => {
    // console.log(val)
    navigation.navigate('CreateTicket', val);
    setTypeItem(val);
  };

  const scrollEnabled = DATA.length > 0;
  useEffect(() => {
    fetch(1);
    getTicketType();
    navigation.addListener('willFocus', () => {
      setTickets(null);
      setPage(1);
      setTotalItem(0);
      fetch(1);
    });
    return () => {
      setTicketData(null);
    };
  }, []);
  useEffect(() => {
    navigation.addListener('willFocus', () => {
      if (page > 1) {
        setTickets(null);
        setPage(1);
        setTotalItem(0);
        fetch(1);
      }
    });
    fetch(page);
  }, [page]);
  useEffect(() => {
    // console.log(getTicketsData)
    if (getTicketsData) {
      setTickets(preState =>
        page === 1
          ? getTicketsData?.items
          : preState.concat(getTicketsData?.items),
      );
      setTotalItem(getTicketsData?.total_pages);
      getTicketsData?.items?.map(item => {
        item.hashtag.name = t(`src.screens.HomeScreen.${item.hashtag.name}`);
      });
    }
  }, [getTicketsData]);

  useEffect(() => {
    if (getTicketTypeData) {
      getTicketTypeData?.items?.map(item => {
        item.name = t(`src.screens.HomeScreen.${item.name}`);
      });
    }
  }, [getTicketTypeData]);

  async function fetch(page) {
    const result = await AsyncStorage.getItem('unit_id');
    getTickets({
      page,
    });
  }
  async function handleLoadMore() {
    if (page < totalItem) setPage(page + 1);
  }
  const convertStatus = status => {
    if (status) {
      switch (status) {
        case 'NEW':
          return 'SUBMITTED';
        case 'DECLINED':
          return 'CANCELED';
        default:
          return status;
      }
    } else {
      return '';
    }
  };
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nTicket} />
      {
        tickets?.length > 0 &&
        <BackgroundImage />
      }
      <View style={{flex: 1}}>
        <View style={styles.textBox}>
          {DATA.length > 0 && (
            <View>
              <Text style={styles.textDesc}>{i18nTickReportIssue}</Text>
              <Text style={styles.textTitle}>{i18nTickHistory}</Text>
            </View>
          )}
        </View>
        <FlatList
          ListEmptyComponent={() =>
            tickets?.length === 0 ? (
              <View style={{marginTop: 60, alignItems: 'center'}}>
                <Images.IllustrationEmptyNoTickets />
                <Text style={styles.textEmptyData}>{i18nTickIntroduce}</Text>
              </View>
            ) : null
          }
          scrollEnabled={scrollEnabled}
          style={{height: '100%'}}
          contentContainerStyle={styles.contentScroll}
          data={tickets || []}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <Ripple
              style={[{marginVertical: 20},
                Platform.OS === 'android' && {
                  width: '100%',
                  height: 190,
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
              onPress={async () => {
                const params = {
                  ...item,
                  status: convertStatus(item?.status),
                };
                navigation.navigate('TicketDetail', {params});
              }}>
              <CardTicket
                {...item}
                status={convertStatus(item?.status)}
                first_ticket_image={item?.files[0]?.url}
              />
            </Ripple>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          initialNumToRender={10}
          ListFooterComponent={
            getTicketsProgress &&
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
          text={i18nTicketCreate}
          onPress={() => {
            // navigation.navigate('CreateTicket');
            typeModalVisible.open();
          }}
        />
        <ModalSelector
          setModal={setModal}
          setItem={setValue}
          data={getTicketTypeData?.items || []}
          checkData={typeItem}
          modalVisible={typeModalVisible}
        />
      </View>
      {getTicketsProgress && totalItem === 0 && <DimSpinnerView />}
    </View>
  );
};
//
export default memo(TicketScreen);
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
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    paddingTop: 14,
    paddingHorizontal: ApplicationStyles.utils.resizeLimitedWidth(28),
    color: Colors.gray7,
    lineHeight: 30,
  },
  textTitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    paddingVertical: 26,
    paddingHorizontal: ApplicationStyles.utils.resizeLimitedWidth(28),
    color: Colors.black,
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
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  textEmptyData: {
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    color: Colors.textColor.gray7,
    paddingTop: 30,
    lineHeight: 30,
  },
  footerLoad: {
    marginBottom: 20,
  },
});
const DATA = [
  {
    id: '1',
    imageUrl: Images.chair1,
    title: 'The chair is broken',
    status: 'Processing',
    timeText: '08:00 02/03/2020',
    description:
      'One of the dining chair is broken. It just collapsed when we sat...',
  },
  {
    id: '2',
    imageUrl: Images.chair2,
    title: 'The table is broken',
    status: 'Submited',
    timeText: '08:00 02/03/2020',
    description:
      'One of its legs is about to break soon. Please replace with a...',
  },
  {
    id: '3',
    imageUrl: Images.chair3,
    title: 'The table is broken',
    status: 'Completed',
    timeText: '08:00 02/03/2020',
    description:
      'One of its legs is about to break soon. Please replace with a...',
  },
  {
    id: '4',
    imageUrl: Images.chair4,
    title: 'The table is broken',
    status: 'Declined',
    timeText: '08:00 02/03/2020',
    description:
      'One of its legs is about to break soon. Please replace with a...',
  },
];
