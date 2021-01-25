import React, {useState, memo, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import _ from 'lodash';
import numeral from 'numeral';
import Ripple from 'react-native-material-ripple';
//
import {Workplace, Key, Camera} from '../../components/icons';
import Button from '../../components/button';
import MainHeader from '../../components/MainHeader';
import ModalSelector from '../../components/modal/ModalSelector';
import Arrow_down_open from '../../components/icons/images/arrow_down_open.png';
import DimSpinnerView from '../../components/DimSpinnerView';
import ImageProgress from '../../components/ImageProgress';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes';
//
import SelectPhoto from '../../utils/choosePhoto';
//
import {useTranslation} from '../../context/LanguageContext';
//
import {KeyboardAvoidingView} from '../utils';
//
var scroll = null;
//
function AddVerhicleScreen(props) {
  const {
    navigation,
    getVehicle,
    getVehicleData,
    getVehicleProgress,
    postUploadImage,
    getUploadImageProgress,
    uploadImageData,
    setHomeImageData,
    postRegisterVehicle,
    getRegisterVehicleProgress,
    getGeneralInformationData,
    setUploadImageData,
  } = props;
  //
  const {
    t,
    i18nAddVehicleAV,
    i18nAddVehiclePFIAIB,
    i18nAddVehicleTy,
    i18nAddVehicleBi,
    i18nAddVehicleMo,
    i18nAddVehicle4,
    i18nAddVehicle7,
    i18nAddVehicleBr,
    i18nAddVehiclePN,
    i18nAddVehiclePPM,
    i18nAddVehicleAI,
    i18nAddVehicleSa,
    i18nRegisterWeHaveReceived,
    i18nAddVehicleSS,
    i18nAddVehicleSFD,
    itemRequired,
  } = useTranslation();
  //
  const [unitModalVisible, setUnitModalVisible] = useState(false);
  const [vehicleItem, setVehicleItem] = useState({
    id: '',
    name: `${i18nAddVehicleTy}*`,
  });
  const [plateNumber, setPlateNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [price, setPrice] = useState('-');
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePhoto, setImagePhoto] = useState(null);
  //
  const setModal = (keyword, val) => {
    setUnitModalVisible(val);
  };
  //
  const setValue = (keyword, val) => {
    setVehicleItem(val);
    setPrice(val.fee_value);
  };
  //
  const selectPhoto = () => {
    SelectPhoto.selectPhotoTapped(uploadImageToServer, t);
  };
  //
  const uploadImageToServer = data => {
    data.append('type', 'TRANSPORTATION');
    postUploadImage(data);
  };
  //
  const scrollToTop = () => {
    scroll.scrollTo({x: 0, y: 0, animated: true});
  };
  //
  useEffect(() => {
    scrollToTop();
  }, [errorMessage]);
  //
  const actionAddVehicle = async () => {
    if (
      vehicleItem.id === '' ||
      branch === '' ||
      (vehicleItem.is_license_plate && plateNumber === '') ||
      imagePhoto == null
    ) {
      setErrorMessage(itemRequired);
    } else {
      const data = await postRegisterVehicle({
        unit_id: 1,
        transportation_category_id: vehicleItem?.id,
        brand: branch,
        license_plate: plateNumber,
        files: [imagePhoto],
      });
      if (data) {
        navigation.navigate('Success', {
          title: i18nAddVehicleSS,
          description: i18nAddVehicleSFD,
        });
        setErrorMessage(null);
      }
    }
  };
  //
  const renderCategory = category => {
    // console.log(category);
    switch (category) {
      case 'Bicycle':
        return i18nAddVehicleBi;
      case 'Motorbike':
        return i18nAddVehicleMo;
      case '4-seats car':
        return i18nAddVehicle4;
      default:
        return i18nAddVehicle7;
    }
  };
  //
  useEffect(() => {
    getVehicle();
    return () => {
      setUploadImageData(null);
    };
  }, []);
  //
  useEffect(() => {
    // console.log(getVehicleData.items)
    if (getVehicleData) {
      getVehicleData?.items?.map(item => {
        item.name = renderCategory(item.name);
      });
    }
  }, [getVehicleData]);
  //
  useEffect(() => {
    console.log(uploadImageData)
    if (uploadImageData) {
      setImagePhoto({
        name: uploadImageData?.name,
        uri: uploadImageData?.url,
        mime_type: uploadImageData?.mime_type,
      });
    }
  }, [uploadImageData]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('AddVehicle')
          i18nAddVehicleAV
        }
      />
      <ScrollView
        ref={c => {
          scroll = c;
        }}
        contentContainerStyle={styles.contentScroll}>
        {/* <View style={[styles.cart, {paddingVertical: 20}]}>
          <Image
            source={{uri: getGeneralInformationData.avatar?.url}}
            style={styles.avatar}
          />
          <View style={styles.infoContent}>
            <Text style={styles.textName}>
              {getGeneralInformationData.full_name}
            </Text>
            <Text style={styles.textPoint}>
              {`${getGeneralInformationData?.apartment ||
                ''} - ${getGeneralInformationData?.unit || ''}`}
            </Text>
          </View>
          <Image source={Workplace} style={styles.workplace} />
          {getGeneralInformationData.is_head == 1 && (
            <Image source={Key} style={styles.keyIcon} />
          )}
        </View> */}
        <Text style={{marginTop: 20}}>
          {/* {t('PleaseFillOutTheInformationBelow')} */}
          {i18nAddVehiclePFIAIB}
        </Text>
        {errorMessage !== '' && (
          <Text style={styles.textRequired}>{errorMessage}</Text>
        )}
        <Ripple
          style={[
            styles.selector,
            errorMessage !== '' &&
              vehicleItem.id === '' && {borderWidth: 0.5, borderColor: 'red'},
          ]}
          onPress={() => {
            unitModalVisible.open();
          }}>
          <Text
            style={[
              styles.textSelector,
              {
                color:
                  vehicleItem.id === '' ? Colors.textColor.gray3 : Colors.black,
              },
            ]}>
            {vehicleItem.name}
          </Text>
          <Image
            source={Arrow_down_open}
            style={[
              styles.imageArrowDown,
              {
                tintColor:
                  vehicleItem.id !== '' ? Colors.mainColor : Colors.grayArrow,
              },
            ]}
          />
        </Ripple>
        <TextInput
          style={[
            styles.input,
            errorMessage !== '' &&
              branch === '' && {
                borderBottomWidth: 0.5,
                borderBottomColor: 'red',
              },
          ]}
          placeholder={`${
            // t('Brand')
            i18nAddVehicleBr
          }*`}
          value={branch}
          onChangeText={setBranch}
        />
        {vehicleItem.is_license_plate && (
          <TextInput
            style={[
              styles.input,
              errorMessage !== '' &&
                plateNumber === '' && {
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'red',
                },
            ]}
            placeholder={`${
              // t('PlateNumber')
              i18nAddVehiclePN
            }*`}
            value={plateNumber}
            onChangeText={setPlateNumber}
          />
        )}
        <View style={styles.selector}>
          <Text style={[styles.textSelector, {paddingVertical: 3}]}>
            {/* {t('PricePerMonth')} */}
            {i18nAddVehiclePPM}
          </Text>
          <Text style={styles.priceNumber}>
            {`${numeral(price).format('0,0')} ₫`}
          </Text>
        </View>
        <Text style={styles.chooseAPhoto}>{`${i18nAddVehicleAI}*`}</Text>
        <Ripple
          style={[
            styles.cartPhoto,
            !imagePhoto &&
              errorMessage !== '' && {
                borderWidth: 1,
                borderColor: Colors.red,
              },
          ]}
          onPress={selectPhoto}>
          {imagePhoto ? (
            <ImageProgress
              source={{uri: imagePhoto?.uri}}
              style={styles.photoVehicle}
              resizeMode="cover"
            />
            // <Image
            //   source={{uri: imagePhoto?.uri}}
            //   style={styles.photoVehicle}
            //   resizeMode="cover"
            // />
          ) : (
            [
              <Image source={Camera} style={styles.photoIcon} />,
              <Text style={styles.chooseLibrary}>
                {/* {t('AttachImages')} */}
                {i18nAddVehicleAI}
              </Text>,
            ]
          )}
        </Ripple>
        <View style={styles.button}>
          <Button
            text={
              // t('Save')
              i18nAddVehicleSa
            }
            onPress={actionAddVehicle}
          />
        </View>
      </ScrollView>
      <ModalSelector
        setModal={setModal}
        setItem={setValue}
        data={getVehicleData?.items || []}
        checkData={vehicleItem}
        modalVisible={unitModalVisible}
        keyword={'unit'}
      />
      {getRegisterVehicleProgress && <DimSpinnerView />}
      {getVehicleProgress && <DimSpinnerView />}
      {getUploadImageProgress && <DimSpinnerView />}
    </KeyboardAvoidingView>
  );
}
//
export default memo(AddVerhicleScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingVertical: 10,
    paddingHorizontal: 27,
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
  button: {
    paddingHorizontal: 27,
    marginVertical: 40,
  },
  cart: {
    borderRadius: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    ...ApplicationStyles.boxShadow,
  },
  cartPhoto: {
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    minHeight: 200,
    ...ApplicationStyles.boxShadow,
  },
  photoIcon: {
    width: 30,
    height: 30,
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
  cartBarcode: {
    minHeight: 60,
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
    paddingRight: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: Colors.gray6,
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
  },
  textSelector: {
    color: Colors.textColor.gray2,
    fontFamily: Fonts.type.base,
  },
  imageArrowDown: {
    width: 25,
    height: 25,
  },
  input: {
    marginVertical: 15,
    paddingBottom: 15,
    borderBottomColor: '#CACACA',
    borderBottomWidth: 0.5,
  },
  chooseAPhoto: {
    marginVertical: 10,
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
  },
  chooseLibrary: {
    fontSize: Fonts.size.h5,
    marginTop: 10,
    color: Colors.gray3,
  },
  button: {
    paddingHorizontal: 27,
    marginVertical: 40,
  },
  photoVehicle: {
    width: '100%',
    minHeight: 200,
    borderRadius: 10,
  },
  textRequired: {
    color: Colors.red,
    fontSize: Fonts.size.h5,
    paddingVertical: 10,
  },
});
