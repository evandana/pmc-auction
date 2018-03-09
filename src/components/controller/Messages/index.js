import { connect } from 'react-redux';
import Messages from 'components/view/Messages';

const mapStateToProps = (state) => {
    return {
        config: state.config,
    }
};
  
export default connect(
    mapStateToProps
)(Messages);