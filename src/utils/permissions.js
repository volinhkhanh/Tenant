import Permissions from 'react-native-permissions';
//
export const checkCameraPermissions = async () => {
  try {
    const granted = await Permissions.check('camera');
    if (granted !== 'authorized') {
      const grantedAsk = await Permissions.request('camera');
      return grantedAsk === 'authorized';
    }
    return true;
  } catch (e) {
    return false;
  }
}
//
export const checkPhotoLibraryPermissions = async () => {
  try {
    const granted = await Permissions.check('photo');
    // console.log(granted)
    if (granted !== 'authorized') {
      const grantedAsk = await Permissions.request('photo');
      return grantedAsk === 'authorized';
    }
    return true;
  } catch (e) {
    return false;
  }
}