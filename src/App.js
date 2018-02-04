import React, {Component} from 'react';

import { connect } from 'react-redux';
import { types } from './redux/timer';
import { types as nTypes } from './redux/notifications';
import moment from 'moment';

import appIcon from './appIcon.svg';
import './App.css';

const ft = 'mm:ss.SSS';

const AdjustableInput = ({value, handler, show, focused, onFocus}) =>
<div className="time" onFocus={onFocus}>
	{focused ? <label><input type="number" onChange={handler} value={value}/> seconds</label> :
	<span className="time-display">{moment(show).format(ft)}</span> }
</div>

class App extends Component {
	state = {
		editing: false
	}
	render() {
		const {
			timer: {
	            time, /*convertedTime,*/ pomoTime, restTime, pomoLeft, restLeft,
				paused, ticking,
			},

			start, stop, pause, resume, updateTime,
			
			issueNotification,
        } = this.props;
		const { editing } = this.state;
		return (<div className="App">
			<header className="App-header">
				<img src={appIcon} className="App-appIcon" alt="appIcon"/>
				<h1 className="App-title">Pomodori</h1>
			</header>
			<div>
				<button onClick={() => this.setState({editing: !editing})}>Edit clocks</button>
			</div>
			<div className="App-intro">
                Pomo: <AdjustableInput
					focused={editing}
					value={pomoTime}
					show={pomoLeft}
					handler={(evt) => updateTime({key: 'pomoTime', value: +evt.target.value})}/>
            </div>
			<div className="App-intro">
                Rest: <AdjustableInput
					focused={editing}
					value={restTime}
					show={restLeft}
					handler={(evt) => updateTime({key: 'restTime', value: +evt.target.value})}/>
            </div>
			<p className="App-intro">
                {moment(time).format(ft) || 'Nope!'}
            </p>
			<div>
				<button onClick={() => ticking ? stop() : start({pomoTime, restTime})}>
					{ticking ? 'Stop' : 'Start'}
				</button>
				<button onClick={() => paused ? resume() : pause()}>
					{paused ? 'Resume' : 'Pause'}
				</button>
				<button onClick={() => issueNotification()}>
					Notify yourself
				</button>
			</div>
		</div>);
	}
}

export default connect(state => ({
	...state
}), (dispatch) => ({
	start: (state) => dispatch({type: types.start, ...state}),
	stop: () => dispatch({type: types.stop}),
	pause: () => dispatch({type: types.pause}),
	resume: () => dispatch({type: types.resume}),
	updateTime: (settings) => dispatch({type: types.updateSettings, ...settings}),

	issueNotification: () => dispatch({type: nTypes.issueNotification})
}))(App);
