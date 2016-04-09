import React, { Component, PropTypes } from 'react'
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'

import './_header.scss'

class Header extends Component {

    constructor(props) {
        super(props)
      }

    render () {
        return (
            <header>
                <div className="header__greeting">Welcome <span className="header__greeting__username">{this.props.user.google.displayName}</span></div>
                <ul >
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/auctions">Auctions</Link>
                    </li>
                    <li>
                        <Link to="/auctions/confirmWinners">Confirm Winners</Link>
                    </li>
                    <li>
                        <Link to="/auctions/add">Add Auction</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </header>
        )
    }

    componentDidMount () {
        const { dispatch } = this.props
    }
}

function mapStateToProps (state) {
    return {
        user: state.login.user
      }
}

export default connect(mapStateToProps)(Header);



// <button onClick={() => hashHistory.push('/auctions')}>Go to /foo</button>