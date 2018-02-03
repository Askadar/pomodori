import {call, all, put, takeLatest, take, race, fork} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import axios from 'axios'
import { types } from '../redux';
const { start, stop, pause, timeUpdated } = types;


axios.defaults.headers['X-Mashape-Key'] = 'DPHo0ldO0cmshraPZ5DwFk71cDKxp1Zoeg3jsnpWGpchLsCPFY';
// unnecessary async and await, generator (saga?) handle promises for us

function* stopTimer() {
	console.log('stopping');
	yield delay(5);
	console.log('delayed');
	yield put({type: stop, finished: true});
}

function* ticking(action) {
	try {
		let timeElapsed, pomoTime, restTime;
		while (true){
			const { started } = yield race({
				started: take(start),
				unpaused: take(pause),
			});
			if (started) {
				pomoTime = started.pomoTime;
				restTime = started.restTime;
				timeElapsed = 0;
				console.log(started);
			}
			while (true) {
				let timePrev = Date.now();
				const { ticked, cancelled } = yield race({
					ticked: call(delay, Math.round(Math.random() * 8) + 8),
					cancelled: race({
						paused: take(pause),
						stopped: take([stop, start])
					}),
				});
				if (cancelled) {
					console.log(cancelled);
					if (cancelled.stopped)
						yield put({ type: timeUpdated, elapsed: timeElapsed = 0 });
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
	yield ticking();
	// yield takeLatest(textUpdate, typing)
	// yield takeLatest(textUpdate, spellcheckQuote); //Futura references
}
export default rootSaga;
