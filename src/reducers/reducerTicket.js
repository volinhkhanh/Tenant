import * as types from '../actions/actionTicket';

const initialState = {
  getTicketsProgress: false,
  getTicketsData: null,
  getTicketProgress: false,
  getTicketData: null,
  getTicketTypeProgress: false,
  getTicketTypeData: null,
  getCreateTicketProgress: false,
  getEditTicketProgress: false,
  getDeleteTicketProgress: false,
  getUploadImageTicketData: null,
  getUploadImageTicketProgress: false,
  getCreateTicketReviewProgress: false,
};
//
const reducerTicket = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TICKET_DATA: {
      return {
        ...state,
        getTicketsData: action.data,
      };
    }
    //
    case types.SET_REQUEST_TICKETS: {
      return {
        ...state,
        getTicketsProgress: true,
      };
    }
    case types.SET_REQUEST_TICKETS_SUCCESS: {
      return {
        ...state,
        getTicketsProgress: false,
        getTicketsData: action.data,
      };
    }
    case types.SET_REQUEST_TICKETS_ERROR: {
      return {
        ...state,
        getTicketsProgress: false,
      };
    }
    //
    case types.SET_REQUEST_TICKET: {
      return {
        ...state,
        getTicketProgress: true,
      };
    }
    case types.SET_REQUEST_TICKET_SUCCESS: {
      return {
        ...state,
        getTicketProgress: false,
        getTicketData: action.data,
      };
    }
    case types.SET_REQUEST_TICKET_ERROR: {
      return {
        ...state,
        getTicketProgress: false,
      };
    }
    //
    case types.SET_REQUEST_TICKET_TYPE: {
      return {
        ...state,
        getTicketTypeProgress: true,
      };
    }
    case types.SET_REQUEST_TICKET_TYPE_SUCCESS: {
      return {
        ...state,
        getTicketTypeProgress: false,
        getTicketTypeData: action.data,
      };
    }
    case types.SET_REQUEST_TICKET_TYPE_ERROR: {
      return {
        ...state,
        getTicketTypeProgress: false,
      };
    }
    //
    case types.SET_REQUEST_CREATE_TICKET: {
      return {
        ...state,
        getCreateTicketProgress: true,
      };
    }
    case types.SET_REQUEST_CREATE_TICKET_SUCCESS: {
      return {
        ...state,
        getCreateTicketProgress: false,
      };
    }
    case types.SET_REQUEST_CREATE_TICKET_ERROR: {
      return {
        ...state,
        getCreateTicketProgress: false,
      };
    }
    //
    case types.SET_REQUEST_EDIT_TICKET: {
      return {
        ...state,
        getEditTicketProgress: true,
      };
    }
    case types.SET_REQUEST_EDIT_TICKET_SUCCESS: {
      return {
        ...state,
        getEditTicketProgress: false,
      };
    }
    case types.SET_REQUEST_EDIT_TICKET_ERROR: {
      return {
        ...state,
        getEditTicketProgress: false,
      };
    }
    //
    case types.SET_REQUEST_DELETE_TICKET: {
      return {
        ...state,
        getDeleteTicketProgress: true,
      };
    }
    case types.SET_REQUEST_DELETE_TICKET_SUCCESS: {
      return {
        ...state,
        getDeleteTicketProgress: false,
      };
    }
    case types.SET_REQUEST_DELETE_TICKET_ERROR: {
      return {
        ...state,
        getDeleteTicketProgress: false,
      };
    }
    //
    case types.SET_UPLOAD_IMAGE_TICKET_DATA: {
      return {
        ...state,
        getUploadImageTicketData: action.data,
      };
    }
    case types.SET_REQUEST_UPLOAD_IMAGE_TICKET: {
      return {
        ...state,
        getUploadImageTicketProgress: true,
      };
    }
    case types.SET_REQUEST_UPLOAD_IMAGE_TICKET_SUCCESS: {
      return {
        ...state,
        getUploadImageTicketData: action.data,
        getUploadImageTicketProgress: false,
      };
    }
    case types.SET_REQUEST_UPLOAD_IMAGE_TICKET_ERROR: {
      return {
        ...state,
        getUploadImageTicketProgress: false,
      };
    }
    case types.SET_REQUEST_CREATE_TICKET_REVIEW: {
      return {
        ...state,
        getCreateTicketReviewProgress: true,
      };
    }
    case types.SET_REQUEST_CREATE_TICKET_REVIEW_SUCCESS: {
      return {
        ...state,
        getCreateTicketReviewProgress: false,
      };
    }
    case types.SET_REQUEST_CREATE_TICKET_REVIEW_ERROR: {
      return {
        ...state,
        getCreateTicketReviewProgress: false,
      };
    }
    default:
      return state;
  }
};

export default reducerTicket;
