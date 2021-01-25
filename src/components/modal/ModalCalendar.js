import React, {useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
//
import {Colors, Fonts} from '../../themes';
//
import dateFormat from '../../utils/dateFormat';
import {useTranslation} from '../../context/LanguageContext';
//
const SELECTED_COLOR = Colors.mainColor;
const SELECTED_DAY = {
  selected: true,
  selectedColor: SELECTED_COLOR,
};

const ModalCalendar = props => {
  const {
    setModal,
    data,
    keyword,
    modalVisible,
    setItem,
    noTime,
    title = '',
    doneText = '',
  } = props;
  //
  const {style, containerStyle, placeholder = 'Choose date'} = props;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const {t} = useTranslation();

  const [activeText, setActiveText] = useState(false);
  const [isOpenCalendar, setisOpenCalendar] = useState(false);
  const [contentText, setContentText] = useState(placeholder);
  const [timeType, setTimeType] = useState('am');
  const [timeSelection, setTimeSelection] = useState(false);
  const arrowColor = Colors.gray2;
  const onPress = () => {
    setisOpenCalendar(!isOpenCalendar);
  };

  const [markedDates, setMarkedDates] = useState({
    data: SELECTED_DAY,
  });

  const ChangeTimeSelection = value => {
    setTimeSelection(value);
  };

  const renderItem = (props, item) => {
    return (
      <Ripple
        onPress={() => {
          ChangeTimeSelection(item.id);
        }}
        style={styles.timeItem}>
        <Text
          style={{
            color: item.id == timeSelection ? Colors.mainColor : Colors.black,
          }}>
          {item.value}
        </Text>
      </Ripple>
    );
  };

  const onDayPress = value => {
    setMarkedDates({
      [value.dateString]: SELECTED_DAY,
    });
    setisOpenCalendar(false);
    setContentText(
      moment(value.timestamp).format(dateFormat.formatDateDefaultString),
    );
    setActiveText(true);
  };

  const ChangeTimeType = value => {
    setTimeType(value);
  };
  return (
    <View style={styles.container}>
      <RBSheet
        ref={ref => {
          setModal(keyword, ref);
        }}
        // height={ApplicationStyles.utils.resizeHeight(600)}
        height={500}
        openDuration={300}
        customStyles={{
          container: {
            padding: 20,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
        }}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* <Text style={styles.title}>
            {title}
          </Text> */}
          <Calendar
            style={styles.containerCalendar}
            renderEmptyData={() => <View />}
            displayLoadingIndicator={true}
            firstDay={1}
            onDayPress={onDayPress}
            minDate={moment(today).format('YYYY-MM-DD')}
            markedDates={markedDates}
            theme={{
              dayTextColor: Colors.gray1,
              todayTextColor: Colors.gray2,
              arrowColor: arrowColor,
              textSectionTitleColor: Colors.gray2,
              //
              textDayHeaderFontFamily: Fonts.type.base,
              textDayHeaderFontSize: Fonts.size.h5,
              textDayHeaderFontWeight: 'normal',
              //
              textDayFontSize: Fonts.size.h5,
              textDayFontWeight: 'normal',
              textDayFontFamily: Fonts.type.medium,
              //
              textMonthFontFamily: Fonts.type.semiBold,
              textMonthFontSize: Fonts.size.h4,
              textMonthFontWeight: 'normal',
            }}
          />
          {!noTime && (
            <View style={styles.timeContent}>
              <FlatList
                style={styles.timeList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={({item}) => renderItem(props, item)}
                keyExtractor={item => item.id}
              />

              <View style={styles.timeType}>
                <Ripple
                  onPress={() => {
                    ChangeTimeType('am');
                  }}>
                  <Text
                    style={[
                      styles.timeTypeItem,
                      {
                        color:
                          timeType === 'am' ? Colors.mainColor : Colors.gray6,
                        paddingTop: 10,
                      },
                    ]}>
                    AM
                  </Text>
                </Ripple>
                <Ripple
                  onPress={() => {
                    ChangeTimeType('pm');
                  }}>
                  <Text
                    style={[
                      styles.timeTypeItem,
                      {
                        color:
                          timeType === 'pm' ? Colors.mainColor : Colors.gray6,
                      },
                    ]}>
                    PM
                  </Text>
                </Ripple>
              </View>
            </View>
          )}
          <Ripple
            style={styles.doneContent}
            onPress={() => {
              !noTime
                ? setItem(
                    keyword,
                    contentText +
                      ' at ' +
                      timeSelection +
                      ':00' +
                      ' ' +
                      timeType,
                  )
                : setItem(keyword, contentText);
              modalVisible.close();
            }}>
            <Text style={styles.doneText}>
              {/* {t('src.components.modal.ModalCalendar2.Done')} */}
              {doneText}
            </Text>
          </Ripple>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default ModalCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  datepicker: {
    position: 'relative',
    zIndex: 3,
  },
  containerCalendar: {
    // position: 'absolute',
    width: '100%',
    // zIndex: 2,
    // top: 66,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    // ...ApplicationStyles.shadow.box,
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.medium,
  },
  timeContent: {
    flexDirection: 'row',
    borderTopColor: Colors.grayBorer,
    borderTopWidth: 0.5,
  },
  timeList: {
    borderRightColor: Colors.grayBorer,
    borderRightWidth: 0.5,
    paddingVertical: 10,
  },
  timeItem: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  timeType: {
    marginHorizontal: 20,
    alignItems: 'center',
    // paddingVertical: 10,
  },
  timeTypeItem: {
    paddingTop: 3,
  },
  doneContent: {
    alignItems: 'flex-end',
    marginTop: 20,
    paddingHorizontal: 8,
  },
  doneText: {
    color: Colors.mainColor,
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.bold,
  },
});

const DATA = [
  {
    id: 0,
    value: '1:00',
  },
  {
    id: 1,
    value: '2:00',
  },
  {
    id: 2,
    value: '3:00',
  },
  {
    id: 3,
    value: '4:00',
  },
  {
    id: 4,
    value: '5:00',
  },
  {
    id: 5,
    value: '6:00',
  },
  {
    id: 6,
    value: '7:00',
  },
  {
    id: 7,
    value: '8:00',
  },
  {
    id: 8,
    value: '9:00',
  },
  {
    id: 9,
    value: '10:00',
  },
  {
    id: 10,
    value: '11:00',
  },
  {
    id: 11,
    value: '12:00',
  },
];
