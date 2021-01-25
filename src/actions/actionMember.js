import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
//
import * as serviceRest from '../services/serviceRest';
//
export const SET_MEMBER_DATA = 'SET_MEMBER_DATA';
//
export const SET_APARTMENT = 'SET_APARTMENT';
//
export const SET_APARTMENT_REGISTER = 'SET_APARTMENT_REGISTER';
//
export const SET_APARTMENT_FINDID = 'SET_APARTMENT_FINDID';
//
export const SET_UNIT_ID = 'SET_UNIT_ID';
export const SET_REQUEST_LOGIN = 'SET_REQUEST_LOGIN';
export const SET_REQUEST_LOGIN_SUCCESS = 'SET_REQUEST_LOGIN_SUCCESS';
export const SET_REQUEST_LOGIN_ERROR = 'SET_REQUEST_LOGIN_ERROR';
//
export const SET_REQUEST_APARTMENT = 'SET_REQUEST_APARTMENT';
export const SET_REQUEST_APARTMENT_SUCCESS = 'SET_REQUEST_APARTMENT_SUCCESS';
export const SET_REQUEST_APARTMENT_ERROR = 'SET_REQUEST_APARTMENT_ERROR';
//
export const SET_REQUEST_BLOCK = 'SET_REQUEST_BLOCK';
export const SET_REQUEST_BLOCK_SUCCESS = 'SET_REQUEST_BLOCK_SUCCESS';
export const SET_REQUEST_BLOCK_ERROR = 'SET_REQUEST_BLOCK_ERROR';
//
export const SET_REQUEST_OTP = 'SET_REQUEST_OTP';
export const SET_REQUEST_OTP_SUCCESS = 'SET_REQUEST_OTP_SUCCESS';
export const SET_REQUEST_OTP_ERROR = 'SET_REQUEST_OTP_ERROR';
//
export const SET_REQUEST_VALID_OTP = 'SET_REQUEST_VALID_OTP';
export const SET_REQUEST_VALID_OTP_SUCCESS = 'SET_REQUEST_VALID_OTP_SUCCESS';
export const SET_REQUEST_VALID_OTP_ERROR = 'SET_REQUEST_VALID_OTP_ERROR';
//
export const SET_REQUEST_RESET_PASSWORD = 'SET_REQUEST_RESET_PASSWORD';
export const SET_REQUEST_RESET_PASSWORD_SUCCESS =
  'SET_REQUEST_RESET_PASSWORD_SUCCESS';
export const SET_REQUEST_RESET_PASSWORD_ERROR =
  'SET_REQUEST_RESET_PASSWORD_ERROR';
//
export const SET_REQUEST_UNIT = 'SET_REQUEST_UNIT';
export const SET_REQUEST_UNIT_SUCCESS = 'SET_REQUEST_UNIT_SUCCESS';
export const SET_REQUEST_UNIT_ERROR = 'SET_REQUEST_UNIT_ERROR';
//
export const SET_REQUEST_COUNTRY = 'SET_REQUEST_COUNTRY';
export const SET_REQUEST_COUNTRY_SUCCESS = 'SET_REQUEST_COUNTRY_SUCCESS';
export const SET_REQUEST_COUNTRY_ERROR = 'SET_REQUEST_COUNTRY_ERROR';
//
export const SET_REQUEST_REGISTER_SESSION = 'SET_REQUEST_REGISTER_SESSION';
export const SET_REQUEST_REGISTER_SESSION_SUCCESS =
  'SET_REQUEST_REGISTER_SESSION_SUCCESS';
export const SET_REQUEST_REGISTER_SESSION_ERROR =
  'SET_REQUEST_REGISTER_SESSION_ERROR';
//
export const SET_REQUEST_UPLOAD_IMAGE = 'SET_REQUEST_UPLOAD_IMAGE';
export const SET_REQUEST_UPLOAD_IMAGE_SUCCESS =
  'SET_REQUEST_UPLOAD_IMAGE_SUCCESS';
export const SET_REQUEST_UPLOAD_IMAGE_ERROR = 'SET_REQUEST_UPLOAD_IMAGE_ERROR';
//
export const SET_REQUEST_REGISTER = 'SET_REQUEST_REGISTER';
export const SET_REQUEST_REGISTER_SUCCESS = 'SET_REQUEST_REGISTER_SUCCESS';
export const SET_REQUEST_REGISTER_ERROR = 'SET_REQUEST_REGISTER_ERROR';
//
export const setMemberData = (data) => ({type: SET_MEMBER_DATA, data});
export const setApartment = (data) => ({type: SET_APARTMENT, data});
export const setApartmentRegister = (data) => ({
  type: SET_APARTMENT_REGISTER,
  data,
});
export const setApartmentFindID = (data) => ({
  type: SET_APARTMENT_FINDID,
  data,
});
//
export const setUnitId = (data) => ({type: SET_UNIT_ID, data});
export const setRequestLogin = () => ({type: SET_REQUEST_LOGIN});
export const setRequestLoginSuccess = (data) => ({
  type: SET_REQUEST_LOGIN_SUCCESS,
  data,
});
export const setRequestLoginError = (data) => ({
  type: SET_REQUEST_LOGIN_ERROR,
  data,
});
//
export const setRequestApartment = () => ({type: SET_REQUEST_APARTMENT});
export const setRequestApartmentSuccess = (data) => ({
  type: SET_REQUEST_APARTMENT_SUCCESS,
  data,
});
export const setRequestApartmentError = (data) => ({
  type: SET_REQUEST_APARTMENT_ERROR,
  data,
});
//
export const setRequestBlock = () => ({type: SET_REQUEST_BLOCK});
export const setRequestBlockSuccess = (data) => ({
  type: SET_REQUEST_BLOCK_SUCCESS,
  data,
});
export const setRequestBlockError = (data) => ({
  type: SET_REQUEST_BLOCK_ERROR,
  data,
});
//
export const setRequestOTP = () => ({type: SET_REQUEST_OTP});
export const setRequestOTPSuccess = (data) => ({
  type: SET_REQUEST_OTP_SUCCESS,
  data,
});
export const setRequestOTPError = (data) => ({
  type: SET_REQUEST_OTP_ERROR,
  data,
});
//
export const setRequestValidOTP = () => ({type: SET_REQUEST_VALID_OTP});
export const setRequestValidOTPSuccess = (data) => ({
  type: SET_REQUEST_VALID_OTP_SUCCESS,
  data,
});
export const setRequestValidOTPError = (data) => ({
  type: SET_REQUEST_VALID_OTP_ERROR,
  data,
});
//
export const setRequestResetPassword = () => ({
  type: SET_REQUEST_RESET_PASSWORD,
});
export const setRequestResetPasswordSuccess = (data) => ({
  type: SET_REQUEST_RESET_PASSWORD_SUCCESS,
  data,
});
export const setRequestResetPasswordError = (data) => ({
  type: SET_REQUEST_RESET_PASSWORD_ERROR,
  data,
});
//Register
export const setRequestUnit = () => ({type: SET_REQUEST_UNIT});
export const setRequestUnitSuccess = (data) => ({
  type: SET_REQUEST_UNIT_SUCCESS,
  data,
});
export const setRequestUnitError = (data) => ({
  type: SET_REQUEST_UNIT_ERROR,
  data,
});
//
export const setRequestCountry = () => ({type: SET_REQUEST_COUNTRY});
export const setRequestCountrySuccess = (data) => ({
  type: SET_REQUEST_COUNTRY_SUCCESS,
  data,
});
export const setRequestCountryError = (data) => ({
  type: SET_REQUEST_COUNTRY_ERROR,
  data,
});
//
export const setRequestRegisterSession = () => ({
  type: SET_REQUEST_REGISTER_SESSION,
});
export const setRequestRegisterSessionSuccess = (data) => ({
  type: SET_REQUEST_REGISTER_SESSION_SUCCESS,
  data,
});
export const setRequestRegisterSessionError = (data) => ({
  type: SET_REQUEST_REGISTER_SESSION_ERROR,
  data,
});
//
export const setRequestUploadImage = () => ({type: SET_REQUEST_UPLOAD_IMAGE});
export const setRequestUploadImageSuccess = (data) => ({
  type: SET_REQUEST_UPLOAD_IMAGE_SUCCESS,
  data,
});
export const setRequestUploadImageError = (data) => ({
  type: SET_REQUEST_UPLOAD_IMAGE_ERROR,
  data,
});
//
export const setRequestRegister = () => ({type: SET_REQUEST_REGISTER});
export const setRequestRegisterSuccess = (data) => ({
  type: SET_REQUEST_REGISTER_SUCCESS,
  data,
});
export const setRequestRegisterError = (data) => ({
  type: SET_REQUEST_REGISTER_ERROR,
  data,
});
//
export const postLogin = (params) => async (dispatch) => {
  dispatch(setRequestLogin());
  try {
    const response = await serviceRest.postLogin(params);
    if (response.status === 200) {
      // await dispatch(setUnitId(response.data.active_unit.id));
      dispatch(setRequestLoginSuccess(response.data));
      serviceRest.setTokenToHeaders(response.data.access_token);
      await AsyncStorage.setItem('token', response.data.access_token);
      // await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      // await AsyncStorage.setItem(
      //   'unit_id',
      //   JSON.stringify(response.data.active_unit.id),
      // );
      // Toast.show('Login successful');
      return true;
    } else if (response.status === 401) {
      dispatch(setRequestLoginError(response.problem));
      return response.data.code;
    } else {
      dispatch(setRequestLoginError(response.problem));
      // console.log(response);
      if (response.data) {
        Toast.show(response?.data?.errors[0]?.message);
        return response.data;
      } else {
        Toast.show('Some thing went wrong');
      }
    }
  } catch (error) {
    dispatch(setRequestLoginError(error));
    Toast.show('Some thing went wrong');
    return false;
  }
};
//
export const checkToken = () => async (dispatch) => {
  try {
    dispatch(setRequestLogin());
    const token = await AsyncStorage.getItem('token');
    if (token) {
      serviceRest.setTokenToHeaders(token);
      dispatch(setRequestLoginSuccess(token));
    } else {
      dispatch(setRequestLoginError('Error'));
    }
  } catch (error) {
    console.warn('checkToken error:', error);
  }
};
//
export const getApartment = (params) => async (dispatch) => {
  dispatch(setRequestApartment());
  try {
    const response = await serviceRest.getApartment(params);
    if (response.status === 200) {
      dispatch(setRequestApartmentSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestApartmentError(response.problem));
      Toast.show(response.data.message);
      return response.data.message;
    }
  } catch (error) {
    dispatch(setRequestApartmentError(error));
    return false;
  }
};
//
export const getBlock = (params) => async (dispatch) => {
  dispatch(setRequestBlock());
  try {
    const response = await serviceRest.getBlock(params);
    if (response.status === 200) {
      dispatch(setRequestBlockSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestBlockError(response.problem));
      Toast.show(response.data.message);
      return response.data.message;
    }
  } catch (error) {
    dispatch(setRequestBlockError(error));
    return false;
  }
};
//
export const postOTP = (t, params) => async (dispatch) => {
  try {
    const response = await serviceRest.postOTP(params);
    if (response.status === 200) {
      dispatch(setRequestOTPSuccess(response.data.session));
      return true;
    } else if (response.status === 400) {
      dispatch(setRequestOTPError(response.problem));
      // Toast.show(t('src.screens.auth.FindIDAndPasswordScreen.YETWI'));
      return false;
    } else {
      dispatch(setRequestOTPError(response.problem));
      // if (response?.data?.errors?.length > 0) {
      //   Toast.show(response?.data?.errors[0]?.message);
      // }
      // Toast.show(response.data.message)
      return false;
    }
  } catch (error) {
    dispatch(setRequestOTPError(error));
    return false;
  }
};
//
export const postValidOTP = (params) => async (dispatch) => {
  dispatch(setRequestValidOTP());
  try {
    const response = await serviceRest.postValidOTP(params);
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestValidOTPSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestValidOTPError(response.problem));
      // Toast.show(response.data.message);
      return false;
    }
  } catch (error) {
    dispatch(setRequestValidOTPError(error));
    return false;
  }
};
//
export const postResetPassword = (params) => async (dispatch) => {
  dispatch(setRequestResetPassword());
  try {
    const response = await serviceRest.postResetPassword(params);
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestResetPasswordSuccess(response.data.data));
      return true;
    } else {
      dispatch(setRequestResetPasswordError(response.problem));
      Toast.show(response.data.message);
      return false;
    }
  } catch (error) {
    dispatch(setRequestValidOTPError(error));
    return false;
  }
};
//Register
export const getUnits = (params) => async (dispatch) => {
  dispatch(setRequestUnit());
  try {
    const response = await serviceRest.getUnits(params);
    if (response.status === 200) {
      dispatch(setRequestUnitSuccess(response.data));
    } else {
      dispatch(setRequestUnitError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestUnitError(error));
    return false;
  }
};
//
export const getCountries = () => async (dispatch) => {
  dispatch(setRequestCountry());
  try {
    const response = await serviceRest.getCountries();
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestCountrySuccess(response.data));
    } else {
      dispatch(setRequestCountryError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestCountryError(error));
    return false;
  }
};
//
export const postUploadImage = (params) => async (dispatch) => {
  dispatch(setRequestUploadImage());
  try {
    const response = await serviceRest.postUploadImage(params);
    if (response.status === 200) {
      dispatch(setRequestUploadImageSuccess(response.data));
      return response.data;
    } else {
      dispatch(setRequestUploadImageError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestUploadImageError(error));
    console.log(error.response);
    return false;
  }
};
//
export const getRegisterSession = () => async (dispatch) => {
  dispatch(setRequestRegisterSession());
  try {
    const response = await serviceRest.getRegisterSession();
    if (response.status === 200) {
      dispatch(setRequestRegisterSessionSuccess(response.data));
    } else {
      dispatch(setRequestRegisterSessionError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestRegisterSessionError(error));
    return false;
  }
};
//
export const postRegister = (t, params) => async (dispatch) => {
  dispatch(setRequestRegister());
  try {
    const response = await serviceRest.postRegister(params);
    // console.log(response)
    if (response.status === 201) {
      dispatch(setRequestRegisterSuccess(response.data));
      return response.data;
    } else {
      dispatch(setRequestRegisterError(response.problem));
      // Toast.show(response.data.errors[0]?.message);
      return response.data;
    }
  } catch (error) {
    dispatch(setRequestRegisterError(error));
    return false;
  }
};
