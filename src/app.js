// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
// using an ES6 transpiler, like babel
import { Router, Route, Link, browserHistory } from 'react-router'

// Styles
import './app.scss';
// React Components
import ListingPage from 'components/listingPage/listingPage';
import ListingManager from 'components/listingManager/listingManager';
import AuthPage from 'components/authPage/authPage';
// Application Components
import UserStore from 'stores/UserStore';

let app = {

    run () {
        UserStore.authCheck(this.authCallback.bind(this));
    },

    authCallback (authData) {
        if (authData) {
            UserStore.setUser(authData)
                .then( () => { this.loadListingPage() });
        } else {
            this.loadAuthPage();
        }

    },

    loadAuthPage () {
        ReactDOM.render(
            <AuthPage />,
            document.getElementById('app-page')
        );
    },

    loadListingPage () {
        ReactDOM.render(
              <Router history={browserHistory}>
                <Route path="/" component={ListingPage}>
                    <Route path="listingPage" component={ListingPage}/>
                </Route>

                <Route path="*" component={ListingPage}/>
              </Router>,
            document.getElementById('app-page')
        );
    }
};

app.run();
