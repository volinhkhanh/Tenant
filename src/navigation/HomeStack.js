import {createStackNavigator} from 'react-navigation-stack';
import {fromLeft} from 'react-navigation-transitions';
//
import BottomTabStack from './BottomTabStack';
//
import HomeScreen from '../containers/ContainerHome';
// Profile
import ProfileSettingScreen from '../containers/ContainerProfileSetting';
import ViewProfileScreen from '../containers/ContainerViewProfile';
import ChangePasswordScreen from '../containers/ContainerChangePassword';
import ChangePasswordSuccessScreen from '../screens/profile/ChangePasswordSuccessScreen';
import AddMemberScreen from '../containers/ContainerAddMember';
import AddMemberConfirmationScreen from '../containers/ContainerAddMemberConfirmation';
import AddVerhicleScreen from '../containers/ContainerAddVerhicleScreen';
import RentalTermScreen from '../screens/profile/RentalTermScreen';
import IDCardScreen from '../screens/profile/IDCardScreen';
// Chat
// import ChattingBoxScreen from '../containers/ContainerChattingBox';
import ChattingBoxScreen from '../screens/chat1/ChattingBoxScreen';
import ChatBoxScreen from '../screens/chat/ChatBoxScreen';
// Bills
import BillsScreen from '../containers/ContainerBills';
import ElectricityScreen from '../screens/bills/ElectricityScreen';
import ElectricityBillScreen from '../screens/bills/ElectricityBillScreen';
import ManagementScreen from '../containers/ContainerManagent';
import ManagementBillScreen from '../containers/ContainerManagentBills';
// Facilities
import FacilityScreen from '../containers/ContainerFacilityScreen';
import FacilityTennisScreen from '../screens/facilities/FacilityTennisScreen';
import FacilityScheduleScreen from '../containers/ContainerFacilityScheduleScreen';
import BookingConfirmScreen from '../containers/ContainerBookingConfirmScreen';
import BookingConfirmDoneScreen from '../containers/ContainerBookingConfirmDoneScreen';
//Ticket
import TicketScreen from '../containers/ContainerTicket';
import TicketDetailScreen from '../containers/ContainerTicketDetail';
import CreateTicketScreen from '../containers/ContainerCreateTicket';
import EditTicketScreen from '../containers/ContainerEditTicket';
import TicketConfirmScreen from '../containers/ContainerTicketConfirm';
import TicketFullFillCreateScreen from '../screens/tickets/TicketFullFillCreateScreen';
//PhoneBook
import PhoneBookScreen from '../containers/ContainerContact';
//Election
import ElectionScreen from '../containers/ContainerElection';
import ElectionDetailVoteScreen from '../containers/ContainerElectionDetailVote';
import ElectCandidatesScreen from '../containers/ContainerElectCandidates';
import ElectionDetailEndScreen from '../containers/ContainerElectionDetailEnd';
import CandidateInfoScreen from '../screens/election/CandidateInfoScreen';
//Visitor
import VisitorScreen from '../containers/ContainerVisitor';
import VisitorCreateScreen from '../containers/ContainerCreateVisitor';
import VisitorDetailConfirmScreen from '../containers/ContainerVisitorDetailConfirm';
import VisitorDetailScreen from '../containers/ContainerVisitorDetail';
import VisitorFullFillCreateScreen from '../containers/ContainerFullFillCreateVisitor';
//Moving
import MovingListScreen from '../containers/ContainerMovingList';
import MovingDetailScreen from '../containers/ContainerMovingDetail';
import MovingCreateScreen from '../containers/ContainerMovingCreate';
import MovingReservationScreen from '../containers/ContainerMovingReservation';
import MovingScheduleScreen from '../containers/ContainerMovingSchedule';
import MovingBookingConfirmScreen from '../containers/ContainerMovingBookingConfirm';
import MovingBookingConfirmLOIScreen from '../screens/movingList/MovingBookingConfirmLOIScreen';
//Event
import EventScreen from '../containers/ContainerEvent';
import EventDetailScreen from '../containers/ContainerEventDetail';
//Other
import ContainerSetting from '../containers/ContainerSetting';
import ContainerAnnoucement from '../containers/ContainerAnnoucement';
import NewsDetailScreen from '../containers/ContainerNewsDetailScreen';
import FAQScreen from '../screens/other/FAQScreen';
import SendMailScreen from '../containers/ContainerSendMailScreen';
//
import SuccessScreen from '../screens/SuccessScreen';
//
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: BottomTabStack,
    },
    // Home: {
    //   screen: HomeScreen,
    // },
    //Profile
    ProfileSetting: {
      screen: ProfileSettingScreen,
    },
    ViewProfile: {
      screen: ViewProfileScreen,
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
    },
    ChangePasswordSuccess: {
      screen: ChangePasswordSuccessScreen,
      navigationOptions: {gesturesEnabled: false},
    },
    AddMember: {
      screen: AddMemberScreen,
    },
    AddMemberConfirmation: {
      screen: AddMemberConfirmationScreen,
    },
    AddVerhicle: {
      screen: AddVerhicleScreen,
    },
    IDCard: {
      screen: IDCardScreen,
    },
    RentalTerm: {
      screen: RentalTermScreen,
    },
    //Chat
    ChattingBox: {
      screen: ChattingBoxScreen,
    },
    // ChatBox: {
    //   screen: ChatBoxScreen,
    // },
    //Bill
    Bills: {
      screen: BillsScreen,
    },
    Electricity: {
      screen: ElectricityScreen,
    },
    ElectricityBill: {
      screen: ElectricityBillScreen,
    },
    Management: {
      screen: ManagementScreen,
    },
    ManagementBill: {
      screen: ManagementBillScreen,
    },
    //Facilities
    Facility: {
      screen: FacilityScreen,
    },
    FacilityTennis: {
      screen: FacilityTennisScreen,
    },
    FacilitySchedule: {
      screen: FacilityScheduleScreen,
    },
    BookingConfirm: {
      screen: BookingConfirmScreen,
    },
    BookingConfirmDone: {
      screen: BookingConfirmDoneScreen,
    },
    //Tickets
    Ticket: {
      screen: TicketScreen,
    },
    CreateTicket: {
      screen: CreateTicketScreen,
    },
    EditTicket: {
      screen: EditTicketScreen,
    },
    TicketConfirm: {
      screen: TicketConfirmScreen,
    },
    TicketDetail: {
      screen: TicketDetailScreen,
    },
    TicketFullFillCreate: {
      screen: TicketFullFillCreateScreen,
    },
    //PhoneBook
    PhoneBook: {
      screen: PhoneBookScreen,
    },
    //Election
    Election: {
      screen: ElectionScreen,
    },
    ElectionDetailVote: {
      screen: ElectionDetailVoteScreen,
    },
    ElectCandidates: {
      screen: ElectCandidatesScreen,
    },
    ElectionDetailEnd: {
      screen: ElectionDetailEndScreen,
    },
    CandidateInfo: {
      screen: CandidateInfoScreen,
    },
    //Visitor
    Visitor: {
      screen: VisitorScreen,
    },
    VisitorCreate: {
      screen: VisitorCreateScreen,
    },
    VisitorDetailConfirm: {
      screen: VisitorDetailConfirmScreen,
    },
    VisitorDetail: {
      screen: VisitorDetailScreen,
    },
    VisitorFullFillCreate: {
      screen: VisitorFullFillCreateScreen,
    },
    //MovingList
    MovingList: {
      screen: MovingListScreen,
    },
    MovingDetail: {
      screen: MovingDetailScreen,
    },
    MovingCreate: {
      screen: MovingCreateScreen,
    },
    MovingReservation: {
      screen: MovingReservationScreen,
    },
    MovingSchedule: {
      screen: MovingScheduleScreen,
    },
    MovingBookingConfirm: {
      screen: MovingBookingConfirmScreen,
    },
    MovingBookingConfirmLOI: {
      screen: MovingBookingConfirmLOIScreen,
    },
    //Event
    Event: {
      screen: EventScreen,
    },
    EventDetail: {
      screen: EventDetailScreen,
    },
    //other
    // Setting: {
    //   screen: ContainerSetting,
    // },
    Announcement: {
      screen: ContainerAnnoucement,
    },
    NewsDetail: {
      screen: NewsDetailScreen,
    },
    FAQ: {
      screen: FAQScreen,
    },
    SendMail: {
      screen: SendMailScreen,
    },
    //
    Success: {
      screen: SuccessScreen,
      navigationOptions: {gesturesEnabled: false},
    },
  },
  {
    headerMode: 'none',
    // initialRouteName: 'BottomTab',
    // defaultNavigationOptions: {
    //   gesturesEnabled: false,
    // },
    transitionConfig: () => fromLeft(),
  },
);

export default HomeStack;
