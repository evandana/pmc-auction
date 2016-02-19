// Libraries
import React from 'react';
// Styles
import './detailRow.scss';
// Application Components
import AuctionActions from 'actions/AuctionActions';


let DetailRow = React.createClass({

    propTypes: {
        data: React.PropTypes.object.isRequired,
    },
    
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.data !== this.props.data;
    },
        
    render () {
        
        // 
        let loc = 'pancakeBunny.png',
             urlStr = require('url-loader?limit=8192!' + 'images/pancakeBunny.png');
        
        return (
            <tr className="detail-row-l" onClick={this.rowClick.bind(this, this.props.data)}>
                <td colSpan="4">
                    <div>{this.props.data.description}</div>
                    <div className="detail-row-image"><img src={urlStr} /></div>
                </td>
            </tr>
        );
    },
    
    rowClick (data) {
        AuctionActions.toggleAuctionRow(data.id);
    }
    
});

export default DetailRow;
