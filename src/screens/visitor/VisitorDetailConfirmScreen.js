import React, {memo} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import moment from 'moment';
//
import Button from '../../components/button';
import MainHeader from '../../components/MainHeader';
import BackgroundImage from '../../components/BackgroundImage';
//
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
import {useTranslation} from '../../context/LanguageContext';
import {capitalizeFirstLetter} from '../../utils/capitalize';
import dateFormat from '../../utils/dateFormat'
//
const RowItem = props => {
  const {firstText, lastText} = props;
  return (
    <View style={styles.item}>
      <Text style={styles.firstText}>{firstText}</Text>
      <Text style={styles.lastText}>{lastText}</Text>
    </View>
  );
};
//
const VisitorDetailConfirmScreen = props => {
  const {navigation, getGeneralInformationData, postVisitor} = props;
  const {
    t,
    i18nVisitorRe,
    i18nVisitorCI,
    i18nVisitorCO,
    i18nVisitorNa,
    i18nVisitorUn,
    i18nVisitorEm,
    i18nVisitorPh,
    i18nVisitorCo,
    i18nVisitorTYFIUA,
    i18nVisitorNS,
    i18nVisitorVC,
  } = useTranslation();
  const values = navigation.getParam('values');
  // console.log('🏄🏻‍♂️', values, JSON.stringify(getGeneralInformationData, null, 2));

  async function onConfirm() {
    const params = {
      // unit: getGeneralInformationData?.unit_id,
      full_name: values?.full_name,
      phone_number: values?.phone_number,
      id_card: values?.id_card,
      check_in: dateFormat.formatDefaultDateTime(values?.check_in),
      check_out: dateFormat.formatDefaultDateTime(values?.check_out),
      reason: values?.reason,
      note: values?.note,
    };
    console.log(params)
    const result = await postVisitor(params);
    result === true &&
      navigation.navigate('Success', {
        title: i18nVisitorNS,
        description: i18nVisitorTYFIUA,
      });
  }
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nVisitorVC} />
      <BackgroundImage />
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.mainTitle}>{values?.full_name}</Text>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 17,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.phone}>{values?.phone_number}</Text>
              <Text style={styles.status}>ID: {values?.id_card}</Text>
            </View>
          </View>
          <View style={styles.titleBox}>
            <View style={styles.titleLabel}>
              <View style={{flex: 1, alignItems: 'center', paddingLeft: 1}}>
                <Text style={styles.firstText}>{i18nVisitorRe}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  ...styles.splitBorder,
                }}>
                <Text style={styles.firstText}>{i18nVisitorCI}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', paddingRight: 1}}>
                <Text style={styles.firstText}>{i18nVisitorCO}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 4,
                alignItems: 'center',
                // paddingHorizontal: 10,
              }}>
              <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>
                  {values?.reason
                    ? t(`src.screens.visitor.VisitorScreen.${values?.reason}`)
                    : ''}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>
                  {values?.check_in ? dateFormat.formatDateTimeVisitor(values?.check_in) : ''}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>
                  {values?.check_out ? dateFormat.formatDateTimeVisitor(values?.check_out) : ''}
                </Text>
              </View>
            </View>
          </View>
          <Image
            source={Images.visitor}
            style={{
              alignSelf: 'center',
              marginTop: 20,
              height: 80,
              width: 80,
            }}
          />
          <View style={styles.infoBox}>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: 20,
              }}>
              <Text
                style={{
                  padding: 15,
                  ...Fonts.style.captionRegular,
                  color: Colors.gray4,
                }}>
                {values?.note}
              </Text>
            </View>
            <RowItem
              firstText={i18nVisitorNa}
              lastText={getGeneralInformationData?.full_name}
            />
            <RowItem
              firstText={i18nVisitorUn}
              lastText={getGeneralInformationData?.unit}
            />
            <RowItem
              firstText={i18nVisitorEm}
              lastText={getGeneralInformationData?.email}
            />
            <RowItem
              firstText={i18nVisitorPh}
              lastText={getGeneralInformationData?.phone}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContent}>
        <Button
          text={i18nVisitorCo}
          textstyle={{paddingHorizontal: 30}}
          onPress={onConfirm}
        />
      </View>
    </View>
  );
};
//
export default memo(VisitorDetailConfirmScreen);
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
    marginTop: 24,
    marginHorizontal: 28,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...ApplicationStyles.shadow.dynamicOffset(0, 4, undefined, 0.14, 5),
  },
  headerBox: {
    paddingTop: 10,
    paddingBottom: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow.dynamicOffset(0, 4, undefined, 0.14, 5),
  },
  phone: {
    ...Fonts.style.captionMedium,
    color: Colors.gray2,
  },
  status: {
    ...Fonts.style.bodyMedium,
    color: Colors.gray2,
  },
  mainTitle: {
    ...Fonts.style.subtitleSemibold,
    color: Colors.gray1,
    paddingVertical: 12,
    textAlign: 'center',
  },
  titleBox: {
    paddingTop: 16,
  },
  splitBorder: {
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderLeftColor: Colors.gray4,
    borderRightColor: Colors.gray4,
  },
  titleLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  labelValue: {
    ...Fonts.style.bodySemibold,
    color: Colors.gray1,
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
    ...Fonts.style.bodySemibold,
    color: Colors.gray4,
  },
  lastText: {
    ...Fonts.style.bodyMedium,
    color: Colors.gray2,
  },
  termBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 25,
    justifyContent: 'center',
    paddingBottom: ApplicationStyles.utils.resizeLimitedHeight(50),
  },
  buttonContent: {
    width: '100%',
    paddingVertical: 30,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    ...ApplicationStyles.shadow.dynamicOffset(1, 4, undefined, 0.15, 8),
  },
});
