import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const propTypes = {
    autoComplete: PropTypes.string,
    errorText: PropTypes.string,
    hint: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    msg: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
};

const defaultProps = {
    autoComplete: '',
    errorText: '',
    hint: '',
    label: '',
    msg: '',
    onBlur: null,
    onChange: null,
    type: 'text',
    value: '',
};

class Input extends Component {
    
    constructor(props) {
        super(props);
        const { onChange } = props;
        this.onChange = onChange.bind(this);
        this.state = {
            error: !!props.error || false,
            value: props.value || '',
        };
    }
    
    render() {
        
        const { onChange } = this;
        
        const {
            errorText,
            hint,
            id,
            label,
        } = this.props;
        
        const textFieldProps = {
            errorText,
            id,
            onChange,
            floatingLabelText: label,
            hintText: hint,
        };
        
        return (
            <fieldset>
                <TextField {...textFieldProps} />
            </fieldset>
        );
    }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
