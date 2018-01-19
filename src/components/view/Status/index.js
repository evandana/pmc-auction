import React from 'react'

const Status = (props) => {

    const { ...rest } = props;

    return (
        <div className='page'>
            <div className='text-content'>
                <h1>Status</h1>

                <h2>Auctions with Leading Bids</h2>
                <p>If you are the top bidder when the auction closes, you are expected to claim that item.</p>
                <p>If an auction owner is awarding multiple winners and you have one of the highest few bids, you may be offered a chance to accept this at your highest bid for that item.</p>
                <pre>[table with data about leading bid auctions]</pre>

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
