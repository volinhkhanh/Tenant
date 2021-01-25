import React, { useState, memo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import _ from 'lodash';
import RBSheet from "react-native-raw-bottom-sheet";
import { ElectIcon } from '../icons';
//
import { Images, Colors, Fonts, ApplicationStyles } from '../../themes';
//
import {Delete} from '../icons';
//
import Layouts from '../../constants/Layouts';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { SettingItemAnnoucement } from './SettingItemAnnoucement';
//
const { width, height } = Layouts;
//
export const CandidateVoteListItem = memo(props => {
  const { navigation, title, style, onPress, active, id, profile, avatar } = props;
  //
  // useEffect(() => {
  //   console.log(navigation)
  // }, [])
  const onPressTermsClose = () => modalVisible.close();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  return (
    <View style={[styles.container, style]}>
      <Ripple
        style={styles.left}
        onPress={() => {
          modalVisible.open()
        }}
      >
        <Image source={{uri: avatar}} style={{ width: 26, height: 26, borderRadius: 999, marginRight: 15 }} />
        <Text style={styles.title}>{title}</Text>
      </Ripple>
      <View style={styles.right}>
        <Ripple
          onPress={() => { 
            onPress(id);
          }}
          style={{
            paddingHorizontal: 8,
            paddingTop: 4,
            paddingBottom: 8,
            backgroundColor: active ? Colors.mainColor : Colors.white,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: Colors.mainColor,
          }}>
          <ElectIcon size={25} fill={Colors.black} />
        </Ripple>
      </View>
      <RBSheet
        ref={ref => {
          setModalVisible(ref)
        }}
        height={height/1.5}
        openDuration={300}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }
        }}
      >
        <ScrollView
          style={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.modalHeader}>
            <Image />
            <Text style={styles.modalTitle}>{title}</Text>
            <Ripple onPress={() => {onPressTermsClose()}}>
              <Image source={Delete} style={styles.closeImage}/>
            </Ripple>
          </View>
          <Text style={styles.separator}></Text>
          <View style={styles.candidatesInfoContent}>
            <Ripple onPress={() => {
              onPressTermsClose()
              navigation.navigate('CandidateInfo', {
                image: profile,
              })
              // setModalImageVisible(true)
            }}>
              <Image source={{uri: profile}} resizeMode="contain" style={styles.candidatesInfo}/>
            </Ripple>
          </View>
        </ScrollView>
      </RBSheet>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalImageVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalImageVisible(!modalImageVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
});
//
const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent : {
    padding: 20,
    paddingHorizontal: 35,
    height: height - ApplicationStyles.utils.resizeHeight(200),
  },
  modalDes: {
    color: Colors.textColor.gray2,
    fontSize: Fonts.size.h5,
  },
  modalTitle: {
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.base,
    textAlign: 'center',
    color: Colors.mainColor,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.black,
    width: '100%',
    marginVertical: ApplicationStyles.utils.resizeHeight(20),
  },
  closeImage: {
    width: 30,
    height: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  candidatesInfoContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  candidatesInfo: {
    width: width - 80,
    height: height / 1.5 - 140,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
    marginBottom: 15,
    textAlign: "center"
  }
});
