import { connect } from 'react-redux';
import RaffleEditor from 'components/view/RaffleEditor';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        raffles: state.raffles,
        images: state.images,
    }
};
  
export default connect(
    mapStateToProps
)(RaffleEditor);