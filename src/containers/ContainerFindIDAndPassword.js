import { connect } from 'react-redux'
//
import FindIDAndPasswordScreen from '../screens/auth/FindIDAndPasswordScreen'
//
import { getBlock, setApartmentFindID, postOTP, postValidOTP } from '../actions/actionMember'

const mapStateToProps = ({ 
    reducerMember: {
      getBlockInProgress,
      getBlockData,
      getApartmentFindIdData,
    },
}) => ({
  getBlockInProgress,
  getBlockData,
  getApartmentFindIdData,
});

const ContainerFindIDAndPassword = connect(
  mapStateToProps,
  {
    getBlock,
    setApartmentFindID,
    postOTP,
    postValidOTP,
  },
)(FindIDAndPasswordScreen);

export default ContainerFindIDAndPassword
