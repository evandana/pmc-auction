// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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

    placeBid(auctionId, amount, event) {
        const { dispatch } = this.props
        dispatch(placeBid(auctionId, amount))
    }

    toggleAuctionDetail(auctionId, event) {
        const { dispatch } = this.props
        // Don't trigger when target is button - button is used for placing bids
        dispatch(toggleAuctionDetail(auctionId))
    }

    render() {

        const {
            auctionCollection,
            expandedAuction,
            config,
        } = this.props;

        const auctionCollectionArr = !!auctionCollection ? Object.keys(auctionCollection).map(key => auctionCollection[key]) : [];

        // debugger;

        if ( expandedAuction && expandedAuction.id ) {
            let detailObjKey = expandedAuction.id;
            let detailObj = auctionCollection.find(item => { return detailObjKey === item.id; });

            // console.log('this.props.config', this.props.config)

            // console.log('detailObj', detailObj);
            return (
                <AuctionItemDetail
                    key={detailObj.id}
                    data={detailObj}
                    config={config}
                    placeBid={this.placeBid}
                    toggleAuctionDetail={this.toggleAuctionDetail}
                />
            )
        } else {

            const filteredAuctions = !!auctionCollectionArr && auctionCollectionArr.length ? auctionCollectionArr.filter( auction => auction.show ) : [];

            return (

                <div>
                    <AuctionList
                        auctions={filteredAuctions}
                        expandedAuction={this.props.expandedAuction}
                        placeBid={this.placeBid}
                        toggleAuctionDetail={this.toggleAuctionDetail}
                    />
                </div>
            )
        }
    }

}



export default Auctions;
