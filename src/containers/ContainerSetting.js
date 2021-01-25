import { connect } from 'react-redux'
//
import SettingScreen from "../screens/other/SettingScreen";
//
import {getListAnnoucement,readingAnnoucement} from "../actions/actionOther";
import {setMemberData} from "../actions/actionMember";
const mapStateToProps = ({
  reducerHome: {
    getGeneralInformationData,
  },
  reducerMember: {
    getMemberData,
  },
  reducerOther:{
    listAnnoucemnent,
    totalReadAnnoucement,
    loading,
    listDataSetting
  },
}) => ({
  getMemberData,
  listAnnoucemnent,
  totalReadAnnoucement,
  loading,
  listDataSetting,
  getGeneralInformationData,
});

const ContainerSetting = connect(
  mapStateToProps,
  {
    getListAnnoucement,
    readingAnnoucement,
    setMemberData,
  },
)(SettingScreen);

export default ContainerSetting;
