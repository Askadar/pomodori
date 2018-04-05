import React from 'react';

import {formatTime} from './localUtils.js'

const AdjustableInput = ({value, handler, show, focused, children}) =>
<div className={`adjustableInput${focused ? ' focused' : ''}`}>
	<span className="adjustableInput-inner">{children}</span>
	{
		focused ?
		<label>
			<input type="number" onChange={handler} value={value/60}/> min.
		</label> :
		<span className="time-display">
			{formatTime(show)}
		</span>
	}
</div>

export default AdjustableInput;
