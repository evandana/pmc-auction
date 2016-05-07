// REACT/REDUX
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getImageForEnv } from '../../../images/index'

import './_homePage.scss'

class HomePage extends Component {


    constructor(props) {
        super(props)
    }

    render () {

        return (
            <div className="home-page">
                <h3>Thank you for joining the Happiness Exchange!</h3>
                <img src={getImageForEnv('he-lockup.png')} />
                <p>Welcome, {this.props.user.name}. To keep anonymity while bidding, you will be called "{this.props.user.persona}".</p>
                <p>
                    Bidding will be live Saturday May, 7th between 6pm and 9pm. Winners will be connected
                        with the auction-providers and instructions on how to donate.
                    Every penny of your winning bid will go directly to Dana Farber for cancer research.
                </p>
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
}

export default connect(mapStateToProps)(HomePage);


function mapStateToProps (state) {
    return {
        user: state.login.user
    }
}
