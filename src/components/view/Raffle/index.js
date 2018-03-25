import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import PersonIcon from 'material-ui/svg-icons/social/person';
import LocalPlayIcon from 'material-ui/svg-icons/maps/local-play';

import { buyRaffleTickets } from 'actions';

class Raffle extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { user, raffles, dispatch } = this.props;

        const themePalette = this.props.muiTheme.palette;

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
                        className="col-xs-12"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}
                    >
                        {user.tickets && user.tickets.map(ticket => (
                            <Chip
                                key={ticket.number}
                                backgroundColor={themePalette.primary2Color}
                                style={{ margin: 4 }}
                            >
                                <Avatar backgroundColor={themePalette.primary2Color} ><PersonIcon color={themePalette.canvasColor} size={32} /></Avatar>
                                <span style={{ color: themePalette.canvasColor }}>{ticket.number}</span>
                            </Chip>
                        ))}
                    </div>


                    <h2>Raffles</h2>

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
                                <CardText
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {raffle.tickets.map(ticket => {
                                        return user.uid === ticket.uid ? (
                                            <Chip
                                                key={ticket.number}
                                                backgroundColor={user.uid === ticket.uid ? themePalette.primary2Color : themePalette.borderColor}
                                                style={{ margin: 4 }}
                                                >
                                                <Avatar backgroundColor={themePalette.primary2Color} ><LocalPlayIcon color={themePalette.canvasColor} size={40} /></Avatar>
                                                <span style={{ color: user.uid === ticket.uid ? themePalette.canvasColor : themePalette.disabledColor }}>{ticket.number}</span>
                                            </Chip>
                                        ) : (
                                            <Avatar style={{ margin: 4 }} size={32} key={ticket.number} backgroundColor={themePalette.canvasColor} ><LocalPlayIcon color={themePalette.disabledColor} size={32} /></Avatar>
                                        );
                                    })}
                                </CardText>
                                <CardActions>
                                    <FlatButton label="Use Ticket" />
                                </CardActions>
                            </Card>
                        )
                    })}


                </div>
            </div>
        );
    }
}

export default muiThemeable()(Raffle);