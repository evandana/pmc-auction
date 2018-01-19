// Libraries
import React, { Component } from 'react'


// MATERIAL UI!!!
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import Divider from 'material-ui/Divider';
import CommunicationCall from 'material-ui-icons/Call';
import CommunicationChatBubble from 'material-ui-icons/ChatBubble';
import { amber400 } from 'material-ui/colors';
import CommunicationEmail from 'material-ui-icons/Email';

// Styles
// import './ConfirmWinners.scss';
// Application Components

class WonAuctions extends Component {

    constructor(props) {
        super(props);
    }

    emailOwner(emailAddress) {
        var win = window.open('mailto:'+emailAddress+'?Subject=Happiness%20Exchange%20Winners!', '_top');
    }

    render () {

        const style = {
            icon: {
                fill: amber400
            }
        }

        // console.log(this.props.auctions)

        let wonList = this.props.auctions.map( (auction) => {

            let auctionOwner = auction.auctionOwner || {};

            let winningBid = auction.winningBid
            // auction.winningBids.find( winningBid => {
            //     return winningBid.bidderObj.uid === auctionOwner.uid;
            // });

            if (winningBid) {
                let bidder = winningBid.bidderObj;
                return (
                    <List key={auction.uid}>
                      <ListItem
                        key={bidder.email + bidder.uid}
                        leftIcon={<CommunicationEmail style={style.icon} />}
                        onTouchTap={() => {
                            this.emailOwner( auctionOwner.email )
                        }}
                        primaryText={
                            'You won ' +
                            auction.title +
                            ' with ' +
                            auctionOwner.name +
                            ' for $' + winningBid.bidAmount
                        }
                        secondaryText={
                            'Contact them at ' + auctionOwner.email
                        }
                      />
                    </List>
                );
            } else {
                return '';
            }

        });

        if (wonList.length && wonList[0] !== '' ) {
            return (
                <div>
                    <h4>Auctions you won</h4>
                    {wonList}
                </div>
            )
        } else {
            return <div></div>
        }
    }

}

export default WonAuctions