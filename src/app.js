// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import { Router, Route, IndexRoute, UPDATE_LOCATION } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

// set in webpack
console.log('__PRODUCTION__', __PRODUCTION__)
console.log('__DEV__', __DEV__)
console.log('JSON.stringify(process.env.NODE_ENV)', JSON.stringify(process.env.NODE_ENV))

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
// Actions
import { LoginActions } from './actions/LoginActions'
import { fetchAuctions } from './actions/AuctionActions'
// Store
import configureStore from './stores/configureStore'
// History
import hashHistory from './history'
// DevTools
import DevTools from './components/containers/devTools/DevTools'

const store = configureStore()
const routerHistory = syncHistoryWithStore(hashHistory, store)
// force auth
// requestCheckAuth();
LoginActions.authCheck();
hashHistory.listen(location => LoginActions.requestRouteChange(location, store))

render(
  <Provider store={store}>
    <div>
      <Router history={hashHistory}>
        <Route path="/" component={AppPage}>
            <IndexRoute component={HomePage}/>
            <Route path="/auctions" component={AuctionsPage}/>
            <Route path="/auctions/confirmWinners" component={ConfirmWinnersPage}/>
            <Route path="/auctions/add" component={AddAuctionPage} />
            <Route path="/login" component={LoginPage}/>
        </Route>
      </Router>
      {
        (() => {
          if (__DEV__) {
              return <DevTools />;
          }
        })() || ''
      }
    </div>
  </Provider>,
  document.getElementById('app-page')
)

// Fetch Once to Rule Them ALL
store.dispatch(fetchAuctions())

