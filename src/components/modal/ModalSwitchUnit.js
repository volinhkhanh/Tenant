import React, {useRef, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';
import {ApplicationStyles, Colors, Fonts} from '../../themes/';
import {CheckedIcon} from '../icons';
import AsyncStorage from '@react-native-community/async-storage';
import {useTranslation} from '../../context/LanguageContext';
import * as serviceRest from '../../services/serviceRest';

const ModalSwitchUnit = props => {
  const {data, setUnitId} = props
  const [modalVisible, setModalVisible] = useState(false);
  const [radioOption, setRadioOption] = useState(0);
  const [selectUnit, setSelectUnit] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  var index = -1
  const {
    t,
    i18nHomePSYU
  } = useTranslation();
  useEffect(() => {
    setRadioOption(data[0]?.units[0].id)
    setSelectUnit(data[0]?.units[0].uuid)
    setSelectedUnit(data[0]?.units[0].uuid)
  }, [])
  const confirm = async() => {
    setSelectedUnit(selectUnit)
    serviceRest.setUnitToHeader(selectUnit)
    setUnitId()
    await AsyncStorage.setItem('unit-uuid', selectUnit)
    setModalVisible(false);
  }
  const UncheckedIcon = () => (
    <View
      style={{
        borderColor: Colors.gray6,
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
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        backdropColor={'rgba(52, 52, 52, 0.8)'}
        transparent={true}
        isVisible={modalVisible}
        onBackdropPress={() => {setModalVisible(false)}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{i18nHomePSYU}</Text>
            <View>
              {
                data?.map((apt) => {
                  index++
                  return (
                    <View style={styles.apartmentContent}>
                      <Text style={styles.labelApartment}>{apt?.name}</Text>
                      {
                        apt?.units?.map((unit) => {
                          return (
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
                                fontFamily: Fonts.type.base,
                                fontWeight: '400',
                                color: selectedUnit === unit?.uuid ? Colors.mainColor : Colors.gray7,
                              }}
                              checked={selectedUnit === unit?.uuid}
                              title={unit?.name}
                              onPress={() => {
                                setRadioOption(0)
                                setSelectUnit(unit?.uuid)
                              }}
                            />
                          )
                        })
                      }
                    </View>
                  )
                })
              }
            </View>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                confirm()
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ModalSwitchUnit;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  modalView: {
    width: '100%',
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
    paddingHorizontal: 26,
    marginBottom: 20,
    textAlign: "center",
  },
  labelApartment: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
  apartmentContent: {
    marginBottom: 10,
  },
});
