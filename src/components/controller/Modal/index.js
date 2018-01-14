import { connect } from 'react-redux';
import Modal from 'components/view/Modal';
import LoginController from 'components/controller/Modal/Login';
import PendingUserController from 'components/controller/Modal/PendingUser';

const mapStateToProps = (state) => {
    let { open, activeModal, title, ModalComponent } = state.modal;
    const { permissions } = state.user;
    
    if (!permissions.basic) {
        open = true;
        title = 'LOGIN';
        ModalComponent = LoginController;
    } else {
        open = false;
    }
    
    return {
        activeModal,
        open,
        title,
        ModalComponent,
    };
};

const ModalController = connect(
    mapStateToProps, null
)(Modal);

export default ModalController;