import { connect } from 'react-redux';
import { openLoginModal } from 'actions';
import Home from 'components/view/Home';

const mapStateToProps = (state) => {
    return {
        products: state.products,
        userPermissions: state.user.permissions,
        orderMetaData: state.orderMetaData,
    };
};

const mapDispatchToProps = { openLoginModal };

const HomeController = connect(
    mapStateToProps, mapDispatchToProps
)(Home);

export default HomeController;