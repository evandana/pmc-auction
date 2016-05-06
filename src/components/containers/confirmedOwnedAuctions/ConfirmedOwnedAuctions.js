// Libraries
import React, { Component } from 'react'


// MATERIAL UI!!!
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

// Styles
// import './ConfirmWinners.scss';
// Application Components

class ConfirmedOwnedAuctions extends Component {

    constructor(props) {
        super(props);
    }

    render () {

        // let tableList = this.props.auctions.map( (auction) => {

        //     console.log('auction', auction)

        //     return (
        //         <ConfirmWinner
        //             auction={auction}
        //             confirmWinnersSubmit={this.props.confirmWinnersSubmit}
        //             key={'auctionWinner-' + auction.id}
        //         >
        //         </ConfirmWinner>
        //     );
        // });

                // <h4>Combined Auctions Total (not working): ${bidTotal}</h4>
        return (
            <div className='confirm-winners-l'>
                <h3>Confirmed Auctions</h3>
            </div>
        )
    }

}

export default ConfirmedOwnedAuctions