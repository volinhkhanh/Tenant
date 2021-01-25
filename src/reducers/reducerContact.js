import * as types from '../actions/actionContact'

const initialState = {
    getContactProgress: false,
    getContactData: null,
}
//
const reducerContact = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_REQUEST_CONTACT: {
            return {
                ...state,
                getContactProgress: true,
            }
        }
        case types.SET_REQUEST_CONTACT_SUCCESS: {
            return {
                ...state,
                getContactProgress: false,
                getContactData: action.data,
            }
        }
        case types.SET_REQUEST_CONTACT_ERROR: {
            return {
                ...state,
                getContactProgress: false,
            }
        }
        default: 
            return state
    }
}

export default reducerContact