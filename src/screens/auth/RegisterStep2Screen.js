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
import TextInputCustom from '../../components/TextInput';
import CardImage from '../../components/card/CardImage';
import FullButton from '../../components/FullButton';
import OutlineButton from '../../components/OutlineButton';
import ModalSelector from '../../components/modal/ModalSelector';
import Arrow_down_open from '../../components/icons/images/arrow_down_open.png';
import VnFlag from '../../components/icons/images/vnFlag.png';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {KeyboardAvoidingView} from '../utils';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes';
//
import Layouts from '../../constants/Layouts';
//
import SelectPhoto from '../../utils/choosePhoto';
//
import {useTranslation} from '../../context/LanguageContext';
//
const emailRegexp = new RegExp(/[\w\.-]+@([\w\-]+\.)+[A-Za-z]{2,4}/);
const phoneRegexp = new RegExp(/(84|\+84|0)(\d{9})/);
var scroll = null;
const {width} = Layouts;
//
function RegisterScreen(props) {
  const {
    navigation,
    getCountries,
    getCountryData,
    getUnitProgress,
    getCountryProgress,
    getRegisterSession,
    postUploadImage,
    getUploadImageProgress,
    uploadImageData,
    uploadFontImageData,
    uploadBackImageData,
    setUploadImageData,
    setApartmentRegister,
  } = props;
  //
  const dayDobRef = useRef();
  const monthDobRef = useRef();
  const yearDobRef = useRef();
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
    i18nRegisterAttachIPImages,
    i18nRegisterAttachCImages,
    i18nRegisterCancel,
    i18nRegisterOnlineRegister,
    i18nRegisterConfirm,
  } = useTranslation();
  //
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [firstIdc, setFirstIdc] = useState(null);
  const [secondIdc, setSecondIdc] = useState(null);
  const [imageContractArray, setImageContractArray] = useState([]);
  const [typeImage, setTypeImage] = useState('');
  const [ageError, setAgeError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //
  const [yearDob, setYearDob] = useState('');
  const [monthDob, setMonthDob] = useState('');
  const [dayDob, setDayDob] = useState('');
  //
  const [countryItem, setCountryItem] = useState({
    id: '0',
    name: i18nRegisterCountryOfOrigin,
  });
  const [genderItem, setGenderItem] = useState({
    id: '0',
    name: i18nRegisterGender,
  });
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
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
      idCardNumber === '' ||
      idCardNumber === '' ||
      !firstIdc ||
      !secondIdc ||
      dayDob === '' ||
      monthDob === '' ||
      yearDob === ''
    ) {
      setErrorMessage(i18nRegisterPleaseFill);
      scrollToTop();
    } else if (
      current_day.getFullYear() - yearDob < 19 ||
      current_day.getFullYear() - yearDob > 100
    ) {
      setAgeError('Your age should be more than 18.');
      setErrorMessage('Your age should be more than 18.');
      scrollToTop();
    } else if (
      phoneNumber !== '' &&
      (phoneNumber.replace('+', '').length < 9 ||
        phoneNumber.replace('+', '').length > 12)
    ) {
      setErrorMessage(t('LengthPhoneWrong'));
      scrollToTop();
    } else if (phoneNumber !== '' && !phoneRegexp.test(phoneNumber)) {
      setErrorMessage(t('FormatPhoneWrong'));
      scrollToTop();
    } else if (!emailRegexp.test(email)) {
      setErrorMessage(t('FormatEmailWrong'));
      scrollToTop();
    } else {
      setAgeError('');
      setErrorMessage('');
      const params = {
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        id_card: idCardNumber,
        country_id: countryItem,
        email: email,
        gender: genderItem,
        birthday: yearDob + '-' + monthDob + '-' + dayDob,
      };
      navigation.navigate('RegisterConfirm', {
        params,
        firstIdc: firstIdc,
        secondIdc: secondIdc,
      });
    }
  };
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
    if (value === 'fontImage') {
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
            {i18nRegisterOnlineRegister}
          </Text>
          <View style={styles.textFillContent}>
            <Text style={styles.textFill}>
              {i18nRegisterPleaseFill}
            </Text>
            <Text style={styles.textFill}>
              <Text
                style={{fontFamily: Fonts.type.bold, color: Colors.black}}
              >2</Text>/3
            </Text>
          </View>
          {errorMessage !== '' && (
            <Text style={styles.textRequired}>
              {errorMessage}
            </Text>
          )}
          <Text style={styles.infoTitle}>
            {`${i18nRegisterUnitInformation} *`}
          </Text>
          <View style={styles.nameContent}>
            <View style={styles.inputName}>
              <TextInputCustom
                style={{marginVertical: 11}}
                placeholder={
                  i18nRegisterFirstName
                }
                value={firstName}
                inputStyle={styles.placeholder}
                placeholderTextColor={Colors.textColor.gray6}
                onChangeText={setFirstName}
                errorText={
                  firstName === '' && errorMessage !== '' && errorMessage
                }
              />
            </View>
            <View style={styles.inputName}>
              <TextInputCustom
                style={{marginVertical: 11}}
                placeholder={
                  i18nRegisterLastName
                }
                value={lastName}
                inputStyle={styles.placeholder}
                placeholderTextColor={Colors.textColor.gray6}
                onChangeText={setLastName}
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
                  {width: 30},
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
                  {width: 45},
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
          <View style={{flexDirection: 'row'}}>
            <Ripple
              style={[
                styles.selector,
                {justifyContent: 'flex-start', paddingVertical: 0},
                genderItem.name === i18nRegisterGender &&
                  errorMessage !== '' && {
                    borderWidth: 0.5,
                    borderColor: 'red',
                  },
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
              ]}>
              <Text>+84</Text>
              <TextInput
                placeholder={'000 000 000'}
                style={[
                  styles.textSelector,
                  {color: Colors.black, paddingVertical: 13, paddingHorizontal: 5}
                ]}>

              </TextInput>
            </View>
          </View>
          <TextInputCustom
            placeholder={
              i18nRegisterPhone
            }
            value={phoneNumber}
            inputStyle={styles.placeholder}
            placeholderTextColor={Colors.textColor.gray6}
            onChangeText={setPhoneNumber}
            errorText={
              ((phoneNumber === '' && errorMessage !== '') ||
                errorMessage === t('LengthPhoneWrong') ||
                errorMessage === t('FormatPhoneWrong')) &&
              errorMessage
            }
          />
          <TextInputCustom
            placeholder={
              i18nRegisterEmail
            }
            autoCapitalize="none"
            value={email}
            inputStyle={styles.placeholder}
            placeholderTextColor={Colors.textColor.gray6}
            onChangeText={setEmail}
            errorText={
              ((email === '' && errorMessage !== '') ||
                errorMessage === t('FormatEmailWrong')) &&
              errorMessage
            }
          />
          <TextInputCustom
            placeholder={
              'Set your password'
            }
            autoCapitalize="none"
            value={email}
            inputStyle={styles.placeholder}
            placeholderTextColor={Colors.textColor.gray6}
            onChangeText={setEmail}
            errorText={
              ((email === '' && errorMessage !== '') ||
                errorMessage === t('FormatEmailWrong')) &&
              errorMessage
            }
          />
          <TextInputCustom
            placeholder={
              'Confirm your password'
            }
            autoCapitalize="none"
            value={email}
            inputStyle={styles.placeholder}
            placeholderTextColor={Colors.textColor.gray6}
            onChangeText={setEmail}
            errorText={
              ((email === '' && errorMessage !== '') ||
                errorMessage === t('FormatEmailWrong')) &&
              errorMessage
            }
          />
          <TextInputCustom
            placeholder={
              i18nRegisterIdPassportNo
            }
            value={idCardNumber}
            placeholderTextColor={Colors.textColor.gray6}
            inputStyle={styles.placeholder}
            onChangeText={value => setIdCardNumber(value)}
            errorText={
              idCardNumber === '' && errorMessage !== '' && errorMessage
            }
          />
          <Text style={styles.attachText}>
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
                  setSecondIdc(null);
                }}
                onPress={() => selectPhoto('backImage')}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
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
              i18nRegisterConfirm
            }
            onPress={actionRegister}
          />
        </View>
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
      {getUnitProgress && getCountryProgress && <DimSpinnerView />}
      {getUploadImageProgress && <DimSpinnerView />}
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
  titleText: {
    ...Fonts.style.largeTitle,
    color: Colors.gray1,
    paddingVertical: 30,
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
  dateFrom: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: Fonts.size.h4,
  },
  dateInput: {
    width:
      Platform.OS === 'ios'
        ? ApplicationStyles.utils.resizeWidth(30)
        : ApplicationStyles.utils.resizeWidth(26),
    paddingBottom: Platform.OS === 'ios' ? 2 : 0,
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray4,
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
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
  textFillContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
