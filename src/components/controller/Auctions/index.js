import { connect } from 'react-redux';
import AuctionsView from 'components/view/Auctions';

const mapStateToProps = (state) => {
    return {
        userPermissions: state.user.permissions,
        // config: state.login.config,
    }
};
  
export default connect(
    mapStateToProps
)(AuctionsView);;