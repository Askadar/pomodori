import { combineReducers } from 'redux';

import timer from './timer';
import notifications from './notifications';

export default combineReducers({
    timer,
    notifications,
})
