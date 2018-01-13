import {
    SET_CURRENT_USER,
} from '../constants';

const defaultUser = {
    permissions: {},
    name: '',
    uid: '',
    authInitiated: false,
};

function user(state = defaultUser, action) {
    const { type, ...rest } = action;
    
    if (type === SET_CURRENT_USER) {
        return {
            permissions: {basic: true},
            ...rest,
        };
    } else {
        return state;
    }
}

export default user;