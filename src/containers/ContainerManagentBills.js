import { connect } from 'react-redux'
//
import ManagementBillScreen from '../screens/bills/ManagementBillScreen'
//
import { getBillDetail, setRequestManagementBillData } from '../actions/actionBills'

const mapStateToProps = ({
  reducerHome: {
    getGeneralInformationData,
  },
  reducerBills: {
    getManagementBillProgress,
    getManagementBillData,
    billDetailData,
    getBillDetailProgress,
  },
}) => ({
  getManagementBillProgress,
  getManagementBillData,
  getGeneralInformationData,
  billDetailData,
  getBillDetailProgress,
});

const ContainerManagentBills = connect(
  mapStateToProps,
  {
    getBillDetail,
    setRequestManagementBillData,
  },
)(ManagementBillScreen);

export default ContainerManagentBills
