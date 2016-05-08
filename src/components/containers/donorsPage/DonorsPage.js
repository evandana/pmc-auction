// REACT/REDUX
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// MATERIAL UI!!!
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import Divider from 'material-ui/lib/divider';
import CommunicationCall from 'material-ui/lib/svg-icons/communication/call';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';
import { cyan200 } from 'material-ui/lib/styles/colors';
import CommunicationEmail from 'material-ui/lib/svg-icons/communication/email';

import './_donors.scss'

class DonorsPage extends Component {

    constructor(props) {
        super(props)
      }

    getAuctionTotalRaised(winningBids) {

        if (winningBids) {

            let winningAmounts = winningBids.map( winningBid => {
                return winningBid.bidAmount;
            })

            let amt = winningAmounts.reduce( (prev, curr) => {
                return prev + curr;
            })

            return amt;
        } else {
            return '';
        }

    }


    getTotal () {
        let winningAmounts = this.props.auctions.map( auction => {
            // console.log('auction title', auction.title)
            // console.log('this.getAuctionTotalRaised(auction.winningBids)', this.getAuctionTotalRaised(auction.winningBids))
            return this.getAuctionTotalRaised(auction.winningBids);
            // return auction.title;
        })

        let amt = 0;
        if (winningAmounts && winningAmounts.length > 0 && winningAmounts[0] !== '') {
            amt = winningAmounts.reduce( (prev, curr) => {
                prev = prev !== '' ? prev : 0;
                curr = curr !== '' ? curr : 0;
                return prev + curr;
            })
        }

        return amt;
    }


    getEnhancedUsersCollection () {

        let auctions = this.props.auctions;

        let users = Object.keys(this.props.users || {}).map( userKey => {

            let user = this.props.users[userKey];

            // console.log('userKey', userKey)

            let wonAuctions = {
                winningBids: [],
                auction: null,
                rank: null,
                totalPledged: 0
            }
            auctions.forEach( auction => {
                // console.log('auction', auction.title)
                let winningBid = auction.winningBids.find( winningBid => {
                    // console.log('winningBid', winningBid.bidderObj.uid, user.uid)
                    return winningBid.bidderObj.uid === userKey;
                })
                if (winningBid) {
                    // console.log('winningBid', winningBid);
                    wonAuctions.totalPledged += parseInt(winningBid.bidAmount, 10);

                    winningBid.rank = auction.winningBids.indexOf( winningBid ) + 1;
                    winningBid.auction = auction;
                    wonAuctions.winningBids.push(winningBid);

                }
            })

            // console.log('wonAuctions', wonAuctions)
            user.wonAuctions = wonAuctions;

            return user
        });

        // console.log('users', users)
        return users
    }



    render () {

        const style = {
            bidTable: {
                width: '100%'
            }
        }


        let users = this.getEnhancedUsersCollection();

        // console.log('users[0]', users[0])


        if (this.props.user.permissionLevel === 'ADMIN') {
            return (

                <table className="results-table">
                    <tbody>

                    <tr>
                        <td>
                            Happiness Exchange
                        </td>
                        <td>
                            ${this.getTotal()}
                        </td>
                    </tr>


                    {users.map(user => {
                        return (
                            <tr key={user.uid}>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    ${user.wonAuctions ? user.wonAuctions.totalPledged : '-'}
                                </td>
                                <td>
                                    {!user.wonAuctions ? '' : user.wonAuctions.winningBids.map( winningBid => {
                                        return (
                                            <table key={winningBid.bidAmount + winningBid.auction.id} style={style.bidTable}>
                                                <tbody>
                                                    <tr>
                                                        <td>${winningBid.bidAmount}</td>
                                                        <td>rank: {winningBid.rank}</td>
                                                        <td>{winningBid.auction.title}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )
                                    })}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )
        } else {
            return <div></div>
        }

        // console.log('render auction page')
    }
}

function mapStateToProps (state) {

    // console.log('state.users.users', state.users.users)

    return {
        user: state.login.user,
        config: state.login.config,
        auctions: state.auctions.auctionCollection,
        users: state.users.users
    }
}

export default connect(mapStateToProps)(DonorsPage);