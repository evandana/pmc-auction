// if (!__DEV__) {
//   module.exports = require('./configureStore.production');
// } else {
//   module.exports = require('./configureStore.development');
// }
import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import DevTools from '../components/containers/devTools/DevTools'
import hashHistory from '../history'

const historyMiddleware = routerMiddleware(hashHistory);


const __DEV__ = !!(process.env.NODE_ENV === 'dev');

const finalCreateStore = __DEV__ ?
    compose(
      applyMiddleware(thunk),
      applyMiddleware(historyMiddleware),
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/
        )
      )
    )(createStore)
    :
    compose(
      applyMiddleware(thunk),
      applyMiddleware(historyMiddleware),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/
        )
      )
    )(createStore)
;

export default function configureStore(initialState) {



  // const devTools = initialState.devTools
  // console.log('devTools.instrument', "\n\n", devTools.instrument, "\n\n", devTools.instrument())

  // const middleware = __DEV__ ? compose( thunkMiddleware, createLogger(), DevTools.instrument() )(createStore) : compose( thunkMiddleware, createLogger() )(createStore)


  // const middleware = __DEV__ ? [thunkMiddleware, createLogger(), DevTools.instrument() ] : [thunkMiddleware, createLogger()];

  const store = finalCreateStore(rootReducer, initialState)

  // store = createStore(
  //   rootReducer,
  //   initialState,
  //   applyMiddleware(...middleware)
  // )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}