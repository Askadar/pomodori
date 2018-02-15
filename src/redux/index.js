import { combineReducers } from 'redux';

import timer, { initialState as timerDefaults} from './timer';
import notifications, { initialState as notificationsDefaults} from './notifications';
import goal, { initialState as goalDefaults} from './goal';
import {loadLocalStorage} from '../utils';

export const reducers = combineReducers({
    timer,
    notifications,
    goal,
});

export const defaultedState = /*loadLocalStorage*/({
    timer: timerDefaults,
    notifications: notificationsDefaults,
    goal: goalDefaults,
})
