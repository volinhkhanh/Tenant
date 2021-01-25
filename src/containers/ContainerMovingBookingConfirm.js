import {connect} from 'react-redux';
import MovingBookingConfirmScreen from '../screens/movingList/MovingBookingConfirmScreen';
import { putUpdateMovingRequest, getMovingDetail, setMovingDetailData, setElevatorScheduleData, setParkingScheduleData } from '../actions/actionMoving'

const mapStateToProps = (
  {reducerHome: {getGeneralInformationData},
  reducerMoving: {
    movingElevatorData,
    movingParkingData,
    getMovingDetailData,
  }
}
) => ({
  getGeneralInformationData,
  movingElevatorData,
  movingParkingData,
  getMovingDetailData,
});

const ContainerMovingBookingConfirm = connect(
  mapStateToProps,
  {
    putUpdateMovingRequest,
    getMovingDetail,
    setMovingDetailData,
    setElevatorScheduleData,
    setParkingScheduleData
  },
)(MovingBookingConfirmScreen);

export default ContainerMovingBookingConfirm;
