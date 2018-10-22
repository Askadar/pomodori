import { fork, race, take, select, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import timerSaga from './timer';
import {types} from '../redux/timer';
import {types as sTypes} from '../redux/sessions';
import notifications from './notifications';
import sessions from './sessions';
import {saveLocalStorage} from '../utils';

function* autoSave() {
    while(true){
        yield race({
            action: take([
                types.settingsUpdated,
                sTypes.recorded, sTypes.clearElapsed,
            ]),
            timeout: call(delay, 5*1000),
        })
        yield delay(25); //allow redux to push new state
        const state = yield select(state => state);
        saveLocalStorage(state);
    }
}

export default function* () {
    yield fork(timerSaga);
    yield fork(notifications);
    yield fork(autoSave);
    yield fork(sessions);
};
