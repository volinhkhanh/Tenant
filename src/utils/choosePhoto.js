import ImagePicker from 'react-native-image-picker';
//
import {Platform} from 'react-native';
//
import {
  checkCameraPermissions,
  checkPhotoLibraryPermissions,
} from '../utils/permissions';
//
const selectPhotoTapped = async (uploadImageToServer, t) => {
  const i18nChoosePhotoSAP = t('src.utils.choosePhoto.SAP');
  const i18nChoosePhotoCa = t('src.utils.choosePhoto.Ca');
  const i18nChoosePhotoTAP = t('src.utils.choosePhoto.TAP');
  const i18nChoosePhotoCFL = t('src.utils.choosePhoto.CFL');

  const options = {
    title: i18nChoosePhotoSAP,
    cancelButtonTitle: i18nChoosePhotoCa,
    takePhotoButtonTitle: i18nChoosePhotoTAP,
    chooseFromLibraryButtonTitle: i18nChoosePhotoCFL,
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
        // type: 'image/jpg'
        type: response.type,
      };
      const data = new FormData();
      data.append('file', photo);
      uploadImageToServer(data);
    }
  });
  // }
};
//
export default {
  selectPhotoTapped,
};
