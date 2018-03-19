// Libraries
import React, { Component } from 'react'

import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

// Application Components
import AuctionList from './AuctionList/AuctionList';
import AuctionItemDetail from './AuctionList/AuctionItemDetail';

import './auctions.css';

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
            history,
        } = this.props;

        const filteredAuctions = !!auctionCollection && auctionCollection.length ? auctionCollection.filter( auction => auction.show ) : [];

        return (
            <div className="page">
                <Switch>
                    <Route 
                        exact
                        path='/auctions' 
                        component={() => (
                            <AuctionList
                                history={history}
                                user={user}
                                auctions={filteredAuctions}
                                expandedAuction={expandedAuction || {}}
                                placeBid={this.placeBid}
                                toggleAuctionDetail={this.toggleAuctionDetail}
                                config={config}
                                />
                        )}
                        />
                    <Route 
                        path='/auctions/:auctionuid' 
                        component={() => (
                            !filteredAuctions || !filteredAuctions.length ? (
                                <div className="loader">
                                    <div className="loader-spinner" />
                                </div> 
                                ) : (
                                <AuctionItemDetail
                                    history={history}
                                    auctions={filteredAuctions}
                                    config={config}
                                    user={user}
                                    placeBid={this.placeBid}
                                    open={false}
                                    toggleAuctionDetail={this.toggleAuctionDetail}
                                    />
                                )
                        )}
                        />
                </Switch>
            </div>
        );
    }

}



export default Auctions;
