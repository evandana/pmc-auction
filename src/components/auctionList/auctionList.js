// Libraries
import React from 'react';
import { connect } from 'react-redux'

// Styles
// import './header.scss';
// Application Components
import AuctionItem from './auctionItem';
import AuctionItemDetail from './AuctionItemDetail';


let AuctionList = React.createClass({

    render() {
        
        let auctionItems = [];
        
        this.props.auctions.forEach( (obj, index) => { 
            auctionItems.push( generateItem(obj, index, this.props) );
        });
        
        return (
            <div>
                {auctionItems}
            </div>
        )
    }

});

export default AuctionList;

function generateItem (obj, index, props) {
    
    if ( props.expandedAuctionIdList.includes(obj.id) ) {
        return (<AuctionItemDetail
            key={index}
            data={obj}
            placeBid={props.placeBid}
            toggleAuctionDetail={props.toggleAuctionDetail}
        />)
    } else {
        return (<AuctionItem
            key={index}
            data={obj}
            placeBid={props.placeBid}
            toggleAuctionDetail={props.toggleAuctionDetail}
        />)
    }
}