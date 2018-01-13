import { connect } from 'react-redux';
import StatusView from 'components/view/Status';

const mapStateToProps = (state) => {
    return {
        userPermissions: state.user.permissions,
    }
};

export default connect(
    mapStateToProps
)(StatusView);;