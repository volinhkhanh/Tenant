import { connect } from 'react-redux'
//
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen'
//
import {
  postChangePassword,
} from '../actions/actionHome'
//
const mapStateToProps = ({ 
  reducerHome: {
    getChangePasswordProgress,
    getChangePasswordData,
  },
}) => ({
  getChangePasswordProgress,
  getChangePasswordData,
});

const ContainerChangePassword = connect(
  mapStateToProps,
  {
    postChangePassword,
  },
)(ChangePasswordScreen);

export default ContainerChangePassword
