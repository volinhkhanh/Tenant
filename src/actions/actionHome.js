import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
//
import * as serviceRest from '../services/serviceRest';
//---------------------------------------------------------------------------------------------------------------------
export const SET_REQUEST_UNIT_LIST = 'SET_REQUEST_UNIT_LIST';
export const SET_REQUEST_UNIT_LIST_SUCCESS = 'SET_REQUEST_UNIT_LIST_SUCCESS';
export const SET_REQUEST_UNIT_LIST_ERROR = 'SET_REQUEST_UNIT_LIST_ERROR';
//
export const SET_GENERAL_INFORMATION_DATA =
  'SET_GENERAL_INFORMATION_DATA';
export const SET_REQUEST_GENERAL_INFORMATION =
  'SET_REQUEST_GENERAL_INFORMATION';
export const SET_REQUEST_GENERAL_INFORMATION_SUCCESS =
  'SET_REQUEST_GENERAL_INFORMATION_SUCCESS';
export const SET_REQUEST_GENERAL_INFORMATION_ERROR =
  'SET_REQUEST_GENERAL_INFORMATION_ERROR';
//
export const SET_REQUEST_TENANT_LIST = 'SET_REQUEST_TENANT_LIST';
export const SET_REQUEST_TENANT_LIST_SUCCESS =
  'SET_REQUEST_TENANT_LIST_SUCCESS';
export const SET_REQUEST_TENANT_LIST_ERROR = 'SET_REQUEST_TENANT_LIST_ERROR';
//
export const SET_REQUEST_VEHICLE = 'SET_REQUEST_VEHICLE';
export const SET_REQUEST_VEHICLE_SUCCESS = 'SET_REQUEST_VEHICLE_SUCCESS';
export const SET_REQUEST_VEHICLE_ERROR = 'SET_REQUEST_VEHICLE_ERROR';
//
export const SET_REQUEST_SESSION = 'SET_REQUEST_SESSION';
export const SET_REQUEST_SESSION_SUCCESS = 'SET_REQUEST_SESSION_SUCCESS';
export const SET_REQUEST_SESSION_ERROR = 'SET_REQUEST_SESSION_ERROR';
//
export const SET_HOME_IMAGE_DATA = 'SET_HOME_IMAGE_DATA';
export const SET_REQUEST_UPLOAD_HOME_IMAGE = 'SET_REQUEST_UPLOAD_HOME_IMAGE';
export const SET_REQUEST_UPLOAD_HOME_IMAGE_SUCCESS =
  'SET_REQUEST_UPLOAD_HOME_IMAGE_SUCCESS';
export const SET_REQUEST_UPLOAD_HOME_IMAGE_ERROR =
  'SET_REQUEST_UPLOAD_HOME_IMAGE_ERROR';
//
export const SET_REQUEST_REGISTER_VEHICLE = 'SET_REQUEST_REGISTER_VEHICLE';
export const SET_REQUEST_REGISTER_VEHICLE_SUCCESS =
  'SET_REQUEST_REGISTER_VEHICLE_SUCCESS';
export const SET_REQUEST_REGISTER_VEHICLE_ERROR =
  'SET_REQUEST_REGISTER_VEHICLE_ERROR';
//
export const SET_REQUEST_ADD_MEMBER = 'SET_REQUEST_ADD_MEMBER';
export const SET_REQUEST_ADD_MEMBER_SUCCESS = 'SET_REQUEST_ADD_MEMBER_SUCCESS';
export const SET_REQUEST_ADD_MEMBER_ERROR = 'SET_REQUEST_ADD_MEMBER_ERROR';
//
export const SET_MEMBER_DETAIL_DATA = 'SET_MEMBER_DETAIL_DATA';
export const SET_REQUEST_MEMBER_DETAIL = 'SET_REQUEST_MEMBER_DETAIL';
export const SET_REQUEST_MEMBER_DETAIL_SUCCESS =
  'SET_REQUEST_MEMBER_DETAIL_SUCCESS';
export const SET_REQUEST_MEMBER_DETAIL_ERROR =
  'SET_REQUEST_MEMBER_DETAIL_ERROR';
//
export const SET_REQUEST_CHANGE_PASSWORD = 'SET_REQUEST_CHANGE_PASSWORD';
export const SET_REQUEST_CHANGE_PASSWORD_SUCCESS =
  'SET_REQUEST_CHANGE_PASSWORD_SUCCESS';
export const SET_REQUEST_CHANGE_PASSWORD_ERROR =
  'SET_REQUEST_CHANGE_PASSWORD_ERROR';
//
export const SET_REQUEST_LIST_CONTRACT = 'SET_REQUEST_LIST_CONTRACT';
export const SET_REQUEST_LIST_CONTRACT_SUCCESS =
  'SET_REQUEST_LIST_CONTRACT_SUCCESS';
export const SET_REQUEST_LIST_CONTRACT_ERROR =
  'SET_REQUEST_LIST_CONTRACT_ERROR';
//
export const SET_UPLOAD_AVATAR_DATA = 'SET_UPLOAD_AVATAR_DATA';
export const SET_REQUEST_UPLOAD_AVATAR = 'SET_REQUEST_UPLOAD_AVATAR';
export const SET_REQUEST_UPLOAD_AVATAR_SUCCESS =
  'SET_REQUEST_UPLOAD_AVATAR_SUCCESS';
export const SET_REQUEST_UPLOAD_AVATAR_ERROR =
  'SET_REQUEST_UPLOAD_AVATAR_ERROR';
//
export const SET_REQUEST_LIST_UNIT = 'SET_REQUEST_LIST_UNIT';
export const SET_REQUEST_LIST_UNIT_SUCCESS = 'SET_REQUEST_LIST_UNIT_SUCCESS';
export const SET_REQUEST_LIST_UNIT_ERROR = 'SET_REQUEST_LIST_UNIT_ERROR';
//
export const SET_REQUEST_LIST_TRANSPORTATION =
  'SET_REQUEST_LIST_TRANSPORTATION';
export const SET_REQUEST_LIST_TRANSPORTATION_SUCCESS =
  'SET_REQUEST_LIST_TRANSPORTATION_SUCCESS';
export const SET_REQUEST_LIST_TRANSPORTATION_ERROR =
  'SET_REQUEST_LIST_TRANSPORTATION_ERROR';
//---------------------------------------------------------------------------------------------------------------------
export const setRequestUnitList = () => ({type: SET_REQUEST_UNIT_LIST});
export const setRequestUnitListSuccess = data => ({
  type: SET_REQUEST_UNIT_LIST_SUCCESS,
  data,
});
export const setRequestUnitListError = data => ({
  type: SET_REQUEST_UNIT_LIST_ERROR,
  data,
});
//
export const setGeneralInformationData = data => ({type: SET_GENERAL_INFORMATION_DATA, data});
export const setRequestGeneralInformation = () => ({
  type: SET_REQUEST_GENERAL_INFORMATION,
});
export const setRequestGeneralInformationSuccess = data => ({
  type: SET_REQUEST_GENERAL_INFORMATION_SUCCESS,
  data,
});
export const setRequestGeneralInformationError = data => ({
  type: SET_REQUEST_GENERAL_INFORMATION_ERROR,
  data,
});
//
export const setRequestTenantList = () => ({type: SET_REQUEST_TENANT_LIST});
export const setRequestTenantListSuccess = data => ({
  type: SET_REQUEST_TENANT_LIST_SUCCESS,
  data,
});
export const setRequestTenantListError = data => ({
  type: SET_REQUEST_TENANT_LIST_ERROR,
  data,
});
//
export const setRequestVehicle = () => ({type: SET_REQUEST_VEHICLE});
export const setRequestVehicleSuccess = data => ({
  type: SET_REQUEST_VEHICLE_SUCCESS,
  data,
});
export const setRequestVehicleError = data => ({
  type: SET_REQUEST_VEHICLE_ERROR,
  data,
});
//
export const setRequestSession = () => ({type: SET_REQUEST_SESSION});
export const setRequestSessionSuccess = data => ({
  type: SET_REQUEST_SESSION_SUCCESS,
  data,
});
export const setRequestSessionError = data => ({
  type: SET_REQUEST_SESSION_ERROR,
  data,
});
//
export const setHomeImageData = data => ({type: SET_HOME_IMAGE_DATA, data});
export const setRequestUploadHomeImage = () => ({
  type: SET_REQUEST_UPLOAD_HOME_IMAGE,
});
export const setRequestUploadHomeImageSuccess = data => ({
  type: SET_REQUEST_UPLOAD_HOME_IMAGE_SUCCESS,
  data,
});
export const setRequestUploadHomeImageError = data => ({
  type: SET_REQUEST_UPLOAD_HOME_IMAGE_ERROR,
  data,
});
//
export const setRequestRegisterVehicle = () => ({
  type: SET_REQUEST_REGISTER_VEHICLE,
});
export const setRequestRegisterVehicleSuccess = data => ({
  type: SET_REQUEST_REGISTER_VEHICLE_SUCCESS,
  data,
});
export const setRequestRegisterVehicletError = data => ({
  type: SET_REQUEST_REGISTER_VEHICLE_ERROR,
  data,
});
//
export const setRequestAddMember = () => ({type: SET_REQUEST_ADD_MEMBER});
export const setRequestAddMemberSuccess = data => ({
  type: SET_REQUEST_ADD_MEMBER_SUCCESS,
  data,
});
export const setRequestAddMemberError = data => ({
  type: SET_REQUEST_ADD_MEMBER_ERROR,
  data,
});
//
export const setMemberDetailData = data => ({
  type: SET_MEMBER_DETAIL_DATA,
  data,
});
export const setRequestMemberDetail = () => ({type: SET_REQUEST_MEMBER_DETAIL});
export const setRequestMemberDetailSuccess = data => ({
  type: SET_REQUEST_MEMBER_DETAIL_SUCCESS,
  data,
});
export const setRequestMemberDetailError = data => ({
  type: SET_REQUEST_MEMBER_DETAIL_ERROR,
  data,
});
//
export const setRequestChangePassword = () => ({
  type: SET_REQUEST_CHANGE_PASSWORD,
});
export const setRequestChangePasswordSuccess = data => ({
  type: SET_REQUEST_CHANGE_PASSWORD_SUCCESS,
  data,
});
export const setRequestChangePasswordError = data => ({
  type: SET_REQUEST_CHANGE_PASSWORD_ERROR,
  data,
});
//
export const setRequestListContract = () => ({type: SET_REQUEST_LIST_CONTRACT});
export const setRequestListContractSuccess = data => ({
  type: SET_REQUEST_LIST_CONTRACT_SUCCESS,
  data,
});
export const setRequestListContractError = data => ({
  type: SET_REQUEST_LIST_CONTRACT_ERROR,
  data,
});
//
export const setUploadAvatarData = data => ({
  type: SET_UPLOAD_AVATAR_DATA,
  data,
});
export const setRequestUploadAvatar = () => ({type: SET_REQUEST_UPLOAD_AVATAR});
export const setRequestUploadAvatarSuccess = data => ({
  type: SET_REQUEST_UPLOAD_AVATAR_SUCCESS,
  data,
});
export const setRequestUploadAvatarError = data => ({
  type: SET_REQUEST_UPLOAD_AVATAR_ERROR,
  data,
});
//
export const setRequestListUnit = () => ({type: SET_REQUEST_LIST_UNIT});
export const setRequestListUnitSuccess = data => ({
  type: SET_REQUEST_LIST_UNIT_SUCCESS,
  data,
});
export const setRequestListUnitError = data => ({
  type: SET_REQUEST_LIST_UNIT_ERROR,
  data,
});
//
export const setRequestListTransportation = () => ({
  type: SET_REQUEST_LIST_TRANSPORTATION,
});
export const setRequestListTransportationSuccess = data => ({
  type: SET_REQUEST_LIST_TRANSPORTATION_SUCCESS,
  data,
});
export const setRequestListTransportationError = data => ({
  type: SET_REQUEST_LIST_TRANSPORTATION_ERROR,
  data,
});
//---------------------------------------------------------------------------------------------------------------------
// export const getUnitListOfTenant = () => async dispatch => {
//   dispatch(setRequestUnitList());
//   try {
//     const response = await serviceRest.getUnitListOfTenant();
//     // console.log(response)
//     if (response.status === 200) {
//       serviceRest.setUnitToHeader(response?.data[0]?.uuid);
//       // console.log('🇻🇳', response?.data[0]?.uuid);
//       await AsyncStorage.setItem('unit', response.data.access_token);
//       dispatch(setRequestUnitListSuccess(response.data));
//     } else {
//       dispatch(setRequestUnitListError(response.problem));
//     }
//   } catch (error) {
//     dispatch(setRequestUnitListError(error));
//     return false;
//   }
// };
//
export const getGeneralInformation = () => async dispatch => {
  dispatch(setRequestGeneralInformation());
  try {
    const response = await serviceRest.getGeneralInformation();
    console.log(response)
    if (response.status === 200) {
      dispatch(setRequestGeneralInformationSuccess(response.data));
      await AsyncStorage.setItem('displayName', response?.data?.full_name);
    } else if (response.status === 500 || response.status === 401) {
      AsyncStorage.removeItem('token');
      serviceRest.setTokenToHeaders(null);
      Toast.show('Something went wrong');
      return 'goToLogin';
    } else {
      dispatch(setRequestGeneralInformationError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestGeneralInformationError(error));
    return false;
  }
};
//
export const getTenantList = () => async dispatch => {
  dispatch(setRequestTenantList());
  try {
    const response = await serviceRest.getTenantList();
    if (response.status === 200) {
      dispatch(setRequestTenantListSuccess(response.data));
    } else {
      dispatch(setRequestTenantListError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestTenantListError(error));
    return false;
  }
};
//
export const getContract = () => async dispatch => {
  dispatch(setRequestListContract());
  try {
    const response = await serviceRest.getContract();
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestListContractSuccess(response.data));
    } else {
      dispatch(setRequestListContractError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestListContractError(error));
    return false;
  }
};
//
export const getVehicle = () => async dispatch => {
  dispatch(setRequestVehicle());
  try {
    const response = await serviceRest.getVehicle();
    if (response.status === 200) {
      dispatch(setRequestVehicleSuccess(response.data));
    } else {
      dispatch(setRequestVehicleError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestVehicleError(error));
    return false;
  }
};
//
export const postUploadHomeImage = params => async dispatch => {
  dispatch(setRequestUploadHomeImage());
  try {
    const response = await serviceRest.postUploadHomeImage(params);
    if (response.status === 200) {
      dispatch(setRequestUploadHomeImageSuccess(response.data));
    } else {
      dispatch(setRequestUploadHomeImageError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestUploadHomeImageError(error));
    return false;
  }
};
//
export const postRegisterVehicle = params => async dispatch => {
  dispatch(setRequestRegisterVehicle());
  try {
    const response = await serviceRest.postRegisterVehicle(params);
    // console.log(response)
    if (response.status === 201) {
      dispatch(setRequestUploadHomeImageSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestRegisterVehicletError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestRegisterVehicletError(error));
    return false;
  }
};
//
export const getSession = params => async dispatch => {
  dispatch(setRequestSession());
  try {
    const response = await serviceRest.getSession(params);
    if (response.status === 200) {
      dispatch(setRequestSessionSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestSessionError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestSessionError(error));
    return false;
  }
};
//
export const postAddMember = (params, t) => async dispatch => {
  dispatch(setRequestAddMember());
  try {
    const response = await serviceRest.postAddMember(params);
    if (response.status === 201) {
      dispatch(setRequestAddMemberSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestAddMemberError(response.problem));
      Toast.show(response.data?.errors[0].message);
      return false;
    }
  } catch (error) {
    dispatch(setRequestAddMemberError(error));
    return false;
  }
};
//
export const getMemberDetail = (id) => async dispatch => {
  dispatch(setRequestMemberDetail());
  try {
    const response = await serviceRest.getMemberDetail(id);
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestMemberDetailSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestMemberDetailError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestMemberDetailError(error));
    return false;
  }
};
//
export const postChangePassword = params => async dispatch => {
  dispatch(setRequestChangePassword());
  try {
    const response = await serviceRest.postChangePassword(params);
    if (response.status === 200) {
      dispatch(setRequestChangePasswordSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestChangePasswordError(response.problem));
      // Toast.show(response.data[0] && 'Incorrect current password');
      return false;
    }
  } catch (error) {
    dispatch(setRequestChangePasswordError(error));
    return false;
  }
};
//
export const postUploadAvatar = params => async dispatch => {
  dispatch(setRequestUploadAvatar());
  try {
    const response = await serviceRest.postUploadAvatar(params);
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestUploadAvatarSuccess(response.data));
      dispatch(getGeneralInformation());
      return true;
    } else {
      dispatch(setRequestUploadAvatarError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestUploadAvatarError(error));
    return false;
  }
};
//
export const getListUnit = () => async dispatch => {
  dispatch(setRequestListUnit());
  try {
    const response = await serviceRest.getUnitListOfTenant();
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestListUnitSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestListUnitError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestListUnitError(error));
    return false;
  }
};
//
export const getListTransportation = () => async dispatch => {
  dispatch(setRequestListTransportation());
  try {
    const response = await serviceRest.getListTransportation();
    if (response.status === 200) {
      dispatch(setRequestListTransportationSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestListTransportationError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestListTransportationError(error));
    return false;
  }
};
