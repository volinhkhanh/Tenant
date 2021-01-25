import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export function MyProgressSteps({
  show = false,
  style = {},
  value = '',
  setValue = () => {},
  data = [],
}) {
  const index = data?.findIndex((ele) => ele.status === value);
  const PassDot = () => <View style={styles.passDot} />;
  const CurrentDot = () => (
    <View>
      <View style={styles.currentDot} />
      <View style={styles.miniDot} />
    </View>
  );

  const FutureDot = () => <View style={styles.futureDot} />;

  // console.log(index + 1, data?.length, `${(index / (data.length - 1)) * 100}%`);

  if (!show) return null;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.dividerBox}>
        <View style={styles.divider} />
        <View
          style={[
            styles.activeDivider,
            {
              width: `${((index + (data[0]?.detail ? 1 : 0)) / (data.length - 1)) * 100}%`,
            },
          ]}
        />

        {data?.map((ele, i) => {
          const add = ele?.detail || value === 'REJECTED' ? 1 : 0

          const renderDot = (sub) => {
            if (sub > 0) {
              return <PassDot />;
            }
            if (sub === 0) return <CurrentDot />;
            return <FutureDot />;
          };
          return (
            <View key={ele.id} style={styles.dotBox}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setValue(ele.status);
                }}>
                {ele?.finish && value === ele?.status ? renderDot(index + 1 + add) : renderDot(index - i + add)}
              </TouchableWithoutFeedback>
              <View style={styles.nameBox}>
                <Text style={styles.name}>{index - i > 0 ? ele.finishName : ele?.finish && value === ele?.status ?ele.finishName : ele.name}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 35,
  },
  dividerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  divider: {
    position: 'absolute',
    marginTop: 6,
    backgroundColor: '#CACACA',
    height: 1,
    width: '100%',
  },
  activeDivider: {
    position: 'absolute',
    marginTop: 6,
    backgroundColor: '#F6CA13',
    height: 1,
    width: '100%',
  },
  dotBox: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  passDot: {
    width: 12,
    height: 12,
    backgroundColor: '#F6CA13',
    borderRadius: 12 / 2,
  },
  currentDot: {
    width: 12,
    height: 12,
    borderColor: '#F6CA13',
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 12 / 2,
  },
  miniDot: {
    backgroundColor: '#F6CA13',
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
    top: 6 / 2,
    left: 6 / 2,
  },
  futureDot: {
    width: 12,
    height: 12,
    borderColor: '#CACACA',
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 12 / 2,
  },
  nameBox: {
    position: 'absolute',
    marginTop: 20,
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 10,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#8A8A8A',
  },
});
