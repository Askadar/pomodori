import { fork } from 'redux-saga/effects';

import timerSaga from './timer';
import notifications from './notifications';

export default function* () {
    yield fork(timerSaga);
    yield fork(notifications);
};
