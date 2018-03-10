import { connect } from 'react-redux';
import { loginGoogleRequest } from 'actions';
import Login from 'components/view/Login';


const mapStateToProps = (state) => {
    return {
        showLoginSpinner: state.auctions.user.showLoginSpinner,
    }
};

const LoginController = connect(
    mapStateToProps, 
    { loginGoogleRequest }
)(Login);

export default LoginController;