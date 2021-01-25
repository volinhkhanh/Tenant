import React from 'react';
import _ from 'lodash';
import {View} from 'react-native';
import {Badge} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createIconSetFromFontello} from 'react-native-vector-icons';
//
import {Colors} from '../../themes/';
import fontsConfig from './config.json';
//
const Icon = createIconSetFromFontello(fontsConfig, 'fontello');
Icon.loadFont();

export {default as VisibilityIcon} from './VisibilityIcon';
export {default as VisibilityOffIcon} from './VisibilityOffIcon';
export {default as CameraIcon} from './CameraIcon';

export const SearchIcon = style => <Icon name="search" size={24} {...style} />;
export const BellIcon = style => <Icon name="bell" size={24} {...style} />;

export const BellNotiIcon = props => {
  const {size = 24, ..._style} = props;
  let valueBadge = props.valueBadge;
  const isActiveDot = !_.isUndefined(props.valueBadge);
  valueBadge = props.valueBadge || '';

  const value = Number(valueBadge) > 20 ? '20+' : valueBadge;
  const lenBadge = String(value).length;
  const right = [1, 1, 3, 5];
  const width = size + right[lenBadge];
  return (
    <View style={{width: width}}>
      <Icon name="bell" size={size} {..._style} />
      {isActiveDot && (
        <Badge
          textStyle={{fontSize: size * 0.3}}
          value={value}
          badgeStyle={{
            backgroundColor: Colors.red,
            height: size * 0.5,
            minWidth: size * 0.5,
          }}
          containerStyle={{
            position: 'absolute',
            top: 0,
            right: -right[lenBadge],
          }}
        />
      )}
    </View>
  );
};

export const DayIcon = style => <Icon name="day" size={24} {...style} />;
export const NightIcon = style => <Icon name="night" size={24} {...style} />;
export const ProcessIcon = style => (
  <Icon name="process" size={24} {...style} />
);
export const AddPhotoIcon = style => (
  <Icon name="add_photo" size={24} {...style} />
);
export const ReadMoreIcon = style => (
  <Icon name="readmore" size={24} {...style} />
);
export const AsseccTimeIcon = style => (
  <Icon name="assecc_time" size={24} {...style} />
);
export const FilterIcon = style => <Icon name="filter" size={24} {...style} />;
export const BellFullfillIcon = style => (
  <MaterialCommunityIcons name="bell" size={24} {...style} />
);
// export const BellFullfillIcon = style => <Icon name="bell" size={24} {...style} />;
export const Eye = style => <Icon name="eye" size={24} {...style} />;
export const MailIcon = style => <Icon name="mail" size={24} {...style} />;
// export const HelpIcon = style => <Icon name="help" size={24} {...style} />;
export const DeleteIcon = style => <Icon name="delete" size={24} {...style} />;
export const ArrowRightIcon = style => (
  <Icon name="arrow_right" size={24} {...style} />
);
export const ArrowForwardIcon = style => (
  <Icon name="arrowforward" size={24} {...style} />
);
export const ArrowBackIcon = style => (
  <Icon name="arrowback" size={24} {...style} />
);
export const EmergencyIcon = style => (
  <Icon name="emergency" size={24} {...style} />
);
export const AddIcon = style => <Icon name="add" size={24} {...style} />;
export const LoadingIcon = style => (
  <Icon name="loading" size={24} {...style} />
);
export const CheckedIcon = style => (
  <MaterialCommunityIcons name="check" size={24} {...style} />
);

export const DateIcon = props => {
  const {size = 24, ...style} = props;
  return <Icon name="date" size={size} {...style} />;
};

//
export {default as ArrowDropDownv2} from './images/arrow_drop_down.svg';
export {default as ArrowDropDownIcon} from './images/arrowdown.svg';
export {default as BadmintonIcon} from './images/badminton.svg';
export {default as BasketballIcon} from './images/basketball.svg';
export {default as BusIcon} from './images/bus.svg';
export {default as CallIcon} from './images/call.svg';
export {default as ChattingIcon} from './images/chatting.svg';
export {default as CleanIcon} from './images/clean.svg';
export {default as DeliveryIcon} from './images/delivery.svg';
export {default as EventIcon} from './images/event.svg';
export {default as FacilityFillIcon} from './images/facility_fill.svg';
export {default as LaundryIcon} from './images/laundry.svg';
export {default as MovingIcon} from './images/moving.svg';
export {default as Moving1Icon} from './images/moving_1.svg';
export {default as SendIcon} from './images/send.svg';
export {default as AttachFile} from './images/attach_file.svg';
export {default as ServiceIcon} from './images/service.svg';
// export { default as SuportcallIcon } from './images/suportCall.svg';
export {default as CreateChatIcon} from './images/createChat.svg';
export {default as SupportEmailIcon} from './images/mail.svg';
export {default as TennisIcon} from './images/tennis.svg';
export {default as TicketFillIcon} from './images/ticket_fill.svg';
export {default as TicketOutlineIcon} from './images/ticketOutline.svg';
export {default as VisitorIcon} from './images/visitor.svg';
export {default as TrashOutlinedIcon} from './images/trash_outlined.svg';
export {default as NewsIcon} from './images/news.svg';
export {default as Conversation} from './images/conversation.png';
export {default as Bill} from './images/bill.png';
export {default as File} from './images/file.png';
export {default as Download} from './images/download.png';
export {default as Booking} from './images/booking.png';
export {default as Contact} from './images/contact.png';
export {default as Ticket} from './images/ticket.png';
export {default as Election} from './images/election.svg';
export {default as ElectionDisable} from './images/election.png';
export {default as Workplace} from './images/workplace.png';
export {default as User} from './images/user.png';
export {default as Birthday} from './images/birthday.png';
export {default as ChevronRight} from './images/chevron_right.png';
export {default as Phone} from './images/phone.png';
export {default as AddUser} from './images/add_user.png';
export {default as Key} from './images/key.png';
export {default as Camera} from './images/camera.png';
export {default as Delete} from './images/delete.png';
export {default as WorkPlace} from './images/workplace.svg';
export {default as BellSettings} from './images/bell.svg';
export {default as Settings} from './images/setting.svg';
export {default as TrashIcon} from './images/iconTrash.svg';
export {default as RingAnnoucement} from './images/annouccement.svg';
export {default as DateSVG} from './images/date.svg';
export {default as DateActiveSVG} from './images/date-active.svg';
export {default as InOutSVG} from './images/ticket/inout.svg';
export {default as AsseccSVG} from './images/ticket/assecc.svg';
export {default as SortSVG} from './images/ticket/sort.svg';
export {default as BuildSVG} from './images/ticket/build.svg';
export {default as BusinessSVG} from './images/ticket/business.svg';
export {default as AssignmentSVG} from './images/ticket/assignment.svg';
export {default as ProcessingSVG} from './images/ticket/processing.svg';
export {default as CompletedSVG} from './images/ticket/completed.svg';
export {default as WarningSVG} from './images/ticket/warning.svg';
export {
  default as NotificationHomeService,
} from './images/notification_home_service.png';

export const UncheckedBoxIcon = props => {
  const {color, size = 24} = props;
  return (
    <View
      style={{
        borderColor: color || Colors.violet,
        height: size,
        width: size,
        borderWidth: 1,
        borderRadius: 999,
      }}
    />
  );
};

export const CheckedBoxIcon = props => {
  const {color, size = 24} = props;
  return (
    <View
      style={{
        borderColor: color || Colors.violet,
        height: size,
        width: size,
        borderWidth: 1,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: color || Colors.violet,
          height: (14 / 24) * size,
          width: (14 / 24) * size,
          borderRadius: 999,
        }}
      />
    </View>
  );
};

export {default as ActiveHomeIcon} from './images/home/active.svg';
export {default as HomeIcon} from './images/home/default.svg';
import _BubbleChatIcon from './images/bubblechat/default.svg';
export {default as BubbleChatIcon1} from './images/bubblechat/default.svg';
export {default as ActiveBubbleChatIcon} from './images/bubblechat/active.svg';
export {default as EcoIcon} from './images/eco/default.svg';
export {default as ActiveEcoIcon} from './images/eco/active.svg';
export {default as MoreIcon} from './images/more/default.svg';
export {default as ActiveMoreIcon} from './images/more/active.svg';
export {default as TimelineIcon} from './images/timeline/default.svg';
export {default as ActiveTimelineIcon} from './images/timeline/active.svg';
export {default as VietnamIcon} from './images/Vietnam.svg';
export {default as EnglishIcon} from './images/English.svg';
export {default as PlacesIcon} from './images/place.svg';
export {default as InOutIcon} from './images/inout.svg';
export {default as PersonIcon} from './images/person.svg';
export {default as TimeIcon} from './images/time.svg';
export {default as ElectIcon} from './images/elect.svg';
export {default as TranslateIcon} from './images/translate.svg';
export {default as OutIcon} from './images/logout.svg';
export {default as AvtBackground} from './images/avatarBackground.svg';
export {default as LanguageSetting} from './images/LanguageSetting.svg';
export {default as Annoucement} from './images/annoucement.svg';
export {default as HelpIcon} from './images/iconHelp.svg';
export {default as SupportIcon} from './images/iconSupport.svg';
export {default as BusinessCenter} from './images/business_center.svg';
export {default as AssignmentReturned} from './images/assignment_returned.svg';
export {default as Bell} from './images/bell_icon.svg';
export {default as Mail} from './images/mail_icon.svg';
export {default as Description} from './images/description.svg';

export const BubbleChatIcon = props => {
  const {size = 24, ..._style} = props;
  let valueBadge = props.valueBadge;
  const isActiveDot = !_.isUndefined(props.valueBadge);
  valueBadge = props.valueBadge || '';

  const value = Number(valueBadge) > 20 ? '20+' : valueBadge;
  const lenBadge = String(value).length;
  const right = [2, 3, 3, 5];
  const width = size + right[lenBadge];
  return (
    <View style={{width: width}}>
      <_BubbleChatIcon width={size} height={size} {..._style} />
      {isActiveDot && (
        <Badge
          value={value}
          textStyle={{fontSize: 10, textAlign: 'center'}}
          badgeStyle={{
            backgroundColor: Colors.red,
            height: 15,
            minWidth: 15,
          }}
          containerStyle={{
            position: 'absolute',
            top: -2,
            right: -right[lenBadge],
          }}
        />
      )}
    </View>
  );
};

export const MinusIcon = style => (
  <Icon name="remove_24px" size={24} {...style} />
);

export const PlusIcon = props => <Icon name="add" size={24} {...props} />;

export {default as SpeakerIcon} from './SpeakIcon';
export {default as RecordIcon} from './RecordIcon';
export {default as CallendIcon} from './CallendIcon';
// export { default as SupportIcon } from './SupportIcon';
