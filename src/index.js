import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from 'view/Root';
import registerServiceWorker from './registerServiceWorker';

import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import {reducers, defaultedState, DevTool} from './redux'
import mySagas from './saga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
// let composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware = process.env.NODE_ENV === 'production'
	? compose(applyMiddleware(sagaMiddleware))
	: compose(applyMiddleware(sagaMiddleware), DevTool.instrument());

const store = createStore(reducers, defaultedState, middleware)

// then run the saga
sagaMiddleware.run(mySagas)

// render the application

ReactDOM.render(<Provider store={store}><Root/></Provider>, document.getElementById('root'));
registerServiceWorker();
