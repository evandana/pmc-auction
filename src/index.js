/** React **/
import React from 'react';
import ReactDOM from 'react-dom';

/** REDUX **/
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from 'reducers';
import { reducer as form } from 'redux-form';
import sagas from 'sagas';

/** Routing **/
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware, } from 'react-router-redux';

/** App Configuration **/
import registerServiceWorker from 'registerServiceWorker';
import App from 'App';

/** Redux Setup **/
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = [
    sagaMiddleware,
    routerMiddleware(history),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        ...reducers,
        form,
        router: routerReducer,
    }),
    composeEnhancers(applyMiddleware(...middleware)),
);
window._UI_STORE_ = store;

sagaMiddleware.run(sagas);

const appProps = {
    history,
    store,
};

/** Launch the App **/
ReactDOM.render(<App {...appProps}  />, document.getElementById('root'));
registerServiceWorker();
