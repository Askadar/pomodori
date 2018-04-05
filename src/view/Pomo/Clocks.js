import React from 'react';
import { connect } from 'react-redux';

import { types } from 'redux/timer';
import AdjustableInput from './AdjustableInput';

const Clocks = connect(
({ timer: { pomoTime, pomoLeft, restTime, restLeft } }) => ({
	pomoTime, pomoLeft, restTime, restLeft
}),
{ updateTime: (settings) => ({ type: types.updateSettings, ...settings }) }
)(
	({
		pomoTime, pomoLeft, restTime,
		restLeft,  updateTime,
		editing, toggleEditing, editButtonRef
	}) =>
	<div className="app-row">
		<button onClick={toggleEditing} ref={editButtonRef}>Edit clocks</button>
		<AdjustableInput
			focused={editing}
			value={pomoTime}
			show={pomoLeft}
			handler={(evt) => updateTime({key: 'pomoTime', value: +evt.target.value * 60})}
		>
			Pomo:
		</AdjustableInput>
		<AdjustableInput
			focused={editing}
			value={restTime}
			show={restLeft}
			handler={(evt) => updateTime({key: 'restTime', value: +evt.target.value * 60})}
		>
			Rest:
		</AdjustableInput>
	</div>
);

export default Clocks;
