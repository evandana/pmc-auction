// REACT/REDUX
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { confirmWinners, confirmBidToggle } from '../actions/AuctionActions'

// CONTAINER COMPONENTS
import ConfirmWinners from './containers/confirmWinners/ConfirmWinners'
import ConfirmedOwnedAuctions from './containers/confirmedOwnedAuctions/ConfirmedOwnedAuctions'
import WonAuctions from './containers/confirmWinners/WonAuctions'

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
                        auctionOwner={this.props.user}
                    />

                    <ConfirmedOwnedAuctions
                        auctions={this.props.confirmedAuctionCollection}
                        />
                    <hr/>
                    <WonAuctions
                        auctions={this.props.wonAuctionCollection}
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
        bidTotal: state.auctions.bidTotal,
        config: state.auctions.config,
        confirmedAuctionCollection: state.auctions.confirmedAuctionCollection,
        pendingConfirmationAuctionCollection: state.auctions.pendingConfirmationAuctionCollection,
        submitDisable: state.auctions.confirmWinnersSubmitDisable,
        user: state.login.user,
        wonAuctionCollection: state.auctions.wonAuctionCollection
    }
}
