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

	translateNewLinesToBrs(text) {
		return text.split('\n').map(function (item, key) {
			return (
				<p key={key}>
					{item}
				</p>
			)
		});
	}

    render() {

        const { user, raffles, dispatch, config } = this.props;


        return (
            <div className='page'>
                <div className='text-content' style={{ padding: '1em' }}>

                    {!user.permissions.attendee && config.RAFFLE_OPEN && (
                        <section>
                            <h2>Raffles</h2>
                            <h4>Raffles are intended for those at the party.</h4>
                            <p>If you're at the party, enter the code on the About page.</p>
                        </section>
                    )}

                    {user.permissions && user.permissions.attendee && config.RAFFLE_OPEN && (

                        <section>
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
                        </section>
                    )}


                    <h2>Raffles</h2>

                    <section className="row">
                    {raffles
                        .filter(raffle => (raffle.raffleImage || raffle.image) && raffle.title && raffle.title.length)
                        .map(raffle => {
                        return (
                            <Card
                                key={raffle.uid}
                                className='col-xs-12 col-sm-6 col-md-4'
                                style={{marginBottom:20}}
                            >
                                {/* <CardHeader
                                    title={raffle.title}
                                    subtitle={raffle.subTitle}
                                    avatar="images/jsa-128.jpg"
                                /> */}
                                {!raffle.raffleImage && !raffle.image ? '' : (
                                    <CardMedia
                                        overlay={<CardTitle title={raffle.title} subtitle={raffle.subTitle} />}
                                        style={{maxHeight:300}}
                                    >
                                        <img src={raffle.raffleImage || raffle.image} style={{height:300, objectFit:'cover'}} alt="" />
                                    </CardMedia>
                                )}
                                {/* <CardTitle title="Card title" subtitle="Card subtitle" /> */}

                                {user.permissions.attendee && (
                                    <CardActions>
                                        {config.RAFFLE_OPEN && <RaisedButton
                                            onTouchTap={() => {
                                                dispatch(enterRaffleTicket({ raffle, user }));
                                            }}
                                            primary={true}
                                            disabled={!user.tickets || !user.tickets.length}
                                            label="Enter 1 Raffle Ticket"
                                        />}
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
                                )}
                                <CardText>{this.translateNewLinesToBrs(raffle.description)}</CardText>
                                {user.permissions.attendee && raffle.winningTicket && (<CardText
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}>
                                    <h3 style={{marginRight:'1em', marginTop: 10, marginBottom: 10}}>
                                        {user.uid === raffle.winningTicket.uid ? 'Winner' : 'Not won'}
                                    </h3>
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
                                {user.permissions.attendee && (
                                        <CardText
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                        }}>
                                        {raffle.tickets && raffle.tickets
                                            .sort(ticket => {
                                                if (user.uid === ticket.uid) {
                                                    return -1;
                                                } else {
                                                    return 1;
                                                }
                                            })
                                            .slice(0,30)
                                            .map( (ticket, i) => {
                                            return user.uid === ticket.uid ? (
                                                this.createOwnedTicketChip(ticket)
                                            ) : (
                                                <Avatar style={{ margin: 4 }} size={32} key={ticket.number} backgroundColor={this.themePalette.canvasColor} ><LocalPlayIcon color={this.themePalette.disabledColor} size={32} /></Avatar>
                                            );
                                        })}
                                        {raffle && raffle.tickets && raffle.tickets.length > 30 && <Avatar style={{ margin: 4 }} size={32} key='ellipsis' color={this.themePalette.disabledColor} backgroundColor={this.themePalette.canvasColor} >...</Avatar>}
                                    </CardText>
                                )}
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