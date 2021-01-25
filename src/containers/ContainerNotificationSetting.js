import { connect } from 'react-redux'
//
import SettingScreen from "../screens/other/SettingScreen";
//
import {getListSetting} from "../actions/actionOther";
import NotificationSettingScreen from '../screens/other/NotificationSettingScreen';
const mapStateToProps = ({ 
    reducerOther:{
        listDataSetting
    },
}) => ({
    listDataSetting
});

const ContainerNotificationSetting = connect(
  mapStateToProps,
  {
    getListSetting
  },
)(NotificationSettingScreen);

export default ContainerNotificationSetting;
