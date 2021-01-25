import {connect} from 'react-redux';
import BookingConfirmScreen from '../screens/facilities/BookingConfirmScreen';
import { getFacilityPolicy } from '../actions/actionFacility'

const mapStateToProps = ({
  reducerHome: {getGeneralInformationData},
  reducerMember: {getMemberData},
  reducerFacility: {dataFacilityPolicy},
}) => ({
  getGeneralInformationData,
  getMemberData,
  dataFacilityPolicy,
});
const ContainerBookingConfirmScreen = connect(
  mapStateToProps,
  {getFacilityPolicy},
)(BookingConfirmScreen);

export default ContainerBookingConfirmScreen;
