import moment from 'moment';

import { takeEvery, take, cancel, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
    DEBOUNCE_REFRESH_RAFFLES,
    PERSIST_RAFFLE_UPDATE,
    FETCH_RAFFLES,
    REFRESH_RAFFLES,
    BUY_RAFFLE_TICKETS,
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
            
            let user = snapshot.val();

            const newTickets = [...Array(count)].map(ticket => ({number: Math.floor(Math.random()*100000)}))

            user.tickets = user.tickets ? [
                ...user.tickets,
                ...newTickets
            ] : [ 
                ...newTickets
            ];

            user.raffleMoneyOwed = (user.raffleMoneyOwed || 0) + 5 * count;

            window._FIREBASE_DB_.ref('/users/' + user.uid)
                .update(user);
        });


    yield;
}

export default function* () {
    yield [
        // debounce refresh raffles to prevent extraneous refreshes during a bidding spree
        debounceFor(DEBOUNCE_REFRESH_RAFFLES, debouncedRefreshRaffles, 500),

        // normal saga actions
        takeEvery(FETCH_RAFFLES, fetchRaffles),
        takeEvery(PERSIST_RAFFLE_UPDATE, persistRaffleUpdate),
        takeEvery(BUY_RAFFLE_TICKETS, buyRaffleTickets),
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