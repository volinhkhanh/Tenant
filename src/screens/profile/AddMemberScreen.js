import React, {useState, memo, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import randomString from 'random-string';
import Ripple from 'react-native-material-ripple';
//
import TextInputCustom from '../../components/TextInput';
import CardImage from '../../components/card/CardImage';
import FullButton from '../../components/FullButton';
import OutlineButton from '../../components/OutlineButton';
import ModalSelector from '../../components/modal/ModalSelector';
import Arrow_down_open from '../../components/icons/images/arrow_down_open.png';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes';
//
import Layouts from '../../constants/Layouts';
//
import SelectPhoto from '../../utils/choosePhoto';
//
import {useTranslation} from '../../context/LanguageContext';
//
import {KeyboardAvoidingView} from '../utils';
//
const emailRegexp = new RegExp(/[\w\.-]+@([\w\-]+\.)+[A-Za-z]{2,4}/);
const phoneRegexp = new RegExp(/(84|\+84|0)(\d{9})/);
const dateReg = /^\d{2}([/])\d{2}\1\d{4}$/;
var scroll = null;
const {width} = Layouts;
//
function AddMemberScreen(props) {
  const {
    navigation,
    getCountries,
    getCountryData,
    getCountryProgress,
    postUploadImage,
    getUploadImageProgress,
    deleteImage,
    getDeleteImageProgress,
    getDeleteImageData,
    getGeneralInformationData,
    uploadFontImageData,
    uploadBackImageData,
    setUploadImageData,
  } = props;
  const dayDobRef = React.useRef();
  const monthDobRef = React.useRef();
  const yearDobRef = React.useRef();
  //
  const {
    t,
    i18nAddMemberAM,
    i18nAddMemberPFOTRF,
    i18nAddMemberUN,
    i18nAddMemberFiN,
    i18nAddMemberLaN,
    i18nAddMemberCo,
    i18nAddMemberGe,
    i18nAddMemberMa,
    i18nAddMemberFe,
    i18nAddMemberDOB,
    i18nAddMemberPh,
    i18nAddMemberEm,
    i18nAddMemberIPN,
    i18nAddMemberAICIBD,
    i18nAddMemberCa,
    i18nAddMemberAp,
    itemRequired,
  } = useTranslation();
  //
  const GENDER = [
    {
      id: 1,
      name: i18nAddMemberMa,
    },
    {
      id: 2,
      name: i18nAddMemberFe,
    },
  ];
  //
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [yearDob, setYearDob] = useState('');
  const [monthDob, setMonthDob] = useState('');
  const [dayDob, setDayDob] = useState('');
  const [email, setEmail] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [ageError, setAgeError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //
  const [countryItem, setCountryItem] = useState({
    id: null,
    name: i18nAddMemberCo,
  });
  const [genderItem, setGenderItem] = useState({
    id: '0',
    name: i18nAddMemberGe,
  });
  //
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [imageFirst, setImageFirst] = useState(null);
  const [imageSecond, setImageSecond] = useState(null);
  const [index, setIndex] = useState(0);
  const onCancel = () => navigation.pop();
  //
  const actionRegister = async () => {
    if (
      firstName === '' ||
      lastName === '' ||
      countryItem.name === i18nAddMemberCo ||
      genderItem.name === i18nAddMemberGe ||
      phoneNumber === '' ||
      email === '' ||
      idCardNumber === '' ||
      idCardNumber === '' ||
      !imageFirst ||
      !imageSecond ||
      dayDob === '' ||
      monthDob === '' ||
      yearDob === ''
    ) {
      // setErrorMessage(`${t('ItemsAreRequired')}`);
      setErrorMessage(itemRequired)
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
        apartment_id: 1,
        // 'building_id': getGeneralInformationData.building_id,
        building_id: 1,
        // 'unit_id': getGeneralInformationData.unit_id,
        unit_id: 1,
        country: countryItem,
        email: email,
        id_card: idCardNumber,
        gender: genderItem,
        // 'birthday': dob,
        birthday: yearDob + '/' + monthDob + '/' + dayDob,
        imageFirst: imageFirst,
        imageSecond: imageSecond,
      };
      navigation.navigate('AddMemberConfirmation', params);
    }
  };
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
  const onDeletePhoto = async (id, value) => {
    const data = await deleteImage(id);
    if (data) {
      switch (value) {
        case 1:
          setImageFirst('');
          break;
        case 2:
          setImageSecond('');
          break;
      }
    }
  };
  //
  const selectPhoto = value => {
    if (value === 'fontImage') {
      SelectPhoto.selectPhotoTapped(uploadFontImageToServer, t);
    } else {
      SelectPhoto.selectPhotoTapped(uploadBackImageToServer, t);
    }
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
  useEffect(() => {
    getCountries();
    return () => {
      setUploadImageData(null);
    };
  }, []);
  useEffect(() => {
    uploadFontImageData &&
      setImageFirst({
        name: uploadFontImageData?.name,
        uri: uploadFontImageData?.url,
        mime_type: uploadFontImageData?.mime_type,
        is_front: 1,
      });
  }, [uploadFontImageData]);
  //
  useEffect(() => {
    uploadBackImageData &&
      setImageSecond({
        name: uploadBackImageData?.name,
        uri: uploadBackImageData?.url,
        mime_type: uploadBackImageData?.mime_type,
        is_front: 0,
      });
  }, [uploadBackImageData]);
  //
  const scrollToTop = () => {
    scroll.scrollTo({x: 0, y: 0, animated: true});
  };
  //
  const inputs = {};
  const focusNextField = id => {
    inputs[id].focus();
  };
  //
  const current_day = new Date();
  //
  return (
    <View style={styles.container}>
      <ScrollView
        ref={c => {
          scroll = c;
        }}
        contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView>
          <Text style={styles.titleText}>
            {/* {t('AddMember')} */}
            {i18nAddMemberAM}
          </Text>
          <Text style={styles.textFill}>
            {/* {t('PleaseFillOutTheRegistrationForm')} */}
            {i18nAddMemberPFOTRF}
          </Text>
          {errorMessage !== '' && (
            <Text style={styles.textRequired}>{errorMessage}</Text>
          )}
          <Text style={styles.infoTitle}>{`${i18nAddMemberUN} *`}</Text>
          <View style={styles.nameContent}>
            <View style={styles.inputName}>
              <TextInputCustom
                setRef={ref => (inputs['firstName'] = ref)}
                onSubmitEditing={() => focusNextField('lastName')}
                blurOnSubmit={false}
                returnKeyType={'next'}
                style={styles.input}
                placeholder={
                  // t('FirstName')
                  i18nAddMemberFiN
                }
                value={firstName}
                inputStyle={styles.placeholder}
                placeholderColor={Colors.gray6}
                onChangeText={setFirstName}
                errorText={
                  firstName === '' && errorMessage !== '' && errorMessage
                }
              />
            </View>
            <View style={styles.inputName}>
              <TextInputCustom
                setRef={ref => (inputs['lastName'] = ref)}
                onSubmitEditing={() => focusNextField('dob')}
                blurOnSubmit={false}
                returnKeyType={'next'}
                style={styles.input}
                placeholder={
                  // t('LastName')
                  i18nAddMemberLaN
                }
                value={lastName}
                inputStyle={styles.placeholder}
                placeholderColor={Colors.gray6}
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
              countryItem.name === i18nAddMemberCo &&
                errorMessage !== '' && {borderWidth: 0.5, borderColor: 'red'},
            ]}
            onPress={() => {
              countryModalVisible.open();
            }}>
            <Text
              style={[
                styles.textSelector,
                {
                  color:
                    countryItem.name === i18nAddMemberCo
                      ? Colors.textColor.gray3
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
                    countryItem.name === i18nAddMemberCo
                      ? Colors.grayArrow
                      : Colors.mainColor,
                },
              ]}
            />
          </Ripple>
          <Ripple
            style={[
              styles.selector,
              genderItem.name === i18nAddMemberGe &&
                errorMessage !== '' && {borderWidth: 0.5, borderColor: 'red'},
            ]}
            onPress={() => {
              genderModalVisible.open();
            }}>
            <Text
              style={[
                styles.textSelector,
                {
                  color:
                    genderItem.name === i18nAddMemberGe
                      ? Colors.textColor.gray3
                      : Colors.black,
                },
              ]}>
              {genderItem.name}
            </Text>
            <Image
              source={Arrow_down_open}
              style={[
                styles.imageArrowDown,
                {
                  tintColor:
                    genderItem.name === i18nAddMemberGe
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
              {i18nAddMemberDOB}:{' '}
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
                  {width: 42},
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
                }}
              />
            </View>
          </View>
          <TextInputCustom
            setRef={ref => (inputs['phoneNumber'] = ref)}
            onSubmitEditing={() => focusNextField('email')}
            blurOnSubmit={false}
            returnKeyType={'next'}
            style={{marginVertical: 11}}
            placeholder={
              // t('PhoneNo')
              i18nAddMemberPh
            }
            value={phoneNumber}
            inputStyle={styles.placeholder}
            placeholderColor={Colors.gray6}
            onChangeText={setPhoneNumber}
            errorText={
              ((phoneNumber === '' && errorMessage !== '') ||
                errorMessage === t('LengthPhoneWrong') ||
                errorMessage === t('FormatPhoneWrong')) &&
              errorMessage
            }
          />
          <TextInputCustom
            setRef={ref => (inputs['email'] = ref)}
            onSubmitEditing={() => focusNextField('idCardNumber')}
            blurOnSubmit={false}
            returnKeyType={'next'}
            style={{marginVertical: 11}}
            placeholder={
              // t('Email')
              i18nAddMemberEm
            }
            value={email}
            inputStyle={styles.placeholder}
            placeholderColor={Colors.gray6}
            autoCapitalize="none"
            onChangeText={setEmail}
            errorText={
              ((email === '' && errorMessage !== '') ||
                errorMessage === t('FormatEmailWrong')) &&
              errorMessage
            }
          />
          <TextInputCustom
            setRef={ref => (inputs['idCardNumber'] = ref)}
            style={{marginVertical: 11}}
            placeholder={
              // t('IdPassportNo')
              i18nAddMemberIPN
            }
            value={idCardNumber}
            inputStyle={styles.placeholder}
            placeholderColor={Colors.gray6}
            onChangeText={value => setIdCardNumber(value)}
            errorText={
              idCardNumber === '' && errorMessage !== '' && errorMessage
            }
          />
          <Text style={[styles.infoTitle, {paddingBottom: 20}]}>
            {`${i18nAddMemberAICIBD} *`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <CardImage
              size="M"
              imageUrl={imageFirst?.uri || ''}
              fixedWidth
              style={
                !imageFirst &&
                errorMessage !== '' && {borderWidth: 1, borderColor: Colors.red}
              }
              disabled={imageFirst ? true : false}
              onDelete={() => {
                setImageFirst(null);
              }}
              onPress={() => {
                !imageFirst && selectPhoto('fontImage');
              }}
            />
            <CardImage
              size="M"
              imageUrl={imageSecond?.uri || ''}
              fixedWidth
              style={
                !imageSecond &&
                errorMessage !== '' && {borderWidth: 1, borderColor: Colors.red}
              }
              disabled={imageSecond ? true : false}
              onDelete={() => {
                setImageSecond(null);
              }}
              onPress={() => {
                !imageSecond && selectPhoto('backImage');
              }}
            />
          </View>
          <View style={styles.submitBox}>
            <OutlineButton
              style={styles.cancelButton}
              title={
                // t('Cancel')
                i18nAddMemberCa
              }
              onPress={onCancel}
            />
            <FullButton
              style={styles.submitButton}
              title={
                // t('Apply')
                i18nAddMemberAp
              }
              onPress={actionRegister}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <ModalSelector
        setModal={setModal}
        setItem={setValue}
        data={getCountryData?.items || []}
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
      {getUploadImageProgress && <DimSpinnerView />}
      {getDeleteImageProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default memo(AddMemberScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 100,
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
    marginTop: 40,
    marginBottom: 20,
  },
  datepicker: {
    position: 'relative',
    zIndex: 4,
    paddingVertical: 5,
  },
  submitBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(40),
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
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  textSelector: {
    fontSize: Fonts.size.h4,
    color: Colors.textColor.gray7,
    fontFamily: Fonts.type.base,
  },
  textAlert: {
    color: Colors.red,
    fontSize: Fonts.size.h5,
    paddingBottom: 20,
  },
  textGray: {
    color: Colors.gray7,
    fontSize: Fonts.size.h5,
    paddingBottom: 20,
  },
  imageArrowDown: {
    width: 25,
    height: 25,
  },
  input: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h1,
    color: Colors.gray6,
    marginVertical: 11,
  },
  placeholder: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    lineHeight: ApplicationStyles.utils.resizeHeight(20),
    color: Colors.black,
  },
  infoTitle: {
    fontSize: Fonts.size.h4,
    color: Colors.black,
    marginTop: 10,
    fontFamily: Fonts.type.base,
  },
  textRequired: {
    color: Colors.red,
    fontSize: Fonts.size.h5,
  },
  textFill: {
    fontSize: Fonts.size.h4,
    color: Colors.gray7,
    paddingBottom: 10,
    fontFamily: Fonts.type.base,
  },
  nameContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputName: {
    width: (width - 50) / 2 - 20,
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
});
