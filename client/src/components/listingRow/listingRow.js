// Libraries
import React from 'react';
// Styles
import './listingRow.scss';
// Application Components
import AuctionActions from 'actions/AuctionActions';

let ListingRow = React.createClass({

    propTypes: {
        data: React.PropTypes.object.isRequired,
    },
    
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.data !== this.props.data;
    },
    
    render () {
        return (
            <tr className="listing-row-l" onClick={this.rowClick.bind(this, this.props.data)}>
                <td>{this.props.data.get('title')}</td>
                <td>{this.props.data.get('highestBid')}</td>
                <td>{this.props.data.get('status')}</td>
                <td>{this.props.data.get('closeDate')}</td>
            </tr>
        );
    },
    
    rowClick (data) {
        AuctionActions.toggleAuctionRow(data.id);
    }
    
});

export default ListingRow;
