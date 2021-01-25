import React, {memo, useState, useEffect} from 'react';
import _ from 'lodash';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import numeral from 'numeral';
import Ripple from 'react-native-material-ripple';
//
import {
  Workplace,
  User,
  Birthday,
  Phone,
  AddUser,
  Key,
} from '../../components/icons';
//
import {Images, ApplicationStyles, Colors, Fonts} from '../../themes';
//
import MainHeader from '../../components/MainHeader';
import BackgroundImage from '../../components/BackgroundImage';
import ImageProgress from '../../components/ImageProgress';
import DimSpinnerView from '../../components/DimSpinnerView';
import AlertConfirm from '../../components/alert/AlertConfirm';
//
import Layouts from '../../constants/Layouts';
//
import {useTranslation} from '../../context/LanguageContext';
import dateFormat from '../../utils/dateFormat';
//
const {width} = Layouts;

function ProfileSettingScreen(props) {
  const {
    navigation,
    getTenantList,
    getTenantListData,
    getTenantListProgress,
    getGeneralInformationData,
    getListTransportation,
    listTransportationData,
    getListTransportationProgress,
    getContractListProgress,
    contractListData,
    getContract,
  } = props;
  //
  const {
    t,
    i18nProfileSettingPD,
    i18nProfileSettingBC,
    i18nProfileSettingMe,
    i18nProfileSettingVI,
    i18nProfileSettingAd,
    i18nProfileSettingCI,
    i18nProfileSettingRT,
    i18nProfileSettingU,

    i18nProfileSettingBi,
    i18nProfileSettingMot,
    i18nProfileSetting4,
    i18nProfileSetting7,
    i18nViewProfileOHTCUT,
  } = useTranslation();
  //
  const [memberData, setMemberData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [generalInfo, setGeneralInfo] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  //
  const renderMember = (item, index) => {
    return (
      <Ripple
        style={[
          styles.cart,
          styles.cartMemberItem,
          index % 2 == 0 && styles.cartMemberItemLeft,
        ]}
        onPress={() => {
          navigation.navigate('ViewProfile', {
            uuid: item.uuid,
            member: true,
          });
        }}>
        <View style={styles.memberItemRow}>
          <Image source={User} style={styles.memberItemIcon} />
          <Text style={styles.memberItemName}>{item.name}</Text>
        </View>
        <View style={styles.memberItemRow}>
          <Image source={Birthday} style={styles.memberItemIcon} />
          <Text style={styles.memberItemDob}>
            {item.birthday ? dateFormat.formatDate(item.birthday) : ''}
          </Text>
        </View>
        <View style={styles.memberItemRow}>
          <Image source={Phone} style={styles.memberItemIcon} />
          <Text style={styles.memberItemPhone}>{item.phone}</Text>
        </View>
        {item.is_head == 1 && (
          <Image source={Key} style={styles.keyIconMember} />
        )}
      </Ripple>
    );
  };
  const renderCategory = category => {
    // console.log(category);
    switch (category) {
      case 'Bicycle':
        return i18nProfileSettingBi;
      case 'Motorbike':
        return i18nProfileSettingMot;
      case '4-seats car':
        return i18nProfileSetting4;
      default:
        return i18nProfileSetting7;
    }
  };
  //
  const renderVehicle = (item, index) => {
    return (
      <View style={[styles.verhicleItem, index == vehicleData?.length - 1 && {borderBottomWidth: 0}]} key={item.id}>
        <View style={styles.verhicleItemContent}>
          <View style={styles.verhicleIcon}>
            <Image source={{uri: item?.category?.icon_url}} style={styles.memberItemIcon} />
            <Text style={styles.verhicleUserName}>
              {/* {t(item.transportation_category)} */}
              {renderCategory(item.transportation_category)}
              {/* {getGeneralInformationData?.fullname} */}
            </Text>
          </View>
          <Text style={styles.verhiclePrice}>
            {`${numeral(item.fee).format('0,0')} ₫`}
          </Text>
        </View>
        <Text style={styles.verhicleName}>
          {item.license_plate
            ? `${item.brand} / ${item.license_plate}`
            : item.brand}
        </Text>
      </View>
    );
  };
  //
  useEffect(() => {
    // console.log(getGeneralInformationData)
    setGeneralInfo(getGeneralInformationData);
    setAvatar(getGeneralInformationData?.avatar?.url);
    getListTransportation();
    getTenantList({
      unit_id: getGeneralInformationData.unit_id,
    });
    getContract({
      unit_id: getGeneralInformationData.unit_id,
    });
  }, []);
  //
  useEffect(() => {
    // console.log(getTenantListData)
    if (getTenantListData) {
      setMemberData(getTenantListData?.items || []);
    }
  }, [getTenantListData]);
  //
  // useEffect(() => {
  //   console.log(contractListData)
  // }, [contractListData])
  //
  useEffect(() => {
    if (listTransportationData) {
      setVehicleData(listTransportationData.items);
    }
  }, [listTransportationData]);
  //
  useEffect(() => {
    // console.log(getGeneralInformationData)
    setAvatar(getGeneralInformationData?.avatar?.url);
  }, [getGeneralInformationData]);
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('ProfileDetail')
          i18nProfileSettingPD
        }
      />
      <BackgroundImage />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        <Ripple
          style={[styles.cart, {paddingVertical: 20}]}
          onPress={() => {
            navigation.navigate('ViewProfile', generalInfo);
          }}>
          {avatar !== '' ? (
            <ImageProgress
              source={{uri: avatar}}
              imageStyle={{borderRadius: 25}}
              style={{width: 50, height: 50}}
            />
          ) : (
            <View style={styles.avatar} />
          )}
          <View style={styles.infoContent}>
            <Text style={styles.textName}>{generalInfo?.full_name}</Text>
            <Text style={styles.textPoint}>
              {`${generalInfo?.apartment || ''} - ${generalInfo?.unit || ''}`}
            </Text>
          </View>
          <Image source={Workplace} style={styles.workplace} />
          {getGeneralInformationData?.is_head == 1 && (
            <Image source={Key} style={styles.keyIcon} />
          )}
        </Ripple>
        {/* <View style={[styles.cart, styles.cartBarcode]}>
          <Text style={styles.textBarcode}>
            {i18nProfileSettingBC}
          </Text>
        </View> */}
        <Text style={styles.memberTitle}>
          {/* {t('Member')} */}
          {i18nProfileSettingMe}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 27,
          }}>
          {memberData?.map((item, index) => {
            return renderMember(item, index);
          })}
          {memberData?.length < 50 && (
            <Ripple
              style={[styles.cart, styles.cartMemberItem, styles.cartAddUser]}
              onPress={() => {
                getGeneralInformationData?.is_head == 1
                  ? navigation.navigate('AddMember')
                  : setAlertShow(true);
              }}>
              <Image source={AddUser} style={styles.addUserIcon} />
            </Ripple>
          )}
        </View>
        {
          getTenantListData?.last_created_at &&
          <Text style={styles.timeUpdate}>
            {`${i18nProfileSettingU}: ${dateFormat.formatTimeDate(getTenantListData?.last_created_at)}`}
          </Text>
        }
        <View style={styles.verhicleContent}>
          <View style={styles.verhicleHeader}>
            <Text style={styles.verhicleTitle}>
              {/* {t('VehicleInformation')} */}
              {i18nProfileSettingVI}
            </Text>
            <Ripple
              onPress={() => {
                getGeneralInformationData?.is_head == 1
                  ? navigation.navigate('AddVerhicle')
                  : setAlertShow(true);
              }}>
              <Text style={styles.verhicleAdd}>
                {/* {t('Add')} */}
                {i18nProfileSettingAd}
              </Text>
            </Ripple>
          </View>
          {vehicleData?.length > 0 && (
            <View style={[styles.cart, styles.verhicleCard]}>
              {vehicleData?.map((item, index) => {
                return renderVehicle(item, index);
              })}
            </View>
          )}
        </View>
        {/* {contractListData?.files?.length > 0 && ( */}
          <View style={styles.contractContent}>
            <Text style={styles.contractTitle}>
              {/* {t('ContractInformation')} */}
              {i18nProfileSettingCI}
            </Text>
            <Ripple
              style={[styles.cart, styles.contractCart]}
              disabled={contractListData?.files?.length > 0 ? false : true}
              onPress={() => {
                navigation.navigate('RentalTerm', {
                  image: contractListData?.files,
                });
              }}>
              <Image
                source={{uri: contractListData?.files?.[0]?.url}}
                style={styles.rentalTermIcon}
              />
              <Text style={{paddingRight: 45}}>
                {/* {t('RentalTerm')} */}
                {i18nProfileSettingRT}
                {`\n`}
                {contractListData?.rent_start_date
                  ? dateFormat.formatDate(contractListData?.rent_start_date)
                  : ''}{' '}
                -{' '}
                {contractListData?.rent_end_date
                  ? dateFormat.formatDate(contractListData?.rent_end_date)
                  : ''}
              </Text>
              {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                  getTenantListData?.contract.map((item) => {
                    return (
                    <Ripple onPress={() => {navigation.navigate('RentalTerm', {image: item.url})}}>
                      <Image source={{uri: item.url}} style={styles.rentalTermIcon} />
                    </Ripple>
                    )
                  })
                }
              </ScrollView> */}
            </Ripple>
            {/* <Text style={styles.contractInfo}>Rental Terms</Text> */}
          </View>
        {/* )} */}
      </ScrollView>
      <AlertConfirm
        title={i18nViewProfileOHTCUT}
        show={alertShow}
        closeButton={true}
        onPressCancel={() => {
          setAlertShow(false);
          // navigation.pop()
        }}
      />
      {getTenantListProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default memo(ProfileSettingScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingVertical: 10,
  },
  cameraIconBox: {
    position: 'absolute',
    bottom: 0,
    right: -15,
    borderRadius: 999,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    ...ApplicationStyles.boxShadow,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 26,
    marginHorizontal: 27,
    marginVertical: 9,
    paddingLeft: 20,
    paddingRight: 21,
    borderColor: Colors.gray5,
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderRadius: 10,
    ...ApplicationStyles.boxShadow,
  },
  button: {
    paddingHorizontal: 27,
    marginVertical: 40,
  },
  cart: {
    marginHorizontal: 27,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    ...ApplicationStyles.boxShadow,
  },
  workplace: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 0,
    right: 10,
    zIndex: -1,
  },
  keyIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  keyIconMember: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 14,
    right: 12,
  },
  cartBarcode: {
    minHeight: 70,
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 10,
  },
  textName: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    paddingBottom: 5,
  },
  textPoint: {
    color: Colors.textColor.gray2,
    paddingRight: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  memberTitle: {
    marginTop: 7,
    margin: 27,
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
  },
  cartMemberItem: {
    width: (width - 27 * 2 - 15) / 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: 105,
    marginHorizontal: 0,
  },
  cartMemberItemLeft: {
    marginRight: 15,
  },
  memberItemRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
    marginVertical: 5,
  },
  memberItemName: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
  },
  memberItemDob: {
    fontSize: Fonts.size.h6,
    color: Colors.gray7,
    fontFamily: Fonts.type.light,
  },
  memberItemPhone: {
    fontSize: Fonts.size.h6,
    color: Colors.gray7,
    fontFamily: Fonts.type.light,
  },
  memberItemIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: 'black',
  },
  textBarcode: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.light,
  },
  addUserIcon: {
    width: 60,
    height: 60,
  },
  cartAddUser: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeUpdate: {
    textAlign: 'right',
    paddingRight: 27,
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.light,
    color: Colors.gray2,
  },
  verhicleCard: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingVertical: 5,
  },
  verhicleContent: {},
  verhicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal: 27,
  },
  verhicleTitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
  },
  verhicleAdd: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.mainColor,
  },
  verhicleItem: {
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  verhicleItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verhicleIcon: {
    flexDirection: 'row',
  },
  verhicleUserName: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
  },
  verhicleName: {
    paddingTop: 10,
    fontFamily: Fonts.type.light,
    color: Colors.black,
    fontSize: Fonts.size.h6,
  },
  verhiclePrice: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.gray2,
  },
  contractTitle: {
    marginHorizontal: 27,
    marginVertical: 10,
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
  },
  contractCart: {
    flexDirection: 'row',
  },
  contractInfo: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    paddingVertical: 10,
  },
  rentalTermIcon: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
});
