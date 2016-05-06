// Libraries
import React, { Component } from 'react'

import ConfirmDialog from 'components/confirmDialog/ConfirmDialog'

// MATERIAL UI!!!
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import Checkbox from 'material-ui/lib/checkbox';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';

// Styles
import './ConfirmWinners.scss';

class ConfirmWinner extends Component {

    constructor(props) {
        super(props);

        this.selections = []
    }

    handleToggle (selectedBidIndices) {
        this.selections = selectedBidIndices;
        console.log('this.selections', this.selections)
    }

    getSelections() {
        return this.selections;
    }

    handleChange (event) {
        this.setState({height: event.target.value});
    }

    render () {
        let auction = this.props.auction;

        const style = {
            doubleColumn: {
                colSpan: 2
            }
        }

        return (
            <div
                className="confirm-block"
            >
                <Table
                    selectable={true}
                    multiSelectable={true}
                    onRowSelection={(selectedBidIndices) => {
                        this.handleToggle(selectedBidIndices);
                    }}
                >
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>
                            {auction.title}
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                              <ConfirmDialog
                                primary={true}
                                label="Confirm"
                                auction={auction}
                                getSelections={() => { return this.getSelections() }}
                                confirmWinnersSubmit={this.props.confirmWinnersSubmit}
                            />
                        </TableHeaderColumn>
                      </TableRow>
                      <TableRow>
                        <TableHeaderColumn>Bid Amount</TableHeaderColumn>
                        <TableHeaderColumn>Bidder</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody
                        deselectOnClickaway={false}
                    >
                        {Object.keys(auction.bids).map( (bidId) =>
                        <TableRow key={'bidId-'+bidId}>
                            <TableRowColumn>{'$' + auction.bids[bidId].bidAmount}</TableRowColumn>
                            <TableRowColumn>{auction.bids[bidId].bidderObj.name}</TableRowColumn>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        );

    }

}

export default ConfirmWinner