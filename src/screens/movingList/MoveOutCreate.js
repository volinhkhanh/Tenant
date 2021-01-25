import React, {memo, useState, useEffect} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import {DateSVG} from '../../components/icons';
import CardImage from '../../components/card/CardImage';
import Button from '../../components/button';
import AlertConfirm from '../../components/alert/AlertConfirm';
import ModalCalendar from '../../components/modal/ModalCalendar';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {Colors, Fonts} from '../../themes';
//
import SelectPhoto from '../../utils/choosePhoto';
import DateFormat from '../../utils/dateFormat';
//
import {useTranslation} from '../../context/LanguageContext';
//
import {KeyboardAvoidingView} from '../utils';
import dateFormat from '../../utils/dateFormat';
//
function MoveOut(props) {
  const {
    navigation,
    postCreateMoveOut,
    getCreateMoveOutData,
    getCreateMoveOutProgress,
    postUploadMovingImage,
    getUploadMovingImageData,
    getUploadMovingImageProgress,
    setUploadMovingImageData,
    getGeneralInformationData,
    deleteImage,
    getDeleteImageProgress,
  } = props.props;
  //
  const {
    t,
    i18nMovingListAI,
    i18nMovingListSa,
    i18nMovingListCP,
    i18nModalCalendarSc,
    i18nModalCalendarDo,
    i18nMovingListAARWBS,
    i18nMovingListAIAR,
    i18nMovingListRS,
    i18nTicketSendDetail,
  } = useTranslation();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  //
  const [alertShow, setAlertShow] = useState(false);
  const [moveOut, setMoveOut] = useState(today);
  const [activeMoveOut, setActiveMoveOut] = useState(true);
  const [moveOutModalVisible, setMoveOutModalVisible] = useState(false);
  const [moveOutListPhoto, setMoveOutListPhoto] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  //
  const setValue = (keyword, val) => {
    switch (keyword) {
      case 'moveOut':
        setMoveOut(val);
        setActiveMoveOut(true);
        break;
    }
  };
  //
  const setModal = (keyword, val) => {
    switch (keyword) {
      case 'moveOut':
        setMoveOutModalVisible(val);
        break;
    }
  };
  //
  const selectPhoto = () => {
    SelectPhoto.selectPhotoTapped(uploadImageToServer, t);
  };
  //
  const uploadImageToServer = data => {
    data.append('type', 'MOVING_REQUEST');
    postUploadMovingImage(data);
  };
  //
  const addMoveOut = async () => {
    let listImage = [];
    moveOutListPhoto.map(item => {
      listImage.push({
        name: item.name,
        mime_type: item.mime_type,
      });
    });
    const data = await postCreateMoveOut({
      type_id: 'MOVE_OUT',
      move_out_date: DateFormat.formatDefaultDateTime(moveOut),
      files: listImage,
    });
    return data;
  };
  //
  const onPressConfirm = async () => {
    const data = await addMoveOut();
    setAlertShow(false);
    if (data) {
      navigation.navigate('Success', {
        title: i18nMovingListRS,
        description: i18nTicketSendDetail,
      });
    }
  };
  //
  const onAddMoveOut = () => {
    if (moveOutListPhoto.length == 0) {
      setErrorMessage(i18nMovingListAIAR);
    } else {
      setErrorMessage('');
      setAlertShow(true);
    }
  };
  //
  const onDeletePhoto = async (id, index) => {
    const data = await deleteImage(id);
    if (data) {
      moveOutListPhoto.splice(index, 1);
      setMoveOutListPhoto([...moveOutListPhoto]);
    }
  };
  //
  useEffect(() => {
    if (getUploadMovingImageData && props.index == 1) {
      setMoveOutListPhoto([
        ...moveOutListPhoto,
        {
          name: getUploadMovingImageData?.name,
          uri: getUploadMovingImageData?.url,
          mime_type: getUploadMovingImageData?.mime_type,
        },
      ]);
    }
  }, [getUploadMovingImageData]);
  //
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        {errorMessage !== '' && (
          <Text style={[styles.errorMessage, {paddingTop: 10}]}>
            {errorMessage}
          </Text>
        )}
        <View style={styles.box}>
          <Ripple
            style={styles.inputDateTime}
            onPress={() => moveOutModalVisible.open()}>
            <Text
              style={{
                ...Fonts.style.bodySemibold,
                color: activeMoveOut ? Colors.gray1 : Colors.gray3,
              }}>
              {dateFormat.formatDate(moveOut)}
            </Text>
            <DateSVG width={30} height={30} />
          </Ripple>
          <Text
            style={{
              ...Fonts.style.bodyRegular,
              color: Colors.gray2,
              paddingVertical: 10,
              paddingTop: 20,
            }}>
            {/* {t('CheckPhoto')} */}
            {i18nMovingListCP}
          </Text>
          <Text style={styles.photoText}>
            {/* {t('AttachImages')}* */}
            {`${i18nMovingListAI} *`}
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageContent}>
            {moveOutListPhoto.length > 0 &&
              moveOutListPhoto?.map((item, index) => {
                return (
                  <CardImage
                    size="M"
                    imageUrl={item.uri}
                    fixedWidth
                    onPress={() => {}}
                    onDelete={() => {
                      onDeletePhoto(item.id, index);
                    }}
                  />
                );
              })}
            {moveOutListPhoto.length < 20 && (
              <CardImage
                size="M"
                imageUrl={''}
                fixedWidth
                onPress={selectPhoto}
                style={
                  errorMessage !== '' &&
                  moveOutListPhoto.length == 0 && {
                    borderWidth: 1,
                    borderColor: Colors.red,
                  }
                }
              />
            )}
          </ScrollView>
        </View>
        <AlertConfirm
          title={i18nMovingListAARWBS}
          show={alertShow}
          onPressCancel={() => setAlertShow(false)}
          onPressConfirm={onPressConfirm}
        />
        <ModalCalendar
          setModal={setModal}
          setItem={setValue}
          data={moveOut}
          modalVisible={moveOutModalVisible}
          keyword={'moveOut'}
          noTime={true}
          title={i18nModalCalendarSc}
          doneText={i18nModalCalendarDo}
        />
      </ScrollView>
      <View style={styles.button1}>
        <View style={{width: '90%'}}>
          <Button
            text={
              // t('Save')
              i18nMovingListSa
            }
            type="default"
            onPress={() => {
              onAddMoveOut();
            }}
          />
        </View>
      </View>
      {getCreateMoveOutProgress && <DimSpinnerView />}
      {getUploadMovingImageProgress && <DimSpinnerView />}
      {getDeleteImageProgress && <DimSpinnerView />}
    </KeyboardAvoidingView>
  );
}
//
export default memo(MoveOut);
//
const styles = StyleSheet.create({
  contentScroll: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  box: {
    paddingTop: 15,
  },
  photoText: {
    ...Fonts.style.bodyMedium,
    paddingVertical: 10,
  },
  button1: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputDateTime: {
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
  errorMessage: {
    ...Fonts.style.bodyRegular,
    color: Colors.red,
  },
  imageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
