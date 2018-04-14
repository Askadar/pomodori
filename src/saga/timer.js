import {call, put, takeLatest, take, race, fork, select} from 'redux-saga/effects'
import { delay } from 'redux-saga'
// import axios from 'axios'
import { types } from '../redux/timer';
import { types as notify } from '../redux/notifications';
const { start, stop, pause, timeUpdated } = types;


// axios.defaults.headers['X-Mashape-Key'] = 'DPHo0ldO0cmshraPZ5DwFk71cDKxp1Zoeg3jsnpWGpchLsCPFY';
// unnecessary async and await, generator (saga?) handle promises for us

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
				const state = yield select(state => ({
					pomoTime: state.timer.pomoTime,
					restTime: state.timer.restTime,
					notificationsSet: state.notifications.userNotifications
				}));
				pomoTime = state.pomoTime;
				restTime = state.restTime;
				notifications = state.notificationsSet || null;
				timeElapsed = 0;
			}
			yield put({
				type: notify.registerNotificationsSet,
				notifications: notifications || [
					['50% of first', 'Half way through!', { sound: true }],
					// ['1 min in first', 'One minute in your pomodoro!'],
					['30 sec till first', 'One minute left in your pomodoro!'],
					['100% of first', 'Pomodoro finished!!', { sound: true }],
					['100% of second', 'Get back to work!11!', {
						sound: true, closeManually: true
					}],
				],
				sets: [pomoTime, restTime]
			})
			while (true) {
				let timePrev = Date.now();
				const { cancelled } = yield race({
					ticked: call(delay, Math.round(Math.random() * 8) + 16),
					cancelled: take([pause, types.stopped]),
				});
				if (cancelled)
					break;
				timeElapsed += Date.now() - timePrev;
				// yield put({type: notify.issueNotification, message: 'Pomo started!'})
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
