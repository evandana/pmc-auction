import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import muiThemeable from 'material-ui/styles/muiThemeable';

import { submitDonorCode } from 'actions';

const renderTextField = ({
    input,
    label,
    type,
    name,
    value,
    meta: { touched, error },
    ...custom
}) => (
        <TextField
            floatingLabelText={label}
            errorText={touched && error}
            floatingLabelFixed={false}
            hintText={label}
            type={type}
            {...input}
            {...custom}
        />
    )

class DonorCodeForm extends Component {

    constructor(props) {
        super(props);
        // this.themePalette = this.props.muiTheme.palette;
        this.state = {
            initialValues: this.props.initialValues
        };
        this.submitForm = this.submitForm.bind(this);
        this.themePalette = this.props.muiTheme.palette;
    }

    submitForm(formData) {
        // console.log('form', formData);
        const { dispatch, user } = this.props;

        dispatch(submitDonorCode({ formData, user }));
    }

    render() {

        const { user, asyncForm, handleSubmit } = this.props;

        return (
            <form
                onSubmit={handleSubmit(this.submitForm)}
            >
                <Field
                    name="donorCode"
                    type="text"
                    component={renderTextField}
                    label={asyncForm && asyncForm.success === false ? 'Try code again' : 'Enter Donor Code'}
                />
            </form>
        );
    }
}

export default muiThemeable()(reduxForm({
    form: 'donorCodeForm',
})(DonorCodeForm));