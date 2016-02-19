// Libraries
import React from 'react';
// Styles
import './listingTableHead.scss';
// Application Components
import AuctionActions from 'actions/AuctionActions';

let ListingTableHead = {},
    sortOrder = 'ascend';

ListingTableHead = React.createClass({

    componentDidMount () {
        let newData = [
            {
                "id" : 1,
                "donor" : [1],
                "title" : "Chocolate Cake",
                "openingBid" : {
                    "id" : 1,
                    "donor" : 2,
                    "bidAmount" : 15
                },
                "highestBid" : 19,
                "location" : 1,
                "expiration" : "04/30/2016",
                "incrementAmount" : 1,
                "status" : "OPEN",
                "openDate" : "01/20/2016",
                "closeDate" : "04/30/2016"
            },
            {
                "id" : 4,
                "donor" : [2],
                "title" : "Upside Down Pineapple Cake",
                "openingBid" : {
                    "id" : 2,
                    "donor" : 1,
                    "bidAmount" : 7
                },
                "highestBid" : 20,
                "location" : 1,
                "expiration" : "04/30/2016",
                "incrementAmount" : 1,
                "status" : "OPEN",
                "openDate" : "01/20/2016",
                "closeDate" : "04/30/2016" 
            }
        ];

        setTimeout(() => {AuctionActions.socketUpdate(newData)}, 3000);
    },

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
