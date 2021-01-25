import {connect} from 'react-redux';
import BookingConfirmDoneScreen from '../screens/facilities/BookingConfirmDoneScreen';
import { getRecentBookingDetail, setRecentBookingDetailData } from '../actions/actionFacility'
const mapStateToProps = ({
  reducerHome: {getGeneralInformationData},
  reducerFacility: {dataRecentBookingDetail},
}) => ({
  getGeneralInformationData,
  dataRecentBookingDetail,
});
const ContainerBookingConfirmDoneScreen = connect(
  mapStateToProps,
  {getRecentBookingDetail, setRecentBookingDetailData},
)(BookingConfirmDoneScreen);

export default ContainerBookingConfirmDoneScreen;
