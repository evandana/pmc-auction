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


// {tilesData.map(tile => (
//     <GridTile
//       key={tile.img}
//       title={tile.title}
//       actionIcon={<IconButton><Shop color="white"/></IconButton>}
//       actionPosition="left"
//       titlePosition="top"
//       titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
//       cols={tile.featured ? 2 : 1}
//       rows={tile.featured ? 2 : 1}
//     >
//       <img src={tile.img} />
//     </GridTile>
//   ))}



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