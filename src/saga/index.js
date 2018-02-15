import { fork, race, take, select, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import timerSaga from './timer';
import notifications from './notifications';
import goal from './goal';
import {types} from '../redux/timer';
import {saveLocalStorage} from '../utils';

function* autoSave() {
    while(true){
        yield race({
            action: take([types.settingsUpdated]),
            timeout: call(delay, 5*1000),
        })
        yield delay(25); //allow redux to push new state in case of settingsUpdate
        const state = yield select(state => state);
        saveLocalStorage(state);
    }
}

export default function* () {
    yield fork(timerSaga);
    yield fork(notifications);
    yield fork(goal);
    yield fork(autoSave);
};
