import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {ApplicationStyles, Colors} from '../../themes';
import {DeleteIcon} from '../../components/icons';
import DocumentSvg from '../../assets/images/movingList/document.svg';
import Ripple from 'react-native-material-ripple';
import {useTranslation} from '../../context/LanguageContext';

export function MyTable({columns = [], dataSource = [], onDelete = () => {}}) {
  const {
    t,
    i18nMovingListNML
  } = useTranslation();
  function handleDelete(key) {
    onDelete(key);
  }
  if (dataSource?.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <DocumentSvg />
        <View style={styles.contentBox}>
          <Text style={styles.content}>{i18nMovingListNML}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.table}>
      {columns.length > 0 && (
        <View>
          <View style={styles.headerBox}>
            {columns?.map((ele) => (
              <Text style={styles.header}>{ele.title}</Text>
            ))}
          </View>
          <View style={styles.divider} />
        </View>
      )}

      {dataSource?.length > 0 && (
        <View style={styles.bodyBox}>
          {dataSource?.map((ele, index) => (
            <View style={styles.row}>
              <Text style={styles.body} numberOfLines={1}>{ele.name}</Text>
              <Text style={styles.body}>{ele.quantity}</Text>
              <Ripple
                style={styles.clear}
                onPress={() => handleDelete(index)}>
                <DeleteIcon size={24} color="#8A8A8A" />
              </Ripple>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    ...ApplicationStyles.boxShadow,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 15,
    marginHorizontal: 30,
  },
  divider: {
    borderColor: 'rgba(78, 80, 83, 0.2)',
    borderWidth: 0.5,
  },
  header: {
    color: '#000000',
  },
  bodyBox: {
    flexDirection: 'column',
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    marginBottom: 12,
  },
  body: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: '#8A8A8A',
    width: 100,
  },
  clear: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: '#F9F9F9',
    ...ApplicationStyles.boxShadow,
  },
  emptyBox: {
    alignItems: 'center',
  },
  contentBox: {
    marginTop: 15,
  },
  content: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    color: '#CACACA',
  },
});
