import { connect } from 'react-redux';
import Messages from 'components/view/Messages';

const mapStateToProps = (state) => {
    return {
        config: state.config,
        user: state.auctions.user,
    }
};
  
export default connect(
    mapStateToProps
)(Messages);