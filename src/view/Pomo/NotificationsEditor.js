import React, { Component } from 'react';
import { connect } from 'react-redux';

import { types } from 'redux/notifications'

import './notificationsEditor.styl'

class NotificationsEditor extends Component {
	initialState = {
		time: ['x min in pomo', '50% of second'][Math.floor(Math.random()*2)],
		message: 'Get back to work!1'
	}
	constructor(p){
		super(p);
		this.state = this.initialState;
	}
	render(){
		const {
			registerNotification, removeNotification, editNotification,
			notificationSet,
		} = this.props;
		const {
			time, message
		} = this.state;
		return (
			<div className="app-row notifications-editor">
				{
					notificationSet.map(
						([time, message, options = {}], i) =>
						<div key={i} className="input-group">
							<label>
								Say "<input type="text" value={message} onChange={
									e => editNotification(i, 1, e.target.value)
								}/>"
							</label>
							<label>
								at <input type="text" value={time} onChange={
									e => editNotification(i, 0, e.target.value)
								}/>
							</label>
							<div className="btn-group">
								<button onClick={
									e => editNotification(i, 2, {...options, sound: !options.sound})
								}
									className={
									`zn-btn ${options && options.sound ? ' zn-btn--primary' : ''}`
								}>
									<i className={
										options && options.sound ? 'icon-volume-high' : 'icon-volume-off'
									} />
								</button>
							</div>
							<div className="btn-group">
								<button className="zn-btn zn-btn--primary">
									<i className="icon-check"/>
								</button>
								<button className="zn-btn zn-btn--destructive" onDoubleClick={_ => removeNotification(i)}>
									<i className="icon-cancel-2" />
								</button>
							</div>
						</div>
					)
				}
				<div className="input-group" style={{marginTop: 8}}>
					<label>
						Say "<input type="text" value={message} onChange={
							e => this.setState({message: e.target.value})
						}/>"
					</label>
					<label>
						at <input type="text" value={time} onChange={
							e => this.setState({time: e.target.value})
						}/>
					</label>
					<div className="btn-group">
						<button className="zn-btn zn-btn--primary" onClick={
							_ => {
								this.setState(this.initialState);
								registerNotification([time, message])
							}
						}>
							<i className="icon-check"/>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({ notificationSet: state.notifications.notificationSet }),
	{
		registerNotification: (notification) => ({
			 type: types.registerNotification, notification
		 }),
		removeNotification: (notificationId) => ({
			 type: types.removeNotification, notificationId
		 }),
		editNotification: (notificationId, key, value) => ({
			 type: types.editNotification, notificationId, key, value
		 }),
		updateNotificationOption: (notificationId, optionKey, optionValue) => ({
			type: types.updateNotificationOption, notificationId, optionKey, optionValue
		})
	}
)(NotificationsEditor);
