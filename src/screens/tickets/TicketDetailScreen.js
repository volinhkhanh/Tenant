import _, {isEmpty} from 'lodash';
import React, {memo, useState, useEffect, useCallback} from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Stars from 'react-native-stars';
import Toast from 'react-native-simple-toast';
//
import CheckBoxSquare from '../../components/checkBox/Square';
import Button from '../../components/button';
import TextInput from '../../components/TextInput';
import AlertConfirm from '../../components/alert/AlertConfirm';
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
import CardImage from '../../components/card/CardImage';
//
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
import {ChattingIcon, NotificationHomeService, Delete} from '../../components/icons';
//
import {capitalizeFirstLetter} from '../../utils/capitalize';
import {useTranslation} from '../../context/LanguageContext';
//
import dateFormat from '../../utils/dateFormat';
import {wpc, hpc, hp} from '../../utils/responsePixel';
import {KeyboardAvoidingView} from '../utils';
import Ripple from 'react-native-material-ripple';
//
const NUM_OF_LINES = 5;
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
const TicketDetailScreen = props => {
  const {
    navigation,
    getTicket,
    postTicketReview,
    deleteTicket,
    getTicketData,
    getGeneralInformationData,
  } = props;
  const {
    id,
    uuid,
    status = 'Processing',
    completed_date,
  } = navigation?.state?.params?.params;
  const {
    t,
    i18nTicketDetail,
    i18nTicketST,
    i18nTicketName,
    i18nTicketUnit,
    i18nTicketEmail,
    i18nTicketPhone,
    i18nTicketCompleted,
    i18nTicketWDYWTC,
    i18nTicketTIIAR,
    i18nTicketTWTITL,
    i18nTicketINLNTS,
    i18nTicketOther,
    i18nTicketGoBack,
    i18nTicketTYFYF,
    i18nTicketSend,
    i18nTicketSkip,
    i18nTicketTTHBC,
    i18nTicketHWOS,
    i18nTicketDe,
    i18nTicketET,
    i18nTicketNotifyService,
    i18nTicketConfirm,
  } = useTranslation();
  const [textLine, setTextLine] = useState(NUM_OF_LINES)
  const [alertShow, setAlertShow] = useState(false);
  const [alertShow2, setAlertShow2] = useState(false);
  const [alertReviewShow, setAlertReviewShow] = useState(false);
  const [alertShow3, setAlertShow3] = useState(false);
  const [reviewReq, setReviewReq] = useState({
    review: 5,
    review_description: '',
  });
  //
  const [values, setValues] = useState([
    {
      id: 0,
      reason: i18nTicketTIIAR,
      checked: true,
    },
    {
      id: 1,
      reason: i18nTicketTWTITL,
      checked: false,
    },
    {
      id: 2,
      reason: i18nTicketINLNTS,
      checked: false,
    },
    {
      id: 3,
      reason: '',
      checked: false,
    },
  ]);
  const [reasonError, setReasonError] = useState(null);
  useEffect(() => {
    navigation.addListener('willFocus', () => {
      fetch();
    });
    fetch();
    // console.log(navigation?.state?.params?.params)
  }, []);
  //
  useEffect(() => {
    if (!alertShow) {
      setValues([
        {
          id: 0,
          reason: i18nTicketTIIAR,
          checked: true,
        },
        {
          id: 1,
          reason: i18nTicketTWTITL,
          checked: false,
        },
        {
          id: 2,
          reason: i18nTicketINLNTS,
          checked: false,
        },
        {
          id: 3,
          reason: '',
          checked: false,
        },
      ]);
    }
  }, [alertShow]);
  async function fetch() {
    await getTicket(uuid);
  }
  function formatStatus(status) {
    return status === 'NEW'
      ? 'SUBMITTED'
      : status === 'DECLINED'
      ? 'CANCELED'
      : status;
  }
  //
  // useEffect(() => {
  //   console.log(getTicketData)
  //
  const [ showMore, setShowMore ] = useState(false);
  const onTextLayout = useCallback(e => {
    setShowMore(e.nativeEvent.lines.length >= NUM_OF_LINES);
  }, []);
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nTicketDetail} />
      <BackgroundImage />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        {
          // (getTicketData?.status === 'CANCELED' ||
          // getTicketData?.status === 'DECLINED') 
          getTicketData?.delete_reason
          && (
          <View style={styles.notifyContent}>
            <Image source={NotificationHomeService} style={styles.notifyIcon} />
            <Text style={styles.notifyText} numberOfLines={textLine} onTextLayout={onTextLayout}>{getTicketData?.delete_reason}</Text>
          </View>
        )}
        {
          getTicketData?.delete_reason && showMore &&
            <Text style={styles.seeMore} onPress={() => {setTextLine(null)}}>See more</Text>
        }
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <View style={styles.headerTitleContent}>
              <View style={{flex: 1}} />
              <Text style={styles.mainTitle}>
                {getTicketData?.title}
              </Text>
              <Ripple
                style={{flex: 1, alignItems: 'flex-end'}}
                onPress={() => {
                  navigation.navigate('ChattingBox', {
                    channelUrl: getTicketData?.sendbird_channel?.channel_url,
                    channelName: getTicketData?.sendbird_channel?.channel_name,
                  });
                }}>
                <ChattingIcon size={16} />
              </Ripple>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 17,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.date}>
                {dateFormat.formatTimeDate(getTicketData?.submitted_date)}
              </Text>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      COLOR_STATUS[
                        capitalizeFirstLetter(
                          formatStatus(getTicketData?.status),
                        )
                      ],
                  },
                ]}>
                {t(
                  `src.screens.tickers.TicketScreen.${capitalizeFirstLetter(
                    formatStatus(getTicketData?.status),
                  )}`,
                )}
              </Text>
            </View>
          </View>
          <View style={styles.titleBox}>
            <View style={styles.titleLabel}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.firstText}>{i18nTicketST}</Text>
              </View>
              {/* <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.firstText}>{t('Quantity')}</Text>
              </View> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 4,
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.labelValue}>
                  {t(`src.screens.HomeScreen.${getTicketData?.hashtag?.name}`)}
                </Text>
              </View>
              {/* <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.labelValue}>
                  {getTicketData?.quantity}
                </Text>
              </View> */}
            </View>
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
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {getTicketData?.files.map(item => (
                  <View style={{paddingVertical: 10}}>
                    <CardImage
                      style={{marginHorizontal: 5}}
                      imageUrl={item?.url}
                      disabled={true}
                      noDelete={true}
                      fixedWidth
                    />
                  </View>
                ))}
              </ScrollView>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    padding: 15,
                    ...Fonts.style.captionRegular,
                    color: Colors.gray6,
                    fontSize: 14,
                  }}>
                  {getTicketData?.description}
                </Text>
              </View>
            </View>
            <RowItem
              firstText={i18nTicketET}
              lastText={getTicketData?.expected_arrival_date ? dateFormat.formatTimeDate(
                getTicketData?.expected_arrival_date
              ) : ''}
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
            {/* <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center'}}>
            <View style={{
              width: 40, height: 50,
              borderWidth: 1,
              borderColor: 'black',
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,

            }}/>
            <View style={{ borderStyle: 'dotted', borderWidth: 1, borderRadius: 1, flex: 1, height: 1}}/>
            <View style={{
              width: 40, height: 50,
              borderWidth: 1,
              borderColor: 'black',
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,

            }}/>
            </View> */}
          </View>
        </View>
        <ButtonBox
          alertShow={value => setAlertShow(value)}
          alertReviewShow={value => setAlertReviewShow(value)}
          status={capitalizeFirstLetter(status)}
          navigation={navigation}
          item={getTicketData || []}
        />
      </ScrollView>
      <AlertConfirm
        show={alertShow}
        leftText={null}
        styleContain={{marginVertical: 10}}
        rightText={i18nTicketConfirm}
        onPressCancel={() => setAlertShow(false)}
        onPressConfirm={async () => {
          if (values.find(item => item.checked).reason === '') {
            return setReasonError('Reason is not empty');
          }
          const delete_reason = values.find(item => item.checked).reason;
          const result = await deleteTicket(uuid, {delete_reason});
          result === true && (setAlertShow2(true), setAlertShow(false));
        }}>
        <KeyboardAvoidingView style={{maxHeight: hpc(350)}}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
              }}>
              {/* <ScrollView style={{maxHeight: hpc(500)}} showsVerticalScrollIndicator={false}> */}
                <Ripple style={styles.iconContent} onPress={() => {setAlertShow(false)}}>
                  <Image source={Delete} style={styles.closeIcon} />
                </Ripple>
                <Text
                  style={{
                    fontSize: Fonts.size.h4,
                    fontFamily: Fonts.type.medium,
                    marginHorizontal: 45,
                    paddingBottom: 10,
                    textAlign: 'center',
                    color: Colors.black,
                  }}>
                  {i18nTicketWDYWTC}
                </Text>
                {values.map((item, i) => (
                  <View style={{marginHorizontal: 15}}>
                    <CheckBoxSquare
                      checked={item.checked}
                      setChecked={() => {
                        setValues(preState => [
                          ...preState.map((item, idx) => ({
                            ...item,
                            checked: item.id === i,
                            reason:
                              item.id === preState.length - 1 && idx !== i
                                ? ''
                                : item.reason,
                          })),
                        ]);
                      }}
                      title={
                        <View
                          style={{
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            paddingLeft: 10,
                          }}>
                          {item.id != 3 ? (
                            <Text
                              style={{
                                ...Fonts.style.bodyRegular,
                                color: Colors.gray2,
                              }}>
                              {item.reason}
                            </Text>
                          ) : (
                            <RNTextInput
                              onChangeText={text =>
                                setValues(preState => [
                                  ...preState.map(item => ({
                                    ...item,
                                    reason: item.id === 3 ? text : item.reason,
                                  })),
                                ])
                              }
                              returnKeyType="done"
                              blurOnSubmit={true}
                              inputStyle={{
                                ...Fonts.style.bodySemibold,
                                color: Colors.textColor.black,
                                paddingTop: 12,
                              }}
                              value={values[3].reason}
                              placeholder={i18nTicketOther}
                              style={{
                                paddingBottom: 5,
                                width: wpc(250),
                                borderBottomWidth: 0.5,
                                borderBottomColor: Colors.gray6,
                              }}
                              editable={item.checked}
                              multiline={true}
                              errorText={reasonError}
                            />
                          )}
                        </View>
                      }
                    />
                  </View>
                ))}
              {/* </ScrollView> */}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </AlertConfirm>
      <AlertConfirm
        style={{width: '100%'}}
        show={alertShow2}
        close={!alertShow2}
        title={i18nTicketTTHBC}
        leftText={null}
        rightText={i18nTicketGoBack}
        onPressConfirm={() => {
          setAlertShow2(false);
          navigation.navigate('Ticket');
        }}
      />
      <AlertConfirm
        show={alertReviewShow}
        close={!alertReviewShow}
        onBackdropPress={() => setAlertReviewShow(false)}
        leftText={i18nTicketSkip}
        rightText={i18nTicketSend}
        styleContain={{marginVertical: 20}}
        onPressCancel={() => {
          postTicketReview(uuid, {review: 0, review_description: 'No review'});
          setAlertReviewShow(false);
          // navigation.navigate('Ticket')
          setAlertShow3(true);
        }}
        onPressConfirm={async () => {
          // if(reviewReq.review_description === '') {
          //   Toast.show(t('DesciptionNotEmpty'))
          // } else {
          //   const result = await postTicketReview(id, reviewReq);
          //   result === true && (setAlertReviewShow(false), setAlertShow3(true));
          // }
          const result = await postTicketReview(uuid, reviewReq);
          result === true && (setAlertReviewShow(false), setAlertShow3(true));
        }}>
        <KeyboardAvoidingView style={{maxHeight: hpc(400)}}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 25,
                alignItems: 'center',
                marginVertical: 0,
              }}>
              <View style={styles.reviewTitleContent}>
                <Text style={styles.reviewTitle}>{i18nTicketHWOS}</Text>
              </View>
              <View style={{padding: 10}}>
                {getTicketData?.files[0]?.url && (
                  <CardImage
                    imageUrl={getTicketData?.files[0]?.url}
                    disabled={true}
                    noDelete={true}
                    fixedWidth
                  />
                )}
              </View>
              {completed_date && (
                <Text style={styles.timeComplete}>
                  {`${i18nTicketCompleted} ${dateFormat.formatTimeDate(
                    completed_date,
                  )}`}
                </Text>
              )}
              <View style={styles.starDisplay}>
                <Stars
                  update={val => {
                    setReviewReq(preState => ({...preState, review: val}));
                  }}
                  half={false}
                  default={reviewReq.review}
                  spacing={10}
                  starSize={20}
                  count={5}
                  fullStar={require('../../components/icons/images/star_yellow.png')}
                  emptyStar={require('../../components/icons/images/star_gray.png')}
                />
              </View>
              <RNTextInput
                onChangeText={text =>
                  setReviewReq(preState => ({
                    ...preState,
                    review_description: text,
                  }))
                }
                returnKeyType="done"
                blurOnSubmit={true}
                value={reviewReq.review_description}
                style={styles.description}
                placeholder={i18nTicketDe}
                placeholderTextColor={Colors.gray4}
                multiline={true}
                maxLength={300}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </AlertConfirm>
      <AlertConfirm
        style={{width: '100%'}}
        show={alertShow3}
        title={i18nTicketTYFYF}
        leftText={null}
        rightText={i18nTicketGoBack}
        onPressConfirm={() => {
          setAlertShow3(false);
          navigation.goBack();
        }}
      />
    </View>
  );
};
//
const ButtonBox = props => {
  const {status, navigation, alertShow, alertReviewShow, item} = props;
  const {
    t,
    i18nTicketEdit,
    i18nTicketDelete,
    i18nTicketConfirm,
  } = useTranslation();
  //
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 25,
      }}>
      {_.includes(['Processing', 'Submitted', 'Canceled'], status) && (
        <>
          <Button
            text={i18nTicketEdit}
            style={{flex: 1, marginRight: 15}}
            onPress={() => {
              navigation.navigate('EditTicket', {item});
            }}
            disabled={
              status === 'Processing' || status === 'Canceled' ? true : false
            }
            backgroundColor={
              status === 'Processing' || status === 'Canceled'
                ? Colors.gray6
                : Colors.mainColor
            }
          />
          <Button
            backgroundColor={
              status === 'Processing' || status === 'Canceled'
                ? Colors.gray6
                : Colors.red
            }
            type={'white'}
            text={i18nTicketDelete}
            disabled={
              status === 'Processing' || status === 'Canceled' ? true : false
            }
            style={{flex: 1, marginLeft: 15}}
            onPress={() => {
              alertShow(true);
            }}
          />
        </>
      )}
      {status === 'Completed' && item?.review === null && (
        <Button
          text={i18nTicketConfirm}
          style={{flex: 1}}
          onPress={() => {
            alertReviewShow(true);
          }}
        />
      )}
    </View>
  );
};
//
export default memo(TicketDetailScreen);
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
    borderRadius: 10,
    ...ApplicationStyles.boxShadow,
  },
  headerBox: {
    paddingTop: 10,
    paddingBottom: 20,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderRadius: 20 / 2,
    backgroundColor: Colors.white,
    ...ApplicationStyles.boxShadow,
  },
  date: {
    ...Fonts.style.captionMedium,
    color: Colors.gray6,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  status: {
    ...Fonts.style.bodyMedium,
    color: Colors.purplePink,
    fontSize: 16,
  },
  mainTitle: {
    flex: 5,
    ...Fonts.style.subtitleSemibold,
    color: Colors.gray1,
    paddingVertical: 12,
    textAlign: 'center',
    fontSize: 16,
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
    color: '#000000',
    fontSize: 16,
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
    fontSize: 16,
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
  description: {
    minHeight: 70,
    width: ApplicationStyles.utils.resizeLimitedWidth(300),
    backgroundColor: 'rgba(16, 16, 16, 0.02)',
    paddingHorizontal: 12,
    marginVertical: 10,
    ...Fonts.style.captionMedium,
    color: Colors.gray2,
  },
  timeComplete: {
    fontSize: Fonts.size.h6,
    color: Colors.gray7,
    marginTop: 20,
  },
  reviewTitleContent: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray6,
    marginBottom: 20,
    paddingBottom: 10,
  },
  reviewTitle: {
    ...Fonts.style.bodyMedium,
    color: Colors.black,
    paddingHorizontal: 25,
    textAlign: 'center',
  },
  starDisplay: {
    marginVertical: 20,
  },
  headerTitleContent: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifyContent: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  notifyText: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.h4,
    color: Colors.red,
    paddingRight: 25,
    flexWrap: 'wrap',
  },
  notifyIcon: {
    width: 24,
    height: 24,
  },
  seeMore: {
    paddingTop: 10,
    paddingRight: 25,
    textAlign: 'right',
    color: Colors.gray1,
  },
  iconContent: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
  },
  closeIcon: {
    width: 30,
    height: 30,
    tintColor: Colors.mainColor
  },
});

const COLOR_STATUS = {
  Processing: Colors.mainColor,
  Completed: Colors.greenMedium,
  Submitted: Colors.gray7,
  Canceled: Colors.red,
};
