import { connect } from 'react-redux'
//
import MovingScheduleScreen from '../screens/movingList/MovingScheduleScreen'
//
import { getMovingSchedule, setElevatorScheduleData, setParkingScheduleData } from '../actions/actionMoving'

const mapStateToProps = ({
  reducerMoving: {
    movingScheduleData,
    getMovingScheduleProgress,
    movingElevatorData,
    movingParkingData,
  },
}) => ({
  movingScheduleData,
  getMovingScheduleProgress,
  movingElevatorData,
  movingParkingData,
});

const ContainerMovingSchedule = connect(
  mapStateToProps,
  {
    getMovingSchedule,
    setElevatorScheduleData,
    setParkingScheduleData,
  },
)(MovingScheduleScreen);

export default ContainerMovingSchedule
