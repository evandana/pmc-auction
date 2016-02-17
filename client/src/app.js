// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
// Styles
import './app.scss';
// React Components
import ListingPage from 'components/listingPage/listingPage';
import AuthPage from 'components/authPage/authPage';
// Application Components
import UserStore from 'stores/UserStore';

let app = {

    run () {
        UserStore.authCheck(this.authCallback.bind(this));
    },
    
    authCallback (authData) {
        if (authData) {
            UserStore.setUser(authData);
            this.loadListingPage();
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
            <ListingPage />,
            document.getElementById('app-page')
        );
    }
};

app.run();
