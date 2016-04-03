// Libraries
import React from 'react';
import { connect } from 'react-redux'

// Styles
// import './header.scss';
// Application Components
import AuctionItem from './auctionItem';


let AuctionList = React.createClass({

    render() {
        
        let auctionItems = [];
        
        this.props.auctions.forEach( (obj, index) => { 
            auctionItems.push(<AuctionItem 
                key={index}
                data={obj}
                placeBid={this.props.placeBid}
                showAuctionDetail={this.props.showAuctionDetail}
            />);
        });
        
        return (
            <div>
                {auctionItems}
            </div>
        )
    }

});

export default AuctionList;
