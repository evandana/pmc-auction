import moment from 'moment';

import { takeEvery, take, cancel, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
    DEBOUNCE_REFRESH_RAFFLES,
    PERSIST_RAFFLE_UPDATE,
    FETCH_RAFFLES,
    REFRESH_RAFFLES,
    BUY_RAFFLE_TICKETS,
    ENTER_RAFFLE_TICKET,
    PULL_RAFFLE_TICKET,
} from '../constants';

import { refreshRaffles, debounceRefreshRaffles as debounceFetchRafflesAction } from '../actions';


// debounce refresh raffles to prevent extraneous refreshes during a bidding spree
function* debouncedRefreshRaffles({ raffles }) {
    yield window._UI_STORE_.dispatch(refreshRaffles(raffles));
};

function* fetchRaffles() {
    window._FIREBASE_DB_.ref('/raffles')
        .on('value', (snapshot) => {
            let raffles = snapshot.val();

            raffles = !raffles ? [] : Object.keys(raffles)
                .map(key => {
                    let raffle = raffles[key];
                    raffle.uid = key;

                    return raffle;
                })
                .sort((a, b) => {

                    const aVal = (a.commercialValue || 1) * a.numberOffered;
                    const bVal = (b.commercialValue || 1) * b.numberOffered;

                    // highest first
                    // then nulls
                    if (!aVal) {
                        return 1;
                    } else if (!bVal) {
                        return -1;
                    } else if (aVal === bVal) {
                        return 0;
                    } else if (aVal < bVal) {
                        return 1;
                    } else if (aVal > bVal) {
                        return -1;

                    } else {
                        return 0;
                    }
                });

            // debounce refresh raffles to prevent extraneous refreshes during a bidding spree
            window._UI_STORE_.dispatch(debounceFetchRafflesAction(raffles));
        });
    yield;
}

function* persistRaffleUpdate({ raffleData }) {

    const updates = {};
    const raffleUid = raffleData.uid || raffleData.title.replace(/[^\w\d]/g,'').substr(0, 15).toLowerCase();
    updates['raffles/' + raffleUid] = {
        tickets: [],
        title: '',
        subTitle: '',
        image: '',
        referenceLink: '',
        commercialValue: 0,
        description: '',
        show: false,
        ...raffleData,
    };

    window._FIREBASE_DB_.ref()
        .update(updates);

    yield;
}

function* buyRaffleTickets({count, user}) {

    window._FIREBASE_DB_.ref('/users/' + user.uid)
        .once('value', snapshot => {
            
            window._FIREBASE_DB_.ref('/raffleIndex')
                .once('value', raffleIndexSnapshot => {

                    let user = snapshot.val();
                    const raffleIndex = raffleIndexSnapshot.val();
                    let updates = {};

                    const newTickets = [...Array(count)].map((ticket, i) => ({number: raffleIndex + i + 1}))

                    user.tickets = user.tickets ? [
                        ...user.tickets,
                        ...newTickets
                    ] : [ 
                        ...newTickets
                    ];

                    user.raffle = user.raffle || {};
                    user.raffle = {
                        purchasedCount: (user.raffle.purchasedCount || 0) + count,
                        cost: (user.raffle.cost || 0) + (count === 1 ? 5 : 20)
                    };

                    updates['/users/' + user.uid] = user;
                    updates['raffleIndex'] = raffleIndex + count;

                    window._FIREBASE_DB_.ref()
                        .update(updates);
                        
                });
        });


    yield;
}

function* enterRaffleTicket({raffle, user}) {

    window._FIREBASE_DB_.ref('/raffles/' + raffle.uid )
        .once('value', snapshot => {

            const freshRaffle = snapshot.val()    

            let ticketToEnter = user.tickets.pop();
            ticketToEnter = {
                ...ticketToEnter,
                googleUid: user.googleUid,
                uid: user.uid,
            };

            let updates = {};
            
            updates['/raffles/' + freshRaffle.uid + '/tickets/' + (!raffle.tickets ? 0 : raffle.tickets.length)] = ticketToEnter;

            updates['/users/' + user.uid + '/tickets'] = [
                ...user.tickets
            ];

            window._FIREBASE_DB_.ref()
                .update(updates);
    });

}

function* pullRaffleTicket({raffle}) {

    const winningIndex = Math.floor( Math.random() * raffle.tickets.length );

    // splice mutates array, removing 1 item and returning that item
    const winningTicket = raffle.tickets.splice(winningIndex, 1);

    raffle = {
        ...raffle,
        winningTicket: winningTicket[0],
    }

    window._FIREBASE_DB_.ref('raffles/' + raffle.uid )
        .set(raffle);

}

export default function* () {
    yield [
        // debounce refresh raffles to prevent extraneous refreshes during a bidding spree
        debounceFor(DEBOUNCE_REFRESH_RAFFLES, debouncedRefreshRaffles, 500),

        // normal saga actions
        takeEvery(FETCH_RAFFLES, fetchRaffles),
        takeEvery(PERSIST_RAFFLE_UPDATE, persistRaffleUpdate),
        takeEvery(BUY_RAFFLE_TICKETS, buyRaffleTickets),
        takeEvery(ENTER_RAFFLE_TICKET, enterRaffleTicket),
        takeEvery(PULL_RAFFLE_TICKET, pullRaffleTicket),
    ];
}

// copied from, and credit to: https://github.com/madewithlove/redux-saga-debounce-effect/blob/master/src/debounceFor.js
function* debounceFor(pattern, saga, ms, ...args) {
    function* delayedSaga(action) {
        yield call(delay, ms);
        yield call(saga, action, ...args);
    }

    let task;
    while (true) {
        const action = yield take(pattern);
        if (task) {
            yield cancel(task);
        }

        task = yield fork(delayedSaga, action);
    }
}