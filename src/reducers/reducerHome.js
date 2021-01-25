import * as types from '../actions/actionHome'

const initialState = {
    //-------------------------------------------------------------------
    getGeneralInformationProgress: false,
    getTenantListProgress: false,
    getVehicleProgress: false,
    getSessionProgress: false,
    getUploadHomeImageProgress: false,
    getRegisterVehicleProgress: false,
    getAddMemberProgress: false,
    getChangePasswordProgress: false,
    getMemberDetailProgress: false,
    getUploadAvatarProgress: false,
    getListUnitProgress: false,
    getListTransportationProgress: false,
    getContractListProgress: false,
    //-------------------------------------------------------------------
    getGeneralInformationData: null,
    getTenantListData: null,
    getVehicleData: null,
    getSessionData: null,
    getUploadHomeImageData: null,
    getRegisterVehicleData: null,
    getAddMemberData: null,
    getChangePasswordData: null,
    getMemberDetailData: null,
    listTransportationData: null,
    contractListData: null,
    //-------------------------------------------------------------------
}
//
const reducerHome = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_REQUEST_GENERAL_INFORMATION: {
            return {
                ...state,
                getGeneralInformationProgress: true,
            }
        }
        case types.SET_GENERAL_INFORMATION_DATA: {
            return {
                ...state,
                getGeneralInformationData: action.data,
            }
        }
        case types.SET_REQUEST_GENERAL_INFORMATION_SUCCESS: {
            return {
                ...state,
                getGeneralInformationProgress: false,
                getGeneralInformationData: action.data,
            }
        }
        case types.SET_REQUEST_GENERAL_INFORMATION_ERROR: {
            return {
                ...state,
                getGeneralInformationProgress: false,
            }
        }
        //
        case types.SET_REQUEST_TENANT_LIST: {
            return {
                ...state,
                getTenantListProgress: true,
            }
        }
        case types.SET_REQUEST_TENANT_LIST_SUCCESS: {
            return {
                ...state,
                getTenantListProgress: false,
                getTenantListData: action.data,
            }
        }
        case types.SET_REQUEST_TENANT_LIST_ERROR: {
            return {
                ...state,
                getTenantListProgress: false,
            }
        }
        //
        case types.SET_REQUEST_LIST_CONTRACT: {
            return {
                ...state,
                getContractListProgress: true,
            }
        }
        case types.SET_REQUEST_LIST_CONTRACT_SUCCESS: {
            return {
                ...state,
                getContractListProgress: false,
                contractListData: action.data,
            }
        }
        case types.SET_REQUEST_LIST_CONTRACT_ERROR: {
            return {
                ...state,
                getContractListProgress: false,
            }
        }
        //
        case types.SET_REQUEST_VEHICLE: {
            return {
                ...state,
                getVehicleProgress: true,
            }
        }
        case types.SET_REQUEST_VEHICLE_SUCCESS: {
            return {
                ...state,
                getVehicleProgress: false,
                getVehicleData: action.data,
            }
        }
        case types.SET_REQUEST_VEHICLE_ERROR: {
            return {
                ...state,
                getVehicleProgress: false,
            }
        }
        //
        case types.SET_REQUEST_SESSION: {
            return {
                ...state,
                getSessionProgress: true,
            }
        }
        case types.SET_REQUEST_SESSION_SUCCESS: {
            return {
                ...state,
                getSessionProgress: false,
                getSessionData: action.data,
            }
        }
        case types.SET_REQUEST_SESSION_ERROR: {
            return {
                ...state,
                getSessionProgress: false,
            }
        }
        //
        case types.SET_HOME_IMAGE_DATA: {
            return {
                ...state,
                getUploadHomeImageData: action.data,
            }
        }
        case types.SET_REQUEST_UPLOAD_HOME_IMAGE: {
            return {
                ...state,
                getUploadHomeImageProgress: true,
            }
        }
        case types.SET_REQUEST_UPLOAD_HOME_IMAGE_SUCCESS: {
            return {
                ...state,
                getUploadHomeImageProgress: false,
                getUploadHomeImageData: action.data,
            }
        }
        case types.SET_REQUEST_UPLOAD_HOME_IMAGE_ERROR: {
            return {
                ...state,
                getUploadHomeImageProgress: false,
            }
        }
        //
        case types.SET_REQUEST_REGISTER_VEHICLE: {
            return {
                ...state,
                getRegisterVehicleProgress: true,
            }
        }
        case types.SET_REQUEST_REGISTER_VEHICLE_SUCCESS: {
            return {
                ...state,
                getRegisterVehicleProgress: false,
                getRegisterVehicleData: action.data,
            }
        }
        case types.SET_REQUEST_REGISTER_VEHICLE_ERROR: {
            return {
                ...state,
                getRegisterVehicleProgress: false,
            }
        }
        //
        case types.SET_REQUEST_ADD_MEMBER: {
            return {
                ...state,
                getAddMemberProgress: true,
            }
        }
        case types.SET_REQUEST_ADD_MEMBER_SUCCESS: {
            return {
                ...state,
                getAddMemberProgress: false,
                getAddMemberData: action.data,
            }
        }
        case types.SET_REQUEST_ADD_MEMBER_ERROR: {
            return {
                ...state,
                getAddMemberProgress: false,
            }
        }
        //
        case types.SET_REQUEST_CHANGE_PASSWORD: {
            return {
                ...state,
                getChangePasswordProgress: true,
            }
        }
        case types.SET_REQUEST_CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                getChangePasswordProgress: false,
                getChangePasswordData: action.data,
            }
        }
        case types.SET_REQUEST_CHANGE_PASSWORD_ERROR: {
            return {
                ...state,
                getChangePasswordProgress: false,
            }
        }
        //
        case types.SET_MEMBER_DETAIL_DATA: {
            return {
                ...state,
                getMemberDetailData: action.data,
            }
        }
        case types.SET_REQUEST_MEMBER_DETAIL: {
            return {
                ...state,
                getMemberDetailProgress: true,
            }
        }
        case types.SET_REQUEST_MEMBER_DETAIL_SUCCESS: {
            return {
                ...state,
                getMemberDetailProgress: false,
                getMemberDetailData: action.data,
            }
        }
        case types.SET_REQUEST_MEMBER_DETAIL_ERROR: {
            return {
                ...state,
                getMemberDetailProgress: false,
            }
        }
        //
        case types.SET_UPLOAD_AVATAR_DATA: {
            return {
                ...state,
                getUploadAvatarData: action.data,
            }
        }
        case types.SET_REQUEST_UPLOAD_AVATAR: {
            return {
                ...state,
                getUploadAvatarProgress: true,
            }
        }
        case types.SET_REQUEST_UPLOAD_AVATAR_SUCCESS: {
            return {
                ...state,
                getUploadAvatarProgress: false,
                getUploadAvatarData: action.data,
            }
        }
        case types.SET_REQUEST_UPLOAD_AVATAR_ERROR: {
            return {
                ...state,
                getUploadAvatarProgress: false,
            }
        }
        //
        case types.SET_REQUEST_LIST_UNIT: {
            return {
                ...state,
                getListUnitProgress: true,
            }
        }
        case types.SET_REQUEST_LIST_UNIT_SUCCESS: {
            return {
                ...state,
                getListUnitProgress: false,
                listUnitData: action.data,
            }
        }
        case types.SET_REQUEST_LIST_UNIT_ERROR: {
            return {
                ...state,
                getListUnitProgress: false,
            }
        }
        //
        case types.SET_REQUEST_LIST_TRANSPORTATION: {
            return {
                ...state,
                getListTransportationProgress: true,
            }
        }
        case types.SET_REQUEST_LIST_TRANSPORTATION_SUCCESS: {
            return {
                ...state,
                getListTransportationProgress: false,
                listTransportationData: action.data,
            }
        }
        case types.SET_REQUEST_LIST_TRANSPORTATION_ERROR: {
            return {
                ...state,
                getListTransportationProgress: false,
            }
        }
        default: 
            return state
    }
}

export default reducerHome