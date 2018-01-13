import { connect } from 'react-redux';
import AuthorizedRoute from 'components/view/AuthorizedRoute';

const mapStateToProps = (state) => {
    return {
        userPermissions: state.user.permissions,
    }
};

export default connect(
    mapStateToProps
)(AuthorizedRoute);;