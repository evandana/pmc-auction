// Libraries
import React from 'react';
import { Link, browserHistory } from 'react-router'
// Styles
import './authPage.scss';
// Application Components
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

let AuthPage = React.createClass({

    render () {

        return (
            <div className="pure-form pure-form-aligned">
                <fieldset>
                    <legend>Login</legend>
                    <div className="pure-controls">
                        <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
                        <button
                            className="pure-button pure-button-primary"
                            onClick={this.googleLogin}>
                            Google Login
                        </button>
                    </div>
                </fieldset>
            </div>
        );
    },

    googleLogin () {
        UserActions.loginGoogle();
    }

});

export default AuthPage;
