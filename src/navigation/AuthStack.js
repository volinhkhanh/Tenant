import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../containers/ContainerLogin';
import FindIDAndPasswordScreen from '../containers/ContainerFindIDAndPassword';
import OtpVerificationScreen from '../containers/ContainerOtpVerification';
import OtpVerificationSuccessScreen from '../screens/auth/OtpVerificationSuccessScreen';
import FindIDScreen from '../containers/ContainerFindID';
import ResetPasswordScreen from '../containers/ContainerResetPassword';
import ResetPasswordSuccessScreen from '../screens/auth/ResetPasswordSuccessScreen';
import RegisterScreen from '../containers/ContainerRegister';
import SearchApartmentScreen from '../containers/ContainerSearchApartment';
import RegisterConfirmScreen from '../containers/ContainerRegisterConfirm';
import RegisterSuccessScreen from '../screens/auth/RegisterSuccessScreen';
//
import Colors from '../constants/Colors';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    FindIDAndPassword: {
      screen: FindIDAndPasswordScreen,
    },
    OtpVerification: {
      screen: OtpVerificationScreen,
    },
    OtpVerificationSuccess: {
      screen: OtpVerificationSuccessScreen,
    },
    FindID: {
      screen: FindIDScreen,
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
    },
    ResetPasswordSuccess: {
      screen: ResetPasswordSuccessScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    SearchApartment: {
      screen: SearchApartmentScreen,
    },
    RegisterConfirm: {
      screen: RegisterConfirmScreen,
    },
    RegisterSuccess: {
      screen: RegisterSuccessScreen,
    },
  },
  {
    // mode: 'modal',
    headerMode: 'none',
    // cardStyle: {
    //   backgroundColor: Colors.white,
    // },
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
  },
);

export default AuthStack;
