// Libraries
import React, { Component } from 'react'

import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

// Application Components
import AuctionList from './AuctionList/AuctionList';
import AuctionItemDetail from './AuctionList/AuctionItemDetail';

import './auctions.css';

import { placeBid } from 'actions'

class Auctions extends Component {

    constructor(props) {
        super(props)
        this.placeBid = this.placeBid.bind(this)
    }

    placeBid(auctionUid, amount, event) {
        const { dispatch } = this.props
        dispatch(placeBid(auctionUid, amount))
    }

    render() {
        
        const {
            auctionCollection,
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
                                placeBid={this.placeBid}
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
