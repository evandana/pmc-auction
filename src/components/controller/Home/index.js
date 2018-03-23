import { connect } from 'react-redux';
import Home from 'components/view/Home';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        userPermissions: state.auctions.user.permissions,
        config: state.config,
    };
};

const HomeController = connect(
    mapStateToProps,
)(Home);

export default HomeController;