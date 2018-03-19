/** REACT **/
import React, { Component } from 'react';
/** MATERIAL UI **/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan50,blueGrey200,cyan500,cyan900,limeA200,yellow800,pink800,green400} from 'material-ui/styles/colors';
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
import 'firebase/storage';
/** APP **/
import config from 'config';
import AuthorizedRoute from 'components/controller/AuthorizedRoute';

import Auctions from 'components/controller/Auctions';
import CreateAuction from 'components/controller/CreateAuction';
import Donate from 'components/controller/Donate';
import DonorInfo from 'components/controller/DonorInfo';
import Home from 'components/controller/Home';
import Results from 'components/controller/Results';
import Sponsors from 'components/controller/Sponsors';
import Status from 'components/controller/Status';

import Navigation from 'components/controller/Navigation';
import Footer from 'components/view/common/Footer';
import { getUser, fetchAuctions, fetchConfig, showLoginSpinner } from './actions';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);

        injectTapEventPlugin();

        /** Firebase Setup **/
        window._FIREBASE_ = firebase.initializeApp(config.firebase);
        window._FIREBASE_PROVIDER_ = new firebase.auth.GoogleAuthProvider();
        window._FIREBASE_DB_ = firebase.database();
        window._FIREBASE_STORAGE_ = firebase.storage().ref();
        window._FIREBASE_.auth().onAuthStateChanged(
            (googleUser) => {
                
                window._UI_STORE_.dispatch(showLoginSpinner(false));

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

        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: '#1DAFEC',
                accent1Color: '#8EC449',
                highlight1Color: '#E8448B',
                ternaryTextColor: '#8DC3DB', // TODO: rename
                fadedPrimary1Color: '#4FDFFF',
                primaryLinkColor: '#1DAFEC',
                secondaryLinkColor: '#8AC9EC',
                primary2Color: '#47B4E0',
                errorColor: '#E8448B',
                warningColor: '#FF953F',
                successColor: '#8EC449',
                // DEFAULTS
                // primary1Color: cyan500,
                // primary2Color: cyan700,
                // primary3Color: grey400,
                // accent1Color: pinkA200,
                // accent2Color: grey100,
                // accent3Color: grey500,
                // textColor: darkBlack,
                // alternateTextColor: white,
                // canvasColor: white,
                // borderColor: grey300,
                // disabledColor: fade(darkBlack, 0.3),
                // pickerHeaderColor: cyan500,
                // clockCircleColor: fade(darkBlack, 0.07),
                // shadowColor: fullBlack,
            },
        });

        const { store, history } = this.props;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <div className="app">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <AuthorizedRoute exact path="/about" component={Home} />
                                <AuthorizedRoute path="/auctions" component={Auctions} />
                                <AuthorizedRoute exact path="/status" component={Status} />
                                <AuthorizedRoute exact path="/donate" component={Donate} />
                                <AuthorizedRoute exact path="/sponsors" component={Sponsors} />
                                <AuthorizedRoute exact path="/results" component={Results} />
                                <AuthorizedRoute exact path="/donor-info" component={DonorInfo} />
                                <AuthorizedRoute exact path="/create-auction" component={CreateAuction} />
                            </Switch>
                            <Navigation />
                            <Footer />
                        </div>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;

