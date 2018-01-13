import { connect } from 'react-redux';
import { loginGoogleRequest } from 'actions';
import LoginModal from 'components/view/Modal/Login';

const LoginModalController = connect(
    null, { loginGoogleRequest }
)(LoginModal);

export default LoginModalController;