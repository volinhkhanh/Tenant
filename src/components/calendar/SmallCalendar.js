import React, { useState, useEffect, memo, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Ripple from 'react-native-material-ripple';
//
import { ArrowForwardIcon } from '../../components/icons';
//
import { Fonts, Colors, ApplicationStyles } from '../../themes';
import dateFormat from '../../utils/dateFormat';
//
const ITEM_WIDTH = 47;
const MAX_DATA = 28;
const HALF_DATA = 14;
//
const SmallCalendar = props => {
  const { onChangeSelectDate, dateRange, navigation } = props;
  const DATA = dateRange.map((i, index) => {
    const date = moment()
      // .subtract(HALF_DATA, 'd')
      .add(index, 'd');
    return {
      id: date.format('YYYY-MM-DD'),
      date: date,
      weekDate: date.format('ddd'),
    };
  });
  // for ui calendar
  const theflatlistRef = useRef(null);
  const [indexList, setIndexList] = useState(0);
  //
  const [dataList, setDataList] = useState(DATA);
  const [visibleDate, setVisibleDate] = useState(moment());
  const [selectDate, setSelectDate] = useState();
  // initialCreate
  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    if (initialRender) setInitialRender(false);
    // navigation.addListener('willFocus', () => {
    //   setSelectDate(null)
    // });
  }, []);
  //
  const onSelectDateItem = date => {
    setSelectDate(date);
    onChangeSelectDate && onChangeSelectDate(date?.format(dateFormat.formatDateDefaultString));
  };
  const onPressScrollBack = () => {
    const index = indexList - 7;
    theflatlistRef.current.scrollToIndex({
      animated: true,
      index: _.max([0, index]),
    });
  };
  const onPressScrollNext = () => {
    const index = indexList + 7;
    const dataLength = dataList.length;
    theflatlistRef.current.scrollToIndex({
      animated: true,
      index: _.min([index, dataLength - 1]),
    });
  };
  //
  const onMomentumScrollEnd = ({ nativeEvent }) => {
    const {
      contentOffset: { y, x },
    } = nativeEvent;
    const index = _.ceil(x / ITEM_WIDTH);
    setIndexList(index);
    setVisibleDate(dataList[index].date);
    //
    theflatlistRef.current.scrollToIndex({
      animated: true,
      index,
    });
  };
  //
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ripple onPress={onPressScrollBack}>
          <ArrowForwardIcon
            size={17}
            style={[styles.arrowleft, { paddingVertical: 15, paddingHorizontal: 25 }]}
            color={indexList == 0 ? Colors.gray1 : Colors.mainColor}
          />
        </Ripple>
        <Text style={Fonts.style.subtitleMedium}>{visibleDate.format('MMMM YYYY')}</Text>
        <Ripple onPress={onPressScrollNext} style={{ paddingVertical: 15, paddingHorizontal: 25 }}>
          <ArrowForwardIcon size={17}
            color={indexList > 0 ? Colors.gray1 : Colors.mainColor}
          />
        </Ripple>
      </View>
      <FlatList
        horizontal
        data={dataList}
        ref={theflatlistRef}
        keyExtractor={item => item.id}
        style={{ marginHorizontal: 25 }}
        initialScrollIndex={indexList}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={(data, index) => ({ length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index })}
        renderItem={({ item }) => (
          <DateItem item={item} onSelect={onSelectDateItem} active={selectDate === item.date} />
        )}
      />
    </View>
  );
};
//
const DateItem = memo(props => {
  const { item, active, onSelect } = props;
  //
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: 80,
          width: 45,
          alignItems: 'center',
          paddingVertical: 3,
        }}>
        <View
          style={[
            {
              height: '100%',
              width: '100%',
            },
            active && {
              zIndex: 3,
              borderRadius: 30,
              backgroundColor: Colors.mainColor,
              // ...ApplicationStyles.shadow.dynamicOffset(1, 4, undefined, 0.15, 3),
            },
          ]}
        />
      </View>
      <Ripple
        onPress={() => onSelect && onSelect(item.date, item)}
        style={{
          marginHorizontal: 2,
          height: 80,
          paddingVertical: 10,
          width: 45,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: Colors.transparent,
          zIndex:4
        }}>
        <Text style={[styles.dateText, {color: active ? Colors.white : Colors.gray7}]}>{item.weekDate}</Text>
        <Text style={[styles.dateNumber, {color: active ? Colors.white : Colors.black}]}>
          {item.date.format('DD')}
        </Text>
      </Ripple>
    </>
  );
});
//
export default SmallCalendar;
//
const styles = StyleSheet.create({
  container: {},
  arrowleft: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
  },
  dateNumber: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
  },
});
