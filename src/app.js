// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, hashHistory, UPDATE_LOCATION } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createDevTools } from 'redux-devtools'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

// set in webpack
console.log('__PRODUCTION__', __PRODUCTION__)
console.log('__DEV__', __DEV__)

// Styles
import './app.scss';
// React Components
import {
    AddAuctionPage,
    AppPage,
    AuctionsPage,
    ConfirmWinnersPage,
    HomePage,
    LoginPage
    } from './components/index';

// Reducers
import * as reducers from './reducers/index'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

let store = {}
if ( __DEV__ ) {
    // TODO: dev tools should be conditionally handled better
    // using 'var' for normal scoping
    var DevTools = createDevTools(
      <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
      </DockMonitor>
    )

    store = createStore(
      reducer,
      DevTools.instrument()
    )
} else {
    store = createStore(
      reducer
    )
}


const history = syncHistoryWithStore(hashHistory, store)

if ( __DEV__ ) {
    // TODO: dev tools should be conditionally handled better
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Route path="/" component={AppPage}>
                <IndexRoute component={HomePage}/>
                <Route path="/auctions" component={AuctionsPage}/>
                <Route path="/auctions/confirmWinners" component={ConfirmWinnersPage}/>
                <Route path="/auctions/add" component={AddAuctionPage} />
                <Route path="/login" component={LoginPage}/>
            </Route>
          </Router>
          <DevTools />
        </div>
      </Provider>,
      document.getElementById('app-page')
    )
} else {
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Route path="/" component={AppPage}>
                <IndexRoute component={HomePage}/>
                <Route path="/auctions" component={AuctionsPage}/>
                <Route path="/auctions/confirmWinners" component={ConfirmWinnersPage}/>
                <Route path="/auctions/add" component={AddAuctionPage} />
                <Route path="/login" component={LoginPage}/>
            </Route>
          </Router>
        </div>
      </Provider>,
      document.getElementById('app-page')
    )
}