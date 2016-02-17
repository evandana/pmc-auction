// Libraries
import React from 'react';
// Styles
import './listingTable.scss';
// Application Components
import AuctionActions from 'actions/AuctionActions';
// React Components
import ListingTableBody from 'components/listingTableBody/listingTableBody';
import ListingTableHead from 'components/listingTableHead/listingTableHead';


let ListingTable = {};

ListingTable = React.createClass({
    render () {
        return (
            <table id="listing-table" className="listing-table-l pure-table pure-table-bordered">
                <ListingTableHead headers={this.props.listingHeaders} />
                <ListingTableBody listings={this.props.listings} />
            </table>
        );
    },
});

export default ListingTable;
