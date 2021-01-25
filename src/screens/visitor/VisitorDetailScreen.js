import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import moment from 'moment';
//
import Button from '../../components/button';
import AlertConfirm from '../../components/alert/AlertConfirm';
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
//
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
import {useTranslation} from '../../context/LanguageContext';
import dateFormat from '../../utils/dateFormat';
import {capitalizeFirstLetter} from '../../utils/capitalize';
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
const VisitorDetailScreen = props => {
  const {
    navigation,
    getVisitor,
    getVisitorData,
    deleteVisitor,
    getGeneralInformationData,
  } = props;
  const {
    t,
    i18nVisitorMa,
    i18nVisitorVis,
    i18nVisitorDe,
    i18nVisitorVI,
    i18nVisitorRe,
    i18nVisitorCI,
    i18nVisitorCO,
    i18nVisitorNa,
    i18nVisitorUn,
    i18nVisitorEm,
    i18nVisitorPh,
    i18nVisitorDel,
    i18nVisitorRes,
    i18nVisitorCa,
    i18nVisitorCo,
    i18nVisitorDYWTDT,
    i18nVisitorDYWTSA,
    i18nVisitorPFOTIB,
    i18nVisitorSR,
    i18nVisitorMDOTV,
    i18nVisitorTYFIUA,
  } = useTranslation();
  const {uuid} = navigation?.state?.params;
  const [alertShow, setAlertShow] = useState(false);
  const [alertShow2, setAlertShow2] = useState(false);

  useEffect(() => {
    navigation.addListener('willFocus', () => {
      getVisitor(uuid);
    });
    getVisitor(uuid);
  }, []);
  // useEffect(() => {
  //   console.log(getVisitorData);
  // }, [getVisitorData]);

  async function onPressDelete() {
    result = await deleteVisitor(uuid);
    result === true && (setAlertShow2(false), navigation.goBack());
  }

  function onPressConfirm() {
    setAlertShow(false);
    navigation.navigate('VisitorFullFillCreate', {
      visitor: getVisitorData,
    });
  }
  //
  // const renderStatus = item => {
  //   switch (item) {
  //     case 'Maintenance':
  //       return i18nVisitorMa;
  //     case 'Visit':
  //       return i18nVisitorVis;
  //     default:
  //       return i18nVisitorDe;
  //   }
  // };
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('VisitorInformation')
          i18nVisitorVI
        }
      />
      <BackgroundImage />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.mainTitle}>{getVisitorData?.full_name}</Text>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 17,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.phone}>{getVisitorData?.phone_number}</Text>
              <Text style={styles.status}>ID: {getVisitorData?.id_card}</Text>
            </View>
          </View>
          <View style={styles.titleBox}>
            <View style={styles.titleLabel}>
              <View style={{flex: 1, alignItems: 'center', paddingLeft: 1}}>
                <Text style={styles.firstText}>
                  {/* {t('Reason')} */}
                  {i18nVisitorRe}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  ...styles.splitBorder,
                }}>
                <Text style={styles.firstText}>
                  {/* {t('CheckIn')} */}
                  {i18nVisitorCI}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', paddingRight: 1}}>
                <Text style={styles.firstText}>
                  {/* {t('CheckOut')} */}
                  {i18nVisitorCO}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 4,
                alignItems: 'center',
                // paddingHorizontal: 10,
              }}>
              <View
                style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>
                  {/* {getVisitorData?.reason} */}
                  {/* {getVisitorData?.reason
                    ? t(
                        `src.screens.visitor.VisitorCreateScreen.${capitalizeFirstLetter(
                          getVisitorData?.reason,
                        )}`,
                      )
                    : ''} */}
                  {getVisitorData?.reason
                    // ? renderStatus(getVisitorData?.reason)
                    ? t(`src.screens.visitor.VisitorScreen.${getVisitorData?.reason}`)
                    : ''}
                </Text>
              </View>
              <View
                style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>
                  {getVisitorData?.check_in
                    ? dateFormat.formatDateTimeVisitor(getVisitorData?.check_in)
                    : ''}
                </Text>
              </View>
              <View
                style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>
                  {getVisitorData?.check_out
                    ? dateFormat.formatDateTimeVisitor(
                        getVisitorData?.check_out,
                      )
                    : ''}
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
                {getVisitorData?.note}
              </Text>
            </View>
            <RowItem
              firstText={
                // t('Name')
                i18nVisitorNa
              }
              lastText={getGeneralInformationData?.full_name}
            />
            <RowItem
              firstText={
                // t('Unit')
                i18nVisitorUn
              }
              lastText={getGeneralInformationData?.unit}
            />
            <RowItem
              firstText={
                // 'Email'
                i18nVisitorEm
              }
              lastText={getGeneralInformationData?.email}
            />
            <RowItem
              firstText={
                // t('PhoneNumber')
                i18nVisitorPh
              }
              lastText={getGeneralInformationData?.phone}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContent}>
        <Button
          backgroundColor={Colors.red}
          type={'white'}
          text={
            // t('Delete')
            i18nVisitorDel
          }
          style={styles.button}
          onPress={() => {
            setAlertShow2(true);
          }}
        />
        <Button
          text={
            // t('Resend')
            i18nVisitorRes
          }
          style={styles.button}
          onPress={() => {
            setAlertShow(true);
          }}
        />
      </View>
      <AlertConfirm
        title={
          // t('DoYouWantToDeleteThisVisitorFromTheList')
          i18nVisitorDYWTDT
        }
        leftText={
          // t('Cancel')
          i18nVisitorCa
        }
        rightText={
          // t('Delete')
          i18nVisitorDel
        }
        show={alertShow2}
        onPressCancel={() => setAlertShow2(false)}
        onPressConfirm={onPressDelete}
      />
      <AlertConfirm
        title={
          // t('DoYouWantToSendAnotherNoticeUsingThisVisitorInformation')
          i18nVisitorDYWTSA
        }
        show={alertShow}
        leftText={
          // t('Cancel')
          i18nVisitorCa
        }
        rightText={
          // t('Confirm')
          i18nVisitorCo
        }
        onPressCancel={() => setAlertShow(false)}
        onPressConfirm={onPressConfirm}
      />
    </View>
  );
};
//
export default memo(VisitorDetailScreen);
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
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
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
    textAlign: 'center',
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
  },
  lastText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.black,
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
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    ...ApplicationStyles.shadow.dynamicOffset(1, 4, undefined, 0.15, 8),
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});
