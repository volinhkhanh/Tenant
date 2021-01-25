import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Ripple from 'react-native-material-ripple';
import Toast from 'react-native-simple-toast';

import {Colors, Fonts} from '../../themes';
import MainHeader from '../../components/MainHeader';
import {KeyboardAvoidingView} from '../utils';
import {MyProgressSteps} from '../../components/MyProgressSteps';
import {MyRadioButton} from '../../components/MyRadioButton';
import {SelectCalendar} from '../../components/modal/ModalCalendar2';
import CardImage from '../../components/card/CardImage';
import {DateSVG, DateActiveSVG} from '../../components/icons';

import SelectPhoto from '../../utils/choosePhoto';
import {useTranslation} from '../../context/LanguageContext';
import Button from '../../components/button';
import OutlineButton from '../../components/OutlineButton';
import {MyTable} from '../../components/MyTable';
import QuantityChoosen from '../../components/QuantityChoosen';
import dateFormat from '../../utils/dateFormat';
import ModalCalendar from '../../components/modal/ModalCalendar';

const columns = [
  {
    key: 'item',
    title: 'Item',
    dataIndex: 'item',
  },
  {
    key: 'quantity',
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    key: 'clear',
    title: 'Clear',
    dataIndex: 'clear',
  },
];

var scroll = null;

export default function MovingCreateScreen({
  navigation,
  postUploadMovingImage,
  getUploadMovingImageData,
  setUploadMovingImageData,
  postCreateFurnitureMoving,
  deleteImage,
  putUpdateMovingRequest,
}) {
  const {
    t,
    i18nMovingListDa,
    i18nMovingListTa,
    i18nMovingListCh,
    i18nMovingListQu,
    i18nMovingListAI,
    i18nMovingListATL,
    i18nMovingListSa,
    i18nMovingListDe,
    i18nMovingListCL,
    i18nMovingListAARWBS,
    i18nMovingListNDIL,
    i18nMovingListAIAR,
    i18nModalCalendarSc,
    i18nModalCalendarDo,
    i18nMovingListRS,
    i18nMovingListMAF,
    i18nMovingListMO,
    i18nMovingListIt,
    i18nTicketSendDetail,
    i18nMovingListMd,
    i18nMovingListS,
    i18nMovingListAp,
    i18nMovingListB,
    i18nMovingListC,
    i18nMovingListSui,
    i18nMovingListSu,
    i18nMovingListAbo,
    i18nMovingListBo,
    i18nMovingListCed,
    ItemsAreRequired,
    next,
  } = useTranslation();
  const steps = [
    {
      id: 1,
      status: 'SUBMITTED',
      name: i18nMovingListSui,
      finishName: i18nMovingListSu,
    },
    {
      id: 2,
      status: 'APPROVED',
      name: i18nMovingListAbo,
      finishName: i18nMovingListAp,
    },
    {
      id: 3,
      status: 'BOOKED',
      name: i18nMovingListB,
      finishName: i18nMovingListBo,
    },
    {
      id: 4,
      status: 'ADMIN_CONFIRMED',
      name: i18nMovingListC,
      finishName: i18nMovingListCed,
    },
  ];
  // const steps = [
  //   {
  //     id: 1,
  //     status: 'SUBMIT',
  //     name: i18nMovingListS,
  //   },
  //   {
  //     id: 2,
  //     status: 'APPROVED',
  //     name: i18nMovingListAp,
  //   },
  //   {
  //     id: 3,
  //     status: 'BOOK',
  //     name: i18nMovingListB,
  //   },
  //   {
  //     id: 4,
  //     status: 'CONFIRM',
  //     name: i18nMovingListC,
  //   },
  // ];
  const movingDetailData = navigation.state?.params?.data
  const [currentState, setCurrentState] = useState('SUBMITTED');
  const [movingType, setMovingType] = useState(movingDetailData ? movingDetailData?.type : 'MOVE_FURNITURE');
  const [errorMessage, setErrorMessage] = useState('');
  const [movingDate, setMovingDate] = useState(movingDetailData ? movingDetailData?.move_out_date : Date.now());
  const refRBSheet = useRef();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [movingListPhoto, setMovingListPhoto] = useState([]);
  const [activeMoving, setActiveMoving] = useState(true);
  const [movingModalVisible, setMovingModalVisible] = useState(false);
  const [movingListDataPost, setMovingListDataPost] = useState(movingDetailData?.moving_request_items || []);
  const [moveOutListDataPost, setMoveOutListDataPost] = useState(movingDetailData?.moving_request_items || []);

  useEffect(() => {
    if(!movingDetailData?.moving_request_items) {
      setMovingListFromStorage()
    }
    return () => {resetData()}
  }, [])

  const setValue = (keyword, val) => {
    switch (keyword) {
      case 'moving':
        setMovingDate(val);
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

  const setMovingListFromStorage = async () => {
    const moveOutListStorage = await AsyncStorage.getItem('moving-list');
    moveOutListStorage && setMoveOutListDataPost(JSON.parse(moveOutListStorage))
  }

  useEffect(() => {
    if (getUploadMovingImageData) {
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

  function handleRadio(type = 'MOVE_FURNITURE') {
    setMovingType(type);
  }

  function selectPhoto() {
    SelectPhoto.selectPhotoTapped(uploadImageToServer, t);
  }

  function uploadImageToServer(data) {
    data.append('type', 'MOVING_REQUEST');
    postUploadMovingImage(data);
  }

  async function onDeletePhoto(id, index) {
    // const data = await deleteImage(id);
    // if (data) {
    //   movingListPhoto.splice(index, 1);
    //   setMovingListPhoto([...movingListPhoto]);
    // }
    movingListPhoto.splice(index, 1);
    setMovingListPhoto([...movingListPhoto]);
  }

  const scrollToTop = () => {
    scroll?.scrollTo({x: 0, y: 0, animated: true});
  };

  const handleAddToList = async() => {
    if (name === '' || quantity < 1 || movingListPhoto.length == 0) {
      setErrorMessage(
        // t('ItemsAreRequired')
        ItemsAreRequired,
      );
      scrollToTop();
    } else {
      let listImage = [];
      movingListPhoto.map(item => {
        listImage.push({
          name: item.name,
          mime_type: item.mime_type,
          url: item.uri,
        });
      });
      const params = {
        name,
        quantity,
        description,
        files: listImage,
      };
      if(movingType === 'MOVE_FURNITURE') {
        setMovingListDataPost([...movingListDataPost, params]);
      } else {
        setMoveOutListDataPost([...moveOutListDataPost, params]);
      }
      // await AsyncStorage.setItem('moving-list', JSON.stringify([...movingListDataPost, params]));
      setQuantity(0);
      resetData();
      setErrorMessage('');
    }
  }

  const resetData = () => {
    setName('');
    setQuantity(0);
    setDescription('');
    setMovingListPhoto([]);
    setUploadMovingImageData(null);
  };


  const handleNextMaf = async () => {
    const params = {
      type: movingType,
      move_out_date: dateFormat.formatDefaultDate(movingDate),
      moving_request_items: [...movingListDataPost],
    }
    navigation.navigate('MovingDetail', {uuid: movingDetailData?.uuid, status: movingDetailData?.status, params})
    // let data = false
    // if(movingDetailData) {
    //   data = await putUpdateMovingRequest(movingDetailData?.uuid, {...params, status: movingDetailData?.status});
    // } else {
    //   data = await postCreateFurnitureMoving(params);
    // }
    // if(data) {
    //   AsyncStorage.removeItem('moving-list');
    //   // navigation.navigate('Success', {
    //   //   title: i18nMovingListRS,
    //   //   description: i18nTicketSendDetail,
    //   // });
    // }
  };
  const handleNextMo = async () => {
    const params = {
      type: movingType,
      move_out_date: dateFormat.formatDefaultDate(movingDate),
      moving_request_items: [...moveOutListDataPost],
    }
    navigation.navigate('MovingDetail', {uuid: movingDetailData?.uuid ?? null, status: movingDetailData?.status, params})
  };
  const handleSave = async () => {
    await AsyncStorage.setItem('moving-list', JSON.stringify([...moveOutListDataPost]))
    Toast.show('Success')
  };

  const onDelete = async (index) => {
    movingListDataPost.splice(index, 1);
    setMovingListDataPost([...movingListDataPost]);
    await AsyncStorage.setItem('moving-list', JSON.stringify([...movingListDataPost]));
    // setDataSource((prevState) => prevState.filter((ele) => ele.key !== key));
  }

  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nMovingListCL} />
      <KeyboardAvoidingView>
        <ScrollView
          ref={(c) => {
            scroll = c;
          }}
          contentContainerStyle={styles.contentScroll}
          style={{marginBottom: 20}}
        >
          <View style={{marginTop: 1}}>
            <MyProgressSteps show value={currentState} data={steps} />
            <View style={styles.radioBox}>
              <MyRadioButton
                checked={movingType === 'MOVE_FURNITURE'}
                label={i18nMovingListMAF}
                onPress={() => handleRadio('MOVE_FURNITURE')}
              />
              <MyRadioButton
                checked={movingType === 'MOVE_OUT'}
                label={i18nMovingListMO}
                onPress={() => handleRadio('MOVE_OUT')}
              />
            </View>
          </View>
          <View style={styles.errorBox}>
            <Text style={[styles.require, errorMessage && styles.error]}>
              {errorMessage}
            </Text>
          </View>
          {/* <View style={styles.calendarBox}>
            <SelectCalendar
              placeholder={`${i18nMovingListMd}*`}
              value={movingDate}
              ref={refRBSheet}
              title={'Select Date'}
              onChange={setMovingDate}
              //   error={errors !== '' && !movingDate}
            />
          </View> */}
          <Ripple
            style={styles.inputDateTime}
            onPress={() => movingModalVisible.open()}>
            <Text
              style={{
                ...Fonts.style.bodySemibold,
                color: activeMoving ? Colors.gray1 : Colors.gray3,
              }}>
              {dateFormat.formatDate(movingDate)}
            </Text>
            {
              movingDate ?
              <DateActiveSVG width={30} height={30} />
              : <DateSVG width={30} height={30} />
            }
          </Ripple>
          <View style={styles.typeBox}>
            <TextInput
              placeholder={`${i18nMovingListIt}* (${i18nMovingListCh}, ${i18nMovingListTa}...)`}
              placeholderTextColor="#CACACA"
              style={[
                styles.type,
                errorMessage && name === '' && styles.typeError,
                name !== '' && styles.typeValue
              ]}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.quantityBox}>
            <QuantityChoosen
              style={{marginVertical: 10}}
              error={errorMessage !== '' && quantity < 1}
              value={quantity}
              onChange={setQuantity}
            />
          </View>
          <View style={styles.descBox}>
            <TextInput
              placeholder={i18nMovingListDe}
              placeholderTextColor="#CACACA"
              multiline={true}
              style={styles.desc}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.imageBox}>
            <Text style={styles.imageLabel}>{`${i18nMovingListAI}*`}</Text>
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
              {movingListPhoto.length < 1 && (
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
          </View>
          <View style={styles.addToListBox}>
            <Button
              text={i18nMovingListATL}
              type={'main'}
              backgroundColor={'#FFFFFF'}
              onPress={handleAddToList}
              style={{borderWidth: 1, borderColor: Colors.mainColor}}
            />
          </View>
          <View style={styles.tableBox}>
            <MyTable
              columns={columns}
              dataSource={movingType === 'MOVE_FURNITURE' ? movingListDataPost : moveOutListDataPost}
              onDelete={onDelete}
            />
          </View>
          {
            movingType === 'MOVE_FURNITURE' ?
              <View style={styles.saveBox}>
                <Button
                  text={next}
                  type="default"
                  disabled={movingListDataPost?.length > 0 ? false : true}
                  onPress={handleNextMaf}
                />
              </View>
            : <View style={{flexDirection: 'row'}}>
              <View style={styles.saveBox}>
                <OutlineButton
                  title={i18nMovingListSa}
                  disabled={moveOutListDataPost?.length > 0 ? false : true}
                  onPress={handleSave}
                />
              </View>
              <View style={styles.saveBox}>
                <Button
                  text={next}
                  type="default"
                  disabled={moveOutListDataPost?.length > 0 ? false : true}
                  onPress={handleNextMo}
                />
              </View>   
            </View>
          }
          <ModalCalendar
            setModal={setModal}
            setItem={setValue}
            modalVisible={movingModalVisible}
            keyword={'moving'}
            noTime={true}
            title={i18nModalCalendarSc}
            doneText={i18nModalCalendarDo}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  radioBox: {
    marginTop: 17,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorBox: {
    marginTop: 15,
  },
  require: {
    color: '#8A8A8A',
  },
  error: {
    color: '#F0443C',
  },
  calendarBox: {
    marginTop: 15,
  },
  typeBox: {
    marginTop: 20,
  },
  type: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: '#000000',
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CACACA',
  },
  typeError: {
    borderBottomColor: '#F0443C',
  },
  typeValue: {
    borderBottomColor: '#F6CA13',
  },
  quantityBox: {
    marginTop: 30,
  },
  descBox: {
    marginTop: 20,
  },
  desc: {
    backgroundColor: '#F0F0F0',
    color: '#8A8A8A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 70,
  },
  imageBox: {marginTop: 25},
  imageLabel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
  },
  imageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  addToListBox: {
    marginTop: 30,
  },
  tableBox: {
    marginTop: 30,
  },
  saveBox: {
    marginTop: 30,
    flex: 1,
    marginHorizontal: 10,
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
});
