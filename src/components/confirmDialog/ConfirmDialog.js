import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Button from 'material-ui/Button';

import { confirmAuctionWinners } from '../../actions/AuctionActions';

export default class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      winningBidsCollection: []
    };
  }

  handleOpen () {

    let winningBidsIndexArray = this.props.getSelections();

    let bidIdArray = Object.keys(this.props.auction.bids);

    let winningBidsCollection = winningBidsIndexArray.map( selectedBidIndex => {
      return this.props.auction.bids[bidIdArray[selectedBidIndex]];
    });

    this.setState({
      open: true,
      winningBidsCollection: winningBidsCollection
    });
  };

  handleClose () {
    this.setState({open: false});
  };

  handleSubmit () {
    confirmAuctionWinners( this.props.auction, this.state.winningBidsCollection, this.props.auctionOwner )

    this.setState({open: false});
  }

  render() {
    const actions = [
      <Button
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <Button
        label="Confirm"
        primary={true}
        disable={this.state.winningBidsCollection.length < 1}
        onTouchTap={this.handleSubmit.bind(this)}
        disabled={this.state.winningBidsCollection.length > 0 ? false : true}
      />,
    ];


    let awesomeBidListOfGreatness = '';
    if (this.state.winningBidsCollection.length) {
        awesomeBidListOfGreatness = this.state.winningBidsCollection.map( (winningBid, i) => {
            return (
              <div key={'bid-'+i}>{this.props.auction.title} to {winningBid.bidderObj.name} for ${winningBid.bidAmount}</div>
            );
        });
    }

    const style = {
        confirmButton: {
            float:'right'
        }
    }

    return (
      <div>
        <Button
            label="Confirm"
            style={style.confirmButton}
            primary={true}
            onTouchTap={this.handleOpen.bind(this)}
            disabled={this.props.submitDisable}
        />
        <Dialog
          title="Confirm Auction Winners"
          open={this.state.open}
        >
          {
            this.state.winningBidsCollection.length > 0
            ?
              <div>
                <p>You're so generous! Thanks for confirming the following bidders.</p>
                {awesomeBidListOfGreatness}
              </div>
            :
              <p>Please click 'Cancel' then choose a few winning bidders.</p>
          }
          {actions.map(action => action)}

        </Dialog>
      </div>
    );
  }
}