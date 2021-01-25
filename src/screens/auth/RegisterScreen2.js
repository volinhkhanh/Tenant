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
import {CheckBox} from 'react-native-elements';
//
import TextInputCustom from '../../components/TextInput';
import CardImage from '../../components/card/CardImage';
import FullButton from '../../components/FullButton';
import OutlineButton from '../../components/OutlineButton';
import ModalSelector from '../../components/modal/ModalSelector';
import Arrow_down_open from '../../components/icons/images/arrow_down_open.png';
import {SearchIcon} from '../../components/icons';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {KeyboardAvoidingView} from '../utils';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes';
//
import Layouts from '../../constants/Layouts';
//
import SelectPhoto from '../../utils/choosePhoto';
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
const UncheckedIcon = () => (
  <View
    style={{
      borderColor: Colors.mainColor,
      height: 20,
      width: 20,
      borderWidth: 1,
      borderRadius: 12,
    }}
  />
);

const CheckedIcon = () => (
  <View
    style={{
      borderColor: Colors.mainColor,
      height: 20,
      width: 20,
      borderWidth: 1,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View
      style={{
        backgroundColor: Colors.mainColor,
        height: 10,
        width: 10,
        borderRadius: 12,
      }}
    />
  </View>
);
//
function RegisterScreen(props) {
  const {
    navigation,
    getUnits,
    getCountries,
    getBlock,
    getBlockData,
    getUnitData,
    getCountryData,
    getUnitProgress,
    getCountryProgress,
    getApartmentRegisterData,
    getRegisterSession,
    getRegisterSessionData,
    postUploadImage,
    getUploadImageProgress,
    uploadImageData,
    deleteImage,
    getDeleteImageProgress,
    uploadFontImageData,
    uploadBackImageData,
    setUploadImageData,
    setApartmentRegister,
  } = props;
  //
  const dayDobRef = useRef();
  const monthDobRef = useRef();
  const yearDobRef = useRef();
  const dayFromRef = useRef();
  const monthFromRef = useRef();
  const yearFromRef = useRef();
  const dayEndRef = useRef();
  const monthEndRef = useRef();
  const yearEndRef = useRef();
  const refRBSheet = useRef();
  //
  const {
    t,
    i18nRegisterPleaseFill,
    i18nRegisterFirstName,
    i18nRegisterLastName,
    i18nRegisterCountryOfOrigin,
    i18nRegisterGender,
    i18nRegisterDOB,
    i18nRegisterPhone,
    i18nRegisterEmail,
    i18nRegisterIdPassportNo,
    i18nRegisterUnitInformation,
    i18nRegisterApartmentName,
    i18nRegisterBlock,
    i18nRegisterUnit,
    i18nRegisterRe,
    i18nRegisterBu,
    i18nRegisterTo,
    i18nRegisterAttachIPImages,
    i18nRegisterAttachCImages,
    i18nRegisterCancel,
    i18nRegisterOnlineRegister,
    i18nRegisterConfirm,
    i18nAddMemberUN,
    under18,
    passMismatch,
    i18nRegisterLengthPhoneWrong,
    i18nRegisterFormatPhoneWrong,
    i18nRegisterFormatEmailWrong,
    i18nRegisterPassowrdWrong,
    i18nRegisterPass,
    i18nRegisterConfPass,
    i18nResetPasswordYPMCAM,
  } = useTranslation();
  //
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [radioOption, setRadioOption] = useState(0);
  const [blockList, setBlockList] = useState([]);
  const [firstIdc, setFirstIdc] = useState(null);
  const [secondIdc, setSecondIdc] = useState(null);
  const [imageContractArray, setImageContractArray] = useState([]);
  const [typeImage, setTypeImage] = useState('');
  // const [errorMessage, setErrorMessage] = useState({});
  const [ageError, setAgeError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //
  const [yearDob, setYearDob] = useState('');
  const [monthDob, setMonthDob] = useState('');
  const [dayDob, setDayDob] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [monthFrom, setMonthFrom] = useState('');
  const [dayFrom, setDayFrom] = useState('');
  const [yearEnd, setYearEnd] = useState('');
  const [monthEnd, setMonthEnd] = useState('');
  const [dayEnd, setDayEnd] = useState('');
  //
  const [countryItem, setCountryItem] = useState({
    id: '0',
    name: i18nRegisterCountryOfOrigin,
  });
  const [genderItem, setGenderItem] = useState({
    id: '0',
    name: i18nRegisterGender,
  });
  const [blockItem, setBlockItem] = useState({
    id: '0',
    name: i18nRegisterBlock,
  });
  const [unitItem, setUnitItem] = useState({id: '0', name: i18nRegisterUnit});
  //
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [unitModalVisible, setUnitModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  //
  const onCancel = () => navigation.pop();
  //
  const setValue = (keyword, val) => {
    switch (keyword) {
      case 'country':
        setCountryItem(val);
        break;
      case 'gender':
        setGenderItem(val);
        break;
      case 'block':
        getUnits({building_id: val.id, size: 100});
        setBlockItem(val);
        setUnitItem({id: '0', name: i18nRegisterUnit});
        break;
      case 'unit':
        setUnitItem(val);
        break;
    }
  };
  //
  const setModal = (keyword, val) => {
    switch (keyword) {
      case 'country':
        setCountryModalVisible(val);
        break;
      case 'gender':
        setGenderModalVisible(val);
        break;
      case 'block':
        setBlockModalVisible(val);
        break;
      case 'unit':
        setUnitModalVisible(val);
        break;
    }
  };
  //
  const current_day = new Date();
  //
  const actionRegister = async () => {
    if (
      firstName === '' ||
      lastName === '' ||
      countryItem.name === t('Nationality') ||
      genderItem.name === i18nRegisterGender ||
      phoneNumber === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      idCardNumber === '' ||
      idCardNumber === '' ||
      !firstIdc ||
      !secondIdc ||
      blockItem.name === i18nRegisterBlock ||
      unitItem.name === i18nRegisterUnit ||
      !getApartmentRegisterData?.name ||
      getApartmentRegisterData?.name === i18nRegisterApartmentName ||
      (radioOption == 0 &&
        (dayFrom === '' ||
          monthFrom === '' ||
          yearFrom === '' ||
          dayEnd === '' ||
          monthEnd === '' ||
          yearEnd === '')) ||
      dayDob === '' ||
      monthDob === '' ||
      yearDob === ''
      // dob === '' ||
    ) {
      setErrorMessage(i18nRegisterPleaseFill);
      scrollToTop();
    } else if (
      current_day.getFullYear() - yearDob < 19 ||
      current_day.getFullYear() - yearDob > 100
    ) {
      setAgeError(under18);
      setErrorMessage(under18);
      scrollToTop();
    } else if (
      phoneNumber !== '' &&
      (phoneNumber.replace('+', '').length < 9 ||
        phoneNumber.replace('+', '').length > 12)
    ) {
      setErrorMessage(i18nRegisterLengthPhoneWrong);
      scrollToTop();
    } else if (phoneNumber !== '' && !phoneRegexp.test(phoneNumber)) {
      setErrorMessage(i18nRegisterFormatPhoneWrong);
      scrollToTop();
    } else if (!emailRegexp.test(email)) {
      setErrorMessage(i18nRegisterFormatEmailWrong);
      scrollToTop();
    } else if (!passwordRegexp.test(password)) {
      setErrorMessage(i18nResetPasswordYPMCAM);
      scrollToTop();
    } else if (confirmPassword !== password) {
      setErrorMessage(passMismatch);
      scrollToTop();
    } else {
      setAgeError('');
      setErrorMessage('');
      let is_owner = true;
      let rentStartDate = null;
      let rentEndDate = null;
      if (radioOption == 0) {
        is_owner = false;
        rentStartDate = yearFrom + '-' + monthFrom + '-' + dayFrom;
        rentEndDate = yearEnd + '-' + monthEnd + '-' + dayEnd;
      }
      const params = {
        // type: getRegisterSessionData.cmnd_type,
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        id_card: idCardNumber,
        apartment_id: '1',
        building_id: blockItem,
        unit_id: unitItem,
        country_id: countryItem,
        email: email,
        password: password,
        is_owner: is_owner,
        rent_start_date: rentStartDate,
        rent_end_date: rentEndDate,
        gender: genderItem,
        // birthday: dob,
        birthday: yearDob + '-' + monthDob + '-' + dayDob,
      };
      navigation.navigate('RegisterConfirm', {
        params,
        firstIdc: firstIdc,
        secondIdc: secondIdc,
        contract: imageContractArray,
      });
    }
  };
  //
  useEffect(() => {
    const apartmentItem = getApartmentRegisterData;
    if (apartmentItem) {
      getBlock({
        apartment_id: apartmentItem?.id || null,
        size: 100,
      });
    }
  }, [getApartmentRegisterData]);
  //
  useEffect(() => {
    // console.log(getBlockData)
    if (getBlockData) {
      setBlockList(getBlockData?.items || []);
    }
  }, [getBlockData]);
  //
  useEffect(() => {
    getCountries();
    getRegisterSession();
    return () => {
      setUploadImageData(null);
      setApartmentRegister(null);
    };
  }, []);
  useEffect(() => {
    uploadFontImageData &&
      setFirstIdc({
        name: uploadFontImageData?.name,
        uri: uploadFontImageData?.url,
        mime_type: uploadFontImageData?.mime_type,
        is_front: 1,
      });
  }, [uploadFontImageData]);
  useEffect(() => {
    uploadBackImageData &&
      setSecondIdc({
        name: uploadBackImageData?.name,
        uri: uploadBackImageData?.url,
        mime_type: uploadBackImageData?.mime_type,
        is_front: 0,
      });
  }, [uploadBackImageData]);
  useEffect(() => {
    uploadImageData &&
      setImageContractArray([
        ...imageContractArray,
        {
          name: uploadImageData?.name,
          uri: uploadImageData?.url,
          mime_type: uploadImageData?.mime_type,
        },
      ]);
  }, [uploadImageData]);
  //
  const uploadContractImageToServer = data => {
    data.append('type', 'UNIT_TENANT_CONTRACT');
    postUploadImage(data);
  };
  //
  const uploadFontImageToServer = data => {
    data.append('type', 'ID_CARD');
    postUploadImage(data, 'font');
  };
  //
  const uploadBackImageToServer = data => {
    data.append('type', 'ID_CARD');
    postUploadImage(data, 'back');
  };
  //
  const selectPhoto = async value => {
    setTypeImage(value);
    if (value === 'contractImage') {
      SelectPhoto.selectPhotoTapped(uploadContractImageToServer, t);
    } else if (value === 'fontImage') {
      SelectPhoto.selectPhotoTapped(uploadFontImageToServer, t);
    } else {
      SelectPhoto.selectPhotoTapped(uploadBackImageToServer, t);
    }
  };
  //
  const scrollToTop = () => {
    scroll.scrollTo({x: 0, y: 0, animated: true});
  };
  //
  const GENDER = [
    {
      id: 1,
      name: 'Male',
    },
    {
      id: 2,
      name: 'Female',
    },
  ];
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
            {/* {t('OnlineRegistration')} */}
            {i18nRegisterOnlineRegister}
          </Text>
          <Text style={styles.textFill}>
            {/* {t('PleaseFillOutTheRegistrationForm')} */}
            {i18nRegisterPleaseFill}
          </Text>
          {errorMessage !== '' && (
            <Text style={styles.textRequired}>
              {/* {Object.values(errorMessage)[0]} */}
              {errorMessage}
            </Text>
          )}
          <Text style={styles.infoTitle}>
            {/* {`${t('UserInformation')} *`} */}
            {`${i18nAddMemberUN} *`}
          </Text>
          <View style={styles.nameContent}>
            <View style={styles.inputName}>
              <TextInputCustom
                style={{marginVertical: 11}}
                placeholder={
                  // t('FirstName')
                  i18nRegisterFirstName
                }
                value={firstName}
                inputStyle={styles.placeholder}
                placeholderTextColor={Colors.textColor.gray6}
                onChangeText={setFirstName}
                // errorText={errorMessage?.firstName}
                errorText={
                  firstName === '' && errorMessage !== '' && errorMessage
                }
              />
            </View>
            <View style={styles.inputName}>
              <TextInputCustom
                style={{marginVertical: 11}}
                placeholder={
                  // t('LastName')
                  i18nRegisterLastName
                }
                value={lastName}
                inputStyle={styles.placeholder}
                placeholderTextColor={Colors.textColor.gray6}
                onChangeText={setLastName}
                // errorText={errorMessage?.lastName}
                errorText={
                  lastName === '' && errorMessage !== '' && errorMessage
                }
              />
            </View>
          </View>
          <Ripple
            style={[
              styles.selector,
              countryItem.name === i18nRegisterCountryOfOrigin &&
                errorMessage !== '' && {
                  borderWidth: 0.5,
                  borderColor: 'red',
                },
              {marginBottom: 20},
            ]}
            onPress={() => {
              countryModalVisible.open();
            }}>
            <Text
              style={[
                styles.textSelector,
                {
                  color:
                    countryItem.name === i18nRegisterCountryOfOrigin
                      ? Colors.textColor.gray7
                      : Colors.black,
                },
              ]}>
              {countryItem.name}
            </Text>
            <Image
              source={Arrow_down_open}
              style={[
                styles.imageArrowDown,
                {
                  tintColor:
                    countryItem.name === i18nRegisterCountryOfOrigin
                      ? Colors.grayArrow
                      : Colors.mainColor,
                },
              ]}
            />
          </Ripple>
          <Ripple
            style={[
              styles.selector,
              genderItem.name === i18nRegisterGender &&
                errorMessage !== '' && {
                  borderWidth: 0.5,
                  borderColor: 'red',
                },
            ]}
            onPress={() => {
              genderModalVisible.open();
            }}>
            <Text
              style={[
                styles.textSelector,
                {
                  color:
                    genderItem.name === i18nRegisterGender
                      ? Colors.textColor.gray7
                      : Colors.black,
                },
              ]}>
              {t(`src.screens.auth.RegisterScreen.${genderItem.name}`)}
            </Text>
            <Image
              source={Arrow_down_open}
              style={[
                styles.imageArrowDown,
                {
                  tintColor:
                    genderItem.name === i18nRegisterGender
                      ? Colors.grayArrow
                      : Colors.mainColor,
                },
              ]}
            />
          </Ripple>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 11,
              marginTop: 31,
              alignItems: 'center',
            }}>
            <Text
              style={{
                paddingTop: 2,
                paddingRight: 10,
                fontSize: Fonts.size.h4,
              }}>
              {/* {t('DateOfBirth')}:{' '} */}
              {`${i18nRegisterDOB}: `}
            </Text>
            <View style={styles.dateFrom}>
              <TextInput
                ref={dayDobRef}
                style={[
                  styles.dateInput,
                  dayDob === '' &&
                    errorMessage !== '' && {
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'red',
                    },
                ]}
                placeholder="dd"
                maxLength={2}
                keyboardType="numeric"
                value={dayDob}
                inputStyle={styles.placeholder}
                placeholderTextColor={Colors.textColor.gray6}
                onChangeText={text => {
                  setDayDob(text);
                  text.length > 1 && monthDobRef.current.focus();
                }}
              />
              <Text style={styles.separate}>/</Text>
              <TextInput
                ref={monthDobRef}
                style={[
                  styles.dateInput,
                  monthDob === '' &&
                    errorMessage !== '' && {
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'red',
                    },
                ]}
                placeholder="mm"
                maxLength={2}
                keyboardType="numeric"
                value={monthDob}
                inputStyle={styles.placeholder}
                placeholderTextColor={Colors.textColor.gray6}
                onChangeText={text => {
                  setMonthDob(text);
                  text.length > 1 && yearDobRef.current.focus();
                }}
              />
              <Text style={styles.separate}>/</Text>
              <TextInput
                ref={yearDobRef}
                style={[
                  styles.dateInput,
                  ((yearDob === '' && errorMessage !== '') ||
                    ageError !== '') && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'red',
                  },
                  {width: wpc(55)},
                ]}
                placeholder="yyyy"
                maxLength={4}
                keyboardType="numeric"
                value={yearDob}
                inputStyle={styles.placeholder}
                placeholderTextColor={Colors.textColor.gray6}
                onChangeText={text => {
                  setYearDob(text);
                  // text.length > 3 && dayEndRef.current.focus()
                }}
              />
            </View>
          </View>
          <TextInputCustom
            // style={{marginVertical: 11}}
            placeholder={
              // t('PhoneNo')
              i18nRegisterPhone
            }
            // keyboardType="numeric"
            value={phoneNumber}
            inputStyle={styles.placeholder}
            placeholderTextColor={Colors.textColor.gray6}
            onChangeText={setPhoneNumber}
            // errorText={errorMessage?.phone}
            errorText={
              ((phoneNumber === '' && errorMessage !== '') ||
                errorMessage === t('LengthPhoneWrong') ||
                errorMessage === t('FormatPhoneWrong')) &&
              errorMessage
            }
          />
          <TextInputCustom
            // style={{marginVertical: 11}}
            placeholder={
              // t('Email')
              i18nRegisterEmail
            }
            autoCapitalize="none"
            value={email}
            inputStyle={styles.placeholder}
            placeholderTextColor={Colors.textColor.gray6}
            onChangeText={setEmail}
            // errorText={errorMessage?.email}
            errorText={
              ((email === '' && errorMessage !== '') ||
                errorMessage === t('FormatEmailWrong')) &&
              errorMessage
            }
          />
          <TextInputCustom
            placeholder={i18nRegisterPass}
            autoCapitalize="none"
            value={password}
            inputStyle={styles.placeholder}
            secureTextEntry={true}
            placeholderTextColor={Colors.textColor.gray6}
            onChangeText={setPassword}
            errorText={
              ((password === '' && errorMessage !== '') ||
                errorMessage === i18nRegisterPassowrdWrong) &&
              errorMessage
            }
          />
          <TextInputCustom
            placeholder={i18nRegisterConfPass}
            autoCapitalize="none"
            value={confirmPassword}
            inputStyle={styles.placeholder}
            secureTextEntry={true}
            placeholderTextColor={Colors.textColor.gray6}
            onChangeText={setConfirmPassword}
            errorText={
              ((confirmPassword === '' && errorMessage !== '') ||
                errorMessage === passMismatch) &&
              errorMessage
            }
          />
          <TextInputCustom
            // style={{marginVertical: 11}}
            placeholder={
              // t('IdPassportNo')
              i18nRegisterIdPassportNo
            }
            value={idCardNumber}
            placeholderTextColor={Colors.textColor.gray6}
            inputStyle={styles.placeholder}
            onChangeText={value => setIdCardNumber(value)}
            // errorText={errorMessage?.idCardNumber}
            errorText={
              idCardNumber === '' && errorMessage !== '' && errorMessage
            }
          />
          <Text style={[styles.infoTitle, {marginVertical: 10}]}>
            {/* {`${t('UnitInformation')} *`} */}
            {`${i18nRegisterUnitInformation} *`}
          </Text>
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
          <Ripple
            style={[
              styles.selector,
              blockItem.name === i18nRegisterBlock &&
                errorMessage !== '' && {borderWidth: 0.5, borderColor: 'red'},
              {marginBottom: 25},
            ]}
            onPress={() => {
              blockModalVisible.open();
            }}>
            <Text
              style={[
                styles.textSelector,
                {
                  color:
                    blockItem.name === i18nRegisterBlock
                      ? Colors.textColor.gray7
                      : Colors.black,
                },
              ]}>
              {blockItem.name}
            </Text>
            <Image
              source={Arrow_down_open}
              style={[
                styles.imageArrowDown,
                {
                  tintColor:
                    blockItem.name === i18nRegisterBlock
                      ? Colors.grayArrow
                      : Colors.mainColor,
                },
              ]}
            />
          </Ripple>
          <Ripple
            style={[
              styles.selector,
              unitItem.name === i18nRegisterUnit &&
                errorMessage !== '' && {borderWidth: 0.5, borderColor: 'red'},
            ]}
            onPress={() => {
              unitModalVisible.open();
            }}>
            <Text
              style={[
                styles.textSelector,
                {
                  color:
                    unitItem.name === i18nRegisterUnit
                      ? Colors.textColor.gray7
                      : Colors.black,
                },
              ]}>
              {unitItem.name}
            </Text>
            <Image
              source={Arrow_down_open}
              style={[
                styles.imageArrowDown,
                {
                  tintColor:
                    unitItem.name === i18nRegisterUnit
                      ? Colors.grayArrow
                      : Colors.mainColor,
                },
              ]}
            />
          </Ripple>
          <View style={styles.radioForm}>
            <CheckBox
              checked={radioOption === 0}
              containerStyle={{
                borderWidth: 0,
                backgroundColor: 'transparent',
                marginLeft: 0,
              }}
              textStyle={{
                fontSize: Fonts.size.h5,
                fontFamily: Fonts.type.medium,
                color: Colors.black,
              }}
              title={
                // t('Rent')
                i18nRegisterRe
              }
              checkedIcon={<CheckedIcon />}
              uncheckedIcon={<UncheckedIcon />}
              onPress={() => {
                setRadioOption(0);
              }}
            />
            <CheckBox
              checkedIcon={<CheckedIcon />}
              uncheckedIcon={<UncheckedIcon />}
              containerStyle={{
                borderWidth: 0,
                backgroundColor: 'transparent',
                marginLeft: 0,
              }}
              textStyle={{
                fontSize: Fonts.size.h5,
                fontFamily: Fonts.type.medium,
                color: Colors.black,
              }}
              checked={radioOption === 1}
              title={
                // t('Buy')
                i18nRegisterBu
              }
              onPress={() => setRadioOption(1)}
            />
          </View>
          {radioOption == 0 && (
            <View style={styles.periodContent}>
              <View style={styles.dateFrom}>
                <TextInput
                  ref={dayFromRef}
                  style={[
                    styles.dateInput,
                    dayFrom === '' &&
                      errorMessage !== '' && {
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'red',
                      },
                  ]}
                  placeholder="dd"
                  maxLength={2}
                  keyboardType="numeric"
                  value={dayFrom}
                  inputStyle={styles.placeholder}
                  placeholderTextColor={Colors.textColor.gray6}
                  onChangeText={text => {
                    setDayFrom(text);
                    text.length > 1 && monthFromRef.current.focus();
                  }}
                />
                <Text style={styles.separate}>/</Text>
                <TextInput
                  ref={monthFromRef}
                  style={[
                    styles.dateInput,
                    monthFrom === '' &&
                      errorMessage !== '' && {
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'red',
                      },
                  ]}
                  placeholder="mm"
                  maxLength={2}
                  keyboardType="numeric"
                  value={monthFrom}
                  inputStyle={styles.placeholder}
                  placeholderTextColor={Colors.textColor.gray6}
                  onChangeText={text => {
                    setMonthFrom(text);
                    text.length > 1 && yearFromRef.current.focus();
                  }}
                />
                <Text style={styles.separate}>/</Text>
                <TextInput
                  ref={yearFromRef}
                  style={[
                    styles.dateInput,
                    yearFrom === '' &&
                      errorMessage !== '' && {
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'red',
                      },
                    {width: wpc(55)},
                  ]}
                  placeholder="yyyy"
                  maxLength={4}
                  keyboardType="numeric"
                  value={yearFrom}
                  inputStyle={styles.placeholder}
                  placeholderTextColor={Colors.textColor.gray6}
                  onChangeText={text => {
                    setYearFrom(text);
                    text.length > 3 && dayEndRef.current.focus();
                  }}
                />
              </View>
              <Text style={styles.periodTo}>
                {/* {t('To')} */}
                {i18nRegisterTo}
              </Text>
              <View style={styles.dateEnd}>
                <TextInput
                  ref={dayEndRef}
                  style={[
                    styles.dateInput,
                    dayEnd === '' &&
                      errorMessage !== '' && {
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'red',
                      },
                  ]}
                  placeholder="dd"
                  maxLength={2}
                  keyboardType="numeric"
                  value={dayEnd}
                  inputStyle={styles.placeholder}
                  placeholderTextColor={Colors.textColor.gray6}
                  onChangeText={text => {
                    setDayEnd(text);
                    text.length > 1 && monthEndRef.current.focus();
                  }}
                />
                <Text style={styles.separate}>/</Text>
                <TextInput
                  ref={monthEndRef}
                  style={[
                    styles.dateInput,
                    monthEnd === '' &&
                      errorMessage !== '' && {
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'red',
                      },
                  ]}
                  placeholder="mm"
                  maxLength={2}
                  keyboardType="numeric"
                  value={monthEnd}
                  inputStyle={styles.placeholder}
                  placeholderTextColor={Colors.textColor.gray6}
                  onChangeText={text => {
                    setMonthEnd(text);
                    text.length > 1 && yearEndRef.current.focus();
                  }}
                />
                <Text style={styles.separate}>/</Text>
                <TextInput
                  ref={yearEndRef}
                  style={[
                    styles.dateInput,
                    yearEnd === '' &&
                      errorMessage !== '' && {
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'red',
                      },
                    {width: wpc(55)},
                  ]}
                  placeholder="yyyy"
                  maxLength={4}
                  keyboardType="numeric"
                  value={yearEnd}
                  inputStyle={styles.placeholder}
                  placeholderTextColor={Colors.textColor.gray6}
                  onChangeText={setYearEnd}
                />
              </View>
            </View>
          )}
          <Text style={styles.attachText}>
            {/* {`${t('AttachYourIdCardImage')} *`} */}
            {`${i18nRegisterAttachIPImages} *`}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{padding: 10}}>
              <CardImage
                size="M"
                imageUrl={firstIdc?.uri || ''}
                fixedWidth
                style={
                  !firstIdc &&
                  errorMessage !== '' && {
                    borderWidth: 1,
                    borderColor: Colors.red,
                  }
                }
                disabled={firstIdc ? true : false}
                onDelete={() => {
                  // firstIdc && onDeletePhoto(firstIdc.id, 'firstIdc');
                  setFirstIdc(null);
                }}
                onPress={() => selectPhoto('fontImage')}
              />
            </View>
            <View style={{padding: 10}}>
              <CardImage
                size="M"
                imageUrl={secondIdc?.uri || ''}
                fixedWidth
                style={
                  !secondIdc &&
                  errorMessage !== '' && {
                    borderWidth: 1,
                    borderColor: Colors.red,
                  }
                }
                disabled={secondIdc ? true : false}
                onDelete={() => {
                  // secondIdc && onDeletePhoto(secondIdc.id, 'secondIdc');
                  setSecondIdc(null);
                }}
                onPress={() => selectPhoto('backImage')}
              />
            </View>
          </View>
          <Text style={styles.attachText}>
            {/* {`${t('AttachYourContractImage')} *`} */}
            {`${i18nRegisterAttachCImages} *`}
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{flexDirection: 'row'}}>
            {imageContractArray?.map((item, index) => {
              return (
                <View style={{padding: 10}}>
                  <CardImage
                    size="M"
                    imageUrl={item?.uri || ''}
                    fixedWidth
                    disabled={item ? true : false}
                    onDelete={() => {
                      // onDeletePhoto(item.id, 'contractImage', index);
                      imageContractArray.splice(index, 1);
                      setImageContractArray([...imageContractArray]);
                    }}
                    onPress={() => selectPhoto('contractImage')}
                  />
                </View>
              );
            })}
            {imageContractArray.length < 20 && (
              <View style={{padding: 10}}>
                <CardImage
                  size="M"
                  imageUrl={''}
                  fixedWidth
                  style={
                    imageContractArray.length < 1 &&
                    errorMessage !== '' && {
                      borderWidth: 1,
                      borderColor: Colors.red,
                    }
                  }
                  onPress={() => selectPhoto('contractImage')}
                />
              </View>
            )}
          </ScrollView>
          <View style={styles.submitBox}>
            <OutlineButton
              style={styles.cancelButton}
              title={
                // t('Cancel')
                i18nRegisterCancel
              }
              onPress={onCancel}
            />
            <FullButton
              style={styles.submitButton}
              title={
                // t('Save')
                i18nRegisterConfirm
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
      <ModalSelector
        setModal={setModal}
        setItem={setValue}
        data={GENDER}
        checkData={genderItem}
        modalVisible={genderModalVisible}
        keyword={'gender'}
        translate={t}
      />
      <ModalSelector
        setModal={setModal}
        setItem={setValue}
        data={blockList}
        checkData={blockItem}
        modalVisible={blockModalVisible}
        keyword={'block'}
      />
      <ModalSelector
        setModal={setModal}
        setItem={setValue}
        data={getUnitData?.items}
        checkData={unitItem}
        modalVisible={unitModalVisible}
        keyword={'unit'}
      />
      {getUnitProgress && getCountryProgress && <DimSpinnerView />}
      {getUploadImageProgress && <DimSpinnerView />}
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
    ...Fonts.style.largeTitle,
    color: Colors.gray1,
    paddingVertical: 30,
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
    color: Colors.gray7,
    paddingBottom: 10,
  },
  textRequired: {
    color: Colors.red,
    fontSize: Fonts.size.h5,
    paddingBottom: 20,
  },
  infoTitle: {
    fontSize: Fonts.size.h4,
    color: Colors.black,
    paddingTop: 5,
    paddingBottom: 10,
  },
  radioForm: {
    marginVertical: 10,
    flexDirection: 'row',
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
  attachText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    paddingVertical: 25,
  },
  periodContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateFrom: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: Fonts.size.h4,
  },
  dateEnd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    // width:
    //   Platform.OS === 'ios'
    //     ? ApplicationStyles.utils.resizeWidth(30)
    //     : ApplicationStyles.utils.resizeWidth(26),
    paddingBottom: Platform.OS === 'ios' ? 2 : 0,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray4,
    width: wpc(40),
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  periodTo: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
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
