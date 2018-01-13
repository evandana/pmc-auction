import { connect } from 'react-redux';
import Input from 'components/view/common/Input';

function mergeProps(stateProps, dispatchProps, ownProps) {
    const {
        validationCheck = () => true,
        updateValue = () => null,
    } = ownProps;
    
    const onChange = function onChange(event) {
        const val = event.target.value;
        const { validationCheck } = this.props;
        const validationResult = validationCheck(val);
    };
    
    return {
        ...ownProps,
        onChange,
        updateValue,
        validationCheck
    };
}

const InputValidatedController = connect(
    null, null, mergeProps
)(Input);

export default InputValidatedController;