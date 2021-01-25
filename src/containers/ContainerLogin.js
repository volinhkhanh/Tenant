import { connect } from 'react-redux'
//
import LoginScreen from '../screens/auth/LoginScreen'
//
import { postLogin, checkToken } from '../actions/actionMember'

const mapStateToProps = ({ 
    reducerMember: {
      getLoginInProgress,
      getMemberData,
      getUnitIdData,
    },
}) => ({
  getLoginInProgress,
  getMemberData,
  getUnitIdData,
});

const ContainerLogin = connect(
  mapStateToProps,
  {
    postLogin,
    checkToken,
  },
)(LoginScreen);

export default ContainerLogin
