import React from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

const Status = (props) => {

    const { user, config, auctionsWithUserBids, auctionsOwned, ...rest } = props;

    return (
        <div className='page'>
            <div className='text-content'>
                <h1>Status</h1>

                <section>
                    <h2>Auctions with Your Bids</h2>
                    <p>If you are the top bidder when the auction closes, you are expected to claim that item.</p>
                    <p>If an auction owner is awarding multiple winners and you have one of the highest few bids, you may be offered a chance to accept this at your highest bid for that item.</p>
                    {createLeadingBidTable(auctionsWithUserBids, config.BIDDING_OPEN)}
                </section>

                {!user.permissions.donor || !auctionsOwned ? '' : (
                    <section>
                        <h2>Owned Auctions</h2>
                        <p>If you are the top bidder when the auction closes, you are expected to claim that item.</p>
                        {createOwnedAuctionTable(auctionsOwned, config.BIDDING_OPEN)}
                    </section>
                )}

            </div>
        </div>
    );
}

export default Status;



function createLeadingBidTable(auctionsWithUserBids, biddingOpen) {

    return (
        <Table selectable={false} >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                    <TableHeaderColumn colSpan={3}>Title</TableHeaderColumn>
                    <TableHeaderColumn colSpan={2}>Status</TableHeaderColumn>
                    <TableHeaderColumn>Owner</TableHeaderColumn>
                    <TableHeaderColumn>Highest Bid</TableHeaderColumn>
                    <TableHeaderColumn>Your Bid</TableHeaderColumn>
                    <TableHeaderColumn>Bid Rank</TableHeaderColumn>
                    <TableHeaderColumn># Offered</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
                {auctionsWithUserBids.map(auctionWithUserBid => {
                    return (
                        <TableRow selectable={false} key={auctionWithUserBid.uid}>
                            <TableRowColumn colSpan={3}>{auctionWithUserBid.title}</TableRowColumn>
                            <TableRowColumn colSpan={2}>Bidding Open | Won | Not Won | <FlatButton>Accept for $100</FlatButton> | Pending Owner</TableRowColumn>
                            <TableRowColumn>{auctionWithUserBid.owner.displayName}</TableRowColumn>
                            <TableRowColumn>${auctionWithUserBid.highBid}</TableRowColumn>
                            <TableRowColumn>${auctionWithUserBid.userHighBidValue}</TableRowColumn>
                            <TableRowColumn>{auctionWithUserBid.userHighBidRank} / {auctionWithUserBid.bidCount}</TableRowColumn>
                            <TableRowColumn>{auctionWithUserBid.countOffered}</TableRowColumn>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}


function createOwnedAuctionTable(auctionsOwned, biddingOpen) {

    const getBidStatus = (bid, index) => {
        if (!bid.ownerConfirmed) {
            return <FlatButton primary={index===0}>Confirm</FlatButton>
        } else if (!bid.bidderConfirmed) {
            return 'Pending Bidder';
        } else if (bid.ownerConfirmed && bid.bidderConfirmed) {
            return 'Confirmed';
        }
    }

    return (
        <Table selectable={false} >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                <TableRow>
                    <TableHeaderColumn colSpan={3}>Title</TableHeaderColumn>
                    <TableHeaderColumn>Bids</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {auctionsOwned.map(auctionOwned => {
                    return (
                        <TableRow selectable={false} key={auctionOwned.uid}>
                            <TableRowColumn>{auctionOwned.title}</TableRowColumn>
                            <TableRowColumn>{!auctionOwned.topBids || !auctionOwned.topBids.length ? 'No bids yet' : (

                                <Table selectable={false}>
                                    <TableBody displayRowCheckbox={false}>
                                        {auctionOwned.topBids.map((bid, index) => {
                                            return (
                                                <TableRow selectable={false} key={index}>
                                                    <TableRowColumn>${bid.bidAmount}</TableRowColumn>
                                                    <TableRowColumn>{bid.bidderObj.name}</TableRowColumn>
                                                    {biddingOpen ? '' : (
                                                        <TableRowColumn>{getBidStatus(bid, index)}</TableRowColumn>
                                                    )}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            
                            )}</TableRowColumn>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}