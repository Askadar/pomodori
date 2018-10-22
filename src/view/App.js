import React, {Component} from 'react';

import  { Header, TimeView, Clocks, Notifications, NotificationsEditor, TimeControls, Sessions } from 'view/Pomo';
// import  { DemoGrid } from 'ZN-Design/SmartGrid';

// import appIcon from './appIcon.svg';
// import './App.css';
import './App.styl';
import 'media/css/fontello.css';


class App extends Component {
	state = {
		editing: false
	}
	render() {
		const { editing } = this.state;
		return (
			<div className="app">
				<link
					href="https://fonts.googleapis.com/css?family=Montserrat:200,400,500"
					rel="stylesheet"
				/>
				<Header/>
				<TimeView/>
				<Clocks
					editing={editing}
					toggleEditing={() => this.setState({editing: !editing})}
				/>
				<TimeControls/>
				<Notifications/>
				<Sessions/>
				<NotificationsEditor/>
			</div>
		);
	}
}

export default App;
