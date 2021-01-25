import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest';
//
export const SET_TICKET_DATA = 'SET_TICKET_DATA';
//
export const SET_REQUEST_TICKETS = 'SET_REQUEST_TICKETS';
export const SET_REQUEST_TICKETS_SUCCESS = 'SET_REQUEST_TICKETS_SUCCESS';
export const SET_REQUEST_TICKETS_ERROR = 'SET_REQUEST_TICKETS_ERROR';
//
export const SET_REQUEST_TICKET = 'SET_REQUEST_TICKET';
export const SET_REQUEST_TICKET_SUCCESS = 'SET_REQUEST_TICKET_SUCCESS';
export const SET_REQUEST_TICKET_ERROR = 'SET_REQUEST_TICKET_ERROR';
//
export const SET_REQUEST_TICKET_TYPE = 'SET_REQUEST_TICKET_TYPE';
export const SET_REQUEST_TICKET_TYPE_SUCCESS =
  'SET_REQUEST_TICKET_TYPE_SUCCESS';
export const SET_REQUEST_TICKET_TYPE_ERROR = 'SET_REQUEST_TICKET_TYPE_ERROR';
//
export const SET_REQUEST_CREATE_TICKET = 'SET_REQUEST_CREATE_TICKET';
export const SET_REQUEST_CREATE_TICKET_SUCCESS =
  'SET_REQUEST_CREATE_TICKET_SUCCESS';
export const SET_REQUEST_CREATE_TICKET_ERROR =
  'SET_REQUEST_CREATE_TICKET_ERROR';
//
export const SET_REQUEST_EDIT_TICKET = 'SET_REQUEST_EDIT_TICKET';
export const SET_REQUEST_EDIT_TICKET_SUCCESS =
  'SET_REQUEST_EDIT_TICKET_SUCCESS';
export const SET_REQUEST_EDIT_TICKET_ERROR = 'SET_REQUEST_DELETE_TICKET_ERROR';
//
export const SET_REQUEST_DELETE_TICKET = 'SET_REQUEST_DELETE_TICKET';
export const SET_REQUEST_DELETE_TICKET_SUCCESS =
  'SET_REQUEST_DELETE_TICKET_SUCCESS';
export const SET_REQUEST_DELETE_TICKET_ERROR =
  'SET_REQUEST_DELETE_TICKET_ERROR';
//
export const SET_UPLOAD_IMAGE_TICKET_DATA =
  'SET_UPLOAD_IMAGE_TICKET_DATA';
export const SET_REQUEST_UPLOAD_IMAGE_TICKET =
  'SET_REQUEST_UPLOAD_IMAGE_TICKET';
export const SET_REQUEST_UPLOAD_IMAGE_TICKET_SUCCESS =
  'SET_REQUEST_UPLOAD_IMAGE_TICKET_SUCCESS';
export const SET_REQUEST_UPLOAD_IMAGE_TICKET_ERROR =
  'SET_REQUEST_UPLOAD_IMAGE_TICKET_ERROR';
//
export const SET_REQUEST_CREATE_TICKET_REVIEW =
  'SET_REQUEST_CREATE_TICKET_REVIEW';
export const SET_REQUEST_CREATE_TICKET_REVIEW_SUCCESS =
  'SET_REQUEST_CREATE_TICKET_REVIEW_SUCCESS';
export const SET_REQUEST_CREATE_TICKET_REVIEW_ERROR =
  'SET_REQUEST_CREATE_TICKET_REVIEW_ERROR';
//
export const setTicketData = data => ({type: SET_TICKET_DATA, data});
//
export const setRequestTickets = () => ({type: SET_REQUEST_TICKETS});
export const setRequestTicketsSuccess = data => ({
  type: SET_REQUEST_TICKETS_SUCCESS,
  data,
});
export const setRequestTicketsError = data => ({
  type: SET_REQUEST_TICKETS_ERROR,
  data,
});
//
export const setRequestTicket = () => ({type: SET_REQUEST_TICKET});
export const setRequestTicketSuccess = data => ({
  type: SET_REQUEST_TICKET_SUCCESS,
  data,
});
export const setRequestTicketError = data => ({
  type: SET_REQUEST_TICKET_ERROR,
  data,
});
export const setRequestTicketType = () => ({type: SET_REQUEST_TICKET_TYPE});
export const setRequestTicketTypeSuccess = data => ({
  type: SET_REQUEST_TICKET_TYPE_SUCCESS,
  data,
});
export const setRequestTicketTypeError = data => ({
  type: SET_REQUEST_TICKET_TYPE_ERROR,
  data,
});
export const setRequestCreateTicket = () => ({
  type: SET_REQUEST_CREATE_TICKET,
});
export const setRequestCreateTicketSuccess = data => ({
  type: SET_REQUEST_CREATE_TICKET_SUCCESS,
  data,
});
export const setRequestCreateTicketError = data => ({
  type: SET_REQUEST_CREATE_TICKET_ERROR,
  data,
});
//
export const setRequestEditTicket = () => ({
  type: SET_REQUEST_EDIT_TICKET,
});
export const setRequestEditTicketSuccess = data => ({
  type: SET_REQUEST_EDIT_TICKET_SUCCESS,
  data,
});
export const setRequestEditTicketError = data => ({
  type: SET_REQUEST_EDIT_TICKET_ERROR,
  data,
});
//
export const setRequestDeleteTicket = () => ({
  type: SET_REQUEST_DELETE_TICKET,
});
export const setRequestDeleteTicketSuccess = data => ({
  type: SET_REQUEST_DELETE_TICKET_SUCCESS,
  data,
});
export const setRequestDeleteTicketError = data => ({
  type: SET_REQUEST_DELETE_TICKET_ERROR,
  data,
});
export const setUploadImageTicketData = () => ({
  type: SET_UPLOAD_IMAGE_TICKET_DATA,
});
export const setRequestUploadImageTicket = () => ({
  type: SET_REQUEST_UPLOAD_IMAGE_TICKET,
});
export const setRequestUploadImageTicketSuccess = data => ({
  type: SET_REQUEST_UPLOAD_IMAGE_TICKET_SUCCESS,
  data,
});
export const setRequestUploadImageTicketError = data => ({
  type: SET_REQUEST_UPLOAD_IMAGE_TICKET_ERROR,
  data,
});

export const setRequestCreateTicketReview = () => ({
  type: SET_REQUEST_CREATE_TICKET_REVIEW,
});
export const setRequestCreateTicketReviewSuccess = data => ({
  type: SET_REQUEST_CREATE_TICKET_REVIEW_SUCCESS,
  data,
});
export const setRequestCreateTicketReviewError = data => ({
  type: SET_REQUEST_CREATE_TICKET_REVIEW_ERROR,
  data,
});
//
export const getTickets = params => async dispatch => {
  dispatch(setRequestTickets());
  try {
    const response = await serviceRest.getTickets(params);
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestTicketsSuccess(response.data));
    } else {
      dispatch(setRequestTicketsError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestTicketsError(error));
    return false;
  }
};

export const getTicket = id => async dispatch => {
  dispatch(setRequestTicket());
  try {
    const response = await serviceRest.getTicket(id);
    // console.log(response);
    if (response.status === 200) {
      dispatch(setRequestTicketSuccess(response.data));
    } else {
      dispatch(setRequestTicketError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestTicketError(error));
    return false;
  }
};

export const getTicketType = () => async dispatch => {
  dispatch(setRequestTicketType());
  try {
    const response = await serviceRest.getTicketType();
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestTicketTypeSuccess(response.data));
    } else {
      dispatch(setRequestTicketTypeError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestTicketTypeError(error));
    return false;
  }
};

export const postTicket = params => async dispatch => {
  dispatch(setRequestCreateTicket());
  try {
    const response = await serviceRest.createTicket(params);
    if (response.status === 201) {
      dispatch(setRequestCreateTicketSuccess(response.data));
      // Toast.show('Create ticket successful');
      return true;
    } else {
      dispatch(setRequestCreateTicketError(response.problem));
      if(response?.data?.errors.length > 0) {
        Toast.show(response.data.errors[0].message);
      } else {
        Toast.show('Something went wrong')
      }
      return false;
    }
  } catch (error) {
    dispatch(setRequestCreateTicketError(error));
    return false;
  }
};

export const editTicket = (id, params) => async dispatch => {
  dispatch(setRequestEditTicket());
  try {
    const response = await serviceRest.updateTicket(id, params);
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestEditTicketSuccess(response.data));
      // Toast.show('Edit ticket successful');
      return true;
    } else {
      dispatch(setRequestEditTicketError(response.problem));
      if(response?.data?.errors.length > 0) {
        Toast.show(response.data.errors[0].message);
      } else {
        Toast.show('Something went wrong')
      }
      return false;
    }
  } catch (error) {
    dispatch(setRequestEditTicketError(error));
    return false;
  }
};

export const deleteTicket = (id, params) => async dispatch => {
  dispatch(setRequestDeleteTicket());
  try {
    const response = await serviceRest.deleteTicket(id, params);
    // console.log(response)
    if (response.status === 204) {
      dispatch(setRequestDeleteTicketSuccess(response.data));
      // Toast.show('Delete ticket successful');
      return true;
    } else {
      dispatch(setRequestDeleteTicketError(response.problem));
      if(response?.data?.message) {
        Toast.show(response.data.message);
      } else {
        Toast.show('Something went wrong')
      }
      return false;
    }
  } catch (error) {
    dispatch(setRequestDeleteTicketError(error));
    return false;
  }
};

export const postUploadImageTicket = params => async dispatch => {
  dispatch(setRequestUploadImageTicket());
  try {
    const response = await serviceRest.postUploadImageTicket(params);
    if (response.status === 200) {
      dispatch(setRequestUploadImageTicketSuccess(response.data));
      return response.data;
    } else {
      dispatch(setRequestUploadImageTicketError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestUploadImageTicketError(error));
    return false;
  }
};

export const postTicketReview = (id, params) => async dispatch => {
  dispatch(setRequestCreateTicketReview());
  try {
    const response = await serviceRest.postTicketReview(id, params);
    // console.log(response)
    if (response.status === 204) {
      dispatch(setRequestCreateTicketReviewSuccess(response.data));
      // Toast.show('Create ticket review successful');
      return true;
    } else {
      dispatch(setRequestCreateTicketReviewError(response.problem));
      if(response?.data?.message) {
        Toast.show(response.data.message);
      } else {
        Toast.show('Something went wrong')
      }
      return false;
    }
  } catch (error) {
    dispatch(setRequestCreateTicketReviewError(error));
    return false;
  }
};
