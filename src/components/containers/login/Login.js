// Libraries
import React from 'react';

import { LoginActions } from '../../../actions/LoginActions'



// Styles
// import './header.scss';
// Application Components

const Login = React.createClass({

    requestLoginGoogle() {
        LoginActions.requestLoginGoogle();
    },

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <fieldset>
                    <div className="pure-controls">
                        <h1>Welcome to the Happiness Exchange</h1>
                        <p>Login with a Google account to view the auctions!</p>
                        <button
                            className="pure-button pure-button-primary"
                            onClick={this.requestLoginGoogle}>
                            Google Login
                        </button>
                        <p>RSVP to the <a href="https://www.facebook.com/events/198978703805744/">event</a></p>
                    </div>
                </fieldset>
            </div>
        )
    }
})

export default Login