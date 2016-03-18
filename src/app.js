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
    } from 'components';

// Reducers
import * as reducers from 'reducers/index'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

const store = createStore(
  reducer,
  DevTools.instrument()
)
const history = syncHistoryWithStore(hashHistory, store)

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





// let app = {

//     run () {
//         UserStore.authCheck(this.authCallback.bind(this));
//     },

//     authCallback (authData) {
//         if (authData) {
//             UserStore.setUser(authData)
//                 .then( () => { this.loadListingPage() });
//         } else {
//             this.loadAuthPage();
//         }

//     },

//     loadAuthPage () {
//         ReactDOM.render(
//             <AuthPage />,
//             document.getElementById('app-page')
//         );
//     },

//     loadListingPage () {
//         ReactDOM.render(
//               <Router history={browserHistory}>
//                 <Route path="/" component={ListingPage}>
//                     <Route path="listingPage" component={ListingPage}/>
//                 </Route>

//                 <Route path="*" component={ListingPage}/>
//               </Router>,
//             document.getElementById('app-page')
//         );
//     }
// };
//
// app.run();
