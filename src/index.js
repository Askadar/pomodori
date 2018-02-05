import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './view/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import {reducers, defaultedState} from './redux'
import mySagas from './saga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
let composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  defaultedState,
  composer(applyMiddleware(
      sagaMiddleware
  )),
)

// then run the saga
sagaMiddleware.run(mySagas)

// render the application

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
