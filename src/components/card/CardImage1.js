import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {ApplicationStyles, Colors} from '../../themes';
import {DeleteIcon, AddIcon} from '../icons';

const SIZE = {L: 150, M: 88, S: 75};

function CardImage(props) {
  const {
    size = 'M',
    style,
    onPress,
    fixedWidth,
    noDelete,
    imageUrl = '',
    onDelete,
  } = props;
  const heightContainer = SIZE[size];
  const dimensionStyles = {
    height: heightContainer,
    width: fixedWidth ? heightContainer : null,
    flex: fixedWidth ? null : 1,
    minWidth: 75,
  };

  return !!imageUrl ? (
    <View style={[styles.container, dimensionStyles, style]}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      {!noDelete && (
        <Ripple style={styles.deleteButton} onPress={onDelete}>
          <DeleteIcon size={20} color={Colors.gray1} />
        </Ripple>
      )}
    </View>
  ) : (
    <Ripple
      style={[styles.container, dimensionStyles, style]}
      onPress={onPress}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <AddIcon size={30} />
      </View>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 4,
    marginRight: 20,
    borderRadius: 10,
    ...ApplicationStyles.shadow.dynamicOffset(1, 1, Colors.black, 0.15, 4),
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  deleteButton: {
    position: 'absolute',
    backgroundColor: Colors.whiteGray,
    borderRadius: 12,
    top: -6,
    right: -11,
    ...ApplicationStyles.shadow.dynamicOffset(0, 4, Colors.black, 0.15, 4),
  },
});

export default CardImage;
