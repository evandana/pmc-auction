// REACT/REDUX
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './_results.scss'

class ResultsPage extends Component {

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
            console.log('auction title', auction.title)
            // console.log('this.getAuctionTotalRaised(auction.winningBids)', this.getAuctionTotalRaised(auction.winningBids))
            return this.getAuctionTotalRaised(auction.winningBids);
            // return auction.title;
        })

        console.log('winningAmounts', winningAmounts)

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


    render () {

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


                    {this.props.auctions.map(auction => {
                        return (
                            <tr key={auction.id}>
                                <td>
                                    {auction.title}
                                    <br/>
                                    <span>total raised ${this.getAuctionTotalRaised(auction.winningBids)}</span>
                                </td>
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>{auction.auctionOwner === undefined ? '' : auction.auctionOwner.name}</td>
                                                <td>{auction.auctionOwner === undefined ? '' : auction.auctionOwner.email}</td>
                                                <td>{auction.auctionOwner === undefined ? '' : auction.auctionOwner.persona}</td>
                                            </tr>
                                            <tr>
                                                <td>opening: ${auction.openingBid}</td>
                                                <td>highest: ${auction.highestBid}</td>
                                                <td></td>
                                            </tr>
                                            { auction.winningBids === undefined ? (<tr></tr>) : auction.winningBids.map( winningBid => {
                                                return (
                                            <tr key={winningBid.bidderObj.email + '-' + auction.id}>
                                                <td>win: {winningBid.bidderObj === undefined ? '' : winningBid.bidderObj.name}</td>
                                                <td>{winningBid.bidderObj === undefined ? '' : winningBid.bidderObj.email}</td>
                                                <td>bid ${winningBid.bidAmount}</td>
                                            </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
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
    return {
        user: state.login.user,
        config: state.login.config,
        auctions: state.auctions.auctionCollection
    }
}

export default connect(mapStateToProps)(ResultsPage);