import { fork, call, take, takeLatest, put } from 'redux-saga/effects'
import {types} from '../redux/notifications'

const askPermission = () => window.Notification.requestPermission().then(perm => {
    if (perm === 'granted')
        return true;
    else throw new Error('User denied')
})

function* permissionGranter(action) {
    if (!("Notification" in window))
        throw new Error('Not supported');
    // console.log(message);
    try {
        if (window.Notification.permission === 'granted')
            yield put({type: types.permissionGranted});
        else if(window.Notification.permission !== "denied" || (window.Notification.permission === "denied" && action.type === types.requestPermission)){
            yield call(askPermission);
            yield put({type: types.permissionGranted})
        }
        else throw new Error('User denied');
    } catch (e) {
        console.warn(e);
    }
}

function* notificationWatcher() {
    try {
        // yield call(permissionGranter);
        yield console.log('watching.. watching');
        yield take(types.permissionGranted);
        while(true){
            const {type, message, ...rest} = yield take(types.notificationIssued);
            const defaults = {
                requireInteraction: false,
            };
            new window.Notification(message, {...defaults, ...rest});
        }
    } catch (e) {
        console.warn(e);
    }
}

function* rootSaga() {
    yield takeLatest(types.issueNotification, function*(action) {
        yield call(permissionGranter, action);
        const {type, message, ...rest} = action;
        yield put({
            type: types.notificationIssued,
            message: message || 'Testing',
            ...rest
        })
    })
    yield takeLatest(types.requestPermission, function* (action) {
        yield call(permissionGranter, action);
        yield put({
            type: types.notificationIssued,
            message: `Notifications enabled! Hooray!`})
    })
    yield fork(notificationWatcher);
}

export default rootSaga;
