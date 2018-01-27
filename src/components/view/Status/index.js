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
                        <p>Choose the winners from the top bids.</p>
                        <p>You may select multiple winners. Except for the top winner you choose, bidders will have the option to confirm or pass.</p>
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
        } else if (confirmWinners && auction.userHighBid.ownerConfirmed && !auction.userHighBid.bidderConfirmed) {
            return <div>
                <RaisedButton primary={true} label={'Confirm at $' + auction.userHighBid.bidAmount}></RaisedButton>
                <RaisedButton label='Pass'></RaisedButton>
            </div>
        } else if (confirmWinners && (auction.userHighBid.ownerConfirmed === false || auction.userHighBidRank > auction.numberOffered + 3) ) {
            return 'Not won';
        } else if (confirmWinners && !auction.userHighBid.ownerConfirmed) {
            return 'Pending owner confirmation';
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
                    {biddingOpen ? '' : <TableHeaderColumn colSpan={4}>Status</TableHeaderColumn>}
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
                            {biddingOpen ? '' : <TableRowColumn colSpan={4}>{getStatus(auctionWithUserBid, biddingOpen)}</TableRowColumn>}
                            <TableRowColumn>{auctionWithUserBid.owner.displayName}</TableRowColumn>
                            <TableRowColumn>${auctionWithUserBid.highBid}</TableRowColumn>
                            <TableRowColumn>${auctionWithUserBid.userHighBid.bidAmount}</TableRowColumn>
                            <TableRowColumn>{auctionWithUserBid.userHighBidRank} / {auctionWithUserBid.bidCount}</TableRowColumn>
                            <TableRowColumn>{auctionWithUserBid.numberOffered}</TableRowColumn>
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
            return <div>
                <RaisedButton primary={true} label={'Confirm'}></RaisedButton>
                <RaisedButton label='Pass'></RaisedButton>
            </div>
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
                    <TableHeaderColumn colSpan={2}>Title</TableHeaderColumn>
                    <TableHeaderColumn># Offered</TableHeaderColumn>
                    <TableHeaderColumn colSpan={4}>Bids</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {auctionsOwned.map(auctionOwned => {
                    return (
                        <TableRow selectable={false} key={auctionOwned.uid}>
                            <TableRowColumn colSpan={2}>{auctionOwned.title}</TableRowColumn>
                            <TableRowColumn>{auctionOwned.numberOffered}</TableRowColumn>
                            <TableRowColumn colSpan={4}>{!auctionOwned.topBids || !auctionOwned.topBids.length ? 'No bids yet' : (

                                <Table selectable={false}>
                                    <TableBody displayRowCheckbox={false}>
                                        {auctionOwned.topBids.map((bid, index) => {
                                            return (
                                                <TableRow selectable={false} key={index}>
                                                    <TableRowColumn>${bid.bidAmount}</TableRowColumn>
                                                    <TableRowColumn colSpan={2}>{bid.bidderObj.name}</TableRowColumn>
                                                    {biddingOpen ? '' : <TableRowColumn colSpan={3}>{getBidStatus(bid, index, confirmWinners)}</TableRowColumn>}
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