import { connect } from 'react-redux'
//
import RegisterScreen from '../screens/auth/RegisterScreen'
// import RegisterScreen from '../screens/auth/RegisterStep3Screen'
//
import {
  getUnits,
  getCountries,
  getBlock,
  getRegisterSession,
  // postUploadImage,
  postRegister,
  setApartmentRegister,
} from '../actions/actionMember'
import {
  deleteImage,
  postUploadImage,
  setUploadImageData,
} from '../actions/actionCommon'

const mapStateToProps = ({
  reducerCommon: {
    getUploadImageProgress,
    getDeleteImageProgress,
    getDeleteImageData,
    uploadImageData,
    uploadFontImageData,
    uploadBackImageData,
  },
  reducerMember: {
    getUnitProgress,
    getUnitData,
    getCountryProgress,
    getCountryData,
    getApartmentRegisterData,
    getBlockInProgress,
    getBlockData,
    getRegisterSessionProgress,
    getRegisterSessionData,
  },
}) => ({
  getUnitProgress,
  getUnitData,
  getCountryProgress,
  getCountryData,
  getApartmentRegisterData,
  getBlockInProgress,
  getBlockData,
  getRegisterSessionProgress,
  getRegisterSessionData,
  getUploadImageProgress,
  uploadImageData,
  getDeleteImageProgress,
  getDeleteImageData,
  uploadFontImageData,
  uploadBackImageData,
});

const ContainerRegister = connect(
  mapStateToProps,
  {
    getUnits,
    getCountries,
    getBlock,
    getRegisterSession,
    postUploadImage,
    postRegister,
    deleteImage,
    setUploadImageData,
    setApartmentRegister,
  },
)(RegisterScreen);

export default ContainerRegister
