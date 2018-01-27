import React from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

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
                    {createLeadingBidTable(auctionsWithUserBids, config.BIDDING_OPEN, config.CONFIRM_WINNERS)}
                </section>

                {!user.permissions.donor || !auctionsOwned ? '' : (
                    <section>
                        <h2>Owned Auctions</h2>
                        <p>If you are the top bidder when the auction closes, you are expected to claim that item.</p>
                        {createOwnedAuctionTable(auctionsOwned, config.BIDDING_OPEN, config.CONFIRM_WINNERS)}
                    </section>
                )}

            </div>
        </div>
    );
}

export default Status;



function createLeadingBidTable(auctionsWithUserBids, biddingOpen, confirmWinners) {

    const getStatus = (auction, biddingOpen) => {
        if (biddingOpen) {
            return 'Bidding Open';
        } else if (confirmWinners && !auction.userHighBid.bidderConfirmed) {
            return <RaisedButton label={'Confirm at $' + auction.userHighBid.bidAmount}></RaisedButton>
        } else if (confirmWinners && !auction.userHighBid.ownerConfirmed) {
            return 'Pending owner confirmation'
        } else if (confirmWinners && auction.userHighBid.bidderConfirmed && auction.userHighBid.ownerConfirmed) {
            return 'Confirmed!';
        } else {
            return 'Bidding closed';
        }
    }

    return (
        <Table selectable={false} >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                    <TableHeaderColumn colSpan={3}>Title</TableHeaderColumn>
                    {biddingOpen ? '' : <TableHeaderColumn colSpan={2}>Status</TableHeaderColumn>}
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
                            {biddingOpen ? '' : <TableRowColumn colSpan={2}>{getStatus(auctionWithUserBid, biddingOpen)}</TableRowColumn>}
                            <TableRowColumn>{auctionWithUserBid.owner.displayName}</TableRowColumn>
                            <TableRowColumn>${auctionWithUserBid.highBid}</TableRowColumn>
                            <TableRowColumn>${auctionWithUserBid.userHighBid.bidAmount}</TableRowColumn>
                            <TableRowColumn>{auctionWithUserBid.userHighBidRank} / {auctionWithUserBid.bidCount}</TableRowColumn>
                            <TableRowColumn>{auctionWithUserBid.countOffered}</TableRowColumn>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}


function createOwnedAuctionTable(auctionsOwned, biddingOpen, confirmWinners) {

    const getBidStatus = (bid, index, confirmWinners) => {
        if (biddingOpen) {
        } else if (confirmWinners && !bid.ownerConfirmed) {
            return <RaisedButton primary={index===0} label='Confirm'></RaisedButton>
        } else if (confirmWinners && !bid.bidderConfirmed) {
            return 'Pending Bidder';
        } else if (confirmWinners && bid.ownerConfirmed && bid.bidderConfirmed) {
            return 'Confirmed';
        } else {
            return 'Bidding closed';
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
                                                    {biddingOpen ? '' : <TableRowColumn>{getBidStatus(bid, index, confirmWinners)}</TableRowColumn>}
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