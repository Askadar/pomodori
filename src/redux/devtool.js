import React from 'react';

import {createDevTools} from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
<DockMonitor
	toggleVisibilityKey='ctrl-h'
	changePositionKey='ctrl-q'
	defaultIsVisible={true}
	defaultPosition='left'
	fluid
>
	<FilterMonitor blacklist={['TimerUpdated@Saga']}>
		<LogMonitor theme='tomorrow'/>
	</FilterMonitor>
</DockMonitor>
);

export default DevTools;
