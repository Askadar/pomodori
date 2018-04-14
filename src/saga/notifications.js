import { fork, call, take, takeLatest, takeEvery, put, race } from 'redux-saga/effects'
import {types} from '../redux/notifications'
import {types as timer} from '../redux/timer'

const askPermission = () =>
window.Notification.requestPermission()
.then(perm => {
    if (perm === 'granted')
        return true;
    else throw new Error('User denied')
})

function* permissionGranter() {
    if (!("Notification" in window))
        throw new Error('Not supported');
    try {
        if (window.Notification.permission === 'granted')
            yield put({type: types.permissionGranted});
        else if(window.Notification.permission !== "denied"){
            yield call(askPermission);
            yield put({type: types.permissionGranted})
        }
        else
            throw new Error('User denied');
    } catch (e) {
        console.warn(e);
    }
}

const hoomanToIndex = {
	'first': 0,
	'second': 1,
}
const hoomanTimenamesToMultipliers = {
	sec: 1,
	min: 60,
	hrs: 3600
}
const hoomanNegativeTimeoffsets = ['till']
// const parseHoomanTime = (hoomanTime) => roboTime
const parseHoomanTime = (hoomanTime, timeSets) => {
	let parts = hoomanTime.split(' '); // They do like their delimiting spaces
	const index = hoomanToIndex[parts.pop()]; // And put indexes last, strange hoomans
	let timeValue = parts.shift();
	const isPercentaged = timeValue.slice(-1) === '%';
	let timeMultiplier = hoomanTimenamesToMultipliers[parts.shift()];
	timeValue = isPercentaged ? timeSets[index] * timeValue.slice(0, -1) * 0.01 : +timeValue * timeMultiplier;
	let isOffsetNegative = hoomanNegativeTimeoffsets.includes(parts.shift());
	let timesetOffset = timeSets
		.slice(0, index) // grab only sets before current
		.reduce((total, setAmount) => total+setAmount, 0);
	if (index > 0)
		timeValue += timesetOffset
	if (isOffsetNegative)
		timeValue = Math.max(timeSets[index] + timesetOffset - timeValue, 0);
	return Math.min(timeValue, timeSets[index] + timesetOffset);
}
// That's THE place for TDD, but meh
const parse = (nArr, timeSets) => {
	const notifications = nArr.map(([hoomanTime, message, options]) => ({
		message, time: parseHoomanTime(hoomanTime, timeSets) * 1e3, options,
	}))
	return notifications;
}

function* notificationWatcher() {
    try {
        // yield console.log('watching.. watching');
        while(true){
			const { notifications, sets } = yield take(types.registerNotificationsSet);
			const executableNotifications = parse(notifications, sets);
			const orderedExNotifications = executableNotifications.sort(({time: timeA}, {time: timeB}) => timeA-timeB)
			window.localStorage.__zn && console.log(orderedExNotifications);
			while (true) {
				const { timerCancelled, newTime } = yield race({
					timerCancelled: take(timer.stopped),
					newTime: take(timer.timeUpdated)
				})
				if (timerCancelled)
					break;
				if (orderedExNotifications[0].time <= newTime.elapsed){
					const { time, ...notificationToExecute } = orderedExNotifications.shift()
					yield put({
						type: types.issueNotification,
						message: notificationToExecute.message,
						...notificationToExecute.options
					})
					if (orderedExNotifications.length === 0)
						break;
				}
			}
        }
    } catch (e) {
        console.warn(e);
    }
}

function* rootSaga() {
    yield fork(notificationWatcher);
    yield takeLatest(types.issueNotification, function*(action) {
		// Verify that we have permission to issue notification
        yield call(permissionGranter); // throws
        const { type, message, ...rest } = action;
        yield put({
            type: types.notificationIssued,
            message: message || 'Testing',
            ...rest
        })
    });
	yield takeEvery(types.notificationIssued, function *(action){
		const {
			type, message,
			sound,
			closeManually, notificationTimeout = 45e2,
			...rest
		} = action;
		const defaults = {
			requireInteraction: false,
		};
		let notification = new window.Notification(message, {
			...defaults, ...rest
		});
		notification.onclick = (e) => (
			e.preventDefault() ||
			e.target.close()
		);
		window.localStorage.__zn && console.log(notification);
		if (sound)
			yield put({type: types.playNotificationSound, sound});
		if (!closeManually)
			setTimeout(() => notification.close(), notificationTimeout);
	})
}


export default rootSaga;
