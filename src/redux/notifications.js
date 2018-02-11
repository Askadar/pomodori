export const initialState = {
    notificationsEnabled: window.Notification && window.Notification.permission === 'granted'
}

export const types = {
    issueNotification: 'IssueNotification@Front',
    requestPermission: 'RequestPermission@Front',
    notificationIssued: 'NotificationIssued@Saga',
    permissionGranted: 'PermissionGranted@Saga',
}

export default (state = initialState, action) => {
    switch(action.type){
        case types.permissionGranted:
        return {...state, notificationsEnabled: true};
        default: return state;
    }
}
