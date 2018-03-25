import { connect } from 'react-redux';
import RaffleView from 'components/view/Raffle';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        raffles: state.raffles,
    };
};

const RaffleController = connect(
    mapStateToProps,
)(RaffleView);

export default RaffleController;