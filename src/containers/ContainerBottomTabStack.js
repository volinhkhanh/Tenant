import {connect} from 'react-redux';
//
import BottomTabStack from '../navigation/BottomTabStack';
//
import {getSendBirdUnread} from '../actions/actionChat';

const mapStateToProps = ({
  reducerChat: {sendBirdUnreadCount},
}) => ({
  sendBirdUnreadCount,
});

const ContainerBottomTabStack = connect(
  mapStateToProps,
  {
    getSendBirdUnread,
  },
)(BottomTabStack);

export default ContainerBottomTabStack;
