import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import data from './reducers/data';
import ui from './reducers/ui';
import App from './components/App';
import '../sass/main.sass';

const middleware = [
    createLogger({
        collapsed: true,
        level: 'info',
        predicate: (getState, action) => typeof action.type !== 'undefined',
    }),
    thunk,
];

const store = applyMiddleware(...middleware)(createStore)(combineReducers({ data, ui }));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
