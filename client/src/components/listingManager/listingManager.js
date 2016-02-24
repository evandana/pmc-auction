// Libraries
import React from 'react';
// Styles
import './listingManager.scss';
// Application Components
import AuctionActions from 'actions/AuctionActions';

let ListingManager = React.createClass({

    addAuction () {
        AuctionActions.addAuction(this.state);
    },
    
    getInitialState () {
        return {
            title: '',
            description: '',
            openingBid : 0
        };
    },
    
    handleChange (event) {
        switch (event.target.id) {
            case 'auction-title':
                this.setState({title : event.target.value});
                break;
            case 'auction-open-bid':
                this.setState({openingBid : event.target.value});
                break;
            case 'auction-description':
                this.setState({description: event.target.value});
                break;
            default:
                break
        }
    },

    render () {

        return (
            <div className="listing-manager-l">
                <div className="pure-form pure-form-aligned">
                    <fieldset>
                        <legend>Create an Auction</legend>
                        <div className="pure-control-group">
                            <label htmlFor="auction-title">Title</label>
                            <input 
                                id="auction-title" 
                                type="text" 
                                placeholder="Auction Title" 
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="auction-description">Description</label>
                            <textarea 
                                id="auction-description"
                                value={this.state.description}
                                onChange={this.handleChange}>
                            <   /textarea>
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="auction-open-bid">Opening Bid Amount</label>
                            <input 
                                id="auction-open-bid" 
                                type="text" 
                                placeholder="0"
                                value={this.state.openingBid}
                                onChange={this.handleChange}
                            />
                        </div>
                    </fieldset>
                    <button onClick={this.addAuction}>Add Auction</button>
                </div>
            </div>
        );
    }
    
});

export default ListingManager;
