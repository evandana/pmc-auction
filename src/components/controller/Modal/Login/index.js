import { connect } from 'react-redux';
import { loginGoogleRequest } from 'actions';
import LoginModal from 'components/view/Modal/Login';


const mapStateToProps = (state) => {
    return {
        showLoginSpinner: state.auctions.user.showLoginSpinner,
    }
};

const LoginModalController = connect(
    mapStateToProps, 
    { loginGoogleRequest }
)(LoginModal);

export default LoginModalController;