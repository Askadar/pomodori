import React from 'react';
import {connect} from 'react-redux';

import { types } from 'redux/notifications';

const Notifications = connect(
(state) => ({ notificationsEnabled: state.notifications.notificationsEnabled }),
{ askNotificationPersmission: () => ({ type: types.requestPermission }) }
)(
	({notificationsEnabled, askNotificationPersmission}) =>
	<div className="app-row">
		<button disabled={notificationsEnabled}
			onClick={() => askNotificationPersmission()}
		>
			{notificationsEnabled ? 'All good! You may recieve notifications' : 'Enable notifications (They may be disabled)' }
		</button>
	</div>
)

export default Notifications;
