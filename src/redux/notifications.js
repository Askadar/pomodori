export const initialState = {

}

export const types = {
    issueNotification: 'IssueNotification@Front',
    requestPermission: 'RequestPermission@Front',
    notificationIssued: 'NotificationIssued@Saga',
    permissionGranted: 'PermissionGranted@Saga',
}

export default (state = initialState, action) => {
    return state;
}
