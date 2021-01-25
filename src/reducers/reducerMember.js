import * as types from '../actions/actionMember'

const initialState = {
    getLoginInProgress: false,
    getApartmentInProgress: false,
    getBlockInProgress: false,
    getOTPInProgress: false,
    getValidOTPInProgress: false,
    getResetPasswordInProgress: false,
    getUnitProgress: false,
    getCountryProgress: false,
    getRegisterSessionProgress: false,
    getUploadImageProgress: false,
    getRegisterInProgress: false,
    //
    getMemberData: null,
    getApartmentData: null,
    getBlockData: null,
    getOTPData: null,
    getValidOTPData: null,
    getUnitData: null,
    getCountryData: null,
    getApartmentRegisterData: null,
    getApartmentFindIdData: null,
    getRegisterSessionData: null,
    getUploadImageData: null,
    getUnitIdData: null,
}
//
const reducerMember = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_UNIT_ID: {
            return {
                ...state,
                getUnitIdData: action.data,
            }
        }
        case types.SET_MEMBER_DATA: {
            return {
                ...state,
                getMemberData: action.data,
            }
        }
        case types.SET_REQUEST_LOGIN: {
            return {
                ...state,
                getLoginInProgress: true,
            }
        }
        case types.SET_REQUEST_LOGIN_SUCCESS: {
            return {
                ...state,
                getLoginInProgress: false,
                getMemberData: action.data,
            }
        }
        case types.SET_REQUEST_LOGIN_ERROR: {
            return {
                ...state,
                getLoginInProgress: false,
            }
        }
        //Apartment
        case types.SET_REQUEST_APARTMENT: {
            return {
                ...state,
                getApartmentInProgress: true,
            }
        }
        case types.SET_REQUEST_APARTMENT_SUCCESS: {
            return {
                ...state,
                getApartmentInProgress: false,
                getApartmentData: action.data,
            }
        }
        case types.SET_REQUEST_APARTMENT_ERROR: {
            return {
                ...state,
                getApartmentInProgress: false,
                getApartmentData: action.data,
            }
        }
        //Block
        case types.SET_REQUEST_BLOCK: {
            return {
                ...state,
                getBlockInProgress: true,
            }
        }
        case types.SET_REQUEST_BLOCK_SUCCESS: {
            return {
                ...state,
                getBlockInProgress: false,
                getBlockData: action.data,
            }
        }
        case types.SET_REQUEST_BLOCK_ERROR: {
            return {
                ...state,
                getBlockInProgress: false,
                getBlockData: action.data,
            }
        }
        //OTP
        case types.SET_REQUEST_OTP: {
            return {
                ...state,
                getOTPInProgress: true,
            }
        }
        case types.SET_REQUEST_OTP_SUCCESS: {
            return {
                ...state,
                getOTPInProgress: false,
                getOTPData: action.data,
            }
        }
        case types.SET_REQUEST_OTP_ERROR: {
            return {
                ...state,
                getOTPInProgress: false,
            }
        }
        //ValidOTP
        case types.SET_REQUEST_VALID_OTP: {
            return {
                ...state,
                getValidOTPInProgress: true,
            }
        }
        case types.SET_REQUEST_VALID_OTP_SUCCESS: {
            return {
                ...state,
                getValidOTPInProgress: false,
                getValidOTPData: action.data,
            }
        }
        case types.SET_REQUEST_VALID_OTP_ERROR: {
            return {
                ...state,
                getValidOTPInProgress: false,
            }
        }
        //Reset Password
        case types.SET_REQUEST_RESET_PASSWORD: {
            return {
                ...state,
                getResetPasswordInProgress: true,
            }
        }
        case types.SET_REQUEST_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                getResetPasswordInProgress: false,
            }
        }
        case types.SET_REQUEST_RESET_PASSWORD_ERROR: {
            return {
                ...state,
                getResetPasswordInProgress: false,
            }
        }
        //Register
        case types.SET_REQUEST_UNIT: {
            return {
                ...state,
                getUnitProgress: true,
            }
        }
        case types.SET_REQUEST_UNIT_SUCCESS: {
            return {
                ...state,
                getUnitData: action.data,
                getUnitProgress: false,
            }
        }
        case types.SET_REQUEST_UNIT_ERROR: {
            return {
                ...state,
                getUnitProgress: false,
            }
        }
        //
        case types.SET_REQUEST_COUNTRY: {
            return {
                ...state,
                getCountryProgress: true,
            }
        }
        case types.SET_REQUEST_COUNTRY_SUCCESS: {
            return {
                ...state,
                getCountryData: action.data,
                getCountryProgress: false,
            }
        }
        case types.SET_REQUEST_COUNTRY_ERROR: {
            return {
                ...state,
                getCountryProgress: false,
            }
        }
        case types.SET_APARTMENT: {
            return {
                ...state,
                getApartmentData: action.data,
            }
        }
        //
        case types.SET_APARTMENT_REGISTER: {
            return {
                ...state,
                getApartmentRegisterData: action.data,
            }
        }
        //
        case types.SET_APARTMENT_FINDID: {
            return {
                ...state,
                getApartmentFindIdData: action.data,
            }
        }
        //
        case types.SET_REQUEST_REGISTER_SESSION: {
            return {
                ...state,
                getRegisterSessionProgress: true,
            }
        }
        case types.SET_REQUEST_REGISTER_SESSION_SUCCESS: {
            return {
                ...state,
                getRegisterSessionData: action.data,
                getRegisterSessionProgress: false,
            }
        }
        case types.SET_REQUEST_REGISTER_SESSION_ERROR: {
            return {
                ...state,
                getRegisterSessionProgress: false,
            }
        }
        //
        case types.SET_REQUEST_UPLOAD_IMAGE: {
            return {
                ...state,
                getUploadImageProgress: true,
            }
        }
        case types.SET_REQUEST_UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                getUploadImageData: action.data,
                getUploadImageProgress: false,
            }
        }
        case types.SET_REQUEST_UPLOAD_IMAGE_ERROR: {
            return {
                ...state,
                getUploadImageProgress: false,
            }
        }
        //
        case types.SET_REQUEST_REGISTER: {
            return {
                ...state,
                getRegisterInProgress: true,
            }
        }
        case types.SET_REQUEST_REGISTER_SUCCESS: {
            return {
                ...state,
                getRegisterInProgress: false,
            }
        }
        case types.SET_REQUEST_REGISTER_ERROR: {
            return {
                ...state,
                getRegisterInProgress: false,
            }
        }
        default: 
            return state
    }
}

export default reducerMember