import React from 'react';
import {connect} from 'react-redux';
import Sound from 'react-sound';

import { types } from 'redux/notifications';
import audio from 'media/notification.wav';

const Notifications = connect(
(state) => ({
	notificationsEnabled: state.notifications.notificationsEnabled,
	soundPlaying: state.notifications.soundPlaying,
}),
{
	askNotificationPersmission: () => ({
		type: types.issueNotification,
		message: 'All good, you now can recieve notifications!' }),
	notificationSoundPlayed: () => ({ type: types.notificationSoundPlayed }),
}
)(
	({
		notificationsEnabled, soundPlaying,
		askNotificationPersmission, notificationSoundPlayed
	}) =>
	<div className="app-row">
		<button disabled={notificationsEnabled}
			onClick={askNotificationPersmission}
		>
			{notificationsEnabled ? 'All good! You may recieve notifications' : 'Enable notifications (They may be disabled)' }
		</button>
		<Sound
			url={audio}
			volume={35}
			playStatus={
				soundPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
			}
			playFromPosition={0}
			onFinishedPlaying={notificationSoundPlayed}
		/>
	</div>
)

export default Notifications;
