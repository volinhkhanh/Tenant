import { connect } from 'react-redux'
//
import BillsScreen from '../screens/bills/BillsScreen'
//
import { getManagementBills, getTotalDebtBills } from '../actions/actionBills'

const mapStateToProps = ({
  reducerHome: {
    getGeneralInformationData,
  },
  reducerBills: {
    getManagementBillProgress,
    getManagementBillData,
    getTotalDebtBillProgress,
    totalDebtBillData,
  },
}) => ({
  getManagementBillProgress,
  getManagementBillData,
  getGeneralInformationData,
  getTotalDebtBillProgress,
  totalDebtBillData,
});

const ContainerBills = connect(
  mapStateToProps,
  {
    getManagementBills,
    getTotalDebtBills,
  },
)(BillsScreen);

export default ContainerBills
