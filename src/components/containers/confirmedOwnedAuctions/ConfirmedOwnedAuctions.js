// Libraries
import React, { Component } from 'react'


// MATERIAL UI!!!
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import Divider from 'material-ui/lib/divider';
import CommunicationCall from 'material-ui/lib/svg-icons/communication/call';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';
import { cyan200 } from 'material-ui/lib/styles/colors';
import CommunicationEmail from 'material-ui/lib/svg-icons/communication/email';

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