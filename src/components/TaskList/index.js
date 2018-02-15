import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import {AppRow} from 'components/view';
import { actions } from 'redux/goal';
import Task from './Task';

const EmptyList = ({ addTask }) =>
<div className="no-tasks">
	<span>No tasks yet!</span>
	<AddTaskButton theOne/>
</div>

const AddTaskButton = connect(null, {addTask: actions.addTask})(({addTask, more, theOne}) => <button onClick={() => addTask(theOne)}>Add {more && 'another'} one!</button>)

class TaskList extends React.Component {
	render() {
		const {
			tasks,
			editing,
			addTask, startEditing, finishEditing, taskTextUpdated
		 } = this.props;
		return <AppRow>Wah! {tasks.size > 0 ?
			[List(tasks).map(([id, task]) => <Task
				key={id}
				id={id}
				editing={editing === id}
				{...task}
				handlers={{
					startEditing: (id) => startEditing(id),
					finishEditing: (id) => finishEditing(id),
					taskTextUpdated: (id, newText) => taskTextUpdated(id, newText),
				}}
			/>),
			<AddTaskButton more/>]
			: <EmptyList addTask={addTask}/>
		}</AppRow>
	}
}

export default connect(
	state => ({...state.goal}),
	actions
 )(TaskList)
