import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';
// import Paper from 'material-ui/Paper';
// import {
//     Table,
//     TableBody,
//     TableHeader,
//     TableHeaderColumn,
//     TableRow,
//     TableRowColumn,
// } from 'material-ui/Table';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import Snackbar from 'material-ui/Snackbar';
// import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
// import ContentCopyIcon from 'material-ui/svg-icons/content/content-copy';
// import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
// import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
// import AttachMoneyIcon from 'material-ui/svg-icons/editor/attach-money';
// import LocalPlayIcon from 'material-ui/svg-icons/maps/local-play';
// // import MailOutlineIcon from 'material-ui/svg-icons/communication/mail-outline';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import RemoveCircleOutlineIcon from 'material-ui/svg-icons/content/remove-circle-outline'

class Raffle extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { user, raffles } = this.props;

        const themePalette = this.props.muiTheme.palette;

        return (
            <div className='page'>
                <div className='text-content' style={{padding:'1em'}}>
                    <h2>Raffles</h2>
                    <pre>{JSON.stringify(raffles)}</pre>
                </div>
            </div>
        );
    }
}

export default muiThemeable()(Raffle);