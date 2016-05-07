import React from 'react'

import './_homePage.scss'

const HomePage = ( {prop} ) => {

    return (
        <div className="home-page">
            <h3>Thank you for joining the Happiness Exchange!</h3>
            <p>Bidding will be live Saturday May, 7th between 6 and 9pm. Winners will be connected
            with the auction-providers and instructions on how to donate.</p>
            <p>Every penny of your winning bid will go directly to Dana Farber for cancer research.</p>
            <p>Thank you so much for your generosity and have fun bidding!</p>
            <p><a href="#/auctions">View the auctions</a></p>
            <p>
                Event: Saturday, May 7th from 6-9pm
                <br/>
                <a href="https://www.facebook.com/events/198978703805744/" target="_blank">RSVP and details</a>
            </p>
        </div>
    )
}

export default HomePage