import {call, put, takeLatest, take, race, fork, select} from 'redux-saga/effects'
import { delay } from 'redux-saga'
// import axios from 'axios'
import { types as timerTypes } from '../redux/timer';
import { types } from '../redux/sessions';
const { stopped } = timerTypes;
const { recorded } = types;


function* recordSession(action) {
	const { time } = action.timerData;
console.log(action.timerData)
	yield put({ type: recorded, seconds: time / 1e3, time: time });
}

function* rootSaga() {
	yield takeLatest(stopped, recordSession);
}
export default rootSaga;
