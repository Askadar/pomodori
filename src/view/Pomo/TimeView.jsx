import React from 'react';
import { connect } from 'react-redux';

import { formatTime } from './localUtils.js'

// connected to redux to layoff full app redraw each time tick
const TimeView = connect(
state => ({time: state.timer.time})
)(
	({time}) =>
	<div className="app-row">
		<div className="time">
			<span className="time-text">{formatTime(time) || 'Nope!'}</span>
		</div>
		{/* <div className="time-arc--wrap" style={{width: 96, height: 96}}>
			<svg viewBox="0 0 200 200">
				<circle cx="100" cy="100" r="95" stroke="#ab00ff" strokeWidth="3" fill="none" strokeDasharray="600" strokeDashoffset={time/1000*600}/>
			</svg>
		</div> */}
	</div>
)

export default TimeView;
