import { connect } from 'react-redux';
import { openLoginModal } from 'actions';
import Home from 'components/view/Home';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        userPermissions: state.auctions.user.permissions,
    };
};

const mapDispatchToProps = { openLoginModal };

const HomeController = connect(
    mapStateToProps, mapDispatchToProps
)(Home);

export default HomeController;