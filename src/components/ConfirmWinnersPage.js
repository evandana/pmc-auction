// REACT/REDUX
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { confirmWinners, confirmBidToggle } from '../actions/AuctionActions'

// CONTAINER COMPONENTS
import ConfirmWinners from './containers/confirmWinners/ConfirmWinners'

class ConfirmWinnersPage extends Component {

    confirmWinnersSubmit () {
        const { dispatch } = this.props;
        dispatch(confirmWinners());
    }

    constructor(props) {
        super(props)
    }

    render () {
        
        let content;
        
        if( this.props.config.CONFIRM_WINNERS ) {
            content = (<ConfirmWinners
                auctions={this.props.auctions}
                bidTotal={this.props.bidTotal}
                submitDisable={this.props.submitDisable}
                confirmWinnersSubmit={this.confirmWinnersSubmit.bind(this)}
                toggleBidConfirm={this.toggleBid.bind(this)}
            />);
        } else {
            content = (
                <div>
                    <h4>This feature is not currently available</h4>
                    <p>Please come back later to select the winning bidders</p>
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        )
    }
    
    toggleBid (auctionId, bidId) {
        const {dispatch} = this.props;
        dispatch(confirmBidToggle(auctionId, bidId))
    }

}

export default connect(mapStateToProps)(ConfirmWinnersPage);

function mapStateToProps (state) {
    return {
        auctions: state.auctions.ownedAuctionCollection,
        bidTotal: state.auctions.bidTotal,
        submitDisable: state.auctions.confirmWinnersSubmitDisable,
        config: state.auctions.config
    }
}
