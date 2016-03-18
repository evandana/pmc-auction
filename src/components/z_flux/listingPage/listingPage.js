// Libraries
import React from 'react';
// Styles
import './listingPage.scss';
// Application Components
import AuctionStore from 'stores/AuctionStore';
// React Components
import ListingTable from 'components/listingTable/listingTable';
import ListingManager from 'components/listingManager/listingManager';
import UserPanel from 'components/userPanel/userPanel';

let ListingPage = React.createClass({

    componentDidMount () {
        AuctionStore.initialize();
        AuctionStore.addChangeListener(this.onChangeHandler);
    },
    
    getInitialState () {
        return getAuctionState();
    },
    
    onChangeHandler () {
        this.setState(getAuctionState());
    },

    render () {
        return (
            <div id="listing-page" className="listing-page-l">
                <UserPanel />
                <h3>Auctions</h3>
                <ListingTable
                    listings={this.state.listings}
                />
                <br />
                <ListingManager />
            </div>
        );
    }
        
});

export default ListingPage;

function getAuctionState () {
    return {
        listings: AuctionStore.getAll()
    };

}
