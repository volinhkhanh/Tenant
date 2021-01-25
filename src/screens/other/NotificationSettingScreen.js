import React, {useState, memo, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Switch} from 'react-native';
import _ from 'lodash';
//
import {Mail, Bell} from '../../components/icons';
import {getSettingNotify} from '../../services/serviceRest';
//
import {Colors, Fonts} from '../../themes';
import {ErrorProcess} from '../../components/alert/ErrorMessage';
import DimSpinnerView from '../../components/DimSpinnerView';
import {useTranslation} from '../../context/LanguageContext';
//
function NotificationSettingScreen(props) {
  // const [data, setData] = useState(DATA);
  const {getListSetting} = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    t,
    i18nNotificationSettingBi,
    i18nNotificationSettingBo,
    i18nNotificationSettingTi,
    i18nNotificationSettingML,
    i18nNotificationSettingEv,
    i18nNotificationSettingAn,
    i18nNotificationSettingSa,
  } = useTranslation();

  useEffect(() => {
    getListData = async () => {
      try {
        setLoading(true);
        let res = await getSettingNotify();
        let dataRes = res?.data?.notification_setting;
        setData([
          {
            id: '1',
            name: i18nNotificationSettingBi,
            notification: dataRes?.bill?.notification,
            email: dataRes?.bill?.email,
          },
          {
            id: '2',
            name: i18nNotificationSettingBo,
            notification: dataRes?.booking?.notification,
            email: dataRes?.booking?.email,
          },
          {
            id: '3',
            name: i18nNotificationSettingAn,
            notification: dataRes?.ticket?.notification,
            email: dataRes?.ticket?.email,
          },
          {
            id: '4',
            name: i18nNotificationSettingTi,
            notification: dataRes?.announcement?.notification,
            email: dataRes?.announcement?.email,
          },
        ]);
        await getListSetting(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        ErrorProcess.alert('Alert', error.response.data.message);
        console.log('error', error);
      }
    };
    getListData();
  }, []);
  const valueSwitchChange = async (value, type, id) => {
    if (!_.includes(['notification', 'email'], type)) return null;
    console.log(data)
    const updatedData = _.map(data, item => {
      if (item.id === id) {
        return {
          ...item,
          [type]: value,
        };
      }
      return item;
    });
    await getListSetting(updatedData);
    setData(updatedData);
  };
  //
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentScroll}
        data={data}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingVertical: 15,
            }}>
            <View style={{paddingRight: 40, color: Colors.gray2}}>
              <Bell />
            </View>
            <View style={{paddingRight: 34, color: Colors.gray2}}>
              <Mail />
            </View>
          </View>
        )}
        renderItem={({item}) => {
          return <ListItem item={item} valueSwitchChange={valueSwitchChange} />;
        }}
      />
      {loading ? <DimSpinnerView /> : null}
    </View>
  );
}
//
const ListItem = props => {
  const {item, valueSwitchChange} = props;
  return (
    <View style={styles.item}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{
            fontFamily: Fonts.type.regular,
            fontSize: Fonts.size.h4,
            color: Colors.black
          }}>
          {item.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 115,
        }}>
        <Switch
          value={item.notification == 1 ? true : false}
          trackColor={{false: '#CACACA', true: Colors.mainColor}}
          onValueChange={() =>
            valueSwitchChange(!item.notification, 'notification', item.id)
          }
          thumbColor={'#FFFFFF'}
          ios_backgroundColor={'#CACACA'}
          style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
        />
        <Switch
          trackColor={{false: '#CACACA', true: Colors.mainColor}}
          value={item.email == 1 ? true : false}
          onValueChange={() => valueSwitchChange(!item.email, 'email', item.id)}
          thumbColor={'#FFFFFF'}
          ios_backgroundColor={'#CACACA'}
          style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
        />
      </View>
    </View>
  );
};
//
export default memo(NotificationSettingScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentScroll: {
    paddingVertical: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 26,
    paddingRight: 21,
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 0.5,
  },
});
