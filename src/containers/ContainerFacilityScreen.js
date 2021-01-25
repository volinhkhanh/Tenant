import { connect } from 'react-redux'
//
import FacilityScreen from "../screens/facilities/FacilityScreen";
//
import {getFacilityCategories,getRecentBooking} from "../actions/actionFacility";
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

const ContainerFacilityScreen = connect(
  mapStateToProps,
  {
    getFacilityCategories,
    getRecentBooking
  },
)(FacilityScreen);

export default ContainerFacilityScreen;
