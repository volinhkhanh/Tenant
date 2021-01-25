import { connect } from 'react-redux'
//
import ManagementScreen from '../screens/bills/ManagementScreen'
//
import { getManagementBills } from '../actions/actionBills'

const mapStateToProps = ({
  reducerHome: {
    getGeneralInformationData,
  },
  reducerBills: {
    getManagementBillProgress,
    getManagementBillData,
  },
}) => ({
  getManagementBillProgress,
  getManagementBillData,
  getGeneralInformationData,
});

const ContainerManagentBills = connect(
  mapStateToProps,
  {
    getManagementBills,
  },
)(ManagementScreen);

export default ContainerManagentBills
