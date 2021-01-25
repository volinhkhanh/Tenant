import {create} from 'apisauce';
//
import baseURL from '../constants/RequestUrl';
// unit id
const unit_id = 2;
//
const api = create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'App-Version': '2.0',
    // 'Unit-Uuid': 'd806d30f-f0f9-11ea-9e07-068b1c6e1ae2',
  },
  timeout: 10000,
});
//
const noURL = '';
const apiNoBaseUrl = create({
  noURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'App-Version': '2.0',
    'Api-Token': '31e37470c44658aefdf5f298e65614aab60d793e',
  },
  timeout: 10000,
});
//
export const setUnitToHeader = uuid => {
  api.setHeaders({
    'Unit-Uuid': uuid,
  });
};
//
export const setTokenToHeaders = token => {
  api.setHeaders({
    Authorization: typeof token === 'string' ? `Bearer ${token}` : null,
  });
  // apiNoBaseUrl.setHeaders({
  //   Authorization: typeof token === 'string' ? `Bearer ${token}` : null,
  // });
};

//
export const postLogin = params => api.post('login', params);
//
export const postLogout = () => api.post('logout');
//
export const getApartment = params => api.get(`apartments?name=${params}`);
//
export const getBlock = params =>
  api.get(`buildings`, params);
//
export const postOTP = params => api.post('request-otp', params);
//
export const postValidOTP = params => api.post('valid-otp', params);
//
export const postResetPassword = params => api.post('reset-password', params);
//Register
export const getUnits = params => api.get('units', params);
//
export const getCountries = () => api.get('countries');
//
export const postUploadImage = params => api.post('upload', params);
//
export const getMovingVehicle = () => api.get('moving-vehicles');
//
export const getMovingSchedule = params => api.get('moving-schedule', params);
//
export const getRegisterSession = params => api.get('register-session', params);
//
// export const postRegister = params => api.post('register', params);
//
// export const postRegister = params => api.post('registrations', params);
export const postRegister = params => api.post('request-account', params);
//Contact
export const getContact = () => api.get('telephone-categories');
//Bills
export const getManagementBills = params => api.get('bills', params);
//
export const getTotalDebtBills = params => api.get('bills/total/debt', params);
//
export const getBillDetail = (uuid, params) => api.get(`bills/${uuid}`, params);
//Home
export const getUnitListOfTenant = () => api.get('units/unit-tenants');
//
export const getGeneralInformation = () => api.get('information');
//
export const getTenantList = params => api.get('list', params);
//
export const getContract = params => api.get('contract', params);
//
// export const postChangePassword = params => api.post('password', params);
//
export const getMemberDetail = id => api.get(`unit-members/${id}`);
//
// export const postAddMember = params => api.post('new', params);
//
export const postAddMember = params => api.post('register', params);
//
export const getVehicle = () => api.get('transportation-categories');
//
export const postUploadHomeImage = params => api.post('home/images', params);
//
export const postRegisterVehicle = params =>
  api.post('transportations', params);
//
export const postChangePassword = params => api.post('change_password', params);
//
export const postUploadAvatar = params =>
  api.post('profile/upload-avatar', params);
//
export const deleteImage = id => api.delete(`images/${id}`);
//
export const getSession = params => api.get('session', params);
//
export const getListUnit = params => api.get(`units`, params);
//
export const getListTransportation = () => api.get('transportations');
//Moving
export const getMovingList = params => api.get('moving-requests', params);
//
export const getMovingDetail = id => api.get(`moving-requests/${id}`);
//
export const postCreateMoveOut = params =>
  api.post('moving-requests/move-out', params);
//
export const postCreateFurnitureMoving = params =>
  api.post('moving-requests', params);
//
export const putUpdateMovingRequest = (uuid, params) =>
  api.put(`moving-requests/${uuid}`, params);
//
export const postUploadMovingImage = params =>
  api.post('moving-request/upload-image', params);
//Election
export const getListElection = params => api.get('elections', params);
//
export const getElectionDetail = uuid => api.get(`elections/${uuid}`);
//
export const getCandidatesByElection = uuid =>
  api.get(`elections/${uuid}/participants`);
//
export const getVotingElection = candidateId =>
  api.get(`election-participants/${candidateId}/vote`);
//Chat
export const getSendBirdInfo = params => api.get('channels', params);
//
export const getMessage = params => api.get('messages', params);
//
export const postSendMessage = params => api.post('messages/send', params);
//
export const getSendBirdUnread = (application_id, channel_url, user_ids) =>
  apiNoBaseUrl.get(
    `https://api-${application_id}.sendbird.com/v3/group_channels/${channel_url}/messages/unread_count?user_ids=${user_ids}`,
  );
//
export const postMarkAsRead = (application_id, channel_url, user_id) =>
  apiNoBaseUrl.put(
    `https://api-${application_id}.sendbird.com/v3/group_channels/${channel_url}/messages/mark_as_read`,
    user_id,
  );
//
export const getListAnnoucement = () => api.get(`notifications`);
export const getAnnoucementDetail = id => api.get(`notifications/${id}`);
export const markAllAsRead = () => api.post(`notifications/mark-all-as-read`);
export const getSettingNotify = () => api.get('tenant-settings');
export const saveSettingNotify = data => api.put('tenant-settings', data);
export const sendMail = data => api.post('more/email', data);
export const deleteAnnoucement = (id, unit_id) =>
  api.delete(`more/annoucement/${id}?unit_id=${unit_id}`);
//Ticket
export const createTicket = params => api.post('home-services', params);
//
export const getTickets = params => api.get('home-services', params);
export const getTicket = id => api.get(`home-services/${id}`);
export const getTicketType = () => api.get('hashtags');
export const updateTicket = (id, params) =>
  api.put(`home-services/${id}`, params);
export const deleteTicket = (id, params) =>
  api.put(`home-services/${id}/cancel`, params);
export const postTicketReview = (id, params) =>
  api.put(`home-services/${id}/review`, params);
//
export const postUploadImageTicket = params =>
  api.post('tickets/upload-image', params);
//Event
export const getEvents = () => api.get('announcements/events');
export const getEvent = id => api.get(`announcements/events/${id}`);
// facility
export const getFacilityCategories = () => api.get(`facility-categories?size=${100}`);
export const getYarnByCategory = params => api.get('facilities', params);
export const getRecentBooking = () => api.get(`facility-bookings/recent`, {size: 100});
export const getRecentBookingDetail = uuid => api.get(`facility-bookings/${uuid}`);
export const getYardListBooking = (id, params) =>
  api.get(`facilities/${id}/schedule`, params);
export const addBooking = params => api.post(`facility-bookings`, params);
export const checkTenantBooked = (id, params) =>
  api.get(`facilities/${id}/booked`, params);
export const cancelBooking = id => api.put(`facility-bookings/${id}/cancel`);
export const getFacilityPolicy = uuid => api.get(`facilities/${uuid}/booking-policy`);
// visitor
export const getVisitorReason = () => api.get('/visitor-reasons');
export const getVisitors = () => api.get('/visitors');
export const getVisitor = uuid => api.get(`/visitors/${uuid}`);
// export const createVisitor = params => api.post('/visitor', params);
export const createVisitor = params => api.post('/visitors', params);
export const updateVisitor = params => api.patch('/visitor', params);
export const deleteVisitor = id => api.delete(`/visitors/${id}`);
// sendBird
export const getSendBirdUser = () => api.get('/sendbird/user');
export const getSendBirdChannel = () => api.get('/sendbird/channel');
export const getTicketChannels = params =>
  api.get('/sendbird/ticket-channels', params);
// {{baseUrl}}/api/v1/tenant/sendbird/ticket-channels?keyword=delivery
