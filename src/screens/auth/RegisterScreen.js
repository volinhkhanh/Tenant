import React, {useState, memo, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import FullButton from '../../components/FullButton';
import ModalSelector from '../../components/modal/ModalSelector';
import Arrow_down_open from '../../components/icons/images/arrow_down_open.png';
import VnFlag from '../../components/icons/images/vnFlag.png';
import {SearchIcon} from '../../components/icons';
import DimSpinnerView from '../../components/DimSpinnerView';
import AlertConfirm from '../../components/alert/AlertConfirm';
import OutlineButton from '../../components/OutlineButton';
//
import {KeyboardAvoidingView} from '../utils';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes';
//
import Layouts from '../../constants/Layouts';
//
import {wpc, hpc} from '../../utils/responsePixel';
//
import {useTranslation} from '../../context/LanguageContext';
//
const emailRegexp = new RegExp(/[\w\.-]+@([\w\-]+\.)+[A-Za-z]{2,4}/);
// const phoneRegexp = new RegExp(/(84|\+84|0)(\d{9})/);
const phoneRegexp = new RegExp(/(84|\+84|0)(\d+)/);
const passwordRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const dateReg = /^\d{2}([/])\d{2}\1\d{4}$/;
var scroll = null;
const {width} = Layouts;
//
function RegisterScreen(props) {
  const {
    navigation,
    getCountries,
    getBlock,
    getCountryData,
    getUnitProgress,
    getCountryProgress,
    getApartmentRegisterData,
    getUploadImageProgress,
    postRegister,
  } = props;
  //
  const {
    t,
    i18nRegisterCountryOfOrigin,
    i18nRegisterGender,
    i18nRegisterApartmentName,
    i18nRegisterUnit,
    i18nRegisterConfirm,
    i18nRegisterPleaseFill,
    i18nRegisterRA,
    i18nRegisterPSYAASYPN,
    i18nRegisterCancel,
    i18nRegisterSE,
  } = useTranslation();
  //
  const [errorMessage, setErrorMessage] = useState('');
  const [phone, setPhone] = useState('');
  //
  const [countryItem, setCountryItem] = useState({
    id: '0',
    name: i18nRegisterCountryOfOrigin,
  });
  //
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [alertShow, setAlertShow] = useState(false);
  const [message, setMessage] = useState(false);
  //
  const onCancel = () => navigation.pop();
  //
  const setValue = (keyword, val) => {
    switch (keyword) {
      case 'country':
        setCountryItem(val);
        break;
    }
  };
  //
  const setModal = (keyword, val) => {
    switch (keyword) {
      case 'country':
        setCountryModalVisible(val);
        break;
    }
  };
  //
  const current_day = new Date();
  //
  const actionRegister = async () => {
    if(getApartmentRegisterData?.id && phone !== '') {
      const data = await postRegister(t, {
        apartment_id: getApartmentRegisterData?.id,
        phone,
        prefix_phone: '+84'
      });
      switch (data?.errors[0]?.code) {
        case 2009:
          setMessage(t('src.screens.auth.RegisterScreen.2009', {
            phone
          }))
          break
        case 2010:
          setMessage(t('src.screens.auth.RegisterScreen.2010', {
            phone
          }))
          break
        case 2011:
          setMessage(t('src.screens.auth.RegisterScreen.2011', {
            phone
          }))
          break
      }
      // console.log(data)
      setAlertShow(true)
      // if (data) {
      //   navigation.navigate('RegisterSuccess');
      // }
    } else {
      setErrorMessage(i18nRegisterPleaseFill);
    }
  }
  //
  // useEffect(() => {
  //   const apartmentItem = getApartmentRegisterData;
  //   console.log(apartmentItem)
  // }, [getApartmentRegisterData]);
  //
  useEffect(() => {
    let formattedText = phone.split(' ').join('');
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,3}', 'g')).join(' ');
    }
    setPhone(formattedText)
  }, [phone])
  //
  useEffect(() => {
    getCountries();
  }, []);
  // useEffect(() => {
  //   console.log(getCountryData)
  // }, [getCountryData]);
  //
  return (
    <View style={styles.container}>
      <ScrollView
        ref={c => {
          scroll = c;
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView>
          <Text style={styles.titleText}>
            {i18nRegisterRA}
          </Text>
          <Text style={styles.textFill}>
            {i18nRegisterPSYAASYPN}
          </Text>
          {errorMessage !== '' && (
            <Text style={styles.textRequired}>
              {errorMessage}
            </Text>
          )}
          <Ripple
            style={[
              styles.selector,
              (!getApartmentRegisterData?.name ||
                getApartmentRegisterData?.name === i18nRegisterApartmentName) &&
                errorMessage !== '' && {borderWidth: 0.5, borderColor: 'red'},
              {marginBottom: 25},
            ]}
            onPress={() => {
              navigation.navigate('SearchApartment', {type: 'register'});
            }}>
            <Text
              style={[
                styles.textSelector,
                {
                  color: !getApartmentRegisterData
                    ? Colors.textColor.gray7
                    : Colors.black,
                },
              ]}>
              {getApartmentRegisterData?.name || i18nRegisterApartmentName}
            </Text>
            <SearchIcon
              size={24}
              color={getApartmentRegisterData ? Colors.mainColor : '#DADADA'}
            />
          </Ripple>
          <View style={{flexDirection: 'row'}}>
            <Ripple
              style={[
                styles.selector,
                {justifyContent: 'flex-start', paddingVertical: 0},
              ]}
              onPress={() => {
                countryModalVisible.open();
              }}>
                <Image
                  source={VnFlag}
                  style={{width: 30, height: 20, marginRight: 5}}
                />
                <Image
                  source={Arrow_down_open}
                  style={[
                    styles.imageArrowDown,
                    { tintColor: Colors.black },
                  ]}
                />
            </Ripple>
            <View
              style={[
                styles.selector,
                {flex: 1, justifyContent: 'flex-start', paddingVertical: 0},
                phone === '' &&
                errorMessage !== '' && {
                  borderColor: 'red',
                },
              ]}>
              <Text>+84</Text>
              <TextInput
                placeholder={'000 000 000'}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={11}
                style={[
                  styles.textSelector,
                  {color: Colors.black, paddingVertical: 13, paddingHorizontal: 5},
                ]}>

              </TextInput>
            </View>
          </View>
          <View style={styles.submitBox}>
            <OutlineButton
              style={styles.cancelButton}
              title={
                i18nRegisterCancel
              }
              onPress={onCancel}
            />
            <FullButton
              style={styles.submitButton}
              title={
                i18nRegisterSE
              }
              onPress={actionRegister}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <ModalSelector
        setModal={setModal}
        setItem={setValue}
        data={getCountryData?.items}
        checkData={countryItem}
        selectedIndex={index}
        onSelectIndex={index => setIndex(index)}
        modalVisible={countryModalVisible}
        keyword={'country'}
      />
      {getUnitProgress && getCountryProgress && <DimSpinnerView />}
      {getUploadImageProgress && <DimSpinnerView />}
      <AlertConfirm
        style={{ width: '100%' }}
        show={alertShow}
        title={message}
        leftText={null}
        onPressCancel={() => {
          setAlertShow(false);
        }}
        closeButton={true}
      />
      {/* {getDeleteImageProgress && <DimSpinnerView />} */}
    </View>
  );
}
//
export default memo(RegisterScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.backgroundLightGray,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 50,
    paddingHorizontal: 25,
  },
  selectType: {
    flex: 1,
    marginVertical: 10,
    paddingVertical: 10,
    position: 'relative',
    borderRadius: 5,
    borderWidth: 0.5,
  },
  titleText: {
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
    marginTop: 80,
  },
  datepicker: {
    position: 'relative',
    zIndex: 4,
    paddingVertical: 5,
  },
  submitBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(60),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    marginHorizontal: ApplicationStyles.utils.resizeHeight(8),
  },
  cancelButton: {
    flex: 1,
    marginHorizontal: ApplicationStyles.utils.resizeHeight(8),
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: Colors.gray4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  textSelector: {
    fontSize: Fonts.size.h4,
    color: Colors.textColor.gray7,
    fontFamily: Fonts.type.base,
  },
  textFill: {
    fontSize: Fonts.size.h4,
    color: Colors.gray2,
    paddingVertical: 20,
    marginBottom: 15,
  },
  textRequired: {
    color: Colors.red,
    fontSize: Fonts.size.h5,
    paddingBottom: 20,
  },
  imageArrowDown: {
    width: 25,
    height: 25,
  },
  placeholder: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    lineHeight: ApplicationStyles.utils.resizeHeight(20),
    color: Colors.black,
  },
  separate: {
    color: Colors.gray7,
  },
  nameContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputName: {
    width: (width - 50) / 2 - 20,
  },
});
