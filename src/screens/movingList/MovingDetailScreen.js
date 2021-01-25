import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//
import MainHeader from '../../components/MainHeader';
import BackgroundImage from '../../components/BackgroundImage';
import CardImage from '../../components/card/CardImage';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
//
import dateFormat from '../../utils/dateFormat';
import {capitalizeFirstLetter} from '../../utils/capitalize';
//
import {useTranslation} from '../../context/LanguageContext';
//
import {MyProgressSteps} from '../../components/MyProgressSteps';
import Button from '../../components/button';
//
const RowItem = (props) => {
  const {firstText, lastText} = props;
  return (
    <View style={styles.item}>
      <Text style={styles.firstText}>{firstText}</Text>
      <Text style={styles.lastText}>{lastText}</Text>
    </View>
  );
};
//
const MovingDetailScreen = (props) => {
  const {
    navigation,
    getMovingDetail,
    getMovingDetailData,
    getMovingDetailProgress,
    getGeneralInformationData,
    setMovingDetailData,
    postCreateFurnitureMoving,
    putUpdateMovingRequest
  } = props;
  //
  const {
    t,
    i18nMovingListAp,
    i18nMovingListRe,
    i18nMovingListSu,
    i18nMovingListIt,
    i18nMovingListRD,
    i18nMovingListQu,
    i18nMovingListNa,
    i18nMovingListUn,
    i18nMovingListEm,
    i18nMovingListPh,
    i18nMovingListFu,
    i18nMovingListMoOu,
    i18nMovingListMd,
    i18nMovingListPMSUOIB,
    i18nMovingListRS,
    i18nMovingListYRWBTI,
    i18nMovingListCo,
    i18nMovingListBo,
    i18nMovingListB,
    i18nMovingListC,
    i18nMovingListCed,
    i18nMovingListSui,
    i18nMovingListAbo,
    i18nMovingListMar,
    i18nTicketEdit,
    i18nVisitorCa,
    i18nMovingListS,
    i18nTicketRequest,
    i18nMovingListMAF,
  } = useTranslation();
  //
  const [movingDetail, setMovingDetail] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [currentState, setCurrentState] = useState('APPROVED');
  const stateParams = navigation?.state?.params
  //
  useEffect(() => {
    if(stateParams?.params) {
      setCurrentState('REJECTED')
      setMovingDetail(stateParams?.params);
    } else {
      getMovingDetail(stateParams);
    }
    setUserInfo(getGeneralInformationData);
    return () => {
      setMovingDetailData(null)
    }
  }, []);
  //
  useEffect(() => {
    if (getMovingDetailData) {
      setMovingDetail(getMovingDetailData);
      setCurrentState(getMovingDetailData?.status)
    }
  }, [getMovingDetailData]);
  //
  const submitMoving = async() => {
    let data = false
    // console.log(stateParams?.params)
    if(stateParams?.uuid) {
      data = await putUpdateMovingRequest(stateParams?.uuid, {...stateParams?.params, status: stateParams?.status});
    } else {
      data = await postCreateFurnitureMoving(stateParams?.params);
    }
    if(data) {
      // console.log(stateParams)
      // !!stateParams?.uuid && console.log('fsdfdsf')
      !stateParams?.uuid && AsyncStorage.removeItem('moving-list');
      navigation.navigate('Success', {
        title: i18nMovingListRS,
        description: i18nMovingListYRWBTI,
      });
    }
  }
  //
  const renderStatus = (item) => {
    switch (item) {
      case 'APPROVED':
        return {text: i18nMovingListAp, color: Colors.mainColor};
      case 'REJECTED':
        return {text: i18nMovingListRe, color: '#F0443C'};
      case 'BOOKED':
        return {text: i18nMovingListBo, color: '#3F7BD3'};
      case 'SUBMITTED':
        return {text: i18nMovingListSu, color: Colors.mainColor};
      case 'SUBMITTING':
        return {text: i18nMovingListSui, color: Colors.mainColor};
      default:
        return {text: i18nMovingListCo, color: Colors.gray2};
    }
  };
  //
  const steps = [
    {
      id: 1,
      status: 'SUBMITTED',
      name: i18nMovingListSui,
      finishName: i18nMovingListSu,
      finish: true,
      detail: true,
    },
    {
      id: 2,
      status: 'APPROVED',
      name: i18nMovingListAbo,
      finishName: i18nMovingListAp,
      finish: true,
      detail: true,
    },
    {
      id: 3,
      status: 'BOOKED',
      name: i18nMovingListB,
      finishName: i18nMovingListBo,
      finish: true,
      detail: true,
    },
    {
      id: 4,
      status: 'ADMIN_CONFIRMED',
      name: i18nMovingListC,
      finishName: i18nMovingListCed,
      finish: true,
      detail: true,
    },
  ];

  function handleMakeAReservation() {
    navigation.navigate('MovingReservation', {movingDetail});
  }

  const EditMoving = () => {
    navigation.replace('MovingCreate', {data: movingDetail});
  }

  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        disableBackBtn={stateParams?.params ? true : false}
        title={
          // t('RequestDetail')
          stateParams?.params ? i18nTicketRequest : i18nMovingListRD
        }
      />
      <BackgroundImage />

      <ScrollView
        contentContainerStyle={styles.contentScroll}
        style={{marginBottom: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.stepBox}>
          <MyProgressSteps show value={currentState} data={steps} />
        </View>

        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.mainTitle}>
              {movingDetail?.type === 'MOVE_FURNITURE' ? i18nMovingListMAF : i18nMovingListMoOu}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 17,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.date}>
                {dateFormat.formatTimeDate(movingDetail?.updated_at)}
              </Text>
              <Text style={[styles.status, {color: stateParams?.params ? renderStatus('SUBMITTING').color : renderStatus(movingDetail?.status).color}]}>
                {stateParams?.params ? renderStatus('SUBMITTING').text : renderStatus(movingDetail?.status).text}
              </Text>
            </View>
          </View>
          <Text style={styles.rejected_reason}>{movingDetail?.rejected_reason}</Text>
          <View style={styles.moveDateContent}>
            <Text style={styles.moveLabel}>{i18nMovingListMd}</Text>
            <Text  style={styles.moveDate}>{dateFormat.formatDate(movingDetail?.move_out_date)}</Text>
          </View>
          {
            movingDetail?.moving_request_items?.map(item => {
              return (
                <View style={styles.titleBox}>
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
                      <Text style={styles.labelValue}>
                        {/* {movingDetail?.type?.split('_').join(' ')} */}
                        {item?.name}
                      </Text>
                    </View>
                    <View style={styles.itemLabelInfo}>
                      <Text style={styles.labelValue}>
                        {item?.quantity | 0}
                      </Text>
                    </View>
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
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 5,
                    }}>
                    <Text
                      style={{
                        paddingBottom: 15,
                        ...Fonts.style.captionRegular,
                        color: Colors.gray4,
                      }}>
                      {item?.description}
                    </Text>
                  </View>
                </View>
              )
            })
          }
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                paddingVertical: 17,
                ...Fonts.style.captionRegular,
                color: Colors.gray7,
              }}>
              {i18nMovingListPMSUOIB}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <RowItem
              firstText={
                i18nMovingListNa
              }
              lastText={userInfo?.owner?.full_name}
            />
            <RowItem
              firstText={
                i18nMovingListUn
              }
              lastText={userInfo?.owner?.unit}
            />
            <RowItem
              firstText={
                i18nMovingListEm
              }
              lastText={userInfo?.owner?.email}
            />
            <RowItem
              firstText={
                i18nMovingListPh
              }
              lastText={userInfo?.owner?.phone}
            />
          </View>
        </View>
        {movingDetail?.status === 'APPROVED' && (
          <View style={styles.saveBox}>
            <Button
              text={i18nMovingListMar}
              type="default"
              onPress={handleMakeAReservation}
            />
          </View>
        )}
        {movingDetail?.status === 'REJECTED' && (
          <View style={styles.saveBox}>
            <Button
              text={i18nTicketEdit}
              type="default"
              onPress={EditMoving}
            />
          </View>
        )}
        {stateParams?.params && (
          <View style={styles.buttonBox}>
            <Button
              text={i18nTicketEdit}
              style={styles.cancelButton}
              backgroundColor="white"
              type="main"
              onPress={() => navigation.pop()}
            />
            <Button
              text={i18nMovingListS}
              type="default"
              style={styles.submitButton}
              onPress={submitMoving}
            />
          </View>
        )}
      </ScrollView>
      {getMovingDetailProgress && <DimSpinnerView />}
    </View>
  );
};
//
export default memo(MovingDetailScreen);
//
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
    color: Colors.gray6,
  },
  status: {
    ...Fonts.style.bodyMedium,
    color: Colors.gray2,
    // textTransform: 'uppercase',
  },
  mainTitle: {
    ...Fonts.style.subtitleSemibold,
    color: Colors.gray1,
    paddingVertical: 12,
    textAlign: 'center',
    // textTransform: 'uppercase',
  },
  titleBox: {
    paddingTop: 16,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray7,
    marginHorizontal: 26,
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
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.gray6,
  },
  lastText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.regular,
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
  saveBox: {
    marginTop: 20,
    marginHorizontal: 28,
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
  moveDateContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 27,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray7,
  },
  moveLabel: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.gray6,
  },
  moveDate: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  buttonBox: {
    marginTop: 30,
    flexDirection: 'row',
    marginHorizontal: 26,
  },
  cancelButton: {
    flex: 1,
    marginRight: 15,
    borderColor: '#F6CA13',
    borderWidth: 1,
  },
  submitButton: {
    flex: 1,
  },
  rejected_reason: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    color: '#F0443C',
    paddingHorizontal: 26,
    paddingTop: 15,
  },
});
