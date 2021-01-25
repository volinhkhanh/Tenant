import { connect } from 'react-redux'
//
import FindIDScreen from '../screens/auth/FindIDScreen'
//
const mapStateToProps = ({ 
    reducerMember: {
      getValidOTPData,
    },
}) => ({
  getValidOTPData
});

const ContainerFindID = connect(
  mapStateToProps,
  {
    
  },
)(FindIDScreen);

export default ContainerFindID
