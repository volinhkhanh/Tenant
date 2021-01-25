import React, {memo, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput as RNTextInput,
  Linking,
  Platform,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import CardImage from '../../components/card/CardImage';
import Button from '../../components/button';
import TextInput from '../../components/TextInput';
import QuantityChosen from '../../components/QuantityChosen1';
import AlertConfirm from '../../components/alert/AlertConfirm';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
import {Colors, Fonts} from '../../themes';
import {SelectType} from '../../components/modal/ModalSelector1';
import {SelectCalendar} from '../../components/modal/ModalCalendar2';
import {useTranslation} from '../../context/LanguageContext';
//
import SelectPhoto from '../../utils/choosePhoto';
//
const CreateTicketScreen = props => {
  const {
    navigation,
    getTicketType,
    getTicketTypeData,
    deleteImage,
    getDeleteImageProgress,
    getDeleteImageData,
    getUploadImageProgress,
    uploadImageData,
    postUploadImage,
    setUploadImageData,
    getGeneralInformationData,
  } = props;
  var scrollView = null;
  const {
    t,
    i18nTicketCreate,
    i18nTicketPleaseFillOut,
    i18nTicketTitle,
    i18nTicketType,
    i18nTicketDe,
    i18nTicketAttachImages,
    i18nTicketSomethingUrgent,
    i18nTicketCallUs,
    i18nTicketSave,
    i18nTicketCallSupport,
    i18nTicketGoBack,
    i18nTicketCall,
    i18nTicketST,
    i18nTicketName,
    i18nTicketUnit,
    i18nTicketET,
    i18nModalCalendarSc,
  } = useTranslation();
  const serviceType = navigation.state.params;
  const [alertShow, setAlertShow] = useState(false);
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [ticketImages, setTicketImages] = useState([]);
  const [errors, setErrors] = useState('');
  const refRBSheet = useRef();
  const [typeId, setTypeId] = useState(0);
  const [expectedTime, setExpectedTime] = useState(null);
  const refRBSheet1 = useRef();

  useEffect(() => {
    getTicketType();
    return () => {
      setUploadImageData(null);
    };
  }, []);

  function onDelete(key) {
    const data = deleteImage(ticketImages[key].image);
    if (data) {
      ticketImages.splice(key, 1);
      setTicketImages([...ticketImages]);
    }
  }
  //
  const selectPhoto = () => {
    SelectPhoto.selectPhotoTapped(uploadImageToServer, t);
  };
  //
  const uploadImageToServer = data => {
    data.append('type', 'HOME_SERVICE');
    postUploadImage(data);
  };
  //
  useEffect(() => {
    if (uploadImageData) {
      uploadImageData &&
        setTicketImages([
          ...ticketImages,
          {
            name: uploadImageData?.name,
            uri: uploadImageData?.url,
            mime_type: uploadImageData?.mime_type,
          },
        ]);
    }
  }, [uploadImageData]);
  //
  const onSave = async () => {
    if (!title || !expectedTime) {
      setErrors(i18nTicketPleaseFillOut);
    } else {
      setErrors('');
      // const ticketCategoryName = getTicketTypeData?.items?.find(
      //   item => item.id === typeId,
      // )?.name;
      const params = {
        title,
        // quantity,
        description,
        ticketCategory: serviceType?.id,
        ticketCategoryName: serviceType?.name,
        // ticketCategory: typeId,
        // ticketCategoryName,
        expected_arrival_date: expectedTime,
        ticketImages,
      };
      // console.log(params);
      navigation.navigate('TicketConfirm', {params});
    }
  };
  //
  const inputs = {};
  const focusNextField = id => {
    inputs[id].focus();
  };
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nTicketCreate} />
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        {/* <View style={styles.textBox}>
          <Text style={styles.textDesc}>
            {i18nTicketPleaseFillOut}
          </Text>
        </View> */}
        {errors ? (
          <Text style={styles.textRequired}>
            {/* {Object.values(errors)[0]} */}
            {errors}
          </Text>
        ) : null}
        <View style={styles.textBox}>
          <Text style={styles.textInfo}>
            {`${i18nTicketName}: ${getGeneralInformationData?.full_name}`}
          </Text>
          <Text style={styles.textInfo}>
            {`${i18nTicketUnit}: ${getGeneralInformationData?.unit}`}
          </Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.textType}>
            {`${i18nTicketST}: ${serviceType?.name}`}
          </Text>
        </View>
        <View style={styles.box}>
          <TextInput
            placeholder={`${i18nTicketTitle}*`}
            onSubmitEditing={() => focusNextField('description')}
            blurOnSubmit={false}
            returnKeyType={'next'}
            style={{marginVertical: 10}}
            inputStyle={styles.placeholder}
            placeholderTextColor={Colors.textColor.gray6}
            onChangeText={text => setTitle(text)}
            value={title}
            // errorText={errors?.title}
            errorText={title === '' && errors !== '' && errors}
          />
          {/* <SelectType
            ref={refRBSheet}
            selectedId={typeId}
            initValue={`${i18nTicketType}*`}
            selectedList={getTicketTypeData?.items || []}
            onSelect={id => setTypeId(id)}
            error={(typeId === 0 && errors !== '') && errors}
          /> */}
          {/* <QuantityChosen
            style={{marginVertical: 10}}
            value={quantity}
            onChange={setQuantity}
          /> */}
          <RNTextInput
            style={[styles.description]}
            ref={ref => (inputs['description'] = ref)}
            returnKeyType="done"
            blurOnSubmit={true}
            placeholder={i18nTicketDe}
            placeholderTextColor={Colors.gray6}
            multiline={true}
            maxLength={500}
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <Text style={styles.labelText}>{i18nTicketAttachImages}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <ScrollView
              ref={ref => {
                scrollView = ref;
              }}
              onContentSizeChange={() =>
                scrollView?.scrollToEnd({animated: true})
              }
              showsHorizontalScrollIndicator={false}
              style={{paddingHorizontal: 3}}
              horizontal={true}>
              {ticketImages.map((item, i) => {
                return (
                  <View style={{marginLeft: 10}}>
                    <CardImage
                      key={i}
                      imageUrl={item.uri}
                      onDelete={() => onDelete(i)}
                      fixedWidth
                    />
                  </View>
                );
              })}
              {ticketImages.length < 10 && (
                <CardImage onPress={selectPhoto} fixedWidth />
              )}
            </ScrollView>
          </View>
          <Text style={[styles.labelText, {marginBottom: 0}]}>{`${i18nTicketET}*`}</Text>
          <SelectCalendar
            value={expectedTime}
            ref={refRBSheet1}
            title={i18nModalCalendarSc}
            onChange={value => {
              setExpectedTime(value);
            }}
            error={errors !== '' && !expectedTime}
          />
          {/* <View style={styles.support}>
            <Text style={styles.urgentText}>{t('SomethingUrgent')}</Text>
            <Ripple onPress={() => setAlertShow(true)}>
              <Text style={styles.callUs}>{i18nTicketCallUs}</Text>
            </Ripple>
          </View> */}
          <View style={styles.button}>
            <Button text={i18nTicketSave} onPress={onSave} />
          </View>
        </View>
      </ScrollView>
      <AlertConfirm
        title={i18nTicketCallSupport}
        rightText={i18nTicketCall}
        leftText={i18nTicketGoBack}
        show={alertShow}
        onPressCancel={() => setAlertShow(false)}
        onPressConfirm={() => {
          Linking.openURL('tel:19001486');
          setAlertShow(false);
        }}
      />
      {getUploadImageProgress && <DimSpinnerView />}
    </View>
  );
};
//
export default memo(CreateTicketScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  textBox: {
    // marginTop: 30,
  },
  textDesc: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.gray2,
  },
  textInfo: {
    fontSize: Fonts.size.h4,
    color: '#8A8A8A',
    paddingTop: 20,
    fontWeight: '400',
  },
  textType: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    paddingTop: 20,
  },
  box: {
    paddingTop: 10,
  },
  description: {
    minHeight: 70,
    backgroundColor: 'rgba(16, 16, 16, 0.02)',
    paddingHorizontal: 12,
    // marginVertical: 20,
    marginBottom: 20,
    fontSize: Fonts.size.h5,
    fontWeight: '400',
    color: Colors.gray6,
  },
  labelText: {
    fontSize: Fonts.size.h4,
    color: Colors.black,
    fontWeight: '400',
    paddingVertical: 10,
    marginBottom: 10,
  },
  selectType: {
    marginVertical: 10,
    paddingVertical: 10,
    position: 'relative',
    borderRadius: 5,
    borderWidth: 0.5,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  textSelector: {
    fontSize: Fonts.size.h4,
    color: Colors.textColor.gray3,
    fontFamily: Fonts.type.base,
  },
  imageArrowDown: {
    width: 25,
    height: 25,
  },
  support: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
  },
  urgentText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
  callUs: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.mainColor,
  },
  placeholder: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  button: {
    marginTop: 30,
  },
  textRequired: {
    color: Colors.red,
    fontSize: Fonts.size.h5,
    paddingTop: 10,
  },
});
