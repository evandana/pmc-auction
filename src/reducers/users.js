import {
    SET_USERS,
} from '../constants';

const initialState = {
    all: [],
};

function asyncForm(state = initialState, action) {
    const { type, users } = action;

    if (type === SET_USERS) {
        return {
            ...state,
            all: users,
        };
    } else {
        return initialState;
    }
}

export default asyncForm;