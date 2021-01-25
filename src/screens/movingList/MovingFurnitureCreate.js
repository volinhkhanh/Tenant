import React, {memo, useState, useEffect} from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput as RNTextInput,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import {DateSVG} from '../../components/icons';
import CardImage from '../../components/card/CardImage';
import Button from '../../components/button';
import QuantityChoosen from '../../components/QuantityChoosen';
import AlertConfirm from '../../components/alert/AlertConfirm';
import {TableListItem2} from '../../components/ListItem';
import ModalCalendar from '../../components/modal/ModalCalendar';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {Colors, ApplicationStyles, Fonts} from '../../themes';
//
import SelectPhoto from '../../utils/choosePhoto';
import DateFormat from '../../utils/dateFormat';
//
import {useTranslation} from '../../context/LanguageContext';
//
import {KeyboardAvoidingView} from '../utils';
//
var scroll = null;
//
function MovingFurniture(props) {
  const {
    navigation,
    postCreateFurnitureMoving,
    getCreateFurnitureMovingData,
    getCreateFurnitureMovingProgress,
    postUploadMovingImage,
    getUploadMovingImageData,
    getUploadMovingImageProgress,
    getDeleteImageProgress,
    setUploadMovingImageData,
    deleteImage,
  } = props.props;
  //
  const {
    t,
    i18nMovingListDa,
    i18nMovingListIt,
    i18nMovingListTa,
    i18nMovingListCh,
    i18nMovingListQu,
    i18nMovingListAI,
    i18nMovingListATL,
    i18nMovingListSa,
    i18nMovingListDe,
    i18nMovingListCl,
    i18nMovingListAARWBS,
    i18nMovingListNDIL,
    i18nMovingListAIAR,
    i18nModalCalendarSc,
    i18nModalCalendarDo,
    i18nMovingListRS,
    i18nTicketSendDetail,
  } = useTranslation();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  //
  const [alertShow, setAlertShow] = useState(false);
  const [moving, setMoving] = useState(today);
  const [activeMoving, setActiveMoving] = useState(true);
  const [movingModalVisible, setMovingModalVisible] = useState(false);
  const [movingListPhoto, setMovingListPhoto] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [movingListDataPost, setMovingListDataPost] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  //
  const setValue = (keyword, val) => {
    switch (keyword) {
      case 'moving':
        setMoving(val);
        setActiveMoving(true);
        break;
    }
  };
  //
  const setModal = (keyword, val) => {
    switch (keyword) {
      case 'moving':
        setMovingModalVisible(val);
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
  const onAddMoving = () => {
    if (movingListDataPost.length > 0) {
      setAlertShow(true);
      setErrorMessage('');
    } else {
      setErrorMessage(
        // t('NoDataInList')
        i18nMovingListNDIL,
      );
    }
  };
  //
  const onPressConfirm = async () => {
    const data = await postCreateFurnitureMoving({
      moving_requests: [...movingListDataPost],
    });
    setAlertShow(false);
    if (data) {
      navigation.navigate('Success', {
        title: i18nMovingListRS,
        description: i18nTicketSendDetail,
      });
    }
  };
  //
  const onDeletePhoto = async (id, index) => {
    const data = await deleteImage(id);
    if (data) {
      movingListPhoto.splice(index, 1);
      setMovingListPhoto([...movingListPhoto]);
    }
  };
  //
  const scrollToTop = () => {
    scroll.scrollTo({x: 0, y: 0, animated: true});
  };
  //
  const addToList = () => {
    if (type === '' || quantity < 1 || movingListPhoto.length == 0) {
      setErrorMessage(
        // t('ItemsAreRequired')
        i18nMovingListAIAR,
      );
      scrollToTop();
    } else {
      let listImage = [];
      movingListPhoto.map(item => {
        listImage.push({
          name: item.name,
          mime_type: item.mime_type,
        });
      });
      const params = {
        type_id: 'FURNITURE',
        move_out_date: DateFormat.formatDefaultDateTime(moving),
        furniture_type: type,
        quantity,
        description,
        files: listImage,
      };
      setMovingListDataPost([...movingListDataPost, params]);
      setQuantity(0);
      resetData();
      setErrorMessage('');
    }
  };
  //
  const resetData = () => {
    setType('');
    setQuantity(0);
    setDescription('');
    setMovingListPhoto([]);
    setUploadMovingImageData(null);
  };
  //
  useEffect(() => {
    if (getUploadMovingImageData && props.index == 0) {
      setMovingListPhoto([
        ...movingListPhoto,
        {
          name: getUploadMovingImageData?.name,
          uri: getUploadMovingImageData?.url,
          mime_type: getUploadMovingImageData?.mime_type,
        },
      ]);
    }
  }, [getUploadMovingImageData]);
  //
  const deleteMovingItem = index => {
    let movingList = movingListDataPost;
    movingList.splice(index, 1);
    setMovingListDataPost([...movingList]);
  };
  //
  return (
    <KeyboardAvoidingView>
      <ScrollView
        ref={c => {
          scroll = c;
        }}
        contentContainerStyle={styles.contentScroll}>
        <View style={{marginTop: 1}}>
          {errorMessage !== '' && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <Ripple
            style={styles.inputDateTime}
            onPress={() => movingModalVisible.open()}>
            <Text
              style={{
                ...Fonts.style.bodySemibold,
                color: activeMoving ? Colors.gray1 : Colors.gray3,
              }}>
              {moving ? DateFormat.formatDate(moving) : ''}
            </Text>
            <DateSVG width={30} height={30} />
          </Ripple>
          <View style={{justifyContent: 'center', marginVertical: 15}}>
            <RNTextInput
              placeholder={`${
                // t('Item')
                i18nMovingListIt
              } * (${
                // t('Table')
                i18nMovingListTa
              }, ${
                // t('Chair')
                i18nMovingListCh
              }...)`}
              placeholderTextColor={Colors.gray7}
              style={[
                styles.type,
                errorMessage !== '' &&
                  type === '' && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'red',
                  },
              ]}
              value={type}
              onChangeText={setType}
            />
          </View>
          <QuantityChoosen
            style={{marginVertical: 10}}
            error={errorMessage !== '' && quantity < 1}
            value={quantity}
            onChange={setQuantity}
          />
          <RNTextInput
            placeholder={
              // t('Description')
              i18nMovingListDe
            }
            placeholderTextColor={Colors.gray4}
            multiline={true}
            style={styles.description}
            value={description}
            onChangeText={setDescription}
          />
          <Text style={styles.photoText}>
            {/* {t('AttachImages')}* */}
            {`${i18nMovingListAI} *`}
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageContent}>
            {movingListPhoto.length > 0 &&
              movingListPhoto?.map((item, index) => {
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
            {movingListPhoto.length < 10 && (
              <CardImage
                size="M"
                imageUrl={''}
                fixedWidth
                style={
                  errorMessage !== '' &&
                  movingListPhoto.length == 0 && {
                    borderWidth: 1,
                    borderColor: Colors.red,
                  }
                }
                onPress={selectPhoto}
              />
            )}
          </ScrollView>
          <View style={styles.button}>
            <Button
              text={
                // t('AddToList')
                i18nMovingListATL
              }
              type={'main'}
              backgroundColor={'#FFFFFF'}
              onPress={addToList}
              style={{borderWidth: 1, borderColor: Colors.mainColor}}
            />
          </View>
          <View style={styles.table}>
            <View style={styles.headerList}>
              <Text style={styles.headerText}>
                {/* {t('Date')} */}
                {i18nMovingListDa}
              </Text>
              <Text style={styles.headerText}>
                {/* {t('Item')} */}
                {i18nMovingListIt}
              </Text>
              <Text style={styles.headerText}>
                {/* {t('Quantity')} */}
                {i18nMovingListQu}
              </Text>
              <Text style={styles.headerText}>
                {/* {t('Clear')} */}
                {i18nMovingListCl}
              </Text>
            </View>
            <View style={styles.bodyList}>
              {movingListDataPost?.map((item, index) => {
                return (
                  <TableListItem2
                    date={DateFormat.formatDate(item.move_out_date)}
                    type={item.furniture_type}
                    quantity={item.quantity}
                    buttonType="clear"
                    onPressClearButton={() => {
                      deleteMovingItem(index);
                    }}
                  />
                );
              })}
            </View>
          </View>
          <View style={styles.button}>
            <Button
              text={
                // t('Save')
                i18nMovingListSa
              }
              type="default"
              onPress={() => {
                onAddMoving();
              }}
            />
          </View>
        </View>
        <AlertConfirm
          title={
            // t('MovingCreateConfirm')
            i18nMovingListAARWBS
          }
          show={alertShow}
          onPressCancel={() => setAlertShow(false)}
          onPressConfirm={onPressConfirm}
        />
        <ModalCalendar
          setModal={setModal}
          setItem={setValue}
          modalVisible={movingModalVisible}
          keyword={'moving'}
          noTime={true}
          title={i18nModalCalendarSc}
          doneText={i18nModalCalendarDo}
        />
        {getCreateFurnitureMovingProgress && <DimSpinnerView />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
//
export default memo(MovingFurniture);
//
const styles = StyleSheet.create({
  contentScroll: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  description: {
    minHeight: 70,
    backgroundColor: 'rgba(16, 16, 16, 0.02)',
    paddingHorizontal: 12,
    marginVertical: 10,
    ...Fonts.style.captionMedium,
    color: Colors.black,
  },
  photoText: {
    ...Fonts.style.bodyMedium,
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 20,
  },
  table: {
    margin: 5,
    paddingHorizontal: 27 - 5,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    ...ApplicationStyles.boxShadow,
  },
  headerList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomColor: 'rgba(78, 80, 83, 0.2)',
    borderBottomWidth: 1,
  },
  headerText: {
    ...Fonts.style.bodySemibold,
  },
  bodyList: {
    paddingVertical: 15,
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
  type: {
    flex: 1,
    borderBottomColor: Colors.gray3,
    borderBottomWidth: 0.5,
    paddingBottom: 12,
    alignItems: 'center',
    color: Colors.black,
    marginVertical: 10,
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
