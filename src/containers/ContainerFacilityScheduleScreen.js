import { connect } from 'react-redux'
//
import FacilityScreen from "../screens/facilities/FacilityScreen";
//
import {getFacilityCategories,getRecentBooking} from "../actions/actionFacility";
import FacilityScheduleScreen from '../screens/facilities/FacilityScheduleScreen';
const mapStateToProps = ({ 
   reducerFacility:{
    dataFacilityCategories,
    loading,
    dataRecentBooking
   },
   reducerHome:{
    getGeneralInformationData
   },
   reducerMember:{
    getMemberData
   }
}) => ({
    dataFacilityCategories,
    loading,
    dataRecentBooking,
    getGeneralInformationData,
    getMemberData
});

const ContainerFacilityScheduleScreen = connect(
  mapStateToProps,
  {
    getFacilityCategories,
    getRecentBooking
  },
)(FacilityScheduleScreen);

export default ContainerFacilityScheduleScreen;
