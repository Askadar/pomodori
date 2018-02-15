import React, {Component} from 'react';

import { connect } from 'react-redux';
import moment from 'moment';

import { types } from 'redux/timer';
import { types as nTypes } from 'redux/notifications';
import Clock from 'components/Clock';

// import appIcon from './appIcon.svg';
// import './App.css';
import './App.styl';

const ft = 'mm:ss.SSS';

const AdjustableInput = ({value, handler, show, focused, children}) =>
<div className={`adjustableInput${focused ? ' focused' : ''}`}>
	<span className="adjustableInput-inner">{children}</span>
	{focused ? <label><input type="number" onChange={handler} value={value/60}/> min.</label> :
	<span className="time-display">{moment(show).format(ft)}</span> }
</div>

const TimeView = connect(state => ({time: state.timer.time}))(({time}) =>
<div className="app-row">
	<Clock minutes={time/6e4} seconds={time/1e3} ms={time}>
		<span className="time-text">{moment(time).format(ft) || 'Nope!'}</span>
	</Clock>
</div>)

const Clocks = connect(
	({timer: {
		pomoTime, pomoLeft, restTime, restLeft
	}}) => ({
		pomoTime, pomoLeft, restTime, restLeft
	}),
	dispatch => ({updateTime: (settings) => dispatch({type: types.updateSettings, ...settings})})
)(({pomoTime, pomoLeft, restTime, restLeft,  updateTime, editing, toggleEditing}) =>
<div className="app-row">
	<button onClick={toggleEditing}>Edit clocks</button>
	<AdjustableInput
		focused={editing}
		value={pomoTime}
		show={pomoLeft}
		handler={(evt) => updateTime({key: 'pomoTime', value: +evt.target.value * 60})}>
		Pomo:
	</AdjustableInput>
	<AdjustableInput
		focused={editing}
		value={restTime}
		show={restLeft}
		handler={(evt) => updateTime({key: 'restTime', value: +evt.target.value * 60})}>
		Rest:
	</AdjustableInput>
</div>)

class App extends Component {
	render() {
		const {
			timer: {
				pomoTime,
				restTime,
				paused,
				ticking,
			},
			notifications: {
				notificationsEnabled
			},
			start, stop, pause, resume,

			askNotificationPersmission,
        } = this.props;
		return (<div className="app">
			<link href="https://fonts.googleapis.com/css?family=Montserrat:200,400,500" rel="stylesheet"/>
			<header>
				<h1>Keep on going! Track your goals and don't forget about important stuff.</h1>
				<h4 className="right">InDev edition! V:  {process.env.REACT_APP_VERSION}</h4>
			</header>
			<div className="app-row">
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
	askNotificationPersmission: () => dispatch({type: nTypes.requestPermission})
}))(App);
