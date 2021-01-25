import ImagePicker from 'react-native-image-picker';
//
import {Platform} from 'react-native';
//
import {
  checkCameraPermissions,
  checkPhotoLibraryPermissions,
} from '../utils/permissions';
//
const selectPhotoTapped = async (setData, t, array) => {
  const options = {
    title: t('SelectAPhoto'),
    cancelButtonTitle: t('Cancel'),
    takePhotoButtonTitle: t('TakePhoto'),
    chooseFromLibraryButtonTitle: t('ChooseFromLibrary'),
    quality: 1.0,
    maxWidth: 1000,
    maxHeight: 1000,
  };
  //
  // const cameraStatus = await checkCameraPermissions();
  // const photoStatus = await checkPhotoLibraryPermissions();
  // if(cameraStatus && photoStatus) {
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const photo = {
        uri: response.uri,
        name: 'image',
        // type: 'image/jpeg'
        type: response.type,
      };
      !array ? setData(photo) : setData([...array, photo]);
    }
  });
  // }
};
//
export default {
  selectPhotoTapped,
};
