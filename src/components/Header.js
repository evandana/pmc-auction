import React from 'react'
import { Link, hashHistory } from 'react-router'

const Header = () => {

    return (
        <div>
            <ul>
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
            <div>Welcome </div>
        </div>
    )
}

export default Header

// <button onClick={() => hashHistory.push('/auctions')}>Go to /foo</button>