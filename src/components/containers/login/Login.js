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
                    <legend>Login</legend>
                    <div className="pure-controls">
                        <button
                            className="pure-button pure-button-primary"
                            onClick={this.requestLoginGoogle}>
                            Google Login
                        </button>
                    </div>
                </fieldset>
            </div>
        )
    }
})

export default Login