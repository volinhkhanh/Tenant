import React, {useState, useEffect} from 'react';
import randomString from 'random-string';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {CheckBox, Input} from 'react-native-elements';
//
import Arrow_down_open from '../../components/icons/images/arrow_down_open.png';
import ModalSelector from '../../components/modal/ModalSelector';
import FullButton from '../../components/FullButton';
import OutlineButton from '../../components/OutlineButton';
import {SearchIcon} from '../../components/icons';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes/';
//
import {KeyboardAvoidingView} from '../utils';
import {useTranslation} from '../../context/LanguageContext';
import AlertConfirm from '../../components/alert/AlertConfirm';

const UncheckedIcon = () => (
  <View
    style={{
      borderColor: Colors.mainColor,
      height: 17,
      width: 17,
      borderWidth: 1,
      borderRadius: 12,
    }}
  />
);
//
const CheckedIcon = () => (
  <View
    style={{
      borderColor: Colors.mainColor,
      height: 17,
      width: 17,
      borderWidth: 1,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View
      style={{
        backgroundColor: Colors.mainColor,
        height: 9,
        width: 9,
        borderRadius: 12,
      }}
    />
  </View>
);
export default FindIDAndPasswordScreen;
function FindIDAndPasswordScreen(props) {
  const {
    navigation,
    getBlockData,
    getBlock,
    getApartmentFindIdData,
    setApartmentFindID,
    postOTP,
  } = props;
  const {
    t,
    findIdOrPass,
    pleaseSelect,
    findIdId,
    findIdPassword,
    apartmentName,
    block,
    findIdFullName,
    findIdPhone,
    findIDCancel,
    getOTP,
    ItemsAreRequired,
  } = useTranslation();
  const [value3Index, setValue3Index] = useState(0);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onBlurAptInput = () =>
    navigation.navigate('SearchApartment', {type: 'findId'});
  const onPressBack = () => navigation.pop();

  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [blockItem, setBlockItem] = useState({id: null, name: block});
  const [blockList, setBlockList] = useState([]);
  const [required, setRequired] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  //
  const onPressNext = async() => {
    if (
      fullName !== '' &&
      phoneNumber !== '' &&
      getApartmentFindIdData &&
      blockItem.id
    ) {
      const params = {
        phone: phoneNumber,
        apartment_id: getApartmentFindIdData.id,
        building_id: blockItem.id,
        full_name: fullName,
      }
      const data = await postOTP(t, params)
      if(data) {
        navigation.push('OtpVerification', {
          params,
          type: value3Index,
        });
      } else {
        setAlertShow(true)
      }
    } else {
      setRequired(true);
    }
  };
  const setValue = (keyword, val) => {
    switch (keyword) {
      case 'block':
        setBlockItem(val);
        break;
    }
  };
  const setModal = (keyword, val) => {
    switch (keyword) {
      case 'block':
        setBlockModalVisible(val);
        break;
    }
  };
  //
  useEffect(() => {
    return () => {
      setApartmentFindID(null);
    };
  }, []);
  //
  useEffect(() => {
    const apartmentItem = getApartmentFindIdData;
    if (apartmentItem) {
      getBlock({
        apartment_id: apartmentItem?.id || null,
      });
    }
  }, [getApartmentFindIdData]);
  //
  useEffect(() => {
    setBlockList(getBlockData?.items || []);
  }, [getBlockData]);
  //
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.titleText}>
              {/* {t('FindIdOrPassword')} */}
              {findIdOrPass}
            </Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                {/* {t('PleaseSelectTheSectionToFind')} */}
                {pleaseSelect}
              </Text>
              {required && (
                // <Text style={styles.alertText}>*{t('AllFieldsAreRequired')}</Text>
                <Text style={styles.alertText}>{ItemsAreRequired}</Text>
              )}
            </View>
            <View style={styles.formBox}>
              <CheckBox
                checked={value3Index === 0}
                containerStyle={{
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                  marginLeft: 0,
                }}
                textStyle={{
                  fontSize: Fonts.size.h4,
                  fontFamily: Fonts.type.medium,
                  color: Colors.black,
                }}
                title={findIdId}
                checkedIcon={<CheckedIcon />}
                uncheckedIcon={<UncheckedIcon />}
                onPress={() => {
                  setValue3Index(0);
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
                  fontSize: Fonts.size.h4,
                  fontFamily: Fonts.type.medium,
                  color: Colors.black,
                }}
                checked={value3Index === 1}
                title={
                  // t('Password')
                  findIdPassword
                }
                onPress={() => setValue3Index(1)}
              />
              {/* <Input
                placeholder={t('ApartmentName')}
                rightIcon={{
                  type: 'font-awesome',
                  name: 'search',
                  size: ApplicationStyles.utils.resizeWidth(16),
                  color: getApartmentFindIdData
                    ? Colors.mainColor
                    : Colors.lighterTiny,
                  paddingRight: ApplicationStyles.utils.resizeWidth(16),
                }}
                read
                inputStyle={styles.textInput}
                containerStyle={styles.input}
                inputContainerStyle={{
                  borderColor: Colors.gray6,
                  borderWidth: 0.3,
                  borderRadius: 2,
                  backgroundColor: Colors.white,
                }}
                value={getApartmentFindIdData?.name || ''}
                onFocused={onBlurAptInput}
              /> */}
              <Ripple
                style={[
                  styles.selector,
                  {marginBottom: 25},
                  !getApartmentFindIdData &&
                    required && {borderWidth: 0.5, borderColor: Colors.red},
                ]}
                onPress={onBlurAptInput}>
                <Text
                  style={[
                    styles.textSelector,
                    {
                      color: !getApartmentFindIdData
                        ? Colors.textColor.gray7
                        : Colors.black,
                    },
                  ]}>
                  {getApartmentFindIdData?.name || apartmentName}
                </Text>
                <SearchIcon
                  size={24}
                  color={getApartmentFindIdData ? Colors.mainColor : '#DADADA'}
                />
              </Ripple>
              <Ripple
                style={[
                  styles.selector,
                  styles.input,
                  !blockItem.id &&
                    required && {borderWidth: 0.5, borderColor: Colors.red},
                ]}
                onPress={() => {
                  blockModalVisible.open();
                }}>
                <Text
                  style={[
                    styles.textSelector,
                    {
                      color:
                        blockItem.name === block
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
                        blockItem.name === block
                          ? Colors.grayArrow
                          : Colors.mainColor,
                    },
                  ]}
                />
              </Ripple>
              <View style={styles.identifierBox}>
                <Input
                  testID="fullname"
                  placeholder={
                    // t('FullName')
                    findIdFullName
                  }
                  // autoCapitalize = 'none'
                  placeholderTextColor={Colors.textColor.gray6}
                  inputContainerStyle={[
                    styles.textInputName,
                    {
                      borderBottomColor:
                        fullName === '' && required
                          ? Colors.red
                          : fullName
                          ? Colors.mainColor
                          : Colors.gray6,
                    },
                  ]}
                  inputStyle={styles.placeholder}
                  onChangeText={value => {
                    setFullName(value);
                  }}
                  value={fullName}
                />
                <Input
                  testID="mobileNumber"
                  placeholder={
                    // t('PhoneNumber')
                    findIdPhone
                  }
                  keyboardType="numeric"
                  placeholderTextColor={Colors.textColor.gray6}
                  inputContainerStyle={[
                    styles.textInputName,
                    {
                      borderBottomColor:
                        phoneNumber === '' && required
                          ? Colors.red
                          : phoneNumber
                          ? Colors.mainColor
                          : Colors.gray6,
                    },
                  ]}
                  inputStyle={styles.placeholder}
                  onChangeText={value => {
                    setPhoneNumber(value);
                  }}
                  value={phoneNumber}
                />
              </View>
            </View>
            <View style={styles.submitBox}>
              <OutlineButton
                style={styles.cancelButton}
                title={
                  // t('Cancel')
                  findIDCancel
                }
                onPress={onPressBack}
              />
              <FullButton
                style={styles.submitButton}
                title={
                  // t('GetOTP')
                  getOTP
                }
                onPress={onPressNext}
              />
            </View>
          </View>
        </View>
        <ModalSelector
          setModal={setModal}
          setItem={setValue}
          data={blockList}
          checkData={blockItem}
          modalVisible={blockModalVisible}
          keyword={'block'}
        />
      </KeyboardAvoidingView>
      <AlertConfirm
        style={{ width: '100%' }}
        show={alertShow}
        title={t('src.screens.auth.FindIDAndPasswordScreen.YETWI')}
        leftText={null}
        onPressCancel={() => {
          setAlertShow(false);
        }}
        closeButton={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
    backgroundColor: Colors.backgroundLightGray,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: ApplicationStyles.utils.resizeHeight(94),
    paddingHorizontal: ApplicationStyles.utils.resizeHeight(28),
    alignItems: 'center',
  },
  submitBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(60),
    marginBottom: ApplicationStyles.utils.resizeHeight(30),
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
  submitButtonText: {
    backgroundColor: 'transparent',
    ...Fonts.style.h3,
    letterSpacing: 0.3,
    fontFamily: Fonts.type.bold,
    color: Colors.textColor.white,
    paddingVertical: ApplicationStyles.utils.resizeHeight(16),
  },
  titleText: {
    ...Fonts.style.h1,
    fontFamily: Fonts.type.semiBold,
    color: Colors.textColor.black,
    alignSelf: 'flex-start',
  },
  descriptionBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(10),
    alignSelf: 'flex-start',
  },
  descriptionText: {
    ...Fonts.style.h5,
    width: ApplicationStyles.utils.resizeWidth(260),
    lineHeight: ApplicationStyles.utils.resizeWidth(21),
    color: Colors.textColor.tiny,
  },
  alertText: {
    ...Fonts.style.h5,
    width: ApplicationStyles.utils.resizeWidth(260),
    lineHeight: ApplicationStyles.utils.resizeWidth(21),
    color: Colors.red,
  },
  formBox: {
    width: '100%',
  },
  checkbox: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  searchBox: {
    marginTop: ApplicationStyles.utils.resizeWidth(29),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    paddingLeft: ApplicationStyles.utils.resizeWidth(12),
    lineHeight: ApplicationStyles.utils.resizeHeight(20),
    color: Colors.textColor.black,
  },
  textInputName: {
    minHeight: ApplicationStyles.utils.resizeHeight(52),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.cloud,
    marginBottom: ApplicationStyles.utils.resizeHeight(20),
    width: '100%',
  },
  identifierBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(21),
  },
  placeholder: {
    ...Fonts.style.h4,
    fontFamily: Fonts.type.gray6,
    lineHeight: ApplicationStyles.utils.resizeHeight(20),
    color: Colors.black,
  },
  input: {
    marginTop: 10,
  },
  selector: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 2,
    borderWidth: 0.3,
    borderColor: Colors.gray6,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
  },
  textSelector: {
    color: Colors.textColor.gray3,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h4,
  },
  imageArrowDown: {
    width: 25,
    height: 25,
  },
});
//
const BLOCK = [
  {
    id: randomString({length: 10}),
    name: 'Block A',
  },
  {
    id: randomString({length: 10}),
    name: 'Block B',
  },
  {
    id: randomString({length: 10}),
    name: 'Block C',
  },
  {
    id: randomString({length: 10}),
    name: 'Block D',
  },
];
