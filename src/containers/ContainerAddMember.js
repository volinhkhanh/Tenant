import { connect } from 'react-redux'
//
import AddMemberScreen from '../screens/profile/AddMemberScreen'
//
import {
  getCountries,
} from '../actions/actionMember'
import {
  postAddMember,
  getSession,
} from '../actions/actionHome'
import {
  deleteImage,
  postUploadImage,
  setUploadImageData,
} from '../actions/actionCommon'
//
const mapStateToProps = ({
  reducerCommon: {
    getDeleteImageProgress,
    getDeleteImageData,
    getUploadImageProgress,
    uploadImageData,
    uploadFontImageData,
    uploadBackImageData,
  },
  reducerMember: {
    getCountryProgress,
    getCountryData,
  },
  reducerHome: {
    getSessionProgress,
    getSessionData,
    getGeneralInformationData,
  },
}) => ({
  getCountryProgress,
  getCountryData,
  getSessionProgress,
  getSessionData,
  getUploadImageProgress,
  uploadImageData,
  getDeleteImageProgress,
  getDeleteImageData,
  getGeneralInformationData,
  uploadFontImageData,
  uploadBackImageData,
});

const ContainerAddMember = connect(
  mapStateToProps,
  {
    getCountries,
    postAddMember,
    getSession,
    postUploadImage,
    deleteImage,
    setUploadImageData,
  },
)(AddMemberScreen);

export default ContainerAddMember
