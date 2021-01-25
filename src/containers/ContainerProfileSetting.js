import { connect } from 'react-redux'
//
import ProfileSettingScreen from '../screens/profile/ProfileSettingScreen'
//
import { getTenantList, getListTransportation, getContract } from '../actions/actionHome'
//
const mapStateToProps = ({ 
    reducerHome: {
      getTenantListData,
      getGeneralInformationData,
      getTenantListProgress,
      listTransportationData,
      getListTransportationProgress,
      getContractListProgress,
      contractListData,
    },
}) => ({
  getTenantListData,
  getGeneralInformationData,
  getTenantListProgress,
  listTransportationData,
  getListTransportationProgress,
  getContractListProgress,
  contractListData,
});

const ContainerProfileSetting = connect(
  mapStateToProps,
  {
    getTenantList,
    getListTransportation,
    getContract,
  },
)(ProfileSettingScreen);

export default ContainerProfileSetting
