// Libraries
import React from 'react';
import { connect } from 'react-redux'

// Styles
// import './header.scss';
// Application Components
import AuctionList from '../../auctionList/auctionList';

let Auctions = React.createClass({
    
    render() {
        
        console.log(this.props)
        
        return (
            <div>
                <AuctionList auctions={this.props.auctions} />
            </div>
        )
    }

});

export default connect()(Auctions)