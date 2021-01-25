import React, {memo, useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput as RNTextInput,
  KeyboardAvoidingView,
} from 'react-native';
//
import Button from '../../components/button';
import TextInput from '../../components/TextInput1';
import MainHeader from '../../components/MainHeader';
//
import {Colors, Fonts} from '../../themes';
import {useTranslation} from '../../context/LanguageContext';
import {SelectType} from '../../components/modal/ModalSelector1';
import {SelectCalendar} from '../../components/modal/ModalCalendar2';
import {capitalizeFirstLetter} from '../../utils/capitalize';
import dateFormat from '../../utils/dateFormat';
//
const VisitorCreateScreen = props => {
  const {
    navigation,
    getVisitorReason,
    getVisitorReasonData,
    editVisitor,
  } = props;
  const {
    t,
    i18nVisitorPFOTIB,
    i18nVisitorAIAR,
    i18nVisitorFuN,
    i18nVisitorPh,
    i18nVisitorIPN,
    i18nVisitorSa,
    i18nVisitorCI,
    i18nVisitorCO,
    i18nVisitorSR,
    i18nVisitorMDOTV,
    i18nVisitorUV,
    i18nVisitorRFV,
    i18nVisitorSc,
    i18nVisitorDAT,
    i18nVisitorDo,
  } = useTranslation();
  const visitor = navigation.getParam('visitor');
  const [fullName, setFullName] = useState(visitor?.full_name || '');
  const [phone, setPhone] = useState(visitor?.phone_number || '');
  const [id, setId] = useState(visitor?.id_card || '');
  const [typeId, setTypeId] = useState(0);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [note, setNote] = useState('');

  const [errors, setErrors] = useState('');

  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();

  const refScroll = useRef();

  useEffect(() => {
    fetch();
  }, []);
  // useEffect(() => {
  //   if(getVisitorReasonData) {
  //     const reason = getVisitorReasonData?.find(element => element.name === capitalizeFirstLetter(visitor?.reason || ''))
  //     setTypeId(reason.id)
  //   }
  // }, [getVisitorReasonData]);

  async function fetch() {
    getVisitorReason();
  }

  async function onSave() {
    if (!phone || !id || !checkIn || !fullName) {
      return setErrors(i18nVisitorAIAR)
    }
    setErrors('');
    const values = {
      id_card: id,
      full_name: fullName,
      phone_number: phone,
      check_in: checkIn,
      check_out: checkOut,
      reason: getVisitorReasonData?.[typeId - 1]?.name,
      note
    };
    // console.log(values);

    navigation.navigate('VisitorDetailConfirm', {values});

    // result && navigation.navigate('Visitor');
  }
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nVisitorUV} />

      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.contentScroll}
          ref={refScroll}>
          <View style={styles.textBox}>
            <Text style={styles.textDesc}>
              {i18nVisitorPFOTIB}
            </Text>
          </View>
          {/* <Text style={styles.textDesc}>{i18nVisitorPFOTIB}</Text> */}
          {errors !== '' ? (
            <Text style={styles.textRequired}>
              {errors}
            </Text>
          ) : null}
          <View style={styles.box}>
            <TextInput
              placeholder={`${
                i18nVisitorFuN
              } *`}
              style={styles.inputText}
              value={fullName}
              onChangeText={setFullName}
              errorText={errors !== '' && !fullName}
            />
            <TextInput
              placeholder={`${
                i18nVisitorPh
              }*`}
              style={styles.inputText}
              value={phone}
              onChangeText={value => setPhone(value)}
              errorText={errors !== '' && !phone}
            />
            <TextInput
              placeholder={
                i18nVisitorIPN
              }
              style={styles.inputText}
              style={styles.inputText}
              value={id}
              onChangeText={setId}
              errorText={errors !== '' && !id}
            />
            <View style={{paddingVertical: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...Fonts.style.subtitleMedium, color: Colors.gray7}}>
                  {`${i18nVisitorCI} *`}
                </Text>
              </View>
              <SelectCalendar
                value={checkIn}
                ref={refRBSheet1}
                title={i18nVisitorSc}
                placeholder={i18nVisitorDAT}
                confirmText={i18nVisitorDo}
                onChange={(value, dateString) => {
                  setCheckIn(value);
                  setCheckOut(null);
                }}
                error={errors !== '' && !checkIn}
              />
            </View>
            <View style={{paddingVertical: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...Fonts.style.subtitleMedium, color: Colors.gray7}}>
                  {i18nVisitorCO}
                </Text>
              </View>
              <SelectCalendar
                value={checkOut}
                minDate={checkIn}
                ref={refRBSheet2}
                title={i18nVisitorSc}
                placeholder={i18nVisitorDAT}
                confirmText={i18nVisitorDo}
                disabled={!checkIn ? true : false}
                onChange={(value, dateString) => {
                  setCheckOut(value);
                }}
              />
            </View>
            {/* <View style={{paddingVertical: 10}}>
              <Text style={Fonts.style.bodyMedium}>
                {`${i18nVisitorRFV} *`}
              </Text>
            </View> */}
            <View style={{marginTop: 20}}/>
            <SelectType
              ref={refRBSheet}
              selectedId={typeId}
              initValue={i18nVisitorSR}
              height={200}
              selectedList={
                getVisitorReasonData?.map((item) => ({
                  id: item.id,
                  name: t(
                    `src.screens.visitor.VisitorScreen.${item.name}`,
                  ),
                })) || []
              }
              onSelect={id => setTypeId(id)}
              error={errors !== '' && typeId === 0}
            />
            <RNTextInput
              placeholder={
                i18nVisitorMDOTV
              }
              value={note}
              onChangeText={setNote}
              placeholderTextColor={Colors.gray4}
              multiline={true}
              maxLength={500}
              style={[
                styles.description,
                errors?.note && {borderWidth: 1, borderColor: 'red'},
              ]}
              onFocus={() => refScroll.current.scrollTo({y: 390})}
            />
            <View style={styles.button}>
              <Button text={i18nVisitorSa} onPress={onSave} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
//
export default memo(VisitorCreateScreen);
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
  textDesc: {
    ...Fonts.style.bodyRegular,
    color: Colors.gray2,
    lineHeight: 30,
  },
  box: {
    paddingTop: 31,
  },
  description: {
    minHeight: 90,
    backgroundColor: 'rgba(16, 16, 16, 0.02)',
    paddingHorizontal: 12,
    marginVertical: 20,
    ...Fonts.style.captionMedium,
    color: Colors.gray4,
  },
  photoText: {
    ...Fonts.style.bodyMedium,
    paddingVertical: 10,
  },
  button: {
    paddingBottom: 20,
  },
  inputDateTime: {
    // backgroundColor: Colors.whiteGray,
    backgroundColor: Colors.white,
    borderWidth: 0.3,
    borderColor: Colors.gray6,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 12,
  },
  textSelector: {
    color: Colors.textColor.gray3,
    fontFamily: Fonts.type.base,
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
  imageArrowDown: {
    width: 25,
    height: 25,
  },
  textRequired: {
    color: Colors.red,
    fontSize: Fonts.size.h5,
    paddingTop: 10,
  },
  inputText: {
    marginVertical: 10,
    flex: 1,
  },
});
const REASON = [
  {
    id: '1',
    name: 'Visitor',
  },
  {
    id: '2',
    name: 'Maintenance',
  },
  {
    id: '3',
    name: 'Delivery',
  },
  {
    id: '4',
    name: 'Others',
  },
];
