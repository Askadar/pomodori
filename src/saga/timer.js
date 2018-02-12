import {call, put, takeLatest, take, race, fork} from 'redux-saga/effects'
import { delay } from 'redux-saga'
// import axios from 'axios'
import { types } from '../redux/timer';
import { types as notify } from '../redux/notifications';
const { start, stop, pause, timeUpdated } = types;

function* stopTimer() {
	// console.log('stopping');
	yield delay(5);
	yield put({type: timeUpdated, elapsed: 0});
	yield put({type: types.stopped, finished: true});
}

function* ticking(action) {
	try {
		let timeElapsed, pomoTime, restTime, notifications = {};
		while (true){
			const { started } = yield race({
				started: take(start),
				unpaused: take(types.resume),
			});
			if (started) {
				pomoTime = started.pomoTime;
				restTime = started.restTime;
				timeElapsed = 0;
			}
			while (true) {
				let timePrev = Date.now();
				const { cancelled } = yield race({
					ticked: call(delay, Math.round(Math.random() * 8) + 16),
					cancelled: take([pause, types.stopped]),
				});
				if (cancelled)
					break;
				timeElapsed += Date.now() - timePrev;
				if (!notifications.firstPomo && timeElapsed > pomoTime  * 5e2){
					notifications.firstPomo = true;
					yield put({type: notify.issueNotification, message: 'Half way through your pomo!'})
				}
				if (!notifications.tfTillPomo && timeElapsed > (pomoTime - 25)  * 1e3){
					notifications.tfTillPomo = true;
					yield put({type: notify.issueNotification, message: '25 second to the end'})
				}
				if (!notifications.lastPomo && timeElapsed >= pomoTime * 1e3){
					notifications.lastPomo = true;
					yield put({type: notify.issueNotification, message: 'You\'ve did it!'})
				}
				if (!notifications.firstRest && timeElapsed > (pomoTime + restTime - 25) * 1e3){
					notifications.firstRest = true;
					yield put({type: notify.issueNotification, message: 'Rest almost done, get ready!'});
				}
				if (timeElapsed > (pomoTime + restTime) * 1000)
					yield fork(stopTimer);
				yield put({ type: timeUpdated, elapsed: timeElapsed });
			}
		}
	} catch (e) {
		yield put({type: "Welp, we did it"});
	}
}


function* rootSaga() {
	yield takeLatest(stop, stopTimer);
	yield takeLatest(types.updateSettings, function*(action) {
		const {key, value} = action
		const times = ['pomoTime', 'restTime'];
		if (times.includes(key))
			yield put({type: types.settingsUpdated, key, value: Math.max(+value, 0)});
		else
			yield put({type: types.settingsUpdated, key, value});
		yield call(stopTimer);
	});
	yield fork(ticking);
	// yield takeLatest(textUpdate, typing)
	// yield takeLatest(textUpdate, spellcheckQuote); //Futura references
}
export default rootSaga;
