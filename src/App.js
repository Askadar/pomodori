import React, {Component} from 'react';

import {connect} from 'react-redux';
import {types} from './redux';
import { minutesToFormattedTime } from './utils';
import moment from 'moment';

import logo from './logo.svg';
import './App.css';

const ft = 'mm:ss.SSS';

class App extends Component {
	render() {
		const {
            time, convertedTime, pomoTime, restTime, pomoLeft, restLeft,
            start, stop, pause,
        } = this.props;
		return (<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<h1 className="App-title">Pomodori</h1>
			</header>
			<p className="App-intro">
                Pomo: {moment(pomoLeft).format(ft)}
            </p>
			<p className="App-intro">
                Rest: {moment((restTime + pomoTime)*1e3  - time).format(ft)}
            </p>
			<p className="App-intro">
                {convertedTime || 'Nope!'}
            </p>
			<div>
				<button onClick={() => start({pomoTime, restTime})}>Start</button>
				<button onClick={() => pause()}>Pause</button>
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
}))(App);
