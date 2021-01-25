import React, {useState, memo, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
//
import {CheckBox} from 'react-native-elements';
//
import Layouts from '../../constants/Layouts';
import TextInputCustom from '../../components/TextInput';
import CardImage from '../../components/card/CardImage';
import FullButton from '../../components/FullButton';
import OutlineButton from '../../components/OutlineButton';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {KeyboardAvoidingView} from '../utils';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes';
//
import SelectPhoto from '../../utils/choosePhoto';
//
import {useTranslation} from '../../context/LanguageContext';
//
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
    getUnitProgress,
    getCountryProgress,
    postUploadImage,
    getUploadImageProgress,
    uploadImageData,
  } = props;
  //
  const dayFromRef = useRef();
  const monthFromRef = useRef();
  const yearFromRef = useRef();
  const dayEndRef = useRef();
  const monthEndRef = useRef();
  const yearEndRef = useRef();
  //
  const {
    t,
    i18nRegisterPleaseFill,
    i18nRegisterRe,
    i18nRegisterBu,
    i18nRegisterTo,
    i18nRegisterAttachCImages,
    i18nRegisterCancel,
    i18nRegisterOnlineRegister,
    i18nRegisterConfirm,
  } = useTranslation();
  //
  const [firstName, setFirstName] = useState('');
  const [radioOption, setRadioOption] = useState(0);
  const [imageContractArray, setImageContractArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  //
  const [yearFrom, setYearFrom] = useState('');
  const [monthFrom, setMonthFrom] = useState('');
  const [dayFrom, setDayFrom] = useState('');
  const [yearEnd, setYearEnd] = useState('');
  const [monthEnd, setMonthEnd] = useState('');
  const [dayEnd, setDayEnd] = useState('');
  //
  const onCancel = () => navigation.pop();
  //
  const actionRegister = async () => {
    if (
      (radioOption == 0 &&
        (dayFrom === '' ||
          monthFrom === '' ||
          yearFrom === '' ||
          dayEnd === '' ||
          monthEnd === '' ||
          yearEnd === ''))
    ) {
      setErrorMessage(i18nRegisterPleaseFill);
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
        rent_start_date: rentStartDate,
        rent_end_date: rentEndDate,
      };
      navigation.navigate('RegisterConfirm', {
        params,
        contract: imageContractArray,
      });
    }
  };
  //
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
  const selectPhoto = async value => {
    setTypeImage(value);
    if (value === 'contractImage') {
      SelectPhoto.selectPhotoTapped(uploadContractImageToServer, t);
    }
  };
  //
  const scrollToTop = () => {
    scroll.scrollTo({x: 0, y: 0, animated: true});
  };
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
              >3</Text>/3
            </Text>
          </View>
          {errorMessage !== '' && (
            <Text style={styles.textRequired}>
              {errorMessage}
            </Text>
          )}
          <Text style={styles.infoTitle}>
            {`Contract information*`}
          </Text>
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
                    {width: 30},
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
                    {width: 45},
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
                    {width: 30},
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
                    {width: 45},
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
          <View style={styles.inputName}>
            <TextInputCustom
              placeholder={'Price (VND)'}
              value={firstName}
              inputStyle={styles.placeholder}
              placeholderTextColor={Colors.textColor.gray6}
              onChangeText={setFirstName}
              errorText={
                firstName === '' && errorMessage !== '' && errorMessage
              }
            />
          </View>
          <Text style={styles.attachText}>
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
                i18nRegisterConfirm
              }
              onPress={actionRegister}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
    paddingTop: 25,
    paddingVertical: 10,
  },
  radioForm: {
    marginVertical: 10,
    flexDirection: 'row',
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
    paddingTop: 25,
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
  periodTo: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
  separate: {
    color: Colors.gray7,
  },
  inputName: {
    marginTop: 30,
  },
  textFillContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
