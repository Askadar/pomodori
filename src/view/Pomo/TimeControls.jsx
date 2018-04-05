import React from 'react';
import {connect} from 'react-redux';

import { types } from 'redux/timer';

const TimeControls = connect(
state => ({ ...state.timer }),
{
	start: () => ({type: types.start}),
	stop: () => ({type: types.stop}),
	pause: () => ({type: types.pause}),
	resume: () => ({type: types.resume}),
}
)(
	({
		pomoTime, restTime, paused, ticking,
		start, stop, pause, resume,
	}) =>
	<div className="app-row">
		<button onClick={() => ticking ? stop() : start({pomoTime, restTime})}>
			{ticking ? 'Stop' : 'Start'}
		</button>
		<button onClick={() => paused ? resume() : pause()}>
			{paused ? 'Resume' : 'Pause'}
		</button>
	</div>
);

export default TimeControls;
