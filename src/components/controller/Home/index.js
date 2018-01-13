import { connect } from 'react-redux';
import { openLoginModal, toggleExpandAllRows, updateQuantity, updateManager, updateBranchName } from 'actions';
import Home from 'components/view/Home';

const mapStateToProps = (state) => {
    return {
        products: state.products,
        userPermissions: state.user.permissions,
        orderMetaData: state.orderMetaData,
    };
};

const mapDispatchToProps = { openLoginModal, toggleExpandAllRows, updateQuantity, updateManager, updateBranchName };

const HomeController = connect(
    mapStateToProps, mapDispatchToProps
)(Home);

export default HomeController;