// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from 'reducers'

// Styles
import './app.scss';
// React Components
import ListingPage from 'components/listingPage/listingPage';
import ListingManager from 'components/listingManager/listingManager';
import AuthPage from 'components/authPage/authPage';
// Application Components
import UserStore from 'stores/UserStore';

import * as reducers from 'reducers'
import { App, Home, Foo, Bar } from 'components'


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
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={ListingPage}/>
          <Route path="foo" component={Foo}/>
          <Route path="bar" component={Bar}/>
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

app.run();
