import { connect } from 'react-redux'
//
import ViewProfileScreen from '../screens/profile/ViewProfileScreen'
//
import { getMemberDetail, setMemberDetailData, postUploadAvatar, setUploadAvatarData } from '../actions/actionHome'
//
const mapStateToProps = ({ 
    reducerHome: {
      getMemberDetailData,
      getMemberDetailProgress,
      getGeneralInformationData,
      getUploadAvatarProgress,
      getUploadAvatarData,
    },
}) => ({
  getMemberDetailData,
  getMemberDetailProgress,
  getGeneralInformationData,
  getUploadAvatarProgress,
  getUploadAvatarData,
});

const ContainerViewProfile = connect(
  mapStateToProps,
  {
    getMemberDetail,
    postUploadAvatar,
    setUploadAvatarData,
    setMemberDetailData,
  },
)(ViewProfileScreen);

export default ContainerViewProfile
