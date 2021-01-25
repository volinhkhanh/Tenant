import React, {useState, forwardRef, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
//
import {Colors, Fonts, ApplicationStyles} from '../../themes';
import {DateSVG} from '../../components/icons';
//
import {useTranslation} from '../../context/LanguageContext';
import dateFormat from '../../utils/dateFormat';

export const SelectCalendar = forwardRef(
  ({confirmText = 'Done', onChange, error, value}, ref, dateInput) => {
    // console.log('value', value);
    const [current, setCurrent] = useState(value || null);
    const [dateString, setDateString] = useState(null);
    const {t} = useTranslation();
    const currentTime = moment(new Date()).format('HH:mm');
    const currentDate = moment(new Date()).format('DD/MM/YYYY');
    const formatTime = time => {
      let HH = moment(value)
        .format('HH:mm')
        .split(':')[0];
      let mm = +moment(value)
        .format('HH:mm')
        .split(':')[1];

      switch (true) {
        case mm < 30:
          mm = '30';
          break;
        default:
          mm = '00';
          ++HH;
          break;
      }

      return `${HH}:${mm}`;
    };
    const [time, setTime] = useState(formatTime(value));
    // const [timeType, setTimeType] = useState(moment(value).format('a'));
    // const TIME_TYPE_DATA = ['am', 'pm'];
    const TIME_DATA = [
      '00:00',
      '00:30',
      '01:00',
      '01:30',
      '02:00',
      '02:30',
      '03:00',
      '03:30',
      '04:00',
      '04:30',
      '05:00',
      '05:30',
      '06:00',
      '06:30',
      '07:00',
      '07:30',
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30',
      '22:00',
      '22:30',
      '23:00',
      '23:30',
    ];

    const formatCurrent = current ? `${current}` : null;
    const onDone = () => {
      if (dateString) {
        // const formatDate = `${dateString
        //   .split('-')
        //   .reverse()
          // .join('/')} ${time}:00`;
        const formatDate = `${dateString} ${time}:00`;
        setCurrent(formatDate);
        // onChange(formatDate, dateString);
        onChange(formatDate);
        ref.current.close();
      } else {
        ref.current.close();
      }
    };
    return (
      <View>
        <Ripple
          style={[styles.inputDateTime, error && {borderColor: Colors.red}]}
          onPress={() => ref.current.open()}>
          <TextInput
            style={{
              ...Fonts.style.bodySemibold,
              flex: 1,
              color: current ? Colors.gray1 : Colors.gray3,
            }}
            // value={formatCurrent?.slice(0, -3)}
            value={formatCurrent ? dateFormat.formatDateTime(formatCurrent) : ''}
            placeholder={t('DateAndTime')}
            editable={false}
          />
          <DateSVG width={30} height={30} color={'#FFF'} />
        </Ripple>

        <RBSheet
          ref={ref}
          height={ApplicationStyles.utils.resizeHeight(150)}
          openDuration={300}
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
            <Text style={styles.title}>
              {t('src.components.modal.ModalCalendar2.Schedule')}
            </Text>
            <Calendar
              style={styles.containerCalendar}
              displayLoadingIndicator={true}
              firstDay={1}
              minDate={moment(new Date()).format('YYYY-MM-DD')}
              onDayPress={day => {
                // setSendDate(moment(day.timestamp).format('DD/MM/YYYY'));
                setDateString(moment(day.timestamp).format('YYYY-MM-DD'));
              }}
              markedDates={{
                [dateString]: {
                  selected: true,
                  selectedColor: Colors.mainColor,
                },
              }}
              theme={{
                //
                dayTextColor: Colors.gray1,
                todayTextColor: Colors.gray2,
                // todayTextColor: Colors.mainColor,
                arrowColor: Colors.gray2,
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
            <View style={styles.timeContent}>
              <FlatList
                style={styles.timeList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={TIME_DATA}
                renderItem={({item}) => {
                  // console.log(item, time);
                  return (
                    <Ripple
                      // disabled={+item.split(':')[0] < +time.split(':')[0]}
                      onPress={() => setTime(item)}
                      disabled={
                        (currentDate ===
                          moment(dateString).format('DD/MM/YYYY') &&
                          +item.split(':')[0] <
                            +currentTime.split(':')[0] + 1) ||
                        !dateString
                      }
                      style={styles.timeItem}>
                      <Text
                        style={{
                          color:
                            (currentDate ===
                              moment(dateString).format('DD/MM/YYYY') &&
                              +item.split(':')[0] <
                                +currentTime.split(':')[0] + 1) ||
                            !dateString
                              ? Colors.gray3
                              : item === time
                              ? Colors.mainColor
                              : Colors.black,
                          // color:
                          //   item === time ? Colors.mainColor : Colors.black,
                        }}>
                        {item}
                      </Text>
                    </Ripple>
                  );
                }}
                keyExtractor={item => item.id}
              />
            </View>
            <Ripple
              style={styles.doneContent}
              onPress={() => {
                onDone();
              }}>
              <Text style={styles.doneText}>
                {t(`src.components.modal.ModalCalendar2.${confirmText}`)}
              </Text>
            </Ripple>
          </ScrollView>
        </RBSheet>
      </View>
    );
  },
);

const styles = StyleSheet.create({
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
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    marginTop: 12,
  },
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
    // borderRightWidth: 0.5,
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
