import { connect } from 'react-redux';
import RaffleView from 'components/view/Raffle';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        raffles: state.raffles,
        config: state.config,
    };
};

const RaffleController = connect(
    mapStateToProps,
)(RaffleView);

export default RaffleController;