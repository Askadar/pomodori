import moment from 'moment';

const timeFormat = 'mm:ss.SSS';
export const formatTime = (time) => moment(time).format(timeFormat);
