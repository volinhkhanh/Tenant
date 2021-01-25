import React, { memo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import _ from 'lodash';
import Ripple from 'react-native-material-ripple';
//
import {
  SendIcon,
  AttachFile,
} from '../../components/icons';
import ModalSelector from '../../components/modal/ModalSelector';
import TextInput from '../../components/TextInput';
import { ArrowBackIcon } from '../../components/icons';
import AlertConfirm from '../../components/alert/AlertConfirm';
import Arrow_down_open from '../../components/icons/images/arrow_down_open.png';
//
import { Colors, Fonts } from '../../themes';
import * as serviceRest from '../../services/serviceRest'
import AlertMessage from '../../components/alert/AlertMessage';
import { ErrorProcess } from '../../components/alert/ErrorMessage';
import DimSpinnerView from "../../components/DimSpinnerView";
//
import {useTranslation} from '../../context/LanguageContext';
//
import Layouts from '../../constants/Layouts';
import OS from '../../constants/Platform';
//
const SendMailScreen = props => {
  const { navigation, route, getMemberData } = props;
  const [descriptionValue, setDescriptionValue] = useState('');
  const [subject, setSubject] = useState('')
  const [alertCancel, setAlertCancel] = useState(false);
  const [alertSend, setAlertSend] = useState(false);
  const [emailItem, setEmailItem] = useState({ id: '0' , name: 'Leenguyen@gmail.com'});
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const {t} = useTranslation();
  const informationData = navigation.state?.params || []
  //
  const setValue = (keyword, val) => {
    switch(keyword) {
      case 'email':
        setEmailItem(val);
        break;
    }
  }
  //
  const setModal = (keyword, val) => {
    switch(keyword) {
      case 'email':
        setEmailModalVisible(val);
        break;
    }
  }
  //
  onSendEmail = async () =>{
    try {
      setAlertSend(false);
      setLoading(true);
      let res = await serviceRest.sendMail({
        title: subject,
        content: descriptionValue,
      })
      setLoading(false);
      if(res.status === 200){
        navigation.navigate(
          'Success',{
            title: t('SuccessfulTitle'),
            description: t('SuccessfulContentTitle')
          }
        )
      }
    } catch (error) {
      setLoading(false);
      ErrorProcess.alert('Alert',error.response.data.message);
    }
      
  } 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ripple style={styles.actionContent} onPress={() => setAlertCancel(true)}>
          <ArrowBackIcon size={20} color={Colors.gray1} />
        </Ripple>
        <Text style={styles.title}>Compose mail</Text>
        <View style={styles.actionContent}>
          <Ripple style={{marginRight:21}}>
            {/* <AttachFile size={21}/> */}
          </Ripple>
          <Ripple onPress={() => {setAlertSend(true)}}>
            <SendIcon size={21} style={{ marginHorizontal: 10 }} />
          </Ripple>
        </View>
      </View>
      <ScrollView>
        <View style={styles.sectionInfo}>
          <Text style={styles.sectionTitle}>From</Text>
          <View style={styles.emailItem}>
            <Text style={styles.emailTextItem}>{informationData?.email}</Text>
          </View>
        </View>
        <View style={styles.sectionInfo}>
          <Text style={styles.sectionTitle}>To</Text>
          <View style={styles.emailItem}>
            <Text style={styles.emailTextItem}>Buildingmanager@gmail.com</Text>
          </View>
        </View>
        <View style={styles.sectionInfo}>
        <TextInput
            placeholder="Subject"
            value={subject}
            multiline={true}
            inputStyle={styles.placeholder}
            onChangeText={(txt) => setSubject(txt)}
            noBorder={true}
            placeholderColor={Colors.gray6}
          />
        </View>
        <View style={styles.sectionDescription}>
          <TextInput
            placeholder="Compose mail"
            value={descriptionValue}
            multiline={true}
            inputStyle={styles.placeholder}
            onChangeText={setDescriptionValue}
            noBorder={true}
            placeholderColor={Colors.gray6}
          />
        </View>
        <AlertConfirm
          show={alertCancel}
          leftText={'Go back'}
          rightText={'Confirm'}
          onPressCancel={() => setAlertCancel(false)}
          onPressConfirm={() => {
            navigation.goBack();
            setAlertCancel(false)
            
          }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 25,
              alignItems: 'center',
              marginVertical: 0,
            }}
            >
            <View>
              <Text style={styles.textAlert}>
              Are you sure you want to discard this draft? Your information will not be saved.
              </Text>
            </View>
          </View>
        </AlertConfirm>
        <AlertConfirm
          show={alertSend}
          leftText={'Cancel'}
          rightText={'Send'}
          onPressCancel={() => setAlertSend(false)}
          onPressConfirm={() => onSendEmail()}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 25,
              alignItems: 'center',
              marginVertical: 0,
            }}
            >
            <View>
              <Text style={styles.textAlert}>
                Do you want to send the email?
              </Text>
            </View>
          </View>
        </AlertConfirm>
        <ModalSelector
          setModal={setModal}
          setItem={setValue}
          data={EMAIL}
          checkData={emailItem}
          modalVisible={emailModalVisible}
          keyword={'email'}
        />
        
      </ScrollView>
      {loading? <DimSpinnerView/> : null}
    </View>
  );
};
//
export default memo(SendMailScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  header: {
    height: Layouts.headerHeight,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: Layouts.hasNotch ? 40 : (OS === 'ios' ? 10 : 0),
  },
  sectionInfo: {
    padding: 20,
    borderBottomColor: Colors.grayBorer,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionDescription: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.gray6,
    width: 65,
  },
  DescTitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.gray6,
  },
  emailItem: {
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: Colors.mainColor,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  emailTextItem: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
  placeholder: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  title: {
    ...Fonts.style.h3,
    color: Colors.black,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
  },
  textAlert: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
  imageArrowDown: {
    width: 30, 
    height: 30,
    tintColor: Colors.black,
  },
  arrowDownContent: {
    position: 'absolute',
    right: 20,
  },
});

const EMAIL = [
  {
    id: '0',
    name: 'Leenguyen@gmail.com',
  },
  {
    id: '1',
    name: 'Lee090834@gmail.com',
  },
];