import React from 'react';
import {connect} from 'react-redux';

import { types } from 'redux/sessions';
import { toFormattedTime } from 'utils';

const Sessions = connect(
(state) => ({
	list: state.sessions.list,
}),
{
	clearElapsed: () => ({
		 type: types.clearElapsed
	 })
}
)(
	({
		clearElapsed,
		list
	}) =>
	<div className="app-row">
		{
			list.size > 0 &&
			<p>
				Elapsed pomos <button class="zn-btn zn-btn--destructive" onClick={clearElapsed}>
					<i className="icon-cancel-2" /> clear
				</button>
			</p>
		}
		{
			list.map((entry, index) =>
				<div key="index">{toFormattedTime(entry.time)}</div>
			)
		}
	</div>
)

export default Sessions;
