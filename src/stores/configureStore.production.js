import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import history from '../history';
import rootReducer from '../reducers';

const historyMiddleware = routerMiddleware(history);

const finalCreateStore = compose(
	applyMiddleware(thunk),
	applyMiddleware(historyMiddleware)
)(createStore);

export default function configureStore(initialState) {
	return finalCreateStore(rootReducer, initialState);
}
