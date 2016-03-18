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
                <td>
                    <div className="listing-row-container pure-g">
                        <div className="listing-row-infoCol pure-u-1-2">
                            <div className="listing-row-title">{this.props.data.get('title')}</div>
                            <div className="listing-row-infoContainer pure-g">
                                <div className="listing-row-infoColLeft pure-u-1-2">Info Col Left</div>
                                <div className="listing-row-infoColRight pure-u-1-2">Info Col Right</div>
                            </div>
                        </div>
                        <div className="listing-row-bidCol pure-u-1-2">
                            <div>{this.props.data.get('openingBid')}</div>
                        </div>
                    </div>
                </td>
            </tr>
        );
    },
    
    rowClick (data) {
        AuctionActions.toggleAuctionRow(data.get('id'));
    }

});

export default ListingRow;
