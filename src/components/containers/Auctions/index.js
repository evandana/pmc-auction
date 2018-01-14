// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Styles
// import './header.scss';
// Application Components
import AuctionList from '../../auctionList/auctionList'
import AuctionItemDetail from '../../auctionList/auctionItemDetail';

import { placeBid, toggleAuctionDetail } from '../../../actions/AuctionActions'

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

        if ( this.props.expandedAuction && this.props.expandedAuction.uid ) {
            let detailObjKey = this.props.expandedAuction.uid;
            let detailObj = this.props.auctions.find(item => { return detailObjKey === item.uid; });

            // console.log('this.props.config', this.props.config)

            // console.log('detailObj', detailObj);
            return (
                <AuctionItemDetail
                    key={detailObj.uid}
                    data={detailObj}
                    config={this.props.config}
                    placeBid={this.placeBid}
                    toggleAuctionDetail={this.toggleAuctionDetail}
                />
            )
        } else {

            const filteredAuctions = this.props.auctions.filter( auction => auction.show )

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



export default connect()(Auctions)
