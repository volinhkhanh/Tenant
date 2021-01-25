import { connect } from 'react-redux'
//
import SearchApartmentScreen from '../screens/auth/SearchApartmentScreen'
//
import { getApartment, setApartmentFindID, setApartmentRegister, setApartment } from '../actions/actionMember'

const mapStateToProps = ({ 
    reducerMember: {
      getApartmentInProgress,
      getApartmentData,
    },
}) => ({
  getApartmentInProgress,
  getApartmentData,
});

const ContainerSearchApartment = connect(
  mapStateToProps,
  {
    getApartment,
    setApartmentFindID,
    setApartmentRegister,
    setApartment,
  },
)(SearchApartmentScreen);

export default ContainerSearchApartment
