// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createDevTools } from 'redux-devtools'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

// Styles
import './app.scss';
// React Components
import ListingPage from 'components/listingPage/listingPage';
import ListingManager from 'components/listingManager/listingManager';
import AuthPage from 'components/authPage/authPage';
import AppPage from 'components/appPage/appPage';
// Application Components
import UserStore from 'stores/UserStore';

import * as reducers from 'reducers/count'


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
          <IndexRoute component={AuthPage}/>
          <Route path="/foo" component={ListingPage}/>
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
