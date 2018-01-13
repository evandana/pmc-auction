/** REACT **/
import React, { Component } from 'react';
/** MATERIAL UI **/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
/** ROUTER **/
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
/** REDUX **/
import { Provider } from 'react-redux';
/** FIREBASE **/
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
/** APP **/
import config from 'config';
import AuthorizedRoute from 'components/controller/AuthorizedRoute';
import Home from 'components/controller/Home';
import Auctions from 'components/controller/Auctions';
import Status from 'components/controller/Status';
import Navigation from 'components/controller/Navigation';
import AppModal from 'components/controller/Modal';
import { getUser, getProducts, setCurrentUser, fetchAuctions, fetchConfig } from './actions';

import './app.scss';

class App extends Component {

    constructor(props) {
        super(props);

        injectTapEventPlugin();

        /** Firebase Setup **/
        window._FIREBASE_ = firebase.initializeApp(config.firebase);
        window._FIREBASE_PROVIDER_ = new firebase.auth.GoogleAuthProvider();
        window._FIREBASE_DB_ = firebase.database();
        window._FIREBASE_.auth().onAuthStateChanged(
            (user) => {
                if (user && user.uid) {
                    const userData = {
                        uid: user.uid,
                        displayName: user.displayName,
                        permissions: user.permissions,
                        email: user.email,
                    };
                    
                    window._UI_STORE_.dispatch(getUser(user.uid, userData));
                    
                    window._UI_STORE_.dispatch(fetchConfig());
                    
                    window._UI_STORE_.dispatch(fetchAuctions());

                    // TODO: only load this on the products route
                    // window._UI_STORE_.dispatch(getProducts());
                } else {
                    window._UI_STORE_.dispatch(setCurrentUser({ authInitiated: true }));
                }
            }
        );
    }


    render() {

        const muiTheme = getMuiTheme({
            palette: {
                accent1Color: deepOrange500,
            },
        });

        const { store, history } = this.props;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <div className="app">
                            <Navigation />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <AuthorizedRoute exact path="/auctions" component={Auctions} />
                                <AuthorizedRoute exact path="/status" component={Status} />
                            </Switch>
                            <AppModal />
                        </div>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
