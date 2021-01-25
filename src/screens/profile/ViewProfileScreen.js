import React, {memo, useEffect, useState} from 'react';
import _ from 'lodash';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import {CameraIcon} from '../../components/icons';
import Button from '../../components/button';
import CardImage from '../../components/card/CardImage';
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
import ImageProgress from '../../components/ImageProgress';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {Images, ApplicationStyles, Colors, Fonts} from '../../themes';
//
import SelectPhoto from '../../utils/choosePhoto';
import {wpc, hpc, hp} from '../../utils/responsePixel';
//
import {useTranslation} from '../../context/LanguageContext';
import dateFormat from '../../utils/dateFormat';
//
const RowItem = props => {
  const {firstText, lastText} = props;
  return (
    <View style={styles.rowItem}>
      <Text style={styles.firstText}>{firstText}</Text>
      <Text style={styles.lastText}>{lastText}</Text>
    </View>
  );
};
//
function ViewProfileScreen(props) {
  const {
    navigation,
    getMemberDetail,
    getMemberDetailData,
    getMemberDetailProgress,
    getGeneralInformationData,
    postUploadAvatar,
    getUploadAvatarProgress,
    getUploadAvatarData,
    setMemberDetailData,
  } = props;
  const data = navigation.state.params;
  //
  const {
    t,
    i18nViewProfileVP,
    i18nViewProfileFuN,
    i18nViewProfileEm,
    i18nViewProfilePh,
    i18nViewProfileCOO,
    i18nViewProfileGe,
    i18nViewProfileDOB,
    i18nViewProfileRo,
    i18nViewProfilePOR,
    i18nViewProfileIPI,
    i18nViewProfileCP,
    i18nViewProfileMa,
    i18nViewProfileFe,
    i18nViewProfileHT,
    i18nViewProfileTe,
  } = useTranslation();
  //
  const [memberData, setMemberDetail] = useState(null);
  const [avatarImage, setAvatarImage] = useState('');
  //
  const selectPhoto = () => {
    SelectPhoto.selectPhotoTapped(uploadImageToServer, t);
  };
  //
  const uploadImageToServer = data => {
    // data.append('type', 'AVATAR');
    postUploadAvatar(data);
  };
  //
  useEffect(() => {
    // console.log(data);
    if (data?.uuid) {
      getMemberDetail(data?.uuid);
    } else {
      setMemberDetail(data);
      setAvatarImage(data?.avatar?.url);
    }
    return () => {
      setMemberDetailData(null);
    };
  }, []);
  //
  useEffect(() => {
    if (getMemberDetailData) {
      setMemberDetail(getMemberDetailData);
      setAvatarImage(getMemberDetailData?.avatar?.url);
    }
  }, [getMemberDetailData]);
  //
  useEffect(() => {
    if (getUploadAvatarData) {
      setAvatarImage(getUploadAvatarData.url);
    }
  }, [getUploadAvatarData]);
  //
  // useEffect(() => {
  //   console.log(getGeneralInformationData)
  // }, [getGeneralInformationData])
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('ViewProfile')
          i18nViewProfileVP
        }
      />
      <BackgroundImage />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.cart, styles.cardTop]}>
          {data?.member ? (
            <ImageProgress
              source={{uri: avatarImage}}
              imageStyle={{borderRadius: 50}}
              style={{width: 100, height: 100}}
            />
          ) : (
            <Ripple onPress={selectPhoto}>
              <ImageProgress
                source={{uri: avatarImage}}
                imageStyle={{borderRadius: 50}}
                style={{width: 100, height: 100}}
              />
              <View style={styles.cameraIconBox}>
                <CameraIcon size={21} />
              </View>
            </Ripple>
          )}
          {memberData && (
            <Text style={styles.riverPoint}>
              {`${getGeneralInformationData?.apartment ||
                ''} - ${getGeneralInformationData?.unit || ''}`}
            </Text>
          )}
        </View>
        <View style={styles.leftRectangle} />
        <View style={styles.rightRectangle} />
        <View style={[styles.cart, styles.cartInfo, styles.cardBottom]}>
          <RowItem
            firstText={
              // t('FullName')
              i18nViewProfileFuN
            }
            lastText={memberData?.full_name}
          />
          <RowItem
            firstText={
              // t('Email')
              i18nViewProfileEm
            }
            lastText={memberData?.email}
          />
          <RowItem
            firstText={
              // t('PhoneNo')
              i18nViewProfilePh
            }
            lastText={memberData?.phone}
          />
          <RowItem
            firstText={
              // t('CountryOfOrigin')
              i18nViewProfileCOO
            }
            lastText={memberData?.country}
          />
          <RowItem
            firstText={
              // t('Gender')
              i18nViewProfileGe
            }
            lastText={
              memberData?.gender === 1 ? i18nViewProfileMa : i18nViewProfileFe
            }
          />
          <RowItem
            firstText={
              // t('DateOfBirth')
              i18nViewProfileDOB
            }
            lastText={
              memberData?.birthday
                ? dateFormat.formatDate(memberData?.birthday)
                : ''
            }
          />
          <RowItem
            firstText={
              // t('Role')
              i18nViewProfileRo
            }
            lastText={
              memberData?.is_head ? i18nViewProfileHT : i18nViewProfileTe
            }
          />
          <RowItem
            firstText={
              // t('PeriodOfResidence')
              i18nViewProfilePOR
            }
            lastText={dateFormat.formatDate(memberData?.contract?.rent_end_date)}
          />
          <RowItem
            firstText={
              i18nViewProfileIPI
            }
            lastText={memberData?.id_card}
          />
          {/* <View>
            <Text
              style={{
                fontSize: Fonts.size.h4,
                color: Colors.gray7,
                fontFamily: Fonts.type.base,
                paddingVertical: 10,
              }}>
              {i18nViewProfileIPI}
            </Text>
          </View> */}
          <View style={styles.idCard}>
            {memberData?.id_card_images?.length > 0 && (
              <CardImage
                noDelete={true}
                onPress={() => {
                  navigation.navigate('IDCard', {
                    image: memberData?.id_card_images[0]?.url || '',
                    images: memberData?.id_card_images || [],
                    index: 0,
                  });
                }}
                size="M"
                imageUrl={memberData?.id_card_images[0]?.url || ''}
                fixedWidth
              />
            )}
            <View style={{width: 20}} />
            {memberData?.id_card_images?.length > 1 && (
              <CardImage
                noDelete={true}
                onPress={() => {
                  navigation.navigate('IDCard', {
                    image: memberData?.id_card_images[1]?.url || '',
                    images: memberData?.id_card_images || [],
                    index: 1,
                  });
                }}
                size="M"
                imageUrl={memberData?.id_card_images[1]?.url || ''}
                fixedWidth
              />
            )}
          </View>
        </View>
        {!data?.member && (
          <Ripple
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            <Text style={styles.changePassword}>
              {/* {t('ChangePassword')} */}
              {i18nViewProfileCP}
            </Text>
          </Ripple>
        )}
      </ScrollView>
      {getMemberDetailProgress && <DimSpinnerView />}
      {getUploadAvatarProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default memo(ViewProfileScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingVertical: 20,
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
  cart: {
    marginHorizontal: 27,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTop: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 8,
  },
  cardBottom: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  riverPoint: {
    marginTop: 20,
    fontSize: wpc(Fonts.size.h5),
    color: Colors.gray7,
    fontFamily: Fonts.type.medium,
  },
  cartInfo: {
    alignItems: 'stretch',
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  firstText: {
    fontSize: Fonts.size.h5,
    color: Colors.gray7,
    fontFamily: Fonts.type.base,
    flex: 5,
    textAlign: 'left',
  },
  lastText: {
    fontSize: Fonts.size.h5,
    color: Colors.gray7,
    fontFamily: Fonts.type.medium,
    flex: 6,
    textAlign: 'right',
  },
  changePassword: {
    textAlign: 'right',
    marginHorizontal: 27,
    fontSize: Fonts.size.title3,
    color: Colors.mainColor,
  },
  button: {
    paddingHorizontal: 27,
    marginVertical: 40,
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
  idCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  leftRectangle: {
    width: 10,
    height: 150,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 150,
    left: 60,
    zIndex: -10,
    ...ApplicationStyles.boxShadow,
  },
  rightRectangle: {
    width: 10,
    height: 150,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 150,
    right: 60,
    zIndex: -10,
    ...ApplicationStyles.boxShadow,
  },
});
