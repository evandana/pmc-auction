import { connect } from 'react-redux';
import AuthorizedRoute from 'components/view/AuthorizedRoute';

const mapStateToProps = (state) => {
    return {
        userPermissions: state.auctions.user.permissions,
        config: state.config,
    }
};

export default connect(
    mapStateToProps
)(AuthorizedRoute);;