/** REACT **/
import React, { Component } from 'react';
/** MATERIAL UI **/
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
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
import Donate from 'components/controller/Donate';
import DonorInfo from 'components/controller/DonorInfo';
import Results from 'components/controller/Results';
import Sponsors from 'components/controller/Sponsors';
import Status from 'components/controller/Status';

import Navigation from 'components/controller/Navigation';
import Footer from 'components/view/common/Footer';
import AppModal from 'components/controller/Modal';
import { getUser, getProducts, setCurrentUser, fetchAuctions, fetchConfig } from './actions';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);

        injectTapEventPlugin();

        /** Firebase Setup **/
        window._FIREBASE_ = firebase.initializeApp(config.firebase);
        window._FIREBASE_PROVIDER_ = new firebase.auth.GoogleAuthProvider();
        window._FIREBASE_DB_ = firebase.database();
        window._FIREBASE_.auth().onAuthStateChanged(
            (googleUser) => {
                // user data from Google Auth
                if (googleUser && googleUser.uid) {
                    const googleUserData = {
                        googleUid: googleUser.uid, // Google UID
                        displayName: googleUser.displayName,
                        email: googleUser.email,
                    };
                    
                    window._UI_STORE_.dispatch(fetchConfig());

                    window._UI_STORE_.dispatch(getUser(googleUserData));
                    
                    window._UI_STORE_.dispatch(fetchAuctions());

                }
            }
        );
    }


    render() {

        const theme = createMuiTheme({
            palette: {
                accent1Color: orange,
            },
        });

        const { store, history } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <div className="app">
                            <Navigation />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/about" component={Home} />
                                <AuthorizedRoute exact path="/auctions" component={Auctions} />
                                <AuthorizedRoute exact path="/status" component={Status} />
                                <AuthorizedRoute exact path="/donate" component={Donate} />
                                <AuthorizedRoute exact path="/sponsors" component={Sponsors} />
                                <AuthorizedRoute exact path="/results" component={Results} />
                                <AuthorizedRoute exact path="/donor-info" component={DonorInfo} />
                            </Switch>
                            <Footer />
                            <AppModal />
                        </div>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
