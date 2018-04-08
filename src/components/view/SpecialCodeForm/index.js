import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import muiThemeable from 'material-ui/styles/muiThemeable';

import { submitSpecialCode } from 'actions';

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

class SpecialCodeForm extends Component {

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
        const { dispatch, user, codeKey, codePermission } = this.props;

        dispatch(submitSpecialCode({ formData, user, codeKey, codePermission }));
    }

    render() {

        const { user, asyncForm, handleSubmit, submit, codeKey, codeLabel, codePermission } = this.props;

        return (
            <form
                onSubmit={handleSubmit(this.submitForm)}
            >
                <Field
                    name={codeKey}
                    type="text"
                    style={{width:'10em'}}
                    component={renderTextField}
                    label={asyncForm &&asyncForm[codeKey] && asyncForm[codeKey].success === false ? 'Try code again' : 'Enter ' + codeLabel}
                />
            </form>
        );
    }
}

export default muiThemeable()(reduxForm({
    form: 'specialCodeForm',
})(SpecialCodeForm));