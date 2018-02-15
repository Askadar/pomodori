import React from 'react';
import './Task.styl';

const Task = ({
	text, id, theOne,
	handlers,
	editing, moving, dragging
 }) =>
<div className={`task ${editing && 'editing'}`} onDoubleClick={() => handlers.startEditing(id)}>
	<span className={`task-text ${theOne && 'THE-task'}`}>{text}</span>
	<div className="task-editing editing">
		<input type="text" value={text} onChange={(evt) => handlers.taskTextUpdated(id, evt.target.value)}/>
		<button onClick={() => handlers.finishEditing(id)}>Done!</button>
	</div>
</div>

export default Task;
