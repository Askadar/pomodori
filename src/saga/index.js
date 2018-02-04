import {call, all, put, takeEvery, takeLatest, take, race, fork} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import axios from 'axios'
import { types } from '../redux';
const { start, stop, pause, timeUpdated } = types;


axios.defaults.headers['X-Mashape-Key'] = 'DPHo0ldO0cmshraPZ5DwFk71cDKxp1Zoeg3jsnpWGpchLsCPFY';
// unnecessary async and await, generator (saga?) handle promises for us

function* stopTimer() {
	// console.log('stopping');
	yield delay(5);
	yield put({type: timeUpdated, elapsed: 0});
	yield put({type: types.stopped, finished: true});
}

function* ticking(action) {
	try {
		let timeElapsed, pomoTime, restTime;
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
				const { ticked, cancelled } = yield race({
					ticked: call(delay, Math.round(Math.random() * 8) + 8),
					cancelled: race({
						paused: take(pause),
						stopped: take(types.stopped)
					}),
				});
				if (cancelled) {
					if (cancelled.stopped && !cancelled.stopped.finished)
						yield fork(stopTimer);
					break;
				}
				timeElapsed += Date.now() - timePrev;
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
		yield put({type: types.settingsUpdated, key, value});
		yield call(stopTimer);
	});
	yield fork(ticking);
	// yield takeLatest(textUpdate, typing)
	// yield takeLatest(textUpdate, spellcheckQuote); //Futura references
}
export default rootSaga;
