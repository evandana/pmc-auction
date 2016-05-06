// REACT/REDUX
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { confirmWinners, confirmBidToggle } from '../actions/AuctionActions'

// CONTAINER COMPONENTS
import ConfirmWinners from './containers/confirmWinners/ConfirmWinners'
import ConfirmedOwnedAuctions from './containers/confirmedOwnedAuctions/ConfirmedOwnedAuctions'

class ConfirmWinnersPage extends Component {


    constructor(props) {
        super(props)
    }

    render () {

        let confirmWinnersContent;

        if( this.props.config.CONFIRM_WINNERS ) {
            return (
                <div>
                    <h2>We're all winners</h2>
                    <ConfirmWinners
                        auctions={this.props.pendingConfirmationAuctionCollection}
                        bidTotal={this.props.bidTotal}
                        submitDisable={this.props.submitDisable}
                    />
                    <ConfirmedOwnedAuctions
                        auctions={this.props.confirmedAuctionCollection}
                        />
                </div>
            )
        } else {
            return (
                <div>
                    <h4>Even thouh we're all winners, this feature is not currently available</h4>
                    <p>Please come back later to select the winning bidders</p>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps)(ConfirmWinnersPage);

function mapStateToProps (state) {

    // console.log('something', state)

    return {
        pendingConfirmationAuctionCollection: state.auctions.pendingConfirmationAuctionCollection,
        confirmedAuctionCollection: state.auctions.confirmedAuctionCollection,
        bidTotal: state.auctions.bidTotal,
        submitDisable: state.auctions.confirmWinnersSubmitDisable,
        config: state.auctions.config
    }
}
