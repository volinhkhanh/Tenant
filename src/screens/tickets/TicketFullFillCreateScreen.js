import React, {memo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput as RNTextInput,
  Image,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import CardImage from '../../components/card/CardImage';
import Button from '../../components/button';
import TextInput from '../../components/TextInput';
import QuantityChoosen from '../../components/QuantityChoosen';
import AlertConfirm from '../../components/alert/AlertConfirm';
import MainHeader from '../../components/MainHeader';
import ModalSelector from '../../components/modal/ModalSelector';
import Arrow_down_open from '../../components/icons/images/arrow_down_open.png';
//
import {Images, Colors, Fonts} from '../../themes';

const TicketFullFillCreateScreen = props => {
  const {navigation} = props;
  const [alertShow, setAlertShow] = useState(false);
  const [selectType, setSelectType] = useState(DATA1[0]);
  const [selectSection, setSelectSection] = useState(DATA2[0]);
  const [quantity, setQuantity] = useState(1);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [sectionModalVisible, setSectionModalVisible] = useState(false);
  //
  const setValue = (keyword, val) => {
    switch (keyword) {
      case 'type':
        setSelectType(val);
        break;
      case 'section':
        setSelectSection(val);
        break;
    }
  };
  const setModal = (keyword, val) => {
    switch (keyword) {
      case 'type':
        setTypeModalVisible(val);
        break;
      case 'section':
        setSectionModalVisible(val);
        break;
    }
  };
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={'Ticket'} />
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.textBox}>
          <Text style={styles.textDesc}>
            Please fill out the information below
          </Text>
        </View>
        <View style={styles.box}>
          <TextInput placeholder="Title" style={{marginVertical: 10}} />
          <Ripple
            style={styles.selector}
            onPress={() => {
              typeModalVisible.open();
            }}>
            <Text
              style={[
                styles.textSelector,
                {
                  color:
                    selectType.name === 'Type'
                      ? Colors.textColor.gray3
                      : Colors.black,
                },
              ]}>
              {selectType.name}
            </Text>
            <Image
              source={Arrow_down_open}
              style={[
                styles.imageArrowDown,
                {
                  tintColor:
                    selectType.name === 'Type'
                      ? Colors.grayArrow
                      : Colors.mainColor,
                },
              ]}
            />
          </Ripple>
          <Ripple
            style={styles.selector}
            onPress={() => {
              sectionModalVisible.open();
            }}>
            <Text
              style={[
                styles.textSelector,
                {
                  color:
                    selectSection.name === 'Section'
                      ? Colors.textColor.gray3
                      : Colors.black,
                },
              ]}>
              {selectSection.name}
            </Text>
            <Image
              source={Arrow_down_open}
              style={[
                styles.imageArrowDown,
                {
                  tintColor:
                    selectSection.name === 'Section'
                      ? Colors.grayArrow
                      : Colors.mainColor,
                },
              ]}
            />
          </Ripple>
          <QuantityChoosen
            style={{marginVertical: 10}}
            value={quantity}
            onChange={setQuantity}
          />
          <RNTextInput
            style={styles.description}
            placeholder="Description"
            placeholderTextColor={Colors.gray4}
            multiline={true}
            maxLength={500}
          />
          <Text style={styles.photoText}>Choose Photos</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* <CardImage imageUrl={Images.chair4} fixedWidth />
            <CardImage imageUrl={Images.chair5} fixedWidth />
            <CardImage fixedWidth /> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 15,
            }}>
            <Text style={Fonts.style.bodyRegular}>{'Something urgents? '}</Text>
            <Ripple onPress={() => setAlertShow(true)}>
              <Text
                style={[Fonts.style.bodyRegular, {color: Colors.mainColor}]}>
                {'Call us'}
              </Text>
            </Ripple>
          </View>
          <View style={styles.button}>
            <Button
              text="Save"
              onPress={() => navigation.navigate('TicketConfirm')}
            />
          </View>
        </View>
        <ModalSelector
          setModal={setModal}
          setItem={setValue}
          data={DATA1}
          checkData={selectType}
          modalVisible={typeModalVisible}
          keyword={'type'}
        />
        <ModalSelector
          setModal={setModal}
          setItem={setValue}
          data={DATA2}
          checkData={selectSection}
          modalVisible={sectionModalVisible}
          keyword={'section'}
        />
      </ScrollView>
      <AlertConfirm
        title="Do you want to call Ticket Support?"
        rightText={'Call'}
        leftText={'Go Back'}
        show={alertShow}
        onPressCancel={() => setAlertShow(false)}
        onPressConfirm={() => {
          Linking.openURL('tel://19001486');
          setAlertShow(false);
        }}
      />
    </View>
  );
};
//
export default memo(TicketFullFillCreateScreen);
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
    minHeight: 70,
    backgroundColor: 'rgba(16, 16, 16, 0.02)',
    paddingHorizontal: 12,
    marginVertical: 10,
    ...Fonts.style.captionMedium,
    color: Colors.gray2,
  },
  photoText: {
    ...Fonts.style.bodyMedium,
    paddingVertical: 10,
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
    color: Colors.textColor.gray3,
    fontFamily: Fonts.type.base,
  },
  imageArrowDown: {
    width: 25,
    height: 25,
  },
});

const DATA = [
  {
    id: '1',
    imageUrl: Images.chair1,
    title: 'The chair is broken',
    status: 'Processing',
    timeText: '08:00 02/03/2020',
    description:
      'One of the dining chair is broken. It just collapsed when we sat...',
  },
  {
    id: '2',
    imageUrl: Images.chair2,
    title: 'The table is broken',
    status: 'Submited',
    timeText: '08:00 02/03/2020',
    description:
      'One of its legs is about to break soon. Please replace with a...',
  },
  {
    id: '3',
    imageUrl: Images.chair3,
    title: 'The table is broken',
    status: 'Completed',
    timeText: '08:00 02/03/2020',
    description:
      'One of its legs is about to break soon. Please replace with a...',
  },
];

const DATA1 = [
  {
    id: '1',
    name: 'Furniture',
  },
  {
    id: '2',
    name: 'Electricity',
  },
  {
    id: '3',
    name: 'Equipment',
  },
  {
    id: '4',
    name: 'Lightning',
  },
  {
    id: '5',
    name: 'Others',
  },
];

const DATA2 = [
  {
    id: '1',
    name: 'Dining Room',
  },
  {
    id: '2',
    name: 'Living Room',
  },
  {
    id: '3',
    name: 'Bed Room',
  },
  {
    id: '4',
    name: 'Others',
  },
];
