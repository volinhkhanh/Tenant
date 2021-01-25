import React, {useState, memo, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
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
import {useTranslation} from '../../context/LanguageContext';

var scroll = null;

function RegisterScreen(props) {
  const {
    navigation,
    getUnits,
    getCountries,
    getBlock,
    getBlockData,
    getUnitData,
    getUnitProgress,
    getCountryProgress,
    getApartmentRegisterData,
    getRegisterSession,
    getUploadImageProgress,
    uploadBackImageData,
    setUploadImageData,
    setApartmentRegister,
  } = props;
  //
  const {
    t,
    i18nRegisterPleaseFill,
    i18nRegisterUnitInformation,
    i18nRegisterApartmentName,
    i18nRegisterBlock,
    i18nRegisterUnit,
    i18nRegisterCancel,
    i18nRegisterOnlineRegister,
    i18nRegisterConfirm,
  } = useTranslation();
  //
  const [blockList, setBlockList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  //
  const [blockItem, setBlockItem] = useState({
    id: '0',
    name: i18nRegisterBlock,
  });
  const [unitItem, setUnitItem] = useState({id: '0', name: i18nRegisterUnit});
  //
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [unitModalVisible, setUnitModalVisible] = useState(false);
  //
  const onCancel = () => navigation.pop();
  //
  const setValue = (keyword, val) => {
    switch (keyword) {
      case 'gender':
        setGenderItem(val);
        break;
      case 'block':
        getUnits({building_id: val.id, size: 100});
        setBlockItem(val);
        break;
      case 'unit':
        setUnitItem(val);
        break;
    }
  };
  //
  const setModal = (keyword, val) => {
    switch (keyword) {
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
  const actionRegister = async () => {
    if (
      blockItem.name === i18nRegisterBlock ||
      unitItem.name === i18nRegisterUnit ||
      !getApartmentRegisterData?.name ||
      getApartmentRegisterData?.name === i18nRegisterApartmentName
    ) {
      setErrorMessage(i18nRegisterPleaseFill);
      scrollToTop();
    } else {
      setAgeError('');
      setErrorMessage('');
      const params = {
        apartment_id: '1',
        building_id: blockItem,
        unit_id: unitItem,
      };
      navigation.navigate('RegisterConfirm', {
        params,
      });
    }
  };
  //
  useEffect(() => {
    const apartmentItem = getApartmentRegisterData;
    if (apartmentItem) {
      getBlock({
        apartment_id: apartmentItem?.id || null,
      });
    }
  }, [getApartmentRegisterData]);
  //
  useEffect(() => {
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
    uploadBackImageData &&
      setSecondIdc({
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
              >1</Text>/3
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
    height: '100%',
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
    marginVertical: 25,
  },
  imageArrowDown: {
    width: 25,
    height: 25,
  },
  textFillContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
