import {connect} from 'react-redux';
import MovingReservationScreen from '../screens/movingList/MovingReservationScreen';
import { getMovingVehicle, setElevatorScheduleData, setParkingScheduleData, putUpdateMovingRequest } from '../actions/actionMoving'

const mapStateToProps = ({
  reducerMoving: {
    movingVehicleData,
    getMovingVehicleProgress,
    movingElevatorData,
    movingParkingData,
  }}) => ({
  getMovingVehicleProgress,
  movingVehicleData,
  movingElevatorData,
  movingParkingData,
});

const ContainerMovingReservation = connect(
  mapStateToProps,
  {
    getMovingVehicle,
    setElevatorScheduleData,
    setParkingScheduleData,
    putUpdateMovingRequest,
  },
)(MovingReservationScreen);

export default ContainerMovingReservation;
