import React, { Component } from 'react';
import InputController from 'components/controller/Forms/InputValidated';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './styles.css';

class PendingUser extends Component {

    constructor(props) {
        super(props);
        this.validationCheck = this.validationCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.inputValue = '';
        this.state = {
            validInput: false,
            errorText: '',
        }
    }
    
    validationCheck(val) {
        this.setState({validInput: !!val});
        if (!!val) {
            this.inputValue = val;
        }
    }
    
    onSubmit() {
        const superSecretKey = "enterprise07";
        const { updateUserPermissions } = this.props;
        if (this.inputValue.toLowerCase() === superSecretKey) {
            // this.setState({
            //     validInput: true,
            // });
            updateUserPermissions();
        } else {
            this.setState({
                errorText: 'Please enter a valid customer key',
            });
        }
    }
    
    render() {
        const { logoutUserRequest, userName } = this.props;
        const { validInput, errorText } = this.state;
        
        const inputProps = {
            errorText,
            hint: 'Enter Customer Key Here',
            id: 'customerKey',
            name: 'customerKey',
            label: 'Customer Key',
            validationCheck: this.validationCheck,
        };
        
        const keyButtonProps = {
            disabled: !validInput,
            label: 'Submit Key',
            onClick: this.onSubmit,
            primary: true,
        };
        
        const logoutButtonProps = {
            label: 'Logout',
            onClick: logoutUserRequest,
        };

        return (
            <div>
                <div className="pendingUser__auth-status">
                    <span>Logged in as: {userName}</span>
                    <FlatButton {...logoutButtonProps} />
                </div>
                <div className="pendingUser__key-form">
                    <span>If you have a customer key please enter it below</span>
                    <div className="pendingUser__input-row">
                        <div className="pendingUser___key-input">
                            <InputController {...inputProps} />
                        </div>
                        <div className="pendingUser___key-btn">
                            <RaisedButton {...keyButtonProps} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default PendingUser;