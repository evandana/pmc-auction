// Libraries
import React, { Component } from 'react'

// Application Components
import AuctionList from './AuctionList/AuctionList';
import AuctionItemDetail from './AuctionList/AuctionItemDetail';

import { placeBid, toggleAuctionDetail } from 'actions'

class Auctions extends Component {

    constructor(props) {
        super(props)
        this.placeBid = this.placeBid.bind(this)
        this.toggleAuctionDetail = this.toggleAuctionDetail.bind(this)
    }

    placeBid(auctionUid, amount, event) {
        const { dispatch } = this.props
        dispatch(placeBid(auctionUid, amount))
    }

    toggleAuctionDetail(auctionUid, event) {
        const { dispatch } = this.props
        // Don't trigger when target is button - button is used for placing bids
        dispatch(toggleAuctionDetail(auctionUid))
    }

    render() {

        const {
            auctionCollection,
            expandedAuction,
            config,
            user,
        } = this.props;

        if ( expandedAuction && expandedAuction.uid ) {
            let detailObjKey = expandedAuction.uid;
            let detailObj = auctionCollection.find(item => { return detailObjKey === item.uid; });

            // console.log('this.props.config', this.props.config)

            // console.log('detailObj', detailObj);
            return (
                <div className="page">
                    <AuctionItemDetail
                        key={detailObj.uid}
                        data={detailObj}
                        config={config}
                        placeBid={this.placeBid}
                        open={false}
                        toggleAuctionDetail={this.toggleAuctionDetail}
                    />
                </div>
            )
        } else {

            const filteredAuctions = !!auctionCollection && auctionCollection.length ? auctionCollection.filter( auction => auction.show ) : [];

            return (

                <div className="page">
                    <AuctionList
                        user={user}
                        auctions={filteredAuctions}
                        expandedAuction={this.props.expandedAuction}
                        placeBid={this.placeBid}
                        toggleAuctionDetail={this.toggleAuctionDetail}
                        config={config}
                    />
                </div>
            )
        }
    }

}



export default Auctions;
