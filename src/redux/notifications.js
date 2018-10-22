import { List } from 'immutable'

export const initialState = {
    notificationsEnabled: window.Notification && window.Notification.permission === 'granted',
	notificationSet: List([
		['50% of first', 'Half way through!', { sound: true }],
		['30 sec till first', 'One minute left in your pomodoro!'],
		['100% of first', 'Pomodoro finished!!', { sound: true }],
		['100% of second', 'Get back to work!11!', {
			sound: true, closeManually: true
		}],
	])
}

export const types = {
    issueNotification: 'IssueNotification@Front',
	registerNotification: 'RegistereNotification@Front',
	removeNotification: 'RemoveNotification@Front',
	editNotification: 'EditNotification@Front',
	updateNotificationOption: 'UpdateNotificationOption@Front',
    notificationIssued: 'NotificationIssued@Saga',
    permissionGranted: 'PermissionGranted@Saga',
    playNotificationSound: 'NotificationSoundPlaying@Saga',
    notificationSoundPlayed: 'NotificationSoundStopped@Saga',
	notificationSetUpdated: 'NotificationSetUpdated@Saga'
}

export default (state = initialState, action) => {
    switch(action.type){
        case types.permissionGranted:
        return {...state, notificationsEnabled: true};
        case types.playNotificationSound:
        return {...state, soundPlaying: true};
        case types.notificationSoundPlayed:
        return {...state, soundPlaying: false};
        case types.notificationSetUpdated:
        return {...state, notificationSet: action.newSet};
        default: return state;
    }
}
