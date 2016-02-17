// Libraries
import React from 'react';
// Styles
import './listingManager.scss';
// Application Components
import AuctionActions from 'actions/AuctionActions';

let ListingManager = React.createClass({

    render () {

        return (
            <div className="listing-manager-l">
                <button onClick={this.addAuction}>Add Auction</button>
            </div>
        );
    },
    
    addAuction () {
        AuctionActions.addAuction();
    }
    
});

export default ListingManager;
