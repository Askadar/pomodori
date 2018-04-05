import React from 'react';
import { connect } from 'react-redux';

import {formatTime} from './localUtils.js'

// connected to redux to layoff full app redraw each time tick
const TimeView = connect(
state => ({time: state.timer.time})
)(
	({time}) =>
	<div className="app-row">
		<div className="time">
			<span className="time-text">{formatTime(time) || 'Nope!'}</span>
		</div>
	</div>
)

export default TimeView;
