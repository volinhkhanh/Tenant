import * as types from '../actions/actionVisitor';

const initialState = {
  getVisitorReasonProgress: false,
  getVisitorReasonData: null,
  getVisitorsProgress: false,
  getVisitorsData: null,
  getVisitorProgress: false,
  getVisitorData: null,
  getCreateVisitorProgress: false,
  getEditVisitorProgress: false,
  getDeleteVisitorProgress: false,
};
//
const reducerVisitor = (state = initialState, action) => {
  switch (action.type) {
    //
    case types.SET_REQUEST_VISITOR_REASON: {
      return {
        ...state,
        getVisitorReasonProgress: true,
      };
    }
    case types.SET_REQUEST_VISITOR_REASON_SUCCESS: {
      return {
        ...state,
        getVisitorReasonProgress: false,
        getVisitorReasonData: action.data,
      };
    }
    case types.SET_REQUEST_VISITOR_REASON_ERROR: {
      return {
        ...state,
        getVisitorReasonProgress: false,
      };
    }
    //
    case types.SET_REQUEST_VISITORS: {
      return {
        ...state,
        getVisitorsProgress: true,
      };
    }
    case types.SET_REQUEST_VISITORS_SUCCESS: {
      return {
        ...state,
        getVisitorsProgress: false,
        getVisitorsData: action.data,
      };
    }
    case types.SET_REQUEST_VISITORS_ERROR: {
      return {
        ...state,
        getVisitorsProgress: false,
      };
    }
    //
    case types.SET_REQUEST_VISITOR: {
      return {
        ...state,
        getVisitorProgress: true,
      };
    }
    case types.SET_REQUEST_VISITOR_SUCCESS: {
      return {
        ...state,
        getVisitorProgress: false,
        getVisitorData: action.data,
      };
    }
    case types.SET_REQUEST_VISITOR_ERROR: {
      return {
        ...state,
        getVisitorProgress: false,
      };
    }
    //
    case types.SET_REQUEST_CREATE_VISITOR: {
      return {
        ...state,
        getCreateVisitorProgress: true,
      };
    }
    case types.SET_REQUEST_CREATE_VISITOR_SUCCESS: {
      return {
        ...state,
        getCreateVisitorProgress: false,
      };
    }
    case types.SET_REQUEST_CREATE_VISITOR_ERROR: {
      return {
        ...state,
        getCreateVisitorProgress: false,
      };
    }
    //
    case types.SET_REQUEST_EDIT_VISITOR: {
      return {
        ...state,
        getEditVisitorProgress: true,
      };
    }
    case types.SET_REQUEST_EDIT_VISITOR_SUCCESS: {
      return {
        ...state,
        getEditVisitorProgress: false,
      };
    }
    case types.SET_REQUEST_EDIT_VISITOR_ERROR: {
      return {
        ...state,
        getEditVisitorProgress: false,
      };
    }
    //
    case types.SET_REQUEST_DELETE_VISITOR: {
      return {
        ...state,
        getDeleteVisitorProgress: true,
      };
    }
    case types.SET_REQUEST_DELETE_VISITOR_SUCCESS: {
      return {
        ...state,
        getDeleteVisitorProgress: false,
      };
    }
    case types.SET_REQUEST_DELETE_VISITOR_ERROR: {
      return {
        ...state,
        getDeleteVisitorProgress: false,
      };
    }
    //
    default:
      return state;
  }
};

export default reducerVisitor;
