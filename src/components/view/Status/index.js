import React from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const Status = (props) => {

    const { auctionsWithUserBids, ...rest } = props;

    const leadingBidTable = createLeadingBidTable(auctionsWithUserBids);

    return (
        <div className='page'>
            <div className='text-content'>
                <h1>Status</h1>

                <h2>Auctions with Your Bids</h2>
                <p>If you are the top bidder when the auction closes, you are expected to claim that item.</p>
                <p>If an auction owner is awarding multiple winners and you have one of the highest few bids, you may be offered a chance to accept this at your highest bid for that item.</p>
                {leadingBidTable}

                <h2>Owned Auctions</h2>
                <pre>[tables with data for each owned auction]</pre>

                <h2>Confirmed Won Auctions</h2>
                <p>Congrats have been confirmed to have won these auctions!</p>
                <pre>[tables with data for each won auction including contact information]</pre>

            </div>
        </div>
    );
}

export default Status;

function createLeadingBidTable(auctionsWithUserBids) {

    return (
        <Table selectable={false} >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                >
                <TableRow>
                    <TableHeaderColumn colSpan={3}>Title</TableHeaderColumn>
                    <TableHeaderColumn>Owner</TableHeaderColumn>
                    <TableHeaderColumn>Highest Bid</TableHeaderColumn>
                    <TableHeaderColumn>Your Bid</TableHeaderColumn>
                    <TableHeaderColumn>Bid Rank</TableHeaderColumn>
                    <TableHeaderColumn>Auction Items Offered</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
                >
                {auctionsWithUserBids.map(auctionWithUserBid => {
                    return (
                        <TableRow selectable={false} key={auctionWithUserBid.uid}>
                            <TableRowColumn colSpan={3}>{auctionWithUserBid.title}</TableRowColumn>
                            <TableRowColumn>{auctionWithUserBid.owner}</TableRowColumn>
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