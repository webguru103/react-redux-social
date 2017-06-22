import moment from 'moment';

export function getFormattedDate(time) {
  return moment(time).format('MMM DD - hh:mm a');
}

export function getCurrentMonth() {
  const monthNumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const date = new Date();
  return monthNumber[date.getUTCMonth()];
}
