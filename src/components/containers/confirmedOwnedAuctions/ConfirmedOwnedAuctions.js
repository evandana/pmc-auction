// Libraries
import React, { Component } from 'react'


// MATERIAL UI!!!
import { 
    CommunicationCall,
    CommunicationChatBubble,
    CommunicationEmail,
    cyan200,
    Divider
    } from 'material-ui';

import {
    List, ListItem
} from 'material-ui/List';


// Styles
// import './ConfirmWinners.scss';
// Application Components

class ConfirmedOwnedAuctions extends Component {

    constructor(props) {
        super(props);
    }

    emailBidder(emailAddress) {
        var win = window.open('mailto:'+emailAddress+'?Subject=Happiness%20Exchange%20Winners!', '_top');
    }

    render () {

        const style = {
            icon: {
                fill: cyan200
            }
        }

        let confirmLists = this.props.auctions.map( (auction) => {

            let auctionList = auction.winningBids.map( winningBid => {
                let bidder = winningBid.bidderObj;
                return (
                      <ListItem
                        key={bidder.email + bidder.uid}
                        leftIcon={<CommunicationEmail style={style.icon} />}
                        onTouchTap={() => {
                            this.emailBidder( bidder.email )
                        }}
                        primaryText={
                            bidder.name +
                            ' will join you for ' +
                            auction.title
                        }
                        secondaryText={
                            'Contact them at ' + bidder.email +
                            ' ($' + winningBid.bidAmount + ')'
                        }
                      />
                );
            })

            return (
                <List key={auction.id}>
                    {auctionList}
                </List>
            )

        });


        console.log('ConfirmedOwnedAuctions needs to have List and ListItem defined')


        if (confirmLists.length && confirmLists[0] !== '') {
            return (
                <div >
                    <h4>Auctions You Confirmed</h4>
                    {confirmLists}
                </div>
            )
        } else {
            return <div></div>
        }
    }

}

export default ConfirmedOwnedAuctions