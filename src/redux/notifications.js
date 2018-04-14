export const initialState = {
    notificationsEnabled: window.Notification && window.Notification.permission === 'granted',
}

export const types = {
    issueNotification: 'IssueNotification@Front',
    notificationIssued: 'NotificationIssued@Saga',
    permissionGranted: 'PermissionGranted@Saga',
    playNotificationSound: 'NotificationSoundPlaying@Saga',
    notificationSoundPlayed: 'NotificationSoundStopped@Saga',
    registerNotificationsSet: 'NotificationsSetRegistered@Saga',
}

export default (state = initialState, action) => {
    switch(action.type){
        case types.permissionGranted:
        return {...state, notificationsEnabled: true};
        case types.playNotificationSound:
        return {...state, soundPlaying: true};
        case types.notificationSoundPlayed:
        return {...state, soundPlaying: false};
        default: return state;
    }
}
