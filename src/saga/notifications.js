import { fork, call, take, takeLatest, put } from 'redux-saga/effects'
import {types} from '../redux/notifications'

function* permissionGranter(message = `You're set up!`) {
    if (!("Notification" in window))
        throw new Error('Not supported');
    // console.log(message);
    try {
        if (window.Notification.permission === 'granted')
            yield new Notification(message);
        else if(window.Notification.permission !== "denied")
            yield window.Notification.requestPermission().then(perm => {
                if (perm === 'granted')
                    return new Notification(message);
                else throw new Error('User denied')
            })
        else throw new Error('User denied');
    } catch (e) {
        console.warn(e);
    }
}

function* notificationWatcher() {
    try {
        yield call(permissionGranter);
        yield console.log('watching.. watching');
        while(true){
            const {type, message, ...rest} = yield take(types.notificationIssued);

            new window.Notification(message, rest);
        }
    } catch (e) {
        console.warn(e);
    }
}

function* rootSaga() {
    yield takeLatest(types.issueNotification, function*() {
        console.log('ass');
        yield put({type: types.notificationIssued, message: `Testing`})
    })
    yield fork(notificationWatcher);
}

export default rootSaga;
