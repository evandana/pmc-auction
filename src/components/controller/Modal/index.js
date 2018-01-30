import { connect } from 'react-redux';
import Modal from 'components/view/Modal';
import LoginController from 'components/controller/Modal/Login';

const mapStateToProps = (state) => {
    let { open, activeModal, title, ModalComponent } = state.modal;
    const { permissions } = state.auctions.user
    
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