import moment from 'moment';
//
const formatDateString = 'DD/MM/YYYY';
const formatDateDefaultString = 'YYYY-MM-DD';
const formatDateTimeString = 'DD/MM/YYYY HH:mm';
const formatTimeDateString = 'HH:mm DD/MM/YYYY';
const formatTimeString = 'HH:mm';
const formatDateElectionString = 'DD/MM/YYYY HH:mm';
const formatFullDateTimeString = 'DD/MM/YYYY HH:m:s';
//------------------------------------------------------------
const formatFullDateTime = value => {
  let dateConvert = moment(new Date(value)).format(formatFullDateTimeString);
  return dateConvert;
};
//
const formatDate = value => {
  let dateConvert = moment(value).format(formatDateString);
  return dateConvert;
};
//
const formatDateTime = value => {
  let dateConvert = moment(value).format(formatDateTimeString)
  return dateConvert;
};
//
const formatDateTimeVisitor = value => {
  let dateConvert = moment(value).format('HH:mm DD/MM');
  return dateConvert;
};
//
const formatTime = value => {
  let dateConvert = moment(value).format(formatTimeString);
  return dateConvert;
};
//
const formatTimeDate = value => {
  let dateConvert = moment(value).format(formatTimeDateString);
  return dateConvert;
};
//
const formatDateElection = value => {
  let dateConvert = moment(new Date(value)).format(formatDateElectionString);
  return dateConvert;
};
//
const formatMonthYear = value => {
  // let trLocale = require('moment/locale/vi');
  // moment.locale('vi',trLocale)
  let dateConvert = moment(new Date(value)).format('MMM YYYY');
  return dateConvert;
};
//
const formatDayMonth = value => {
  let dateConvert = moment(new Date(value)).format('DD MMM');
  return dateConvert;
};
const formatTimeDate12 = value => {
  let timeConvert = moment(new Date(value)).format('DD/MM/YYYY hh:mm');
  return timeConvert;
};
const formatTime12 = value => {
  let timeConvert = moment(new Date(value)).format('hh:mm');
  return timeConvert;
};
const formatMonthYearVi = value => {
  let dateConvert = moment(new Date(value)).format('MM/YYYY');
  return dateConvert;
};
const formatStartDate = (start_date) => {
  const date = new Date(start_date);
  return `T${date.getMonth() + 1} ${date.getFullYear()}`;
}
const formatDayMonthVi = (value) => {
  let dateConvert = moment(new Date(value)).format('DD/MM');
  return dateConvert;
}
const formatDefaultDate = (value) => {
  let dateConvert = moment(new Date(value)).format(formatDateDefaultString);
  return dateConvert;
}
const formatDefaultDateTime = (value) => {
  let dateConvert = ''
  if (typeof(value) === 'string' && value?.indexOf('0Z') > -1)
  { 
    dateConvert = moment(value).utc().toISOString()
  } else {
    dateConvert = moment(value).toISOString();
  }
  return dateConvert;
}
const enumerateDaysBetweenDates = (startDate, endDate) => {
  let dates = []
  let currDate = moment(new Date(startDate))
  let lastDate = moment(new Date(endDate))
  while(currDate.add(1, 'days').diff(lastDate) < 0) {
    dates.push(currDate.clone().toDate())
  }
  // console.log(moment(dates))
  return dates
}
//
export default {
  formatDateString,
  formatDateDefaultString,
  formatDateTimeString,
  formatTimeDateString,
  formatFullDateTimeString,
  formatDefaultDateTime,
  formatDateTime,
  formatDayMonth,
  formatDateElection,
  formatDate,
  formatMonthYear,
  formatTime12,
  formatTimeDate12,
  formatTime,
  formatFullDateTime,
  formatStartDate,
  formatDayMonthVi,
  formatMonthYearVi,
  formatDefaultDate,
  formatDateTimeVisitor,
  formatTimeDate,
  enumerateDaysBetweenDates,
};
