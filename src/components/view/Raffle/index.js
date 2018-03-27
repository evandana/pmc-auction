import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import PersonIcon from 'material-ui/svg-icons/social/person';
import LocalPlayIcon from 'material-ui/svg-icons/maps/local-play';

import { buyRaffleTickets, enterRaffleTicket, pullRaffleTicket } from 'actions';

class Raffle extends Component {

    constructor(props) {
        super(props);
        this.themePalette = this.props.muiTheme.palette;
    }

    createOwnedTicketChip(ticket) {
        return (
            <Chip
                key={ticket.number}
                backgroundColor={this.themePalette.primary2Color}
                style={{ margin: 4 }}
            >
                <Avatar backgroundColor={this.themePalette.primary2Color} ><LocalPlayIcon color={this.themePalette.canvasColor} size={40} /></Avatar>
                <span style={{ color: this.themePalette.canvasColor }}>{ticket.number}</span>
            </Chip>
        )
    }

    render() {

        const { user, raffles, dispatch } = this.props;

        return (
            <div className='page'>
                <div className='text-content' style={{ padding: '1em' }}>
                    <h2>Raffle Tickets Available: {user.tickets ? user.tickets.length : 0}</h2>

                    <RaisedButton
                        primary={true}
                        label="Buy 1 Ticket ($5)"
                        onTouchTap={() => {
                            dispatch(buyRaffleTickets({
                                user,
                                count: 1
                            }));
                        }}
                        style={{ marginRight: '1em' }}
                    />

                    <RaisedButton
                        secondary={true}
                        label="Buy 5 Tickets ($20)"
                        onTouchTap={() => {
                            dispatch(buyRaffleTickets({
                                user,
                                count: 5
                            }));
                        }}
                    />

                    <div
                        className='col-xs-12'
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            paddingTop: '.5em',
                        }}
                    >
                        {user.tickets && user.tickets.map(ticket => this.createOwnedTicketChip(ticket))}
                    </div>


                    <h2>Raffles</h2>

                    <section className='col-xs-12'>
                    {raffles.map(raffle => {
                        return (
                            <Card
                                key={raffle.uid}

                            >
                                {/* <CardHeader
                                    title={raffle.title}
                                    subtitle={raffle.subTitle}
                                    avatar="images/jsa-128.jpg"
                                /> */}
                                {!raffle.raffleImage && !raffle.image ? '' : (
                                    <CardMedia
                                        overlay={<CardTitle title={raffle.title} subtitle={raffle.subTitle} />}
                                    >
                                        <img src={raffle.raffleImage || raffle.image} alt="" />
                                    </CardMedia>
                                )}
                                {/* <CardTitle title="Card title" subtitle="Card subtitle" /> */}
                                <CardText>{raffle.description}</CardText>
                                {raffle.winningTicket && (<CardText
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}>
                                    <h3 style={{marginRight:'1em', marginTop: 10, marginBottom: 10}}>Winner</h3>
                                    {user.uid === raffle.winningTicket.uid ? (
                                        <Chip
                                            key={raffle.winningTicket.number}
                                            backgroundColor={this.themePalette.accent1Color}
                                            style={{ margin: 4 }}
                                        >
                                            <Avatar backgroundColor={this.themePalette.accent1Color} ><LocalPlayIcon color={this.themePalette.canvasColor} size={40} /></Avatar>
                                            <span style={{ color: this.themePalette.canvasColor }}>{raffle.winningTicket.number}</span>
                                        </Chip>
                                    ) : (
                                        <Chip
                                            key={raffle.winningTicket.number}
                                            backgroundColor={this.themePalette.disabledColor}
                                            style={{ margin: 4 }}
                                        >
                                            <Avatar style={{ margin: 0 }} size={32} key={raffle.winningTicket.number} backgroundColor={this.themePalette.disabledColor} ><LocalPlayIcon color={this.themePalette.canvasColor} size={32} /></Avatar>
                                            <span style={{ color: this.themePalette.canvasColor }}>{raffle.winningTicket.number}</span>
                                        </Chip>
                                    )}
                                </CardText>)}
                                <CardText
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}>
                                    {raffle.tickets && raffle.tickets.map(ticket => {
                                        return user.uid === ticket.uid ? (
                                            this.createOwnedTicketChip(ticket)
                                        ) : (
                                            <Avatar style={{ margin: 4 }} size={32} key={ticket.number} backgroundColor={this.themePalette.canvasColor} ><LocalPlayIcon color={this.themePalette.disabledColor} size={32} /></Avatar>
                                        );
                                    })}
                                </CardText>
                                <CardActions>
                                    <RaisedButton
                                        onTouchTap={() => {
                                            dispatch(enterRaffleTicket({ raffle, user }));
                                        }}
                                        primary={true}
                                        disabled={!user.tickets || !user.tickets.length}
                                        label="Enter 1 Raffle Ticket"
                                    />
                                    {user.permissions.admin && <RaisedButton
                                        onTouchTap={() => {
                                            dispatch(pullRaffleTicket({ raffle }));
                                        }}
                                        backgroundColor={this.themePalette.errorColor}
                                        labelColor={this.themePalette.canvasColor}
                                        disabled={!raffle.tickets || !raffle.tickets.length}
                                        label="Pull a ticket"
                                    />}
                                </CardActions>
                            </Card>
                        )
                    })}

                    </section>


                </div>
            </div>
        );
    }
}

export default muiThemeable()(Raffle);