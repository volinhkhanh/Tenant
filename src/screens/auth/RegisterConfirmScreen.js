import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import moment from 'moment';
//
import FullButton from '../../components/FullButton';
import OutlineButton from '../../components/OutlineButton';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
import ImageProgress from '../../components/ImageProgress';
//
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
//
import dateFormat from '../../utils/dateFormat';
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
const RegisterConfirmScreen = props => {
  const {navigation, postRegister, getRegisterInProgress} = props;
  //
  const {
    t,
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
  } = useTranslation();
  //
  const {params, firstIdc, secondIdc, contract} = navigation.state.params;
  const goBack = () => navigation.goBack();
  const {data = {}} = props;
  const {
    title = i18nRegisterConfirm,
    date = `${moment().format(dateFormat.formatTimeDateString)}`,
    description = i18nRegisterPleaseMakeSure,
  } = data;
  // useEffect(() => {
  //   console.log(navigation.state.params)
  // }, [])
  //
  const register = async () => {
    const paramRegister = {
      first_name: params.first_name,
      last_name: params.last_name,
      phone: params.phone,
      id_card: params.id_card,
      apartment_id: '1',
      building_id: params.building_id.id,
      unit_id: params.unit_id.id,
      country_id: params.country_id.id,
      email: params.email,
      password: params.password,
      gender: params.gender.id,
      is_owner: params.is_owner,
      rent_start_date: params?.rent_start_date ? params.rent_start_date + 'T00:00:00.000Z' : null,
        // ? dateFormat.formatDefaultDateTime(params.rent_start_date)
        // : '',
      rent_end_date: params?.rent_end_date ? params.rent_end_date + 'T00:00:00.000Z' : null,
        // ? dateFormat.formatDefaultDateTime(params.rent_end_date)
        // : '',
      birthday: params.birthday + 'T00:00:00.000Z',
      id_card_images: [firstIdc, secondIdc],
      contract_files: contract,
    };
    // const formdata = new FormData();
    // formdata.append("firstName", params.first_name)
    // formdata.append("lastName", params.last_name)
    // formdata.append("phoneNumber", params.phone)
    // formdata.append("idCard", params.id_card)
    // formdata.append("building", params.building_id.id)
    // formdata.append("unit", params.unit_id.id)
    // formdata.append("country", params.country_id.id)
    // formdata.append("email", params.email)
    // formdata.append("gender", params.gender)
    // formdata.append("birthday", params.birthday)
    // formdata.append("isOwner", params.is_owner == false ? '0' : '1')
    // formdata.append("rentStartDate", params.rent_start_date)
    // formdata.append("rentEndDate", params.rent_end_date)
    // formdata.append("idCardImages[]", navigation.state.params?.firstIdc, navigation.state.params.firstIdc.fileName)
    // formdata.append("idCardImages[]", navigation.state.params?.secondIdc, navigation.state.params.secondIdc.fileName)
    // navigation.state.params?.contract.map(item => {
    //   formdata.append("contractImages[]", item, item.fileName)
    // })
    // console.log(formdata)
    const data = await postRegister(t, paramRegister);
    if (data) {
      navigation.navigate('RegisterSuccess');
    }
  };
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={title} />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.mainTitle}>{i18nRegisterOnlineRegister}</Text>
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
                // alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                marginHorizontal: 15,
              }}>
              <Text
                style={{
                  padding: 10,
                  fontSize: Fonts.size.h5,
                  fontFamily: Fonts.type.base,
                  color: Colors.gray7,
                }}>
                {description}
              </Text>
              <View style={styles.idCartContent}>
                <View style={styles.imageContent}>
                  <ImageProgress
                    source={{uri: firstIdc?.uri}}
                    imageStyle={{borderRadius: 10}}
                    style={styles.image}
                  />
                  {/* <Image source={{uri: firstIdc?.uri}} style={styles.image} /> */}
                </View>
                <View style={styles.imageContent}>
                  <ImageProgress
                    source={{uri: secondIdc?.uri}}
                    imageStyle={{borderRadius: 10}}
                    style={styles.image}
                  />
                  {/* <Image source={{uri: secondIdc?.uri}} style={styles.image} /> */}
                </View>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <Text
                  style={{
                    width: '100%',
                    height: 0.5,
                    backgroundColor: '#ccc',
                    marginVertical: 15,
                  }}
                />
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.idContract}>
                {contract?.map(item => {
                  return (
                    <View style={styles.imageContent}>
                      <ImageProgress
                        source={{uri: item?.uri}}
                        imageStyle={{borderRadius: 10}}
                        style={styles.image}
                      />
                      {/* <Image source={{uri: item?.uri}} style={styles.image} /> */}
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <RowItem
              firstText={i18nRegisterFullName}
              lastText={`${params?.first_name} ${params?.last_name}`}
            />
            <RowItem
              firstText={i18nRegisterCountryOfOrigin}
              lastText={params?.country_id.name}
            />
            <RowItem
              firstText={i18nRegisterGender}
              lastText={t(`src.screens.auth.RegisterScreen.${params?.gender?.name}`)}
            />
            <RowItem
              firstText={i18nRegisterDOB}
              lastText={dateFormat.formatDate(params?.birthday)}
            />
            <RowItem firstText={i18nRegisterPhone} lastText={params?.phone} />
            <RowItem firstText={i18nRegisterEmail} lastText={params?.email} />
            <RowItem firstText={i18nRegisterIdPassportNo} lastText={params?.id_card} />
            <RowItem
              firstText={i18nRegisterApartment}
              lastText={params?.building_id?.name}
            />
            <RowItem firstText={i18nRegisterUnit} lastText={params?.unit_id?.name} />
            {/* <RowItem firstText={'Period of residence'} lastText={'2020/01/01'} /> */}
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
          onPress={() => register()}
        />
      </View>
      {getRegisterInProgress && <DimSpinnerView />}
    </View>
  );
};
//
export default memo(RegisterConfirmScreen);
//
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
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
    ...ApplicationStyles.shadow.dynamicOffset(0, 4, undefined, 0.14, 5),
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
    ...ApplicationStyles.shadow.dynamicOffset(0, 4, undefined, 0.14, 5),
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
    fontSize: Fonts.size.h5,
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
    ...ApplicationStyles.shadow.dynamicOffset(0, -4, undefined, 0.15, 4),
  },
  submitBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 30,
    // height: ApplicationStyles.utils.resizeHeight(140),
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
  idCartContent: {
    flexDirection: 'row',
    marginHorizontal: 10,
    // marginBottom: 20,
  },
  imageContent: {
    ...ApplicationStyles.shadow.dynamicOffset(1, 1, Colors.black, 0.15, 4),
  },
  image: {
    height: 88,
    width: 88,
    marginRight: 15,
    borderRadius: 10,
  },
  idContract: {
    marginHorizontal: 10,
    flexDirection: 'row',
  },
});
