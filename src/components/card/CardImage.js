import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import _ from 'lodash';
import Ripple from 'react-native-material-ripple';
//
import {ApplicationStyles, Colors} from '../../themes';
//
import {DeleteIcon, AddIcon} from '../icons';
import ImageProgress from '../ImageProgress';
//
const SIZE = {L: 150, M: 88, S: 75};
//
function CardImage(props) {
  const {
    size = 'M',
    style,
    onPress,
    fixedWidth,
    noDelete,
    onDelete,
    disabled,
  } = props;
  const {imageUrl = ''} = props;
  //
  const heightContainer = SIZE[size];
  const dimensionStyles = {
    height: heightContainer,
    width: fixedWidth ? heightContainer : null,
    flex: fixedWidth ? null : 1,
    minWidth: 75,
  };
  //
  return (
    <View>
      <Ripple
        disabled={disabled}
        style={[styles.container, dimensionStyles, style]}
        onPress={onPress}>
        {imageUrl ? (
          <>
            <ImageProgress source={{uri: imageUrl}} style={styles.image} />
          </>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <AddIcon size={30} />
          </View>
        )}
      </Ripple>
      {!noDelete && imageUrl !== '' && (
        <Ripple style={styles.delButton} onPress={onDelete}>
          <DeleteIcon size={20} color={Colors.gray1} />
        </Ripple>
      )}
    </View>
  );
}
//
export default CardImage;
//
const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 4,
    marginHorizontal: 20,
    borderRadius: 10,
    ...ApplicationStyles.boxShadow,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  delButton: {
    position: 'absolute',
    backgroundColor: Colors.whiteGray,
    borderRadius: 12,
    right: 11,
    ...ApplicationStyles.boxShadow,
  },
});
