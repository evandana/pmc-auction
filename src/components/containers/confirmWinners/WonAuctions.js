// Libraries
import React, { Component } from 'react'


// MATERIAL UI!!!
import { 
    amber400,
    CommunicationCall,
    CommunicationChatBubble,
    CommunicationEmail,
    Divider,
    List, 
    ListItem
    } from 'material-ui';

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
                    <List key={auction.id}>
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