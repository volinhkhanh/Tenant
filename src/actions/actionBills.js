import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest'
//
export const SET_REQUEST_MANAGEMENT_BILL_DATA = 'SET_REQUEST_MANAGEMENT_BILL_DATA'
//
export const SET_REQUEST_MANAGEMENT_BILL = 'SET_REQUEST_MANAGEMENT_BILL'
export const SET_REQUEST_MANAGEMENT_BILL_SUCCESS = 'SET_REQUEST_MANAGEMENT_BILL_SUCCESS'
export const SET_REQUEST_MANAGEMENT_BILL_ERROR = 'SET_REQUEST_MANAGEMENT_BILL_ERROR'
//
export const SET_REQUEST_TOTAL_DEBT_BILL = 'SET_REQUEST_TOTAL_DEBT_BILL'
export const SET_REQUEST_TOTAL_DEBT_BILL_SUCCESS = 'SET_REQUEST_TOTAL_DEBT_BILL_SUCCESS'
export const SET_REQUEST_TOTAL_DEBT_BILL_ERROR = 'SET_REQUEST_TOTAL_DEBT_BILL_ERROR'
//
export const SET_REQUEST_BILL_DETAIL = 'SET_REQUEST_BILL_DETAIL'
export const SET_REQUEST_BILL_DETAIL_SUCCESS = 'SET_REQUEST_BILL_DETAIL_SUCCESS'
export const SET_REQUEST_BILL_DETAIL_ERROR = 'SET_REQUEST_BILL_DETAIL_ERROR'
//
export const setRequestManagementBillData = data => ({type: SET_REQUEST_MANAGEMENT_BILL_DATA, data})
//
export const setRequestManagementBill = () => ({type: SET_REQUEST_MANAGEMENT_BILL})
export const setRequestManagementBillSuccess = data => ({type: SET_REQUEST_MANAGEMENT_BILL_SUCCESS, data})
export const setRequestManagementBillError = data => ({type: SET_REQUEST_MANAGEMENT_BILL_ERROR, data})
//
export const setRequestTotalDebtBill = () => ({type: SET_REQUEST_TOTAL_DEBT_BILL})
export const setRequestTotalDebtBillSuccess = data => ({type: SET_REQUEST_TOTAL_DEBT_BILL_SUCCESS, data})
export const setRequestTotalDebtBillError = data => ({type: SET_REQUEST_TOTAL_DEBT_BILL_ERROR, data})
//
export const setRequestBillDetail = () => ({type: SET_REQUEST_BILL_DETAIL})
export const setRequestBillDetailSuccess = data => ({type: SET_REQUEST_BILL_DETAIL_SUCCESS, data})
export const setRequestBillDetailError = data => ({type: SET_REQUEST_BILL_DETAIL_ERROR, data})
//
export const getManagementBills = (params) => async (dispatch) => {
    dispatch(setRequestManagementBill())
    try {
        const response = await serviceRest.getManagementBills(params)
        if(response.status === 200) {
            dispatch(setRequestManagementBillSuccess(response.data))
            return response.data
        } else {
            dispatch(setRequestManagementBillError(response.problem))
        }
    } catch(error) {
        dispatch(setRequestManagementBillError(error))
        return false
    }
}
//
export const getTotalDebtBills = (params) => async (dispatch) => {
    dispatch(setRequestTotalDebtBill())
    try {
        const response = await serviceRest.getTotalDebtBills(params)
        if(response.status === 200) {
            dispatch(setRequestTotalDebtBillSuccess(response.data))
        } else {
            dispatch(setRequestTotalDebtBillError(response.problem))
        }
    } catch(error) {
        dispatch(setRequestTotalDebtBillError(error))
        return false
    }
}
//
export const getBillDetail = (uuid, params) => async (dispatch) => {
    dispatch(setRequestBillDetail())
    try {
        const response = await serviceRest.getBillDetail(uuid, params)
        if(response.status === 200) {
            dispatch(setRequestBillDetailSuccess(response.data))
        } else {
            dispatch(setRequestBillDetailError(response.problem))
        }
    } catch(error) {
        dispatch(setRequestBillDetailError(error))
        return false
    }
}