// REACT/REDUX
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// MATERIAL UI!!!
import {
    CommunicationCall,
    CommunicationChatBubble,
    CommunicationEmail,
    cyan200,
    Divider,
    List,
    ListItem
    } from 'material-ui';



import { updateUserPaidAmt, updateUserNotes } from '../../../actions/UserActions';

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
                let winningBid = (auction.winningBids || []).find( winningBid => {
                    // console.log('winningBid', winningBid.bidderObj.uid, user.uid)
                    return winningBid ? winningBid.bidderObj.uid === userKey : false;
                })
                if (winningBid) {
                    // console.log('winningBid', winningBid);
                    wonAuctions.totalPledged += parseInt(winningBid.bidAmount, 10);

                    winningBid.rank = auction.winningBids.indexOf( winningBid ) + 1;
                    winningBid.auction = auction;
                    wonAuctions.winningBids.push(winningBid);

                }
            })

            wonAuctions.winningBids = wonAuctions.winningBids.sort( (a, b) => {
                return (a ? a.rank : 0) - (b ? b.rank : 0)
            });

            // console.log('wonAuctions', wonAuctions)
            user.wonAuctions = wonAuctions;

            return user
        }).sort( (a, b) => {
            return (b.wonAuctions ? b.wonAuctions.totalPledged : 0) - (a.wonAuctions ? a.wonAuctions.totalPledged : 0)
        });

        // console.log('users', users)
        return users
    }

    updateUserNotes (userId, notes) {
        // TODO: use websockets/redux chain for updating
        // need to refresh to see update
        this.props.dispatch(updateUserNotes(userId, notes))
    }

    updateUserPaidAmt (userId, amt) {
        // TODO: use websockets/redux chain for updating
        // need to refresh to see update
        this.props.dispatch(updateUserPaidAmt(userId, parseInt(amt, 10)))
    }

    render () {

        const style = {
            bidTable: {
                width: '100%'
            },
            owes: {
                text: {
                    color: 'red'
                },
                td: {
                    background: '#fee'
                }
            },
            paid: {
                text: {
                    color: 'green'
                },
                td: {
                    background: '#efe'
                }
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
                        <td colSpan="2">
                            ${this.getTotal()}
                        </td>
                    </tr>


                    {users.map(user => {
                        return (
                            <tr key={user.uid} >
                                <td>
                                    {user.name}
                                    <br/>
                                    <a href="mailto:${user.email}">{user.email}</a>
                                    <br/>
                                    notes:<textarea
                                        defaultValue={user.notes}
                                        onBlur={(evt) => {
                                            this.updateUserNotes(user.uid, evt.target.value)
                                        }}
                                    />
                                </td>
                                <td
                                    style={
                                        user.wonAuctions && user.wonAuctions.totalPledged - (parseInt(user.paidAmt, 10) || 0) > 0
                                        ?
                                            style.owes.td
                                        :
                                            style.paid.td
                                    }>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>pledged</td>
                                                <td>${user.wonAuctions ? user.wonAuctions.totalPledged : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td style={
                                                        user.wonAuctions && user.wonAuctions.totalPledged - (parseInt(user.paidAmt, 10) || 0) > 0
                                                        ?
                                                            style.owes.text
                                                        :
                                                            style.paid.text
                                                    }
                                                    >
                                                    paid
                                                </td>
                                                <td>
                                                    $<input
                                                        type="number"
                                                        defaultValue={user.paidAmt}
                                                        onBlur={(evt) => {
                                                            this.updateUserPaidAmt(user.uid, evt.target.value)
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>balance</td>
                                                <td>${user.wonAuctions ? user.wonAuctions.totalPledged - (parseInt(user.paidAmt, 10) || 0) : '-'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
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