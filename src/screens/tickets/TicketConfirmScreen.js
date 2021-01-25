import React, {memo, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Button from '../../components/button';
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
import {useTranslation} from '../../context/LanguageContext';
import CardImage from '../../components/card/CardImage';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import dateFormat from '../../utils/dateFormat';

const RowItem = props => {
  const {firstText, lastText} = props;
  return (
    <View style={styles.item}>
      <Text style={styles.firstText}>{firstText}</Text>
      <Text style={styles.lastText}>{lastText}</Text>
    </View>
  );
};

const TicketConfirmScreen = props => {
  const {navigation, postTicket, getGeneralInformationData, getCreateTicketProgress} = props;
  const {
    t,
    i18nTicketType,
    i18nTicketName,
    i18nTicketUnit,
    i18nTicketEmail,
    i18nTicketPhone,
    i18nTicketConfirm,
    i18nTicketRequest,
    i18nTicketRequestSend,
    i18nTicketSendDetail,
    i18nTicketET,
  } = useTranslation();

  const params = navigation.getParam('params');
  const {
    title,
    quantity,
    description,
    ticketCategory,
    ticketImages,
    ticketCategoryName,
    expected_arrival_date,
  } = params;
  // console.log(params)
  // const date = `${moment().format(dateFormat.formatDateTimeString)}`;
  const date = dateFormat.formatTimeDate();
  const status = 'Submitting';
  async function onConfirm() {
    const result = await postTicket({
      title,
      // quantity,
      description,
      hashtag_id: ticketCategory,
      expected_arrival_date: dateFormat.formatDefaultDateTime(
        expected_arrival_date,
      ),
      files: ticketImages.map(({uri, ...item}) => item),
    });
    // console.log(result);
    result === true &&
      navigation.navigate('Success', {
        title: i18nTicketRequestSend,
        description: i18nTicketSendDetail,
      });
  }
  // useEffect(() => {
  //   console.log(getCreateTicketProgress)
  // }, [])

  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nTicketRequest} />
      <BackgroundImage />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.mainTitle}>{title}</Text>
            <View style={styles.headerSub}>
              <Text style={styles.date}>{date}</Text>
              <Text style={styles.status}>
                {t(`src.screens.tickers.TicketScreen.${status}`)}
              </Text>
            </View>
          </View>
          <View style={styles.titleLabel}>
            <View style={styles.titleLabelItem}>
              <Text style={styles.firstText}>{i18nTicketType}</Text>
              <Text style={styles.labelValue}>{ticketCategoryName}</Text>
            </View>
            {/* <View style={styles.labelBorder} />
            <View style={styles.titleLabelItem}>
              <Text style={styles.firstText}>{t('Quantity')}</Text>
              <Text style={styles.labelValue}>{quantity}</Text>
            </View> */}
          </View>
          <Image
            source={Images.dividerLight}
            style={{alignSelf: 'center', marginVertical: 10}}
          />
          <View style={styles.infoBox}>
            <View
              style={{
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 28,
              }}>
              <ScrollView horizontal={true}>
                {ticketImages?.map(item => (
                  <View style={{padding: 10}}>
                    <CardImage
                      style={{marginRight: 0}}
                      imageUrl={item.uri}
                      disabled={true}
                      noDelete={true}
                      fixedWidth
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.description}>{description}</Text>
            </View>
            <RowItem
              firstText={i18nTicketET}
              lastText={expected_arrival_date ? dateFormat.formatTimeDate(expected_arrival_date) : ''}
            />
            <RowItem
              firstText={i18nTicketName}
              lastText={getGeneralInformationData?.full_name}
            />
            <RowItem
              firstText={i18nTicketUnit}
              lastText={getGeneralInformationData?.unit}
            />
            <RowItem
              firstText={i18nTicketEmail}
              lastText={getGeneralInformationData?.email}
            />
            <RowItem
              firstText={i18nTicketPhone}
              lastText={getGeneralInformationData?.phone}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Button text={i18nTicketConfirm} onPress={onConfirm} />
        </View>
        {getCreateTicketProgress && <DimSpinnerView />}
      </ScrollView>
    </View>
  );
};
//
export default memo(TicketConfirmScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingBottom: 20,
  },
  box: {
    marginBottom: 20,
    marginTop: 40,
    marginHorizontal: 28,
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...ApplicationStyles.shadow.dynamicOffset(0, 4, undefined, 0.14, 5),
  },
  headerBox: {
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow.dynamicOffset(0, 4, undefined, 0.14, 5),
  },
  date: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.gray6,
  },
  status: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.gray7,
  },
  mainTitle: {
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    paddingVertical: 12,
    textAlign: 'center',
  },
  splitBorder: {
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderLeftColor: Colors.gray4,
    borderRightColor: Colors.gray4,
  },
  titleLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'center',
    paddingVertical: 18,
  },
  titleLabelItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelValue: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  infoBox: {
    paddingBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  firstText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.gray6,
    marginBottom: 15,
  },
  lastText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    paddingLeft: 10,
  },
  termBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 25,
    justifyContent: 'center',
  },
  description: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h5,
    color: Colors.gray4,
    marginHorizontal: 28,
    marginTop: 10,
    marginBottom: 20,
  },
  headerSub: {
    flexDirection: 'row',
    paddingHorizontal: 17,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  labelBorder: {
    width: 0.75,
    backgroundColor: Colors.gray6,
    height: 50,
  },
});
