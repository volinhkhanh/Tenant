import React, {useState, forwardRef, useRef, useLayoutEffect} from 'react';
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
import {wpc, hpc, hp} from '../../utils/responsePixel';

import {Colors, Fonts, ApplicationStyles} from '../../themes';
import {DateSVG, DateActiveSVG} from '../../components/icons';
import {useTranslation} from '../../context/LanguageContext';
import dateFormat from '../../utils/dateFormat';

const ITEM_WIDTH = 55

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

export const SelectCalendar = forwardRef(
  (
    {
      confirmText = 'Done',
      title = '',
      placeholder,
      doneText = '',
      onChange,
      error,
      value,
      minDate,
      disabled,
    },
    ref,
  ) => {
    // console.log(value)
    // const currentTime = moment(
    //   minDate ? moment(minDate, 'DD/MM/YYYY HH:mm').toDate() : new Date(),
    // ).format('HH:mm');
    // console.log(value)
    const currentTime = moment(minDate ? moment(minDate) : new Date()).format(
      'HH:mm',
    );
    // const currentDate = moment(
    //   minDate ? moment(minDate, 'DD/MM/YYYY HH:mm').toDate() : new Date(),
    // ).format('DD/MM/YYYY');
    const currentDate = moment(minDate ? moment(minDate) : new Date()).format(
      'YYYY-MM-DD',
    );

    const [current, setCurrent] = useState(null);
    const [dateString, setDateString] = useState(null);
    const [time, setTime] = useState(null);
    const [min, setMin] = useState(null);

    const flatListRef = useRef(null);

    const {t, i18nTicketDateTime} = useTranslation();

    useLayoutEffect(() => {
      console.log(minDate)
        console.log(value)
      if (minDate && !value) {
        // setCurrent(minDate?.slice(0, -3));
        setDateString(
          moment(
            minDate
              ? // ? moment(minDate, 'DD/MM/YYYY HH:mm').toDate()
                moment(minDate)
              : new Date(),
          ).format('YYYY-MM-DD'),
        );
        setTime(
          formatTime(
            minDate
              ? // ? moment(minDate, 'DD/MM/YYYY HH:mm').toDate()
                moment(minDate)
              : new Date(),
          ),
        );
        setMin(minDate);
      } else {
        setCurrent(value);
        setDateString(
          moment(
            value
              ? // ? moment(value, 'DD/MM/YYYY HH:mm').toDate()
                moment(minDate)
              : new Date(),
          ).format('YYYY-MM-DD'),
        );

        setTime(
          formatTime(
            value
              ? // ? moment(value, 'DD/MM/YYYY HH:mm').toDate()
                moment(minDate)
              : new Date(),
          ),
        );
      }
    }, [value, minDate]);

    function formatTime(date) {
      let HH = moment(date).hour();
      let mm = moment(date).minute();

      switch (true) {
        case mm > 30:
          mm = '30';
          ++HH;
          break;
        case mm === 0:
          mm = '00';
          break;
        default:
          mm = '00';
          ++HH;
          break;
      }

      return `${HH < 10 ? `0${HH}` : HH}:${mm}`;
    }

    function onDone(item) {
      setTime(item)
      if (dateString) {
        // const formatDate = `${dateString
        //   .split('-')
        //   .reverse()
        //   .join('/')} ${time}:00`;
        // setCurrent(formatDate.slice(0, -3));
        // onChange(formatDate, dateString);
        const formatDate = `${dateString} ${item}:00`;
        setCurrent(formatDate);
        onChange(formatDate);
        ref.current.close();
      }
      ref.current.close();
    }
    // useLayoutEffect(() => {
    //   console.log(time)
    // }, [time])

    return (
      <View>
        <Ripple
          style={[styles.inputDateTime, error && {borderColor: Colors.red}]}
          disabled={disabled}
          onPress={() => {
            ref.current.open();
            const wait = new Promise((resolve) => setTimeout(resolve, 750));
            wait.then(() => {
              const index = TIME_DATA.findIndex((element) => element === time);
              flatListRef.current.scrollToIndex({
                animated: true,
                index: index - 3,
              });
            });
          }}>
          <TextInput
            style={{
              ...Fonts.style.bodySemibold,
              flex: 1,
              color: current ? Colors.gray1 : Colors.gray3,
            }}
            value={current ? dateFormat.formatTimeDate(current) : ''}
            placeholder={placeholder ?? i18nTicketDateTime}
            editable={false}
          />
          {current ? (
            <DateActiveSVG width={30} height={30} opacity={current ? 1 : 0.5} />
          ) : (
            <DateSVG width={30} height={30} opacity={current ? 1 : 0.5} />
          )}
        </Ripple>

        <RBSheet
          ref={ref}
          height={hpc(460)}
          openDuration={300}
          customStyles={{
            container: {
              padding: 20,
              paddingBottom: 0,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
          }}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}>
            {/* <Text style={styles.title}>
              {title}
            </Text> */}
             {/* {t('src.components.modal.ModalCalendar2.Schedule')} */}
            <Calendar
              style={styles.containerCalendar}
              displayLoadingIndicator={true}
              firstDay={1}
              // minDate={moment(
              //   min ? moment(min, 'DD/MM/YYYY HH:mm').toDate() : new Date(),
              // ).format('YYYY-MM-DD')}
              minDate={moment(min ? moment(min) : new Date()).format(
                'YYYY-MM-DD',
              )}
              onDayPress={(day) => {
                setTime(formatTime(new Date()));
                setDateString(moment(day.timestamp).format('YYYY-MM-DD'));
              }}
              markedDates={{
                [dateString]: {
                  selected: true,
                  selectedColor: Colors.mainColor,
                },
              }}
              theme={{
                dayTextColor: Colors.gray1,
                todayTextColor: Colors.gray2,
                arrowColor: Colors.gray2,
                textSectionTitleColor: Colors.gray2,
                textDayHeaderFontFamily: Fonts.type.base,
                textDayHeaderFontSize: Fonts.size.h5,
                textDayHeaderFontWeight: 'normal',
                textDayFontSize: Fonts.size.h5,
                textDayFontWeight: 'normal',
                textDayFontFamily: Fonts.type.medium,
                textMonthFontFamily: Fonts.type.semiBold,
                textMonthFontSize: Fonts.size.h4,
                textMonthFontWeight: 'normal',
              }}
              hideExtraDays
            />
            <View style={styles.timeContent}>
              <FlatList
                ref={flatListRef}
                style={styles.timeList}
                getItemLayout={(data, index) => ({
                  length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index
                })}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={TIME_DATA}
                renderItem={({item}) => {
                  const isCurrent =
                    currentDate === moment(dateString).format('YYYY-MM-DD');
                  const disabled = (item) => {
                    const now = new Date();
                    now.setHours(+currentTime.split(':')[0]);
                    now.setMinutes(+currentTime.split(':')[1]);

                    const formatCurrentTime = formatTime(now);

                    // console.log('currentTime', formatTime(now));
                    // console.log('item', item);
                    // check hours
                    if (
                      +item.split(':')[0] > +formatCurrentTime.split(':')[0]
                    ) {
                      return false;
                    }
                    if (
                      +item.split(':')[0] === +formatCurrentTime.split(':')[0]
                    ) {
                      // check minutes
                      // console.log(
                      //   +item.split(':')[0],
                      //   +formatCurrentTime.split(':')[0],
                      //   +item.split(':')[1],
                      //   +formatCurrentTime.split(':')[1],
                      // );
                      if (
                        +item.split(':')[1] < +formatCurrentTime.split(':')[1]
                      ) {
                        return true;
                      }
                      return false;
                    }
                    return true;
                  };
                  return (
                    <Ripple
                      onPress={() => {
                        onDone(item)
                      }}
                      disabled={isCurrent && disabled(item)}
                      style={styles.timeItem}>
                      <Text
                        style={{
                          color:
                            isCurrent && disabled(item)
                              ? Colors.gray3
                              : item === time
                              ? Colors.mainColor
                              : Colors.black,
                        }}>
                        {item}
                      </Text>
                    </Ripple>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
            {/* <Ripple style={styles.doneContent} onPress={onDone}>
              <Text style={styles.doneText}>
                {confirmText}
              </Text>
            </Ripple> */}
          </ScrollView>
        </RBSheet>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputDateTime: {
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
    width: '100%',
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
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
    paddingVertical: 10,
  },
  timeItem: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    width: ITEM_WIDTH,
  },
  timeType: {
    marginHorizontal: 20,
    alignItems: 'center',
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
