import * as types from '../actions/actionBills'

const initialState = {
    getManagementBillProgress: false,
    getTotalDebtBillProgress: false,
    getBillDetailProgress: false,
    getManagementBillData: null,
    totalDebtBillData: null,
    billDetailData: null,
}
//
const reducerBills = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_REQUEST_MANAGEMENT_BILL: {
            return {
                ...state,
                getManagementBillProgress: true,
            }
        }
        case types.SET_REQUEST_MANAGEMENT_BILL_SUCCESS: {
            return {
                ...state,
                getManagementBillProgress: false,
                getManagementBillData: action.data,
            }
        }
        case types.SET_REQUEST_MANAGEMENT_BILL_ERROR: {
            return {
                ...state,
                getManagementBillProgress: false,
            }
        }
        case types.SET_REQUEST_MANAGEMENT_BILL_DATA: {
            return {
                ...state,
                getManagementBillData: action.data,
            }
        }
        //
        case types.SET_REQUEST_TOTAL_DEBT_BILL: {
            return {
                ...state,
                getTotalDebtBillProgress: true,
            }
        }
        case types.SET_REQUEST_TOTAL_DEBT_BILL_SUCCESS: {
            return {
                ...state,
                getTotalDebtBillProgress: false,
                totalDebtBillData: action.data,
            }
        }
        case types.SET_REQUEST_TOTAL_DEBT_BILL_ERROR: {
            return {
                ...state,
                getTotalDebtBillProgress: false,
            }
        }
        //
        case types.SET_REQUEST_BILL_DETAIL: {
            return {
                ...state,
                getBillDetailProgress: true,
            }
        }
        case types.SET_REQUEST_BILL_DETAIL_SUCCESS: {
            return {
                ...state,
                getBillDetailProgress: false,
                billDetailData: action.data,
            }
        }
        case types.SET_REQUEST_BILL_DETAIL_ERROR: {
            return {
                ...state,
                getBillDetailProgress: false,
            }
        }
        default: 
            return state
    }
}

export default reducerBills