import { connect } from 'react-redux'
//
import AddVerhicleScreen from '../screens/profile/AddVerhicleScreen'
//
import {
  getVehicle,
  setHomeImageData,
  postRegisterVehicle,
  getSession,
} from '../actions/actionHome'
import {
  postUploadImage,
  setUploadImageData,
} from '../actions/actionCommon'
//
const mapStateToProps = ({ 
  reducerHome: {
    getVehicleData,
    getVehicleProgress,
    getRegisterVehicleData,
    getRegisterVehicleProgress,
    getSessionProgress,
    getSessionData,
    getGeneralInformationData,
  },
  reducerCommon: {
    getUploadImageProgress,
    uploadImageData,
  },
}) => ({
  getVehicleData,
  getVehicleProgress,
  getRegisterVehicleData,
  getRegisterVehicleProgress,
  getSessionProgress,
  getSessionData,
  getGeneralInformationData,
  getUploadImageProgress,
  uploadImageData,
});

const ContainerAddVerhicleScreen = connect(
  mapStateToProps,
  {
    getVehicle,
    postUploadImage,
    setHomeImageData,
    postRegisterVehicle,
    getSession,
    setUploadImageData,
  },
)(AddVerhicleScreen);

export default ContainerAddVerhicleScreen
