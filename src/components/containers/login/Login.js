// Libraries
import React from 'react';

import UserActions from '../../../actions/UserActions'



// Styles
// import './header.scss';
// Application Components

const Login = React.createClass({

    googleLogin() {
        UserActions.loginGoogle();
    },

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <fieldset>
                    <legend>Login</legend>
                    <div className="pure-controls">
                        <button
                            className="pure-button pure-button-primary"
                            onClick={this.googleLogin}>
                            Google Login
                        </button>
                    </div>
                </fieldset>
            </div>
        )
    }
})

export default Login