import React from 'react'

const Status = (props) => {

    const { ...rest } = props;

    return (
        <div className='page'>
            <h1>Status</h1>
            
            <h2>Auctions with Leading Bids</h2>
            <p>If you are the top bidder when the auction closes, you are expected to claim that item.</p>
            <p>If an auction owner is awarding multiple winners and you have one of the highest few bids, you may be offered a chance to accept this at your highest bid for that item.</p>
            [table with data about leading bid auctions]

            <h2>Owned Auctions</h2>
            [tables with data for each owned auction]

            <h2>Confirmed Won Auctions</h2>
            <p>Congrats have been confirmed to have won these auctions!</p>
            [tables with data for each won auction including contact information]

        </div>
    );
}

export default Status;
