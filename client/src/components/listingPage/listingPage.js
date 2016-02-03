// Libraries
import React from 'react';
// Styles
import './listingPage.scss';
// Application Components
import AuctionStore from 'stores/AuctionStore';
// React Components
import ListingTable from 'components/listingTable/listingTable';

let ListingPage = React.createClass({
    
    getInitialState () {
        return getAuctionState();
    },
    
    componentDidMount () {
        AuctionStore.addChangeListener(this.onChange);
    },

    render () {
        return (
            <div id="listing-page" className="listing-page-l">
                <h3>Auctions</h3>
                <ListingTable
                    listings={this.state.listings} 
                    listingHeaders={this.state.listingHeaders}
                />
            </div>
        );
    },
    
    onChange () {
        this.setState(getAuctionState());
    }
    
});

export default ListingPage;

function getAuctionState () {
    return {
        listings: AuctionStore.getAll(),
        listingHeaders: AuctionStore.getAllHeaders()
    };
}
