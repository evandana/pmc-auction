// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Styles
// import './header.scss';
// Application Components
import AuctionList from '../../auctionList/auctionList'

import { placeBid, toggleAuctionDetail } from '../../../actions/AuctionActions'

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
        // Doing trigger when target is button - button is used for placing bids
        if (event.target.nodeName !== 'BUTTON') {
            dispatch(toggleAuctionDetail(auctionId))
        }
    }

    render() {

        return (
            <div>
                <AuctionList
                    auctions={this.props.auctions}
                    expandedAuctionIdList={this.props.expandedAuctionIdList}
                    placeBid={this.placeBid}
                    toggleAuctionDetail={this.toggleAuctionDetail}
                />
            </div>
        )
    }

}

export default connect()(Auctions)
