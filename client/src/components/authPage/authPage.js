// Libraries
import React from 'react';
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
