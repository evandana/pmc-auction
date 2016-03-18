// Libraries
import React from 'react';
// Styles
import './listingTableHead.scss';
// Application Components
import AuctionActions from 'actions/AuctionActions';

let ListingTableHead = {},
    sortOrder = 'ascend';

ListingTableHead = React.createClass({

    render () {

        return (
            <thead>
                <tr>{
                    this.props.headers.map( (obj, index) => 
                        <th key={index}>
                            <span onClick={this.sortByCol.bind(this, obj.key)}>{obj.copy}</span>
                        </th> 
                    )
                }</tr>
            </thead>
        );
    },
    
    sortByCol (key) {
        AuctionActions.sortByCol(key, sortOrder);
        sortOrder = sortOrder === 'ascend' ? 'descend' : 'ascend';
    }
    
});

export default ListingTableHead;
