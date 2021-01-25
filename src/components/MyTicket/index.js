import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import moment from 'moment';

import TicketShape from '../../assets/images/liveChat/ticket-shape.png';
import {Colors, Fonts, Images} from '../../themes';
import {DividerDot} from '../../components/divider';
// import Furniture from '../../assets/images/liveChat/furniture.png';
import {} from '../../utils/dateFormat';

export function MyTicket({data = {}, message = ''}) {

  const parseData = JSON.parse(data);
  console.log(parseData)

  const tenantLabel = parseData?.tenant_name?.label || '';
  const tenantValue = parseData?.tenant_name?.value || '';

  const unitLabel = parseData?.unit?.label || '';
  const unitValue = parseData?.unit?.value || '';

  const serviceTypeLabel = parseData?.service_type?.label || '';
  const serviceTypeValue = parseData?.service_type?.value || '';

  const titleLabel = parseData?.title?.label || '';
  const titleValue = parseData?.title?.value || '';

  const descriptionValue = parseData?.description?.value || '';

  const filesValue = parseData?.files?.value || [];

  const expectedTimeLabel = parseData?.expected_time?.label || '';
  const expectedTimeValue =
    moment(parseData?.expected_time?.value).format('HH:mm DD/MM/YYYY') || ''; // 8:00 08/03/2020

  const staffLabel = parseData?.staff?.label || '';
  const staffValue = parseData?.staff?.value || '';

  const serviceFeeLabel = parseData?.service_fee?.label || '';
  const serviceFeeValue = parseData?.service_fee?.value || '';

  return (
    <View style={{marginTop: 27}}>
      <ImageBackground
        style={{
          width: '100%',
          minWidth: 320,
          minHeight: 60,
          // padding: 1,
          // backgroundColor: 'red',
        }}
        // resizeMode="center"
        source={Images.intersectSmall}>
        <View style={{marginTop: 18, flex: 1}}>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            Request Detail
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          width: '100%',
          minWidth: 320,
          // height: 463,
          // padding: 1,
          paddingBottom: 20,
          backgroundColor: 'white',
          minWidth: 200,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
        // resizeMode="center"
        // source={Images.intersectSmall}
      >
        {/* <View style={{marginTop: 18}}>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            Request Detail
          </Text>
        </View> */}
        <DividerDot />
        <View style={{marginTop: 17, paddingHorizontal: 26}}>
          {/* <View
            style={{
              borderWidth: 0.5,
              borderStyle: 'dashed',
              borderColor: '#CACACA',
            }}
          /> */}
          <View style={{marginTop: 4}}>
            <View style={styles.field}>
              <Text style={styles.key}>{tenantLabel}</Text>
              <Text style={styles.value}>{tenantValue}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.key}>{unitLabel}</Text>
              <Text style={styles.value}>{unitValue}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.key}>
                {serviceTypeLabel}
                {/* {data.find(item => item.key === 'type').value[0]} */}
              </Text>
              <Text style={styles.value}>
                {serviceTypeValue}
                {/* {data.find(item => item.key === 'type').value[1]} */}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.key}>
                {titleLabel}
                {/* {data.find(item => item.key === 'task_title').value[0]} */}
              </Text>
              <Text style={styles.value}>
                {titleValue}
                {/* {data.find(item => item.key === 'task_title').value[1]} */}
              </Text>
            </View>
            <View
              style={[
                styles.field,
                {
                  // height: 70,
                  backgroundColor: '#FAFAFA',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                },
              ]}>
              <Text style={{color: '#8A8A8A', paddingBottom: 15}}>
                {/* {data.find(item => item.key === 'description').value[1]} */}
                {descriptionValue}
              </Text>
            </View>
            <View style={[styles.field, {justifyContent: 'center'}]}>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {filesValue?.map(file => (
                  <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={{uri: file}}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.field}>
              <Text style={styles.key}>{expectedTimeLabel}</Text>
              <Text style={styles.value}>
                {/* 8:00 08/03/2020 */}
                {expectedTimeValue}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.key}>{staffLabel}</Text>
              <Text style={styles.value}>{staffValue}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.key}>{serviceFeeLabel}</Text>
              <Text style={styles.value}>
                {(+serviceFeeValue).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginTop: Platform.OS === 'ios' ? 12 : 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#8A8A8A',
    flex: 1,
    textAlign: 'right',
  },
  image: {
    width: 88,
    height: 88,
    marginRight: 15,
  },
});
