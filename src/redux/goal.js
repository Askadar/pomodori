import {OrderedMap} from 'immutable';

export const initialState = {
    tasks: OrderedMap(),
    editing: null,
};

export const types = {
    'addTask': 'AddTask@Front',
    'taskTextUpdated': 'TaskTextUpdated@Front',
    'startEditing': 'StartEditing@Front',
    'finishEditing': 'FinishEditing@Front',
};

export const actions = {
    addTask: (theOne) => ({type: types.addTask, theOne}),
    taskTextUpdated: (id, newText) => ({type: types.taskTextUpdated, id, newText}),
    startEditing: (id) => ({type: types.startEditing, id}),
    finishEditing: (id) => ({type: types.finishEditing, id}),
};

const getRandom = (state) => state.tasks.size + Math.round(Math.random()*875);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.startEditing:
            return {...state, editing: action.id}
        case types.finishEditing:
            return {...state, editing: null}
        case types.taskTextUpdated:
            return {...state, tasks: state.tasks.set(action.id, {...state.tasks.get(action.id), text: action.newText})};
        case types.addTask:
            return {...state, tasks: state.tasks.set(getRandom(state), {text: 'I wanna...', theOne: action.theOne})}
        default:
            return state
    }
}
