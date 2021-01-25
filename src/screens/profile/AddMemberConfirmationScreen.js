import React, {memo, useEffect, useState} from 'react';
import moment from 'moment';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
//
import FullButton from '../../components/FullButton';
import OutlineButton from '../../components/OutlineButton';
import MainHeader from '../../components/MainHeader';
import CardImage from '../../components/card/CardImage';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import dateFormat from '../../utils/dateFormat';
//
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
//
import {useTranslation} from '../../context/LanguageContext';
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
const AddMemberConfirmationScreen = props => {
  const {
    navigation,
    postAddMember,
    getAddMemberProgress,
    getAddMemberData,
    getGeneralInformationData,
  } = props;
  //
  const {
    t,
    i18nAddMemberAM,
    i18nAddMemberMa,
    i18nAddMemberFe,
    i18nRegisterCountryOfOrigin,
    i18nRegisterGender,
    i18nRegisterDOB,
    i18nRegisterPhone,
    i18nRegisterEmail,
    i18nRegisterIdPassportNo,
    i18nRegisterUnit,
    i18nRegisterCancel,
    i18nRegisterOnlineRegister,
    i18nRegisterPleaseMakeSure,
    i18nRegisterFullName,
    i18nRegisterApartment,
    i18nRegisterConfirm,
    i18nRegisterConfirmation,
    i18nRegisterRequestSent,
    i18nRegisterWeHaveReceived,
  } = useTranslation();
  //
  const params = navigation.state.params;
  // console.log(params);
  const goBack = () => navigation.goBack();
  const {data = {}} = props;
  const {
    title = i18nAddMemberAM,
    date = dateFormat.formatTimeDate(Date.now()),
    description = i18nRegisterPleaseMakeSure,
  } = data;
  //
  const submitConfirm = async () => {
    const paramRegister = {
      first_name: params.first_name,
      last_name: params.last_name,
      phone: params.phone,
      id_card: params.id_card,
      apartment_id: '1',
      building_id: params.building_id,
      country_id: params.country.id,
      email: params.email,
      gender: params.gender.id,
      birthday: dateFormat.formatDefaultDateTime(params.birthday),
      id_card_images: [params.imageFirst, params.imageSecond],
    };
    // params.country_id = countryId
    // delete params['imageFirst']
    // delete params['imageSecond']
    // const formdata = new FormData();
    // formdata.append("firstName", params.first_name)
    // formdata.append("lastName", params.last_name)
    // formdata.append("phoneNumber", params.phone)
    // formdata.append("idCard", params.id_card)
    // formdata.append("unit", String(getGeneralInformationData.unit_id))
    // formdata.append("country", params.country_id.id)
    // formdata.append("email", params.email)
    // formdata.append("gender", params.gender)
    // formdata.append("birthday", params.birthday)
    // formdata.append("idCardImages[]", params.imageFirst, params.imageFirst.fileName)
    // formdata.append("idCardImages[]", params.imageSecond, params.imageSecond.fileName)
    const data = await postAddMember(paramRegister, t);
    if (data) {
      navigation.navigate('Success', {
        title: i18nRegisterRequestSent,
        // description: t('RegisterSuccessDes') }
        description: i18nRegisterWeHaveReceived,
      });
    }
  };
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nRegisterConfirmation} />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.mainTitle}>{title}</Text>
            <View
              style={{
                paddingHorizontal: 17,
                alignItems: 'center',
              }}>
              <Text style={styles.date}>{date}</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}>
              <Text
                style={{
                  padding: 15,
                  fontSize: Fonts.size.h5,
                  fontFamily: Fonts.type.base,
                  color: Colors.gray7,
                }}>
                {description}
              </Text>
              <View style={styles.imageContent}>
                {params?.imageFirst && (
                  <CardImage
                    size="M"
                    imageUrl={params?.imageFirst.uri || ''}
                    fixedWidth
                    noDelete
                    disabled={params?.imageFirst ? true : false}
                  />
                )}
                {params?.imageSecond && (
                  <CardImage
                    size="M"
                    imageUrl={params?.imageSecond.uri || ''}
                    fixedWidth
                    noDelete
                    disabled={params?.imageSecond ? true : false}
                  />
                )}
              </View>
            </View>
            <RowItem
              firstText={i18nRegisterFullName}
              lastText={`${params?.first_name} ${params?.last_name}`}
            />
            <RowItem
              firstText={i18nRegisterCountryOfOrigin}
              lastText={params?.country?.name}
            />
            <RowItem
              firstText={i18nRegisterGender}
              lastText={params?.gender?.name === 'Male' ? i18nAddMemberMa : i18nAddMemberFe}
            />
            <RowItem
              firstText={i18nRegisterDOB}
              lastText={dateFormat.formatDate(params?.birthday)}
            />
            <RowItem firstText={i18nRegisterPhone} lastText={params?.phone} />
            <RowItem firstText={i18nRegisterEmail} lastText={params?.email} />
            <RowItem
              firstText={i18nRegisterApartment}
              lastText={getGeneralInformationData?.apartment}
            />
            <RowItem
              firstText={i18nRegisterUnit}
              lastText={getGeneralInformationData?.unit}
            />
            {/* <RowItem firstText={t('PeriodOfResidence')} lastText={'2020/01/01'} /> */}
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitBox}>
        <OutlineButton
          style={styles.cancelButton}
          title={i18nRegisterCancel}
          onPress={goBack}
        />
        <FullButton
          style={styles.submitButton}
          title={i18nRegisterConfirm}
          onPress={submitConfirm}
        />
      </View>
      {/* {getAddMemberProgress && <DimSpinnerView />} */}
    </View>
  );
};
//
export default memo(AddMemberConfirmationScreen);
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
    flex: 1,
    marginTop: 24,
    marginHorizontal: 28,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderRadius: 10,
    ...ApplicationStyles.boxShadow,
  },
  titleText: {
    ...Fonts.style.largeTitle,
    color: Colors.gray1,
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
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray6,
  },
  status: {
    ...Fonts.style.bodyMedium,
    color: Colors.purplePink,
  },
  mainTitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
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
    color: Colors.gray7,
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
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    ...ApplicationStyles.boxShadow,
  },
  submitBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    height: ApplicationStyles.utils.resizeHeight(120),
    ...ApplicationStyles.boxShadow,
  },
  submitButton: {
    flex: 1,
    marginHorizontal: ApplicationStyles.utils.resizeHeight(8),
  },
  cancelButton: {
    flex: 1,
    marginHorizontal: ApplicationStyles.utils.resizeHeight(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  leftArrow: {
    paddingVertical: 10,
    width: 20,
  },
  imageContent: {
    flexDirection: 'row',
  },
});
